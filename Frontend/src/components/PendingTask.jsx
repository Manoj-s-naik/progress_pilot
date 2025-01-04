import React, { useState, useEffect } from "react";
import Loading from "./Loading";

function PendingTask() {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingTasks = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/tasks?status=pending"
      );
      if (response.ok) {
        const data = await response.json();
        setPendingTasks(data.tasks);
        setLoading(false);
      } else {
        console.error("Failed to fetch pending tasks");
      }
    } catch (error) {
      console.error("Error fetching pending tasks:", error);
    }
  };

  useEffect(() => {
    fetchPendingTasks();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ol>
          {pendingTasks.map((task) => (
            <li key={task._id}>{task.taskName}</li>
          ))}
        </ol>
      )}
    </>
  );
}

export default PendingTask;
