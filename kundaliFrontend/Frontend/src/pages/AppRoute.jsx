import React from "react";
import { Routes, Route } from "react-router-dom";
import Main_Page from "./Main_Page"; 
import Kundali from "./Kundali";
import ChildBirth from "./ChildBirth";
import MatchMatching from "./MatchMatching";
import Kundali_Container from "./Kundali_Container";
import Sun from "./Planets/Sun";
import Moon from "./Planets/Moon";
import Mars from "./Planets/Mars";
import Mercury from "./Planets/Mercury";
import Jupiter from "./Planets/Jupiter";
import Venus from "./Planets/Venus";
import Saturn from "./Planets/Saturn";
import Rahu from "./Planets/Rahu";
import Ketu from "./Planets/Ketu";
import '../fonts.css';
import MatchMatchingResult from '../components/MatchMatchingResult'
import ChildBirthResult from '../components/ChildBirthResult'


const AppRoute = () => {
  return (
    <div style={{ fontFamily: 'Kalam, sans-serif' }}>
      <Routes>
        <Route path="/" element={<Main_Page />} />
        <Route path="/kundali" element={<Kundali />} />
        <Route path="/child_Birth" element={<ChildBirth />} />
        <Route path="/matchMatching" element={<MatchMatching />} />
        <Route path="/kundali-Info" element={<Kundali_Container />} />
        <Route path="/matchmaking-result" element={<MatchMatchingResult />} />
        <Route path="/child-kundali-Info" element={<ChildBirthResult />} />
        <Route path="/sun" element={<Sun />} />
        <Route path="/moon" element={<Moon />} />
        <Route path="/mars" element={<Mars />} />
        <Route path="/mercury" element={<Mercury />} />
        <Route path="/jupiter" element={<Jupiter />} />
        <Route path="/venus" element={<Venus />} />
        <Route path="/saturn" element={<Saturn />} />
        <Route path="/rahu" element={<Rahu />} />
        <Route path="/ketu" element={<Ketu />} />
      </Routes>
    </div>
  );
};

export default AppRoute;
