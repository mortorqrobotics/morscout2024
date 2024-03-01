import DefaultBtn from "../../components/defaultBtn/defaultBtn";
import "./selectFormPage.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../../components/header/header";
const SelectFormPage = () => {
  let { teamNumber } = useParams();
  return (
    <div>
      <Header
        toWhere="/matchscout-team-choice"
        headerText={
          <>
            <span style={{ color: "#FF5F00" }}>Match </span>
            <span style={{ color: "#FFFFFF" }}>Scout</span>
          </>
        }
        className="headerSelectForm"
      />
      <div className="select-page">
        <div className="btnAlign">
          <Link to={`/matchscout-team-form/${teamNumber}/auto`}>
            <DefaultBtn backgroundColor="#FF640C" text="Auto" />
          </Link>
          <Link to={`/matchscout-team-form/${teamNumber}/teleop`}>
            <DefaultBtn backgroundColor="#FF640C" text="Teleop" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelectFormPage;
