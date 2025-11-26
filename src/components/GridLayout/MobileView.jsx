import React from "react";
import StarsDisplay from "./StarsDisplay";
import PlayAudioImg from "../images/PlayAudio.png";
import inactivePanel from "../images/colour.jpg";

function MobileView({
  gameEnd,
  successCount,
  onNewGame,
  onPlayAudio,
  onPlayAudioSlow,  // <-- new prop used below
  displayText,
  roundDisplay,
  boxes,
  onHandleSelection,
  isStarting
}) {
  const MIKMAQ_SLOW_LABEL = "Kesikew — slow"; // replace with your preferred Mi’kmaw label

  return (
    <section className="Mobile-View flex lg:hidden">
      <div className="absolute items-center bottom-[2.7vh] w-[90vw]">
        {gameEnd && (
          <div className="fixed animate-fadeIn inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-red-200 rounded-lg shadow-lg p-6 w-[90vw] h-[50vh]">
              <h2 className="text-center text-3xl font-bold font-comic mb-6">kelulktelatekn</h2>
              <h4 className="text-lg font-bold font-comic mb-4 h-10 flex items-center space-x-2">
                <div className="flex flex-wrap items-center justify-center space-x-1 mt-[30vh]">
                  <StarsDisplay successCount={successCount} />
                </div>
              </h4>
              <div className="absolute right-[10vw] bottom-[30vh]">
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

        <div className="flex items-center justify-between font-comic mb-[3vh]">
          <button onClick={onPlayAudio} id="audioBnMobile">
            <img
              src={PlayAudioImg}
              alt="Play Audio"
              className="hover:scale-110 w-[10vw] transition-all"
            />
          </button>

          <h1 className="text-2xl ml-[5vw]">
            <strong>{displayText}</strong>
          </h1>

          {/* Slow text button */}
          <button
            type="button"
            id="slowBnMobile"
            data-cy="slow-button-mobile"
            aria-label="Play slowly"
            onClick={onPlayAudioSlow}
            className="mx-2 px-2 py-2 rounded-md border border-amber-700 bg-amber-500 
                       text-white shadow hover:bg-amber-600 focus:outline-none
                       focus:ring focus:ring-amber-700 transition text-sm"
          >
            {MIKMAQ_SLOW_LABEL}
          </button>

          <h1 className="text-2xl ml-auto">{roundDisplay}</h1>
        </div>

        <div className="grid grid-cols-3 gap-0">
          {boxes.map((box, index) => (
            <div key={index} className="grid-box w-[30vw]">
              <img
                src={box.image}
                alt={box.text}
                {...(!(box.image === inactivePanel) && {
                  onClick: () => onHandleSelection(box.image),
                })}
                className={`rounded-xl ${
                  box.image === inactivePanel ? "opacity-80" : " hover:cursor-pointer"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {isStarting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-lg p-6 shadow text-center font-comic">
            <p className="text-2xl font-bold mb-2">Starting new game…</p>
            <p className="text-sm text-slate-600">Get ready!</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default MobileView;
