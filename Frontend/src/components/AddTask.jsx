import React, { useState, useEffect } from "react";
import Loading from "./Loading";

function AddTask() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/tasks");
        if (response.ok) {
          const data = await response.json();
          setTasks(data.tasks);
        } else {
          const error = await response.json();
          alert(error.message);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchTasks();
  }, []);

  const addTaskHandler = async () => {
    if (!inputValue.trim()) {
      alert("Please enter a task");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskName: inputValue }),
      });

      if (response.ok) {
        const data = await response.json();
        setTasks([...tasks, data.task]);
        setInputValue("");
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (err) {
      console.error("Error adding task:", err.message);
      alert("Failed to add task");
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : ( 
        <>
          <div className="flex justify-center gap-6 pt-[5rem]">
            <input
              type="text"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              placeholder="Add your task here"
              className="w-[19rem] border-b-2 border-gray-700 text-center focus:outline-none"
            />
            <button
              className="bg-gray-700 p-2 rounded-lg text-white"
              onClick={addTaskHandler}
            >
              Add Task
            </button>
          </div>
          <div className="pt-7">
            {tasks.length > 0 ? (
              <ol className="list-decimal">
                {tasks.map((task) => (
                  <li key={task._id} className="text-gray-800 ml-[4rem]">
                    {task.taskName}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-center text-gray-500">No tasks added yet!</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AddTask;
