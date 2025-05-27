import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="w-[9rem] bg-gray-700 flex flex-col justify-evenly items-center h-full">
      <Link to="/" className="text-white">
        Dashboard
      </Link>
      <Link to="/assignedTaks" className="text-white">
        Assined Task
      </Link>
      <Link to="/pendingTask" className="text-white">
        Pending Task
      </Link>
      <Link to="/completedTask" className="text-white">
        Completed Task
      </Link>
    </nav>
  );
}

export default Nav;
