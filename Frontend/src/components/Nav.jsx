import React from "react";

function Nav() {
  return (
    <nav className="w-[9rem] bg-gray-700 flex flex-col justify-evenly items-center">
      <a href="/add-task" className="text-white" title="Add a new task">
        Add Task
      </a>
      <a href="/pending-task" className="text-white" title="Add a new task">
        Pending Task
      </a>
      <a href="/completed-task" className="text-white" title="Add a new task">
        Completed Task
      </a>
    </nav>
  );
}

export default Nav;
