import React, { useState, useEffect } from "react";

function AssignedTask() {
  const [tasks, setTasks] = useState([]);

  // Dummy data
  useEffect(() => {
    const dummyTasks = [
      {
        id: 1,
        projectName: "Website Redesign",
        assignedBy: "Manager A",
        assignedDate: "2025-05-01",
        deadline: "2025-05-30",
        priority: "High",
        resources: "Figma, Trello, API Docs",
      },
      {
        id: 2,
        projectName: "Mobile App Testing",
        assignedBy: "Manager B",
        assignedDate: "2025-05-10",
        deadline: "2025-05-25",
        priority: "Medium",
        resources: "Test Cases, Device Farm",
      },
      {
        id: 3,
        projectName: "Backend API Integration",
        assignedBy: "Manager C",
        assignedDate: "2025-05-15",
        deadline: "2025-06-05",
        priority: "Critical",
        resources: "Postman, API Docs, MongoDB",
      },
    ];

    setTasks(dummyTasks);
  }, []);

  return (
    <>
      <div className="fixed flex items-center justify-center w-full h-[2.5rem] bg-blue-600 text-white text-lg font-semibold">
        Target Tasks
      </div>

      <div className="mt-[3rem] p-4 overflow-auto">
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="p-4 border rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-bold text-blue-700">{task.projectName}</h2>
              <p><strong>Assigned By:</strong> {task.assignedBy}</p>
              <p><strong>Assigned On:</strong> {task.assignedDate}</p>
              <p><strong>Deadline:</strong> {task.deadline}</p>
              <p><strong>Priority:</strong> <span className={`font-semibold ${task.priority === "High" ? "text-red-500" : task.priority === "Medium" ? "text-yellow-500" : "text-green-600"}`}>{task.priority}</span></p>
              <p><strong>Resources:</strong> {task.resources}</p>
              <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
                Update Progress
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AssignedTask;
