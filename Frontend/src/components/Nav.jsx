import React from "react";

function Nav() {
  return (
    <nav className="w-[9rem] bg-gray-700 flex flex-col justify-evenly items-center">
      <div className="text-white">Notifications</div>
      <div className="text-white">History</div>
      <div className="text-white">Profile</div>
    </nav>
  );
}

export default Nav;
