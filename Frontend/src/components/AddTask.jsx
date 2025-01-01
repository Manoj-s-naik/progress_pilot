// import React, { useState } from "react";

// function AddTask() {
//   const [inputValue, setinputValue] = useState(""); // State for input value
//   const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array

//   const addTaskHandler = () => {
//     if (!inputValue.trim()) {
//       alert("Please enter a task");
//       return;
//     }
//     setTasks([...tasks, inputValue]); // Add the new task to the array
//     setinputValue(""); // Clear the input after adding the task
//   };

//   return (
//     <>
//       <div className="flex justify-center gap-6 pt-[5rem]">
//         <input
//           type="text"
//           onChange={(e) => setinputValue(e.target.value)}
//           value={inputValue}
//           placeholder="Add your task here"
//           className="w-[19rem] border-b-2 border-gray-700 text-center focus:outline-none"
//         />
//         <button
//           className="bg-gray-700 p-2 rounded-lg text-white"
//           onClick={addTaskHandler}
//         >
//           AddTask
//         </button>
//       </div>
//       <div className="pt-7">
//         {/* <ol className="list-decimal">
//           {tasks.map((task, index) => (
//             <li key={index} className="text-gray-800 ml-[4rem]">
//               {task}
//             </li>
//           ))}
//         </ol> */}
//         <div>
//           <ol>
//             <div className="flex h-[3rem]">
//               <li className="flex items-center">Watch freecodecamp vedios</li>
//               <img
//                 src="src\components\image\completeSign1.jpeg"
//                 alt="complete sign"
//               />
//             </div>
//             <div className="flex gap-3 h-8 items-center ">
//             <button className="bg-green-700 p-2">completed</button>
//             <button className="bg-red-700 p-2">pending</button>
//             </div>
//             {/* <li>Watch Algoprep class</li>
//             <li>Make contribution of project</li> */}
//           </ol>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AddTask;
import React, { useState } from "react";


function AddTask() {
  const [inputValue, setinputValue] = useState(""); // State for input value
  const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array

  const addTaskHandler = () => {
    if (!inputValue.trim()) {
      alert("Please enter a task");
      return;
    }
    setTasks([...tasks, { name: inputValue, status: "pending", buttonsVisible: true }]); // Add the new task with 'pending' status and buttons visible
    setinputValue(""); // Clear the input after adding the task
  };

  // Function to toggle task status between 'completed' and 'pending'
  const completeTaskHandler = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = "completed";
    updatedTasks[index].buttonsVisible = false; // Hide the buttons when completed
    setTasks(updatedTasks);
  };

  return (
    <>
      <div className="flex justify-center gap-6 pt-[5rem]">
        <input
          type="text"
          onChange={(e) => setinputValue(e.target.value)}
          value={inputValue}
          placeholder="Add your task here"
          className="w-[19rem] border-b-2 border-gray-700 text-center focus:outline-none"
        />
        <button
          className="bg-gray-700 p-2 rounded-lg text-white"
          onClick={addTaskHandler}
        >
          AddTask
        </button>
      </div>

      <div className="pt-7 pl-4">
        <ol className="list-decimal">
          {tasks.map((task, index) => (
            <li key={index} className="flex items-center gap-4 mb-4">
              <div className="flex-1">{task.name}</div>
              
              {/* Conditional Rendering for Images */}
              <img
                src={task.status === "completed" ? "src\\components\\image\\completSign.jpeg" : "src\\components\\image\\pendingSign.jpeg"}
                alt={task.status === "completed" ? "Complete Sign" : "Pending Sign"}
                className="h-6 w-6"
              />
              
              {/* Hide buttons when task is completed */}
              {task.buttonsVisible && (
                <div className="flex gap-3">
                  <button
                    className="bg-green-700 p-2"
                    onClick={() => completeTaskHandler(index)}
                  >
                    Completed
                  </button>
                  <button
                    className="bg-red-700 p-2"
                  >
                    Pending
                  </button>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default AddTask;
