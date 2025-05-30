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
      const response = await fetch("http://localhost:3000/api/task/pending", {
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
      console.log("data pending", data.tasks);
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
        `http://localhost:3000/api/task/${taskId}/status`,
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
              ? {
                  ...task,
                  status: newStatus,
                  pendingHidden: newStatus === "completed",
                }
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
    <>
    <div>
      {tasks.length === 0 ?(<p className="ml-8 mt-6 text-gray-500">No task found</p>):(
      <div>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div>
              <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">
                Pending tasks
              </h1>
            </div>
            <table className="ml-8 mt-6 overflow-x-auto w-full">
              <thead className="min-w-full border border-gray-300 text-sm text-left">
                <tr>
                  <th className="px-4 py-2 border">Sl no</th>
                  <th className="px-4 py-2 border">Task Name</th>
                  <th className="px-4 py-2 border">Project Name</th>
                  <th className="px-4 py-2 border">Task Assigned By</th>
                  <th className="px-4 py-2 border">Task Assigned Date</th>
                  <th className="px-4 py-2 border">Deadline</th>
                  <th className="px-4 py-2 border">Update Issue</th>
                  <th className="px-4 py-2 border">Pending</th>
                  <th className="px-4 py-2 border">Completed</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={task._id}>
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{task.projectName}</td>
                    <td className="px-4 py-2 border">{task.taskName}</td>
                    <td className="px-4 py-2 border">{task.assignedBy}</td>
                    <td className="px-4 py-2 border">
                      {new Date(task.assignedDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border">
                      {new Date(task.deadLine).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border text-center">issue </td>
                    <td className="px-4 py-2 border text-center">
                      {!task.pendingHidden && (
                        <img
                          src={pendingSign}
                          alt="Pending Task"
                          className="h-[1rem] cursor-default inline-block"
                        />
                      )}
                    </td>

                    {/* Completed icon – always shown */}
                    <td className="px-4 py-2 border text-center">
                      <img
                        src={completeSign}
                        alt="Complete Task"
                        className="h-[1rem] cursor-pointer inline-block"
                        onClick={() => updateTaskStatus(task._id, "completed")}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      ) }
    </div>

    </>
  );
}

export default PendingTask;
