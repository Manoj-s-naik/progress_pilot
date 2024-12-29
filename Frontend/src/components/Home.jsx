import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Main from "./Main";

function Home() {
  return (
    // <div className="flex flex-col h-screen">
    //   <Header />
    //   <div className="flex flex-1 pt-[7rem]">
    //     <Nav />
    //     <Main className="flex justify-center items-center" />
    //   </div>
    // </div>
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 pt-[7rem]">
        <Nav />
        <div className="flex-1  flex items-center justify-center">
          <Main  />
        </div>
      </div>
    </div>
  );
}

export default Home;
