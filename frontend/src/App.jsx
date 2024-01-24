import { useState } from "react";
import MainPage from "./pages/mainPage/mainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/adminPage/adminPage";
import Pitscoutpage from "./pages/pitscoutPage/pitscoutpage";
import MatchscoutPage from "./pages/matchscoutPage/matchscoutPage";
function App() {
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path="/matchscout-team-choice" element={<MatchscoutPage/>}/>
          <Route path="/pit-team-choice" element={<Pitscoutpage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
