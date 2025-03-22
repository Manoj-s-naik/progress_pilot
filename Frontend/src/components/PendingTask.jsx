
import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { UseTask } from "./TaskContext";
import { Link } from "react-router-dom";
import pendingSign from "./image/pendingSign.jpeg";
import completeSign from "./image/completSign.jpeg";

function PendingTask() {
  const [tasks, setTasks] = useState([]);
  const { loading, setLoading } = UseTask();

  // Fetch Pending Tasks
  const fetchPendingTasksHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/tasks/pending", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status === 404) {
        console.warn("No pending tasks found.");
        setTasks([]);
        return;
      }
      if (!response.ok) throw new Error("Failed to fetch tasks.");

      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update Task Status
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:3000/tasks/${taskId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId
              ? { ...task, status: newStatus, pendingHidden: newStatus === "completed" }
              : task
          )
        );
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating task:", error.message);
      alert("Failed to update the task status. Please try again.");
    }
  };

  useEffect(() => {
    fetchPendingTasksHandler();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {tasks.length > 0 ? (
            <ul>
              {tasks.map((task) => (
                <div
                  className="flex items-center justify-between"
                  key={task._id}
                >
                  <Link
                    to={`/tasks/${task._id}`}
                    className="flex-grow ml-7 pt-2 py-3"
                  >
                    {task.taskName}
                  </Link>
                  <div className="flex gap-4 ml-auto mr-5">
                    {/* Show Pending Sign initially and hide it when marked completed */}
                    {!task.pendingHidden && (
                      <img
                        src={pendingSign}
                        alt="Pending Task"
                        className="h-[1rem] cursor-pointer"
                      />
                    )}

                    {/* Always show Completed Sign */}
                    <img
                      src={completeSign}
                      alt="Complete Task"
                      className="h-[1rem] cursor-pointer"
                      onClick={() => updateTaskStatus(task._id, "completed")}
                    />
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <p className="text-center mt-6">No tasks available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default PendingTask;
