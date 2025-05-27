import React, { useEffect, useState } from "react";
import Loading from "./Loading";

function AssignedTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState();

  const assignedTaskFetcher = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/task/loggedInUsertasks",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.log("Error while fetching tasks:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    assignedTaskFetcher();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
            Assigned Tasks
          </h2>

          {tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks found</p>
          ) : (
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="py-2 px-4 border">Sl. No</th>
                    <th className="py-2 px-4 border">Task Name</th>
                    <th className="py-2 px-4 border">Assigned By</th>
                    <th className="py-2 px-4 border">Assigned Date</th>
                    <th className="py-2 px-4 border">Deadline</th>
                    <th className="py-2 px-4 border">Priority</th>
                    <th className="py-2 px-4 border">Project</th>
                    <th className="py-2 px-4 border">Resources</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr
                      key={index}
                      className="text-center hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-2 px-4 border">{index + 1}</td>
                      <td className="py-2 px-4 border">{task.taskName}</td>
                      <td className="py-2 px-4 border">{task.assignedBy}</td>
                      <td className="py-2 px-4 border">
                        {new Date(task.assignedDate).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border">
                        {new Date(task.deadLine).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border capitalize">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${
                            task.priorityLevel === "easy"
                              ? "bg-green-100 text-green-700"
                              : task.priorityLevel === "medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {task.priorityLevel}
                        </span>
                      </td>
                      <td className="py-2 px-4 border">{task.projectName}</td>
                      <td className="py-2 px-4 border">
                        <a
                          href={`http://localhost:3000/${task.resources}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </a>
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
  );
}

export default AssignedTask;
