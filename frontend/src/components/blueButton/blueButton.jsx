import React from "react";
import "./blueButton.css";

const blueButton = (props) => {
  return (
    <div>
      <div className="line">
        <button className="blueButton">{props.teamNum}</button>
        <button className="blueButton">{props.teamNum}</button>
        <button className="blueButton">{props.teamNum}</button>
      </div>
      <div className="line">
        <button className="redButton">{props.teamNum}</button>
        <button className="redButton">{props.teamNum}</button>
        <button className="redButton">{props.teamNum}</button>
      </div>
    </div>
  );
};

export default blueButton;
