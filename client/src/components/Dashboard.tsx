import React from "react";
import { useEquipmentState } from "../hooks/useState";
import { useStateUpdates } from "../hooks/useStateUpdates";
import { StateCard } from "./StateCard";

export default function Dashboard() {
  const { data, refetch, isFetching } = useEquipmentState();

  useStateUpdates(refetch);

  return (
    <div style={{ padding: "2rem", backgroundColor: "#4094e9ff", minHeight: "100dvh", boxSizing: "border-box" }}>
      <h1 style={{ color: "#fff", fontWeight: "bold" }}>Equipment State Dashboard</h1>
      {isFetching && <p>Refreshing...</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
        {data?.map((s) => (
          <StateCard key={s.equipmentId} state={s} />
        ))}
      </div>
    </div>
  );
}