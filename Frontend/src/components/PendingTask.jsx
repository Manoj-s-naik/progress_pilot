import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { UseTask } from "./TaskContext";
import { Link } from "react-router-dom";
import pendingSign from "./image/pendingSign.jpeg";
import completeSign from "./image/completSign.jpeg";

function PendingTask() {
  const [tasks, setTasks] = useState([]);
  const { fetchTasks, loading, setLoading } = UseTask();
  const [image,setImage]=useState(pendingSign);

  const fetchPendingTasksHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/tasks/pending");
      const data = await response.json();
      // console.log(data.tasks);
      setTasks(data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      const response = await fetch(
        `http://localhost:3000/tasks/${taskId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        // console.log("task status changed" + data.updatedTask.status);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, status } : task
          )
        )
        setImage("");
        ;
      } else {
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
                      src={image}
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
            <p className="text-center mt-6">No tasks available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default PendingTask;
