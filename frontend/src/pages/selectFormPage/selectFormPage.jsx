import React from "react";
import DefaultBtn from "../../components/defaultBtn/defaultBtn";
import "./selectFormPage.css"
import { Link } from "react-router-dom";
const SelectFormPage = ({num}) => {
  return (
    <div className="btnAlign">
        
      <Link to={`/matchscout-team-form/${num}/auto`}>
        <DefaultBtn backgroundColor="#FF640C" text="Auto" />
      </Link>
      <Link to={`/matchscout-team-form/${num}/teleop`}>
        <DefaultBtn backgroundColor="#FF640C" text="Teleop" />
      </Link>
    </div>
  );
};

export default SelectFormPage;
