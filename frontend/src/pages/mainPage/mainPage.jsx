import DefaultBtn from "../../components/defaultBtn/defaultBtn";
import logo from "../../assets/logo.png";
import "./mainPage.css";
import { Link } from "react-router-dom";
const MainPage = ({ username }) => {
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
        {username === "Sergey Safanovich" || username === "Kaylen Wi"   ? (
          <Link to="/admin">
            <DefaultBtn backgroundColor="#FF5F00" text="Admin Page" />
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default MainPage;
