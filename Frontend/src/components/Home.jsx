import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Main from "./Main";
import { useAuth } from "./AuthContext";

function Home() {
  const { progressScore } = useAuth();
  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <Header />

      <div className="flex flex-1 pt-[7rem]">
        {/* Fixed Navigation */}
        <Nav />

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center relative">
          <Main />
          {progressScore === 100 && (
          <h1 className="absolute top-[3rem] left-1/2 transform -translate-x-1/2 text-xl font-bold text-green-600">
               You’re unstoppable! Keep chasing those big dreams!
            </h1>

         )}
        </div>
      </div>
    </div>
  );
}

export default Home;
