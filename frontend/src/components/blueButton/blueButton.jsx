import React from "react";
import "./blueButton.css";

const BlueButton = ({ teamNums }) => {
  return (
    <div>
      <div className="line">
        {teamNums.slice(0, 3).map((num, index) => (
          <button key={index} className="blueButton">{num}</button>
        ))}
      </div>
      <div className="line">
        {teamNums.slice(3).map((num, index) => (
          <button key={index + 3} className="redButton">{num}</button>
        ))}
      </div>
    </div>
  );
};

export default BlueButton;
