import { useState } from "react";
import "./loginPage.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ changeUsername }) => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    changeUsername(userName);

    navigate("/");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          type="text"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

LoginPage.propTypes = {
  changeUsername: PropTypes.func,
};

export default LoginPage;
