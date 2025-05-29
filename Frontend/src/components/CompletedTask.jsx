import React, { useEffect, useState } from "react";
import { UseTask } from "./TaskContext";
import Loading from "./Loading";

function CompletedTask() {
  const { loading, setLoading } = UseTask();
  const [task, setTask] = useState([]);
  const fetchCompletedTaskHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/task/completed", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      console.log("data from completedtask page", data.tasks);

      setTask(data.tasks);
    } catch (error) {
      console.log("error fetching task", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCompletedTaskHandler();
  }, []);
  return (
    <>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div className="flex">
            {task.length === 0 ? (
              <p className="ml-8 mt-6 text-gray-500">
                No completed tasks found.
              </p>
            ) : (
              <div className="ml-8 mt-6 overflow-x-auto w-full">
                <table className="min-w-full border border-gray-300 text-sm text-left">
                  <thead className="bg-gray-100 text-gray-700 uppercase">
                    <tr>
                      <th className="px-4 py-2 border">Sl No</th>
                      <th className="px-4 py-2 border">Project Name</th>
                      <th className="px-4 py-2 border">Task Name</th>
                      <th className="px-4 py-2 border">Task Assigned By</th>
                      <th className="px-4 py-2 border">Task Assigned Date</th>
                      <th className="px-4 py-2 border">Deadline</th>
                      <th className="px-4 py-2 border">Completed Date</th>
                      <th className="px-4 py-2 border">Time Taken</th>
                    </tr>
                  </thead>
                  <tbody>
                    {task.map((task, index) => (
                      <tr key={task._id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{index + 1}</td>
                        <td className="px-4 py-2 border">{task.projectName}</td>
                        <td className="px-4 py-2 border">{task.taskName}</td>
                        <td className="px-4 py-2 border">{task.assignedBy}</td>
                        <td className="px-4 py-2 border">
                          {new Date(task.assignedDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 border">
                          {new Date(task.deadLine).toLocaleDateString() ||
                            "N/A"}
                        </td>
                        <td className="px-4 py-2 border">
                          {task.completedAt || "null"}
                        </td>
                        <td className="px-4 py-2 border">
                          {task.timeTaken || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default CompletedTask;
