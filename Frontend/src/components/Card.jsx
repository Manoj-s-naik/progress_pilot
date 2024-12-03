import React from "react";

function Card({ imgSrc, buttonText, altText }) {
  return (
    <div className="w-full sm:w-[250px] md:w-[400px] h-[300px] sm:h-[350px] md:h-[400px] rounded-lg">
      <div>
        <img className="h-[352px] w-full" src={imgSrc} alt={altText} />
      </div>
      <button className="bg-gray-700 w-full p-3 text-white">{buttonText}</button>
    </div>
  );
}

export default Card;
