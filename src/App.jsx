import React, { useEffect, useState } from "react";
import DesktopPortfolio from "./components/DarkPortfolio.jsx";
// import MobilePortfolio from "./components/MobilePortfolio.jsx";
import "./global.css";

export default function App() {
 
  return (
    <div className="min-h-screen">
     <DesktopPortfolio />
    </div>
  );
}
