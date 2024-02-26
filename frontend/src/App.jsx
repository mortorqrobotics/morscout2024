import MainPage from "./pages/mainPage/mainPage";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import AdminPage from "./pages/adminPage/adminPage";
import Pitscoutpage from "./pages/pitScoutTeamSelectPage/pitScoutTeamSelectPage";
import MatchscoutPage from "./pages/matchscoutPage/matchscoutPage";
import PitScoutForm from "./pages/pitScoutForm/pitScoutForm";
import SelectFormPage from "./pages/selectFormPage/selectFormPage";
import AutoScoutForm from "./pages/autoScoutForm/autoScoutForm";
import TeleopScoutForm from "./pages/teleopScoutForm/teleopScoutForm";
import LoginPage from "./pages/loginPage/loginPage";

import { useEffect, useState } from "react";
function App() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!username || username.trim().length === 0) {
      navigate("/login");
    }
  }, [username, navigate]);

  const changeUsername = (name) => {
    setUsername(name);
    localStorage.setItem("username", name);
  };

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route
        path="/login"
        element={<LoginPage changeUsername={changeUsername} />}
      />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/matchscout-team-choice" element={<MatchscoutPage />} />
      <Route
        path="/matchscout-team-form/:teamNumber"
        element={<SelectFormPage />}
      />
      <Route
        path="/matchscout-team-form/:teamNumber/auto"
        element={<AutoScoutForm />}
      />
      <Route
        path="/matchscout-team-form/:teamNumber/teleop"
        element={<TeleopScoutForm />}
      />

      <Route path="/pit-team-choice" element={<Pitscoutpage />} />
      <Route path="/pit-team-form/:teamNumber" element={<PitScoutForm username={username} />} />
    </Routes>
  );
}

export default App;
