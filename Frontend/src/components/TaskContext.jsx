import React, { useContext } from "react";
import { useState, createContext } from "react";
import { format } from "date-fns";
const TaskContext = createContext();
export function UseTask() {
  return useContext(TaskContext);
}

function TaskWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState("");
  const fetchTasks = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:3000/tasks");
    const data = await response.json();
    console.log("data from taskcontext",data);
    
    if (data.status === "success") {
      setTasks(data.allTask);
    }
    setLoading(false);
    return data;
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
