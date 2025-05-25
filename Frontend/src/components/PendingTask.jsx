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
    // <div>
    //   {loading ? (
    //     <Loading />
    //   ) : (
    //     <div>
    //       {tasks.length > 0 ? (
    //         <ul>
    //           {tasks.map((task) => (
    //             <li
    //               className="flex items-center justify-between"
    //               key={task._id}
    //             >
    //               <Link
    //                 to={`/tasks/${task._id}`}
    //                 className="flex-grow ml-7 pt-2 py-3"
    //               >
    //                 {task.taskName}
    //               </Link>
    //               <div className="flex gap-4 ml-auto mr-5">
    //                 {/* Show Pending Sign initially and hide it when marked completed */}
    //                 {!task.pendingHidden && (
    //                   <img
    //                     src={pendingSign}
    //                     alt="Pending Task"
    //                     className="h-[1rem] cursor-pointer"
    //                   />
    //                 )}

    //                 {/* Always show Completed Sign */}
    //                 <img
    //                   src={completeSign}
    //                   alt="Complete Task"
    //                   className="h-[1rem] cursor-pointer"
    //                   onClick={() => updateTaskStatus(task._id, "completed")}
    //                 />
    //               </div>
    //             </li>
    //           ))}
    //         </ul>
    //       ) : (
    //         <p className="text-center mt-6">No tasks available.</p>
    //       )}
    //     </div>
    //   )}
    // </div>

    <div>
      {loading ? (
        <Loading />
      ) : (
        <table className="ml-8 mt-6 overflow-x-auto w-full">
          <thead className="min-w-full border border-gray-300 text-sm text-left">
            <tr>
              <th className="px-4 py-2 border">Sl no</th>
              <th className="px-4 py-2 border">Task Name</th>
              <th className="px-4 py-2 border">Task Assigned</th>
              <th className="px-4 py-2 border">Deadline</th>
              <th className="px-4 py-2 border">Pending</th>
              <th className="px-4 py-2 border">Completed</th>
              <th className="px-4 py-2 border">Update Issue</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id}>
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{task.taskName}</td>
                <td className="px-4 py-2 border">{task.deadLine}</td>
                <td className="px-4 py-2 border">
                  {task.assigned
                    ? new Date(task.assigned).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : "N/A"}
                </td>
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
                <td>issue </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PendingTask;
