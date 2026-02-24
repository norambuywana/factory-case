import React, { useState } from "react";

interface EventPayload {
  equipmentId: string;
  newState: "red" | "yellow" | "green";
  timestampClient: string;
}

export default function SendEventPage() {
  const [equipmentId, setEquipmentId] = useState("");
  const [state, setState] = useState<"red" | "yellow" | "green">("red");
  const [response, setResponse] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEvent = async () => {
    if (!equipmentId.trim()) {
      alert("Please enter an Equipment ID");
      return;
    }

    setIsSubmitting(true);
    setResponse(null);

    const payload: EventPayload = {
      equipmentId,
      newState: state,
      timestampClient: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      const data = await res.json();

      setResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResponse(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ backgroundColor: "white", padding: "1.5rem", borderRadius: "0.5rem", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "400px" }}>
        <h1 style={{ fontWeight: "bold", marginBottom: "1rem" }}>Send Equipment Event</h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "medium", color: "#4B5563", marginBottom: "0.25rem" }}>
              Equipment ID
            </label>
            <input
              type="text"
              value={equipmentId}
              onChange={(e) => setEquipmentId(e.target.value)}
              style={{ width: "100%", border: "1px solid #D1D5DB", borderRadius: "0.375rem", padding: "0.5rem 0.75rem" }}
              placeholder="e.g. EQ-123"
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "medium", color: "#4B5563", marginBottom: "0.25rem" }}>
              State
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value as any)}
              style={{ width: "100%", border: "1px solid #D1D5DB", borderRadius: "0.375rem", padding: "0.5rem 0.75rem" }}
            >
              <option value="red">Red</option>
              <option value="yellow">Yellow</option>
              <option value="green">Green</option>
            </select>
          </div>

          <button
            onClick={sendEvent}
            disabled={isSubmitting}
            style={{ width: "100%", backgroundColor: "#3B82F6", color: "white", padding: "0.5rem", borderRadius: "0.375rem", fontWeight: "medium", transition: "background-color 0.2s" }}
          >
            {isSubmitting ? "Sending..." : "Send Event"}
          </button>

          {response && (
            <pre style={{ backgroundColor: "#F3F4F6", padding: "0.75rem", borderRadius: "0.375rem", fontSize: "0.875rem", overflowX: "auto", marginTop: "1rem" }}>
              {response}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}