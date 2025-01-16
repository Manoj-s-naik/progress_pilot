import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { UseTask } from "./TaskContext";

function AddTask() {
  const { loading, setLoading, task, setTask, tasks, fetchTasks } = UseTask();
  const [inputValue, setInputValue] = useState("");

  const addTaskHandler = async () => {
    if (inputValue.trim().length === 0) {
      alert("Task cannot be empty");
      return;
    }

    const response = await fetch("http://localhost:3000/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskName: inputValue }),
    });

    if (response.ok) {
      setLoading(true);
      const data = await response.json();
      console.log("data from add task", data);

      setTask(inputValue);
      setInputValue("");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <div className=" flex justify-center items-center gap-5  ml-8">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          placeholder="Enter a task"
          className="text-center focus:outline-none border-b-2 w-[400px] h-[4rem]"
        />
        <button
          className="bg-gray-800 rounded-lg p-4 text-white"
          onClick={addTaskHandler}
        >
          Add Task
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="pt-4">
          {tasks.length > 0 ? (
            <ul className="">
              {tasks.map((task) => (
                <li
                  key={task._id}
                  className="flex justify-between items-center text-gray-800 ml-[1rem] w-[550px] px-4 py-2"
                >
                  <span>{task.taskName}</span>
                  <p className=" px-2 py-1 rounded">
                    {new Date(task.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="flex items-center justify-center h-[563px]">
              No tasks available!
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default AddTask;
