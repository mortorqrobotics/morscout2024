import React from "react";
import "./matchButton.css";

const MatchButton = ({ teamNums }) => {
  return (
    <div>
      <h2 className="match-heading">
        Match 1
      </h2>
      <hr />  
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

export default MatchButton;
