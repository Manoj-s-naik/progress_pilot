import React from "react";
import logo from "./image/logo.jpeg";
import { CircleUserRound } from "lucide-react";

function Header() {
  return (
    <header className="h-[7rem] fixed top-0 left-0 right-0 z-10 flex items-center px-4 bg-white shadow">
      <div className="w-[7rem] flex items-center">
        <img src={logo} alt="logo" className="rounded-full" />
      </div>
      <div className="ml-auto pr-4">
        <CircleUserRound size={48} strokeWidth={0.5} />
      </div>
    </header>
  );
}

export default Header;
