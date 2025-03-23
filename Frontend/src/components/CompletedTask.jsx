import React, { useEffect, useState } from "react";
import { UseTask } from "./TaskContext";
import Loading from "./Loading";

function CompletedTask() {
  const { loading, setLoading, fetchTasks } = UseTask();
  const [task, setTask] = useState([]);
  const fetchCompletedTaskHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/task/completed",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      
      // console.log(data.allTask);
      const data = await response.json();
      setTask(data.tasks);
      console.log("data from completed task", data);
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
              <ul className="ml-8 mt-6 ">
                {task.map((task) => (
                  <li className="gap-3" key={task._id}>
                    {task.taskName}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default CompletedTask;
