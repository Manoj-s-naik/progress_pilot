import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import AddTask from "./AddTask";
import CompletedTask from "./CompletedTask";
import PersonalTask from "./AssignedTask";
import PendingTask from "./PendingTask";

function Main() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/personalTaks" element={< PersonalTask/>} />
      <Route path="/pendingTask" element={<PendingTask />} />
      <Route path="/completedTask" element={<CompletedTask />} />
      <Route path="/addTask" element={<AddTask />} />
    </Routes>
  );
}

export default Main;
