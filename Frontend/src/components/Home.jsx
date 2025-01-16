import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Main from "./Main";

function Home() {
  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <Header />
      <div className="flex flex-1 pt-[7rem] overflow-hidden">
        {/* Fixed Nav */}
        <div className="w-[9rem] h-full sticky top-[7rem]">
          <Nav />
        </div>

        {/* Main Content*/}
        <div className="flex-1 overflow-y-auto relative">
          <Main />
        </div>
      </div>
    </div>
  );
}

export default Home;
