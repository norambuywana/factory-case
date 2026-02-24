import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SendEventPage from "./pages/SendEventPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EquipmentHistoryPage from "./pages/EventHistoryPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/send" element={<SendEventPage />} />
          <Route path="/equipment/:id" element={<EquipmentHistoryPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}