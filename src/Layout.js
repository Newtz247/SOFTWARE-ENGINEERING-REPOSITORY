/**
 * Layout.js
 * 
 * Purpose: This file integrates the various components of the webpage
 *          into a single html structure.
 * 
 * Author: Michael Allain (A00471697)
 */

import React, { useState } from "react"
import WordDistribution from './components/GridLayout/WordDistribution'; // Importing the Grid component
import DropDownMenu from './components/Dropdown'; // Importing the DropdownMenu component
import DictionaryButton from './components/DictionaryButton'; // Importing the DictionaryButton component
import Summer from '../src/components/images/summer.jpeg';
import Autumn from './app-images/fall.png';
import Spring from './app-images/spring.png';
import Winter from './app-images/winter.png';
import GridImage from './app-images/Grid.png';
import { getItem, setItem } from "./utils/localStorage.ts";

function Layout() {

  const [selectedMonth, setSelectedMonth] = useState(() => {
    return getItem("selectedMonth") || 3;
  }) // Default to 3

  const handleMonthSelect = (value) => {
    setSelectedMonth(value); // Update the selected month
    setItem("selectedMonth", value); // Store the selected month in localStorage
  };

  const getBackgroundImage = () => {
  if (selectedMonth === 3 || selectedMonth === 6 || selectedMonth === 9) {
    // 3 = Sep, 6 = Oct, 9 = Nov
    return Autumn;
  } else if (selectedMonth === 12 || selectedMonth === 15 || selectedMonth === 18) {
    // 12 = Dec, 15 = Jan, 18 = Feb
    return Winter;
  } else if (selectedMonth === 20) {
    // 20 = Mar
    return Summer;
  } else {
    // Default (optional)
    return Summer;
  }
};

  const getTextColorClass = () => {
  if (selectedMonth >= 3 && selectedMonth < 9) {
    return "text-black"; // Spring (Mar–May): dark text
  }
  if (selectedMonth >= 9 && selectedMonth < 12) {
    return "text-black"; // Autumn (Sep–Nov): dark text
  }
  if (selectedMonth >= 12 && selectedMonth < 15) {
    return "text-white"; // Winter (Dec): white text
  }
  if (selectedMonth >= 15 && selectedMonth < 20) {
    return "text-white"; // Winter (Jan–Feb): white text
  }
  return "text-black";
  }
  
  return (
    <div>
      {/* Container for mobile view layout */}
      <section className="Mobile-App flex lg:hidden">
        <div 
          className="App-background absolute bg-cover bg-center h-screen bg-no-repeat flex flex-col overflow-hidden"
          style={{ backgroundImage: `url(${getBackgroundImage()})` }}
        >
          
          {/* Container for the app headers */}
          <div className="flex flex-col vh-[20vh]">
            <h1 className={`text-center font-bold ${getTextColorClass()} text-4xl font-comic mt-[1vh]`}>
              mi'kmaq<br />pictionary
            </h1>
            <p className={`text-center font-bold ${getTextColorClass()} text-3xl font-comic mt-[1vh]`} id="angie-header-mobile">
              mikwite'tmk+t Angie
            </p>
          </div>

          {/* Container for the dropdown menu and dictionary components */}
          <div className="z-20 flex items-center justify-between mx-[1vw] h-[10vh]">
            <DropDownMenu selectedMonth={selectedMonth} onMonthChange={handleMonthSelect} />
            <DictionaryButton />
          </div>

        
          {/* Container for the grid component */}
          <div className="flex flex-col items-center justify-center h-[70vh] w-[100vw]">
            <img 
              src={GridImage} 
              alt="Grid Overlay" 
              className="absolute bottom-[0vh] z-10 object-cover w-[100vw] pointer-events-none"
            />
            <div className="absolute bottom-[0.5vh] w-[90vw]">
              <WordDistribution month={selectedMonth} />          
            </div>
          </div>
        </div>
      </section>

      {/* Container for desktop view layout */}
      <section className="Desktop-App hidden lg:flex">
        <div 
          className="App-background absolute bg-cover bg-center h-screen bg-no-repeat flex flex-col overflow-hidden"
          style={{ backgroundImage: `url(${getBackgroundImage()})` }}
        >

          {/* Container for the app headers */}
          <div className="flex flex-col left-[0vw] w-[60vw] h-[30vh]">
            <h1 className="text-center text-red-700 font-bold text-7xl font-comic mt-[1vh]">
              mi'kmaq pictionary
            </h1>
            <p className="text-center text-red-400 font-bold text-6xl font-comic mt-[1vh]" id="angie-header-desktop">
              mikwite'tmk+t Angie
            </p>
          </div>

          {/* Container for the dropdown menu and dictionary components */}
          <div className="z-20 flex flex-col items-center justify-between text-xl w-[60vw] mt-[5vh] h-[25vh]">
            <DictionaryButton />
            <DropDownMenu selectedMonth={selectedMonth} onMonthChange={handleMonthSelect} />
          </div>

          {/* Container for the grid component */}
          <div className="flex flex-col h-[100vh] w-[100vw]">
            <img 
              src={GridImage} 
              alt="Grid Overlay" 
              className="absolute bottom-[5vh] right-[5vw] z-10 object-cover w-[40vw] pointer-events-none"
            />
            <div>
              <WordDistribution month={selectedMonth} />          
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Layout;
