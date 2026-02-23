import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { EventService } from "../src/services/event.service.js";
import { EventInput } from "../src/models/index.js";

describe("EventService", () => {
  let service: EventService;

  beforeEach(() => {
    service = new EventService();
  });

  test("rejects invalid payload", async () => {
    await assert.rejects(
      () => service.handleIncomingEvent({}),
      /Invalid event payload/
    );
  });

  test("accepts valid payload", async () => {
    const payload = {
      equipmentId: "EQ-1",
      newState: "green",
    };

    // mock repo call to isolate logic
    service["repo"].create = async (data: EventInput) => ({
      ...data,
      eventId: "11111111-1111-1111-1111-111111111111",
      prevState: null,
      timestampClient: null,
      timestampServer: new Date()
    });
    service["repo"].findById = async () => null;
    service["repo"].findByEquipment = async () => [];

    const result = await service.handleIncomingEvent(payload);
    assert.equal(result.newState, "green");
  });
});