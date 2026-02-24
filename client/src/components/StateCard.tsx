import React from "react";
import type { EquipmentState } from "../hooks/useState";

export function StateCard({ state }: { state: EquipmentState }) {
    console.info(state);
    return (
        <div style={{ borderRadius: "1rem", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", padding: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#fff", border: "1px solid #eee" }}>
        <div>
            <h3 style={{ fontWeight: "600", fontSize: "1.25rem" }}>{state.equipmentId}</h3>
            <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
            Last changed by at {new Date(state.lastChangedAt).toLocaleTimeString()}
            </p>
        </div>
        <div style={{ width: "1.5rem", height: "1.5rem", borderRadius: "9999px", backgroundColor: state.state }} />
        </div>
    );
}