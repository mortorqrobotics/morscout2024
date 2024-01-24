import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./header.css";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div>
      <nav>
        <div>
          <Link to={props.toWhere}>
            <ArrowBackIcon className="backIcon" style={{ fill: " #fff" }} />
          </Link>
        </div>
        <div>
          <h2>{props.headerText}</h2>
        </div>
      </nav>
    </div>
  );
};

export default Header;
