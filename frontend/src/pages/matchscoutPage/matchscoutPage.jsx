import React from "react";
import Header from "../../components/header/header";

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
    </div>
  );
};

export default MatchscoutPage;
