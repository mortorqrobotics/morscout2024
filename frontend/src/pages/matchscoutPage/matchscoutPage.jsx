import React from "react";
import "./matchscoutPage.css";
import Header from "../../components/header/header";
import MatchButton from "../../components/matchButton/matchButton";
import { useState, useEffect } from "react";
import { getEventMatches } from "../../../api/tba";
const MatchscoutPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    getEventMatches()
      .then((data) => setTeams(data))
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [setLoading]);
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
        <MatchButton
          teamNums={[1515, 4414, 908, 1515, 1515, 1515]}
        ></MatchButton>
        <MatchButton
          teamNums={[1515, 4414, 908, 1515, 1515, 1515]}
        ></MatchButton>
        <MatchButton
          teamNums={[1515, 4414, 908, 1515, 1515, 1515]}
        ></MatchButton>
      </div>
    </div>
  );
};

export default MatchscoutPage;
