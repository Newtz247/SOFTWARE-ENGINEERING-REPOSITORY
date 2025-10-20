/**
 * DesktopView.jsx
 * 
 * Purpose: Focuses on desktop version features of user interface of grid, word, stars, final score display 
 * and other elements arrangements.
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
import PlayAudioImg from "../images/PlayAudio.png";
import inactivePanel from "../images/colour.jpg";

/**
 * @param {*} 
 * gameEnd: boolean tells if game has ended
 * successCount: no of correct answers
 * onNewGame: resets paramaters for new game
 * onPlayAudio: Word audio
 * displayText: question word
 * roundDisplay: present round no
 * boxes: images inside grid
 * onHandleSelection: handles the result of selecting a image at each round
 * @returns  Desktop display of user Interface
 */
function DesktopView({
  gameEnd,
  successCount,
  onNewGame,
  onPlayAudio,
  displayText,
  roundDisplay,
  boxes,
  onHandleSelection,
}) {
  return (
    <section className="Desktop-View hidden lg:flex">
      <div className="w-[80vw] h-[40vh]">
        {gameEnd && (
          <div className="fixed animate-fadeIn inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-red-200 rounded-lg shadow-lg p-6 w-[80vw] h-[50vh]">
              <h2 className="text-center text-4xl font-bold font-comic mb-6">
                kelulktelatekn
              </h2>
              <h4 className="text-xl font-bold font-comic mb-4 h-10 flex items-center space-x-2">
                <span className="flex flex-wrap items-center justify-center space-x-1 mt-[30vh]">
                  <StarsDisplay successCount={successCount} />
                </span>
              </h4>
              <div className="absolute right-[15vw] bottom-[30vh]">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition font-comic"
                  onClick={onNewGame}
                >
                  si'owa'si?
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="absolute flex-row justify-start left-[7.5vw] right-[45vw] top-[40vh] pointer-events-none">
          {successCount > 0 && (
            <div className="flex flex-wrap gap-1">
              <StarsDisplay successCount={successCount} />
            </div>
          )}
        </div>
        <div className="absolute bottom-[8.6vh] right-[7.1vw] w-[36vw]">
          <div className="flex items-center justify-between font-comic mb-[3vh]">
            <button onClick={onPlayAudio} id="audioBnDesktop">
              <img
                src={PlayAudioImg}
                alt="Play Audio"
                className="hover:scale-110 w-[7vw] transition-all"
              />
            </button>
            <h1 className="text-5xl ml-[2vw]"><strong>{displayText}</strong></h1>
            <h1 className="text-5xl mr-[3vw] ml-auto">{roundDisplay}</h1>
          </div>
          <div className="grid grid-cols-3 gap-0">
            {boxes.map((box, index) => (
              <div key={index} className="grid-box w-[12vw]">
                <img
                  src={box.image}
                  alt={box.text}
                  {...(!(box.image === inactivePanel) && {
                    onClick: () => onHandleSelection(box.image),
                  })}
                  className={`rounded-lg ${
                    box.image === inactivePanel
                      ? "opacity-80"
                      : " hover:cursor-pointer"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DesktopView;
