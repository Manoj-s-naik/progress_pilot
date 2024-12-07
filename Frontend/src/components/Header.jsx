import React, { useState } from "react";
import logo from "./image/logo.jpeg";
import { CircleUserRound } from "lucide-react";
import { ArrowLeft } from "lucide-react";
function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const profilePopUpHandler = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div>
      <header className="h-[7rem] fixed top-0 left-0 right-0 z-10 flex items-center px-4 bg-white shadow">
        <div className="w-[7rem] flex items-center">
          <img src={logo} alt="logo" className="rounded-full" />
        </div>
        <div className="ml-auto pr-4">
          <CircleUserRound
            onClick={profilePopUpHandler}
            size={48}
            strokeWidth={0.5}
          />
        </div>
      </header>

      {isSidebarOpen && (
        <div>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={profilePopUpHandler}
          />
          <div className="fixed top-0 right-0 sm:w-[24rem] lg:w-[32rem] h-full bg-gray-800 text-white z-50 transition-transform transform">
            <div className="p-4">
              <div className="flex items-center gap-3">
                <ArrowLeft
                  size={48}
                  strokeWidth={1.25}
                  onClick={profilePopUpHandler}
                />
                <h2 className="text-2xl font-bold ">Profile</h2>
              </div>

              <div className="flex flex-col items-center justify-center gap-[3rem]">
                <img
                  className="rounded-full h-[8rem] mt-7"
                  src={logo}
                  alt="user image"
                />
                <h4>Manoj s naik</h4>
                <div>To be became unreplaceable</div>
                <h3>Score :100%</h3>
                <button className="bg-blue-600 p-2 w-[6rem] rounded-lg">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
