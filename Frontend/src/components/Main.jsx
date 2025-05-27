import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
// import AddTask from "./AddTask";
import AssignedTask from "./AssignedTask";
import CompletedTask from "./CompletedTask";
import PersonalTask from "./AssignedTask";
import PendingTask from "./PendingTask";

function Main() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/assignedTaks" element={<AssignedTask />} />
      <Route path="/personalTaks" element={< PersonalTask/>} />
      <Route path="/pendingTask" element={<PendingTask />} />
      <Route path="/completedTask" element={<CompletedTask />} />
    </Routes>
  );
}

export default Main;
