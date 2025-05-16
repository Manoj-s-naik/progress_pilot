
import React, { useContext, useState, createContext } from "react";
import { format } from "date-fns";

const TaskContext = createContext();
export function UseTask() {
  return useContext(TaskContext);
}

function TaskWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/task/loggedInUsertasks",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Server error:", response.status);
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (data.tasks.length === 0) {
        console.warn("no task found");
        setTasks([]);
      }
      if (data.status === "success") {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
    setLoading(false);
  };

  return (
    <TaskContext.Provider
      value={{
        loading,
        setLoading,
        task,
        setTask,
        tasks,
        setTasks,
        fetchTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskWrapper;
