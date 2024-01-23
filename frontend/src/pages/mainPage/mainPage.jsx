import React from "react";
import DefaultBtn from "../../components/defaultBtn/defaultBtn";
import logo from "../../assets/logo.png";
import "./mainPage.css";
import { Link } from "react-router-dom";
const MainPage = () => {
  return (
    <div className="mainPage">
      <img src={logo} alt="logo" className="logo" />
      <div className="btnDiv">
        <Link to="/pit-team-choice">
          {" "}
          <DefaultBtn backgroundColor="#FF640C" text="Pit Scout" />
        </Link>
        <Link to="/matchscout-team-choice">
          {" "}
          <DefaultBtn backgroundColor="#FF7F23" text="Match Scout" />
        </Link>

        <Link to="/admin">
          <DefaultBtn backgroundColor="#FF640C" text="Admin" />
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
