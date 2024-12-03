import React from "react";
import boy from "./image/boy.jpeg";
import girl from "./image/girl.jpeg";
import Header from "./Header";
import Nav from "./Nav";
import Card from "./Card";

function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 pt-[7rem]">
        <Nav />
        <main className="flex-1 border- p-4">
          <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#374151] mb-6">
            Progress Pilot
          </h1>
          <div className="flex items-center justify-center h-15 p-3">
            <h1 className="text-2xl">Score: 100</h1>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Card imgSrc={boy} buttonText="Add Task" altText="Add Task Image" />
            <Card
              imgSrc={girl}
              buttonText="View Pending"
              altText="View Pending Image"
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
