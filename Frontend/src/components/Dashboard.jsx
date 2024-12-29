import React, { useState } from "react";

function Dashboard() {
  const [value, setvalue] = useState(50);
  const handleRangeChange = (e) => {
    setvalue(Number(e.target.value));
  };
  const showToastCompletion = () => {
    alert("your course completed");
  };

  if (value == 100) {
    showToastCompletion();
  }
  return (
    <>
      <div className="sm:h-[300px] sm:w-[300px] lg:h-[400px] lg:w-[400px]  border-[2px] shadow-lg">
        <img
          src="src\components\image\logo2.jpg"
          alt="boy image"
          className="w-full"
        />
        <div className="h-[3rem] bg-gray-700 flex rounded-b-lg ">
          <input
            className="w-full"
            min="0"
            max="100"
            value={value}
            onChange={handleRangeChange}
            type="range"
            name=""
            id=""
          />
        </div>
        <p className="text-center">{value}% Completed</p>
      </div>
    </>
  );
}

export default Dashboard;
