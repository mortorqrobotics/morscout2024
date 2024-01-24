import React from "react";
import "./matchscoutPage.css";
import Header from "../../components/header/header";
import BlueButton from "../../components/blueButton/blueButton";

const MatchscoutPage = () => {
  return (
    <div>
      <Header
        toWhere="/"
        headerText={
          <>
            <span style={{ color: "#FF7F23" }}>Match </span>
            <span style={{ color: "#FFFFFF" }}>Scout</span>
          </>
        }
      />
      <div className="line">
        <BlueButton teamNums={[1515,4414,908,1515,1515,1515]}></BlueButton>
      </div>
    </div>
  );
};

export default MatchscoutPage;
