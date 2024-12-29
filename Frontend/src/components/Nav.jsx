import React from "react";

function Nav() {
  return (
    <nav className="w-[9rem] bg-gray-700 flex flex-col justify-evenly items-center">
      <div className="text-white">Dashboard</div>
      <div className="text-white">Add Task</div>
      <div className="text-white">Pending Task</div>
      <div className="text-white">Completed Task</div>
    </nav>
  );
}

export default Nav;
