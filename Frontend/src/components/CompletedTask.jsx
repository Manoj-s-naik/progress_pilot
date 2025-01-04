import React, { useState, useEffect } from "react";
import Loading from "./Loading";

function completedTask() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCompletedTasks = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/tasks?status=completed"
      );
      if (response.ok) {
        const data = await response.json();
        setCompletedTasks(data.tasks);
        setLoading(false);
      } else {
        console.error("Failed to fetch pending tasks");
      }
    } catch (error) {
      console.error("Error fetching pending tasks:", error);
    }
  };

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ol>
          {completedTasks.map((task) => (
            <li key={task._id}>{task.taskName}</li>
          ))}
        </ol>
      )}
    </>
  );
}

export default completedTask;
