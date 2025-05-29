import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

function Dashboard() {
  const { progressScore, setprogressScore } = useAuth();

  const progressScorePercentageHandler = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/task/completionPercentage",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      setprogressScore(data.percentage);
    } catch (error) {
      console.log("error while fetching progress score");
    }
  };

  const handleRangeChange = (e) => {
    setprogressScore(Number(e.target.value));
  };

  useEffect(() => {
    progressScorePercentageHandler();
  }, []);

  return (
    <>
      <div className="flex h-full  items-center justify-center">
        <div className="sm:h-[300px] sm:w-[300px] lg:h-[400px] lg:w-[400px]  border-[2px] shadow-lg ">
          <img
            src="src/components/image/logo2.jpg"
            alt="boy image"
            className="w-full"
          />
          <div className="h-[3rem] bg-gray-700 flex rounded-b-lg ">
            <input
              className="w-full"
              min="0"
              max="100"
              value={progressScore ?? 0}
              onChange={handleRangeChange}
              type="range"
              name=""
              id=""
            />
          </div>
          <p className="text-center lg:text-lg">{progressScore}% Completed</p>
          {progressScore === 100 && (
            <h1 className="absolute top-[3rem] left-1/2 transform -translate-x-1/2 text-xl font-bold text-green-600">
              You’re unstoppable! Keep chasing those big dreams!
            </h1>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
