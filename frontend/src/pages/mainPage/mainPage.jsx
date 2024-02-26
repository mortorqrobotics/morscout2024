import DefaultBtn from "../../components/defaultBtn/defaultBtn";
import logo from "../../assets/logo.png";
import "./mainPage.css";
import { Link } from "react-router-dom";
const MainPage = () => {
  return (
    <div className="main-page">
      <img src={logo} alt="logo" className="logo" />
      <div className="btn-div">
        <Link to="/pit-team-choice">
          <DefaultBtn backgroundColor="#FF5F00" text="Pit Scout" />
        </Link>
        <Link to="/matchscout-team-choice">
          <DefaultBtn backgroundColor="#FF5F00" text="Match Scout" />
        </Link>

        <Link to="/admin">
          <DefaultBtn backgroundColor="#FF5F00" text="Admin" />
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
