import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchJSON } from "../api/apiClient";

interface EquipmentEvent {
  eventId: string;
  equipmentId: string;
  newState: "red" | "yellow" | "green";
  prevState?: string;
  timestampServer: string;
  timestampClient?: string;
}

export default function EquipmentHistoryPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery<EquipmentEvent[]>({
    queryKey: ["history", id],
    queryFn: () => fetchJSON(`/api/history/${id}`),
    enabled: !!id,
  });

  if (isLoading) return <div style={{ padding: "2rem" }}>Loading history...</div>;
  if (isError) return <div style={{ padding: "2rem", color: "red" }}>Error loading history</div>;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#4094e9ff", padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ffffff" }}>
          History for Equipment <span style={{ color: "darkblue" }}>{id}</span>
        </h1>
        <Link
          to="/"
          style={{ color: "lightblue", textDecoration: "underline", fontSize: "0.875rem", fontWeight: "500" }}
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div style={{ marginTop: "1rem" }}>
        {data?.length ? (
          data.map((event) => (
            <div
              key={event.eventId}
              style={{ backgroundColor: "white", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #eee", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontWeight: "500" }}>
                    {event.newState.toUpperCase()}{" "}
                    <span style={{ color: "grey" }}>
                      (from {event.prevState ?? "unknown"})
                    </span>
                  </p>
                </div>
                <p style={{ fontSize: "0.875rem", color: "grey" }}>
                  {new Date(event.timestampServer).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "grey", fontStyle: "italic" }}>No history found.</p>
        )}
      </div>
    </div>
  );
}