import React from "react";
import Header from "../../components/header/header";

const PitScoutTeamPage = () => {
  return (
    <div>
      <Header
        toWhere="/"
        headerText={
          <>
            <span style={{ color: "#FF7F23" }}>Pit </span>
            <span style={{ color: "#FFFFFF" }}>Scout</span>
          </>
        }
      />
    </div>
  );
};

export default PitScoutTeamPage;
