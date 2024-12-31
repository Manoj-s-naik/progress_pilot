import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import AddTask from "./AddTask";
import CompletedTask from "./CompletedTask";
import PendingTask from "./PendingTask";

function Main() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/addTask" element={<AddTask />} />
      <Route path="/pendingTask" element={<PendingTask />} />
      <Route path="/completedTask" element={<CompletedTask />} />
    </Routes>
  );
}

export default Main;
