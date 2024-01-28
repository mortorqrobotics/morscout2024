import React from "react";
import DefaultBtn from "../../components/defaultBtn/defaultBtn";
import "./selectFormPage.css"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const SelectFormPage = () => {
    let { teamNumber } = useParams();
  return (
    <div className="btnAlign">
        
      <Link to={`/matchscout-team-form/${teamNumber}/auto`}>
        <DefaultBtn backgroundColor="#FF640C" text="Auto" />
      </Link>
      <Link to={`/matchscout-team-form/${teamNumber}/teleop`}>
        <DefaultBtn backgroundColor="#FF640C" text="Teleop" />
      </Link>
    </div>
  );
};

export default SelectFormPage;
