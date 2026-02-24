import { useQuery } from "@tanstack/react-query";
import { fetchJSON } from "../api/apiClient";

export interface EquipmentState {
  equipmentId: string;
  state: "red" | "yellow" | "green";
  lastChangedAt: string;
}

export function useEquipmentState() {
  return useQuery<EquipmentState[]>({
    queryKey: ["states"],
    queryFn: () => fetchJSON("/api/state"),
    staleTime: 10_000,
  });
}