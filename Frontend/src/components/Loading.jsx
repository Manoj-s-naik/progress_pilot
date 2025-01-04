import React from "react";
import "../main.css";
function Loading() {
  return (
    <>
      <div className="flex justify-center items-center h-[calc(100vh-7rem)]">
        <div className="spinner "></div>
      </div>
    </>
  );
}

export default Loading;
