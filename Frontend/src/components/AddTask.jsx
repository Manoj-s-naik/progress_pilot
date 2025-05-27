


// import React, { useState, useEffect } from "react";
// import Loading from "./Loading";
// import { UseTask } from "./TaskContext";

// function AddTask() {
//   const { loading, setLoading, task, setTask, tasks, fetchTasks } = UseTask();
//   const [inputValue, setInputValue] = useState("");
//   const [taskGroups, setTaskGroups] = useState([]); // State to store tasks grouped by day

//   const addTaskHandler = async () => {
//     if (inputValue.trim().length === 0) {
//       alert("Task cannot be empty");
//       return;
//     }

//     const response = await fetch("http://localhost:3000/api/task", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials : "include",
//       body: JSON.stringify({ taskName: inputValue }),
//     });

//     if (response.ok) {
//       setLoading(true);
//       const data = await response.json();
//       console.log("data from add task", data);

//       setTask(inputValue);
//       setInputValue("");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks(); // Fetch tasks on component mount
//   }, []);

//   useEffect(() => {
//     // Group tasks by the day they were created
//     const groupedTasks = tasks.reduce((acc, task) => {
//       const date = new Date(task.createdAt);
//       const dayKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

//       if (!acc[dayKey]) {
//         acc[dayKey] = [];
//       }

//       acc[dayKey].push(task);
//       return acc;
//     }, {});

//     // Convert grouped tasks into an array and sort by date (descending order)
//     const sortedGroups = Object.keys(groupedTasks)
//       .sort((a, b) => new Date(b) - new Date(a)) // Sort by date in descending order
//       .map((day) => ({
//         day,
//         tasks: groupedTasks[day],
//       }));

//     setTaskGroups(sortedGroups); // Update state with sorted task groups
//   }, [tasks]);

//   return (
//     <>
//       <div className="flex justify-center items-center gap-5 ml-8">
//         {/* Auto-growing input field */}
//         <textarea
//           value={inputValue}
//           onChange={(e) => {
//             setInputValue(e.target.value);
//             e.target.style.height = "auto"; // Reset height to recalculate
//             e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height dynamically
//           }}
//           placeholder="Enter a task"
//           className="text-center focus:outline-none border-b-2 w-[400px] min-h-[4rem] max-h-[10rem] overflow-y-auto resize-none p-2 rounded-md"
//         ></textarea>

//         <button
//           className="bg-gray-800 rounded-lg p-4 text-white"
//           onClick={addTaskHandler}
//         >
//           Add Task
//         </button>
//       </div>

//       {loading ? (
//         <Loading />
//       ) : (
//         <div className="pt-4">
//           {taskGroups.length > 0 ? (
//             taskGroups.map((group) => (
//               <div key={group.day} className="mb-4">
//                 <h2 className="font-bold text-xl text-gray-800 mb-2">
//                   Tasks for {new Date(group.day).toLocaleDateString()}
//                 </h2>
//                 <div className="flex flex-wrap gap-4">
//                   <div
//                     className="w-full p-4 border border-gray-300 rounded-lg"
//                     style={{ backgroundColor: "#f7fafc" }}
//                   >
//                     {group.tasks.map((task) => (
//                       <div
//                         key={task._id}
//                         className="flex justify-between items-center text-gray-800 mb-2"
//                       >
//                         <span>{task.taskName}</span>
//                         <p className="px-2 py-1 rounded text-sm text-gray-600">
//                           {new Date(task.createdAt).toLocaleString()}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="flex items-center justify-center h-[563px]">
//               No tasks available!
//             </p>
//           )}
//         </div>
//       )}
//     </>
//   );
// }

// export default AddTask;
