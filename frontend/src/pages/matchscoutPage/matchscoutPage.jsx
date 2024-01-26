import React from "react";
import "./matchscoutPage.css";
import Header from "../../components/header/header";
import MatchButton from "../../components/matchButton/matchButton";

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
      <div className="match-buttons">
        <MatchButton teamNums={[1515,4414,908,1515,1515,1515]}></MatchButton>
        <MatchButton teamNums={[1515,4414,908,1515,1515,1515]}></MatchButton>
        <MatchButton teamNums={[1515,4414,908,1515,1515,1515]}></MatchButton>
      </div>
    </div>
  );
};

export default MatchscoutPage;
