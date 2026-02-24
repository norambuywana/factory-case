import { useEffect } from "react";

export function useStateUpdates(onUpdate: () => void) {
  useEffect(() => {
    const es = new EventSource("/api/events/stream");

    es.addEventListener("update", () => {
      console.log("Update event — refetching state...");
      onUpdate();
    });

    es.onerror = (e) => {
      console.error("SSE error:", e);
    };

    return () => es.close();
  }, [onUpdate]);
}