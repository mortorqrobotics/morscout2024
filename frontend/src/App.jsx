import { useState } from "react";
import MainPage from "./pages/mainPage/mainPage";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/adminPage/adminPage";
import Pitscoutpage from "./pages/pitScoutTeamSelectPage/pitScoutTeamSelectPage";
import MatchscoutPage from "./pages/matchscoutPage/matchscoutPage";
import PitScoutTeamPage from "./pages/pitScoutTeamPage/pitScoutTeamPage";
function App() {
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path="/matchscout-team-choice" element={<MatchscoutPage/>}/>
          <Route path="/pit-team-choice" element={<Pitscoutpage/>}/>
          <Route path="/pit-team-choice/1515" element={<PitScoutTeamPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
