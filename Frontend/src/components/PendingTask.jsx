// import React, { useState, useEffect } from "react";
// import Loading from "./Loading";
// import { UseTask } from "./TaskContext";

// function PendingTask() {
//   const [tasks, setTasks] = useState("");
//   const { fetchTasks, loading, setLoading } = UseTask();

//   const updatePendingHandler = () => {
//     alert("clicked");
//   };

//   useEffect(() => {
//     const fetchTasks = async () => {
//       setLoading(true);
//       const response = await fetch("http://localhost:3000/tasks");
//       const data = await response.json();
//       if (data.status === "success") {
//         setTasks(data.allTask);
//       }
//       setLoading(false);
//     };

//     fetchTasks();
//   }, []);

//   return (
//     <div>
//       {loading ? (
//         <Loading />
//       ) : (
//         <div>
//           {tasks.length > 0 ? (
//             <ul>
//               {tasks.map((task) => (
//                 <div
//                   className="flex items-center justify-between"
//                   key={task._id}
//                 >
//                   <li className="flex-grow ml-7 pt-2 py-3">{task.taskName}</li>
//                   <div className="flex gap-2 ml-auto">
//                     <img
//                       src="src\components\image\pendingSign.jpeg"
//                       alt="Pending"
//                       className="h-[1rem]"
//                     />
//                     <img
//                       src="src\components\image\completSign.jpeg"
//                       alt="Complete"
//                       className="h-[1rem]"
//                       onClick={updatePendingHandler}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </ul>
//           ) : (
//             <p>No pending tasks available.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default PendingTask;
import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { UseTask } from "./TaskContext";
import { Link } from "react-router-dom";
import pendingSign from "./image/pendingSign.jpeg";
import completeSign from "./image/completSign.jpeg";

function PendingTask() {
  const [tasks, setTasks] = useState([]);
  const { fetchTasks, loading, setLoading } = UseTask();

  const fetchTasksHandler = async () => {
    setLoading(true);
    try {
      const data = await fetchTasks();
      setTasks(data.allTask);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      console.log(taskId, status);

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, status } : task
          )
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating task:", error.message);
      alert("Failed to update the task status. Please try again.");
    }
  };

  useEffect(() => {
    fetchTasksHandler();
  }, [setLoading]);

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
                  className="flex items-center justify-between "
                  key={task._id}
                >
                  <Link
                    to={`/tasks/${task._id}`}
                    className="flex-grow ml-7 pt-2 py-3"
                  >
                    {task.taskName}
                  </Link>
                  <div className="flex gap-4 ml-auto mr-5">
                    <img
                      src={pendingSign}
                      alt="Pending"
                      className="h-[1rem] cursor-pointer"
                      onClick={() => updateTaskStatus(task._id, "pending")}
                    />
                    <img
                      src={completeSign}
                      alt="Complete"
                      className="h-[1rem] cursor-pointer"
                      onClick={() => updateTaskStatus(task._id, "completed")}
                    />
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <p>No tasks available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default PendingTask;
