import { redis } from "./redisClient.js";
import { z } from "zod";

export interface StreamProcessorOptions<T> {
  streamKey: string;
  group: string;
  consumerName: string;
  schema: z.ZodType<T>;
  handler: (data: T) => Promise<void>;
  batchSize?: number;
  blockMs?: number;
  deadLetterStream?: string;
}

const defaults = { batchSize: 10, blockMs: 5000 };

export class StreamProcessor<T> {
  private opts: StreamProcessorOptions<T>;

  constructor(opts: StreamProcessorOptions<T>) {
    this.opts = opts;
  }

  async initGroup() {
    try {
      await redis.xgroup("CREATE", this.opts.streamKey, this.opts.group, "0", "MKSTREAM");
    } catch (err) {
      if (!String(err).includes("BUSYGROUP")) throw err;
    }
  }

  async start() {
    await this.initGroup();
    console.log(`StreamProcessor: group=${this.opts.group} consumer=${this.opts.consumerName}`);

    while (true) {
      const res = (await redis.xreadgroup(
        "GROUP",
        this.opts.group,
        this.opts.consumerName,
        "COUNT",
        this.opts.batchSize ?? defaults.batchSize,
        "BLOCK",
        this.opts.blockMs ?? defaults.blockMs,
        "STREAMS",
        this.opts.streamKey,
        ">"
      )) as ([string, [string, string[]][]])[] | null;

      if (!res || !Array.isArray(res)) continue;

      for (const [, entries] of res) {
        await Promise.all(entries.map(([id, fields]) => this.handleMessage(id, fields)));
      }
    }
  }

  private async handleMessage(id: string, fields: string[]) {
    console.info(`Processing message ${id} with fields:`, fields);
    const raw = fields[1];
    let data: unknown;

    try {
      data = JSON.parse(raw);
    } catch (err) {
      console.warn(`Stream: invalid JSON`, err);
      await this.maybeDeadLetter(id, raw, "invalid_json");
      await redis.xack(this.opts.streamKey, this.opts.group, id);
      return;
    }

    const parsed = this.opts.schema.safeParse(data);
    if (!parsed.success) {
      console.warn(`Schema validation failed`, parsed.error.message);
      await this.maybeDeadLetter(id, data, "schema_error", parsed.error);
      await redis.xack(this.opts.streamKey, this.opts.group, id);
      return;
    }

    try {
      await this.opts.handler(parsed.data);
      await redis.xack(this.opts.streamKey, this.opts.group, id);
    } catch (err) {
      console.error(`Handler error on message ${id}:`, err);
      await this.maybeDeadLetter(id, data, "handler_error", err);
    }
  }

  private async maybeDeadLetter(id: string, payload: unknown, reason: string, meta?: unknown) {
    if (!this.opts.deadLetterStream) return;
    await redis.xadd(
      this.opts.deadLetterStream,
      "*",
      "reason",
      reason,
      "payload",
      JSON.stringify(payload),
      "meta",
      JSON.stringify(meta ?? {})
    );
  }
}