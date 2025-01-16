import React, { useState, useEffect } from "react";
import Loading from "./Loading";

function PendingTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const updatePendingHandler = () => {
    alert("clicked");
  };

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:3000/tasks");
      const data = await response.json();
      if (data.status === "success") {
        setTasks(data.allTask);
      }
      setLoading(false);
    };

    fetchTasks();
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
                  className="flex items-center justify-between"
                  key={task._id}
                >
                  <li className="flex-grow ml-7 pt-2 py-3">{task.taskName}</li>
                  <div className="flex gap-2 ml-auto">
                    <img
                      src="src\components\image\pendingSign.jpeg"
                      alt="Pending"
                      className="h-[1rem]"
                    />
                    <img
                      src="src\components\image\completSign.jpeg"
                      alt="Complete"
                      className="h-[1rem]"
                      onClick={updatePendingHandler}
                    />
                  </div>
                </div>
              ))}
            </ul>
          ) : (
            <p>No pending tasks available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default PendingTask;