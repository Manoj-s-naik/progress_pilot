// import React from "react";
// import logo from "./image/logo.jpeg";
// import { CircleUserRound } from "lucide-react";
// import LeftSidebar from "./LeftSidebar";

// function Header() {
//   const profilePopUpHandler = ()=>{
//     <LeftSidebar />
//   }
//   return (
//     <header className="h-[7rem] fixed top-0 left-0 right-0 z-10 flex items-center px-4 bg-white shadow">
//       <div className="w-[7rem] flex items-center">
//         <img src={logo} alt="logo" className="rounded-full" />
//       </div>
//       <div className="ml-auto pr-4">
//         <CircleUserRound onClick={profilePopUpHandler} size={48} strokeWidth={0.5} />
//       </div>
//     </header>
//   );
// }

import React, { useState } from "react";
import logo from "./image/logo.jpeg";
import { CircleUserRound } from "lucide-react";

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
          <div className="fixed top-0 right-0 w-64 h-full bg-gray-800 text-white z-50 transition-transform transform">
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">Profile</h2>
              <ul>
                <li className="mb-2">Menu Item 1</li>
                <li className="mb-2">Menu Item 2</li>
                <li className="mb-2">Menu Item 3</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
