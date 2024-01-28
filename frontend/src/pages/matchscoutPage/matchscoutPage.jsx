import React, { useState, useEffect } from "react";
import "./matchscoutPage.css";
import Header from "../../components/header/header";
import MatchButton from "../../components/matchButton/matchButton";
import { getEventMatches } from "../../../api/tba";

const MatchscoutPage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getEventMatches()
      .then((data) => {
        const sortedMatches = data
          .filter((match) => match.compLevel === "qm")
          .sort((a, b) => a.matchNum - b.matchNum);

        setMatches(sortedMatches);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []); // Remove setLoading from the dependency array

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
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>{error.message}</h1>
        ) : matches.length > 0 ? (
          matches.map((match) => (
            <MatchButton
              key={match.matchNum}
              matchNum={`Match ${match.matchNum}`}
              teamNums={[
                ...match.red_team.map((team) => team.substring(3)),
                ...match.blue_team.map((team) => team.substring(3)),
              ]}
            />
          ))
        ) : null}
      </div>
    </div>
  );
};

export default MatchscoutPage;
