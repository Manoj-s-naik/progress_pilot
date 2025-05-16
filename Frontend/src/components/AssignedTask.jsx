import React from "react";

function AssignedTask() {
  return (
    <>
      <div className="fixed flex items-center justify-center w-full h-[2rem] bg-blue-600">
        <div>Target Task</div>
      </div>
      <div className="overflow-auto">
        <ul className="mt-7">
          <div className="flex gap-6">
            <li className="py-3">Task 1</li>
            <button>update Progress</button>
          </div>
          <li>Task 1</li>
          <li>Task 1</li>
          <li>Task 1</li>
          <li>Task 1</li>
          <li>Task 1</li>
          <li>Task 1</li>
          <li>Task 1</li>
          <li>Task 1</li>
          <li>Task 1</li>
        </ul>
      </div>
    </>
  );
}

export default AssignedTask;
