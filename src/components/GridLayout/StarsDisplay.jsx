/**
 * StarDisplay.jsx
 * 
 * Purpose: Display of stars earned by the user throughout the game, part of WordDistribution
 * 
 * Author(s): Michael Allain
 * 
 * 
 * COTS Used:
 * - React: JavaScript library for building user interfaces. (https://reactjs.org/)
 * - Tailwind CSS: Utility-first CSS framework for styling. (https://tailwindcss.com/)
 * - Local assets for images (Michael's efforts and Microsoft Designer) and audio files.
 */

import React from "react";
import mikmaqStar from "../images/mikmaqStar.png";

function StarsDisplay({ successCount }) {
  return (
    <>
      {Array(successCount)
        .fill(null)
        .map((_, index) => (
          <img
            key={index}
            src={mikmaqStar}
            alt="Success"
            className="w-[8vw] rounded-full animate-fadeIn"
          />
        ))}
    </>
  );
}

export default StarsDisplay;
