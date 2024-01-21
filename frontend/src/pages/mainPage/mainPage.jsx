import React from "react";
import DefaultBtn from "../../components/defaultBtn/defaultBtn";
import logo from "../../assets/logo.png"
import "./mainPage.css"
const MainPage = () => {
  return (
    <div className="mainPage">
        <img src={logo} alt="" oclassName="logo"/>
      <div className="btnDiv">
        <DefaultBtn backgroundColor="#FF640C" text="Pit Scout" />
        <DefaultBtn backgroundColor="#FF7F23" text="Match Scout" />
        <DefaultBtn backgroundColor="#FF9B3F" text="Admin" />
      </div>
    </div>
  );
};

export default MainPage;
