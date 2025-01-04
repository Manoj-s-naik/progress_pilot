import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Main from "./Main";
import { useAuth } from "./AuthContext";

function Home() {
  const { progressScore } = useAuth();
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 pt-[7rem]">
        <Nav />
        {/* Main Content */}
        <div className="flex-1 relative">
          <Main />
        </div>
      </div>
    </div>
  );
}

export default Home;
