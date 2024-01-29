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
        setMatches(data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

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
          <div className="Matches">
            <p className="matchesTitleText">MATCHES</p>
            {matches.map((match, index) => (
              <div className="matchAndHeading" key={index}>
                <Heading>{`MATCH ${index + 1}`}</Heading>
                <MatchButton
                  teamNums={[
                    ...match.red_team.map((team) => team.substring(3)),
                    ...match.blue_team.map((team) => team.substring(3)),
                  ]}
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

// Assume Heading is a component you've defined elsewhere
const Heading = ({ children }) => <h2 className="match-heading">{children}</h2>;

export default MatchscoutPage;
