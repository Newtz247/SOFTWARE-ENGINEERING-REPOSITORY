/**
 * GameOverModal.jsx
 * 
 * Purpose: Display of total stars at end of game and Asks to start a new game
 * 
 * Author(s): Michael Allain, Preksha Joon
 * 
 * 
 * COTS Used:
 * - React: JavaScript library for building user interfaces. (https://reactjs.org/)
 * - Tailwind CSS: Utility-first CSS framework for styling. (https://tailwindcss.com/)
 * - Local assets for images (Michael's efforts and Microsoft Designer) and audio files.
 */
import React from "react";
import StarsDisplay from "./StarsDisplay";
/**
 * 
 * @param 
 * isGameEnd: tells if game has ended
 * sucessCount: no of correct answers
 * onNewGame: resets paramaters for new game
 * @returns A pop up congratulating the user and asking to trk again.
 */
function GameOverModal({ isGameEnd, successCount, onNewGame }) {
  if (!isGameEnd) return null;

  return (
    <div className="fixed animate-fadeIn inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-red-200 rounded-lg shadow-lg p-[3vw] w-[95vw] h-[35vh]">
        <h2 className="text-xl text-center font-bold font-comic mb-[5vh]">
          kelulktelatekn
        </h2>
        <h4 className="text-xl font-bold font-comic mb-4 h-10 flex items-center space-x-2">
          <span className="flex flex-wrap items-center justify-center space-x-1">
            <StarsDisplay successCount={successCount} />
          </span>
        </h4>
        <div className="flex justify-end mt-[8vh] mr-[3vw]">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition font-comic"
            onClick={onNewGame}
          >
            si'owa'si?
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameOverModal;
