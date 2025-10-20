/**
 * WordDistribution.jsx
 * 
 * Purpose: Implementation of grid and question word
 *          The game dynamically updates based on the selected month, providing audio feedback
 *          and visual rewards. Users earn stars for correct matches and can reset the game.
 * 
 * Author(s): Preksha Joon, Aaron Gonsalves
 * Assisted by: ChatGPT (Documentation assistance + Fixing Roadblocks)
 * 
 * COTS Used:
 * - React: JavaScript library for building user interfaces. (https://reactjs.org/)
 * - Tailwind CSS: Utility-first CSS framework for styling. (https://tailwindcss.com/)
 * - Local assets for images (Michael's efforts and Microsoft Designer) and audio files.
 */



import React, { useEffect, useState, useCallback } from "react";
import { WORD_INFO } from "../WordBank";
import MobileView from "./MobileView";
import DesktopView from "./DesktopView";
import tryAgainAudio from "../audio/tryagain.mp3";
import congratulationsAudio from "../audio/congratulatory.mp3";
import inactivePanel from "../images/colour.jpg";

/**
 * WordDistribution Component
 * 
 * Purpose: Renders the game interface where users match words to images based on the selected month.
 * 
 * Parameters:
 * - month: (number) The selected number corresponding to the month based on the words of the month, 
 * which determines the set of words and game logic.
 */
function WordDistribution({ month }) {
  const [callCount, setCallCount] = useState(0);
  const [boxes, setBoxes] = useState([]);
  const [initWords, setInitWords] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [displayAudio, setDisplayAudio] = useState("");
  const [displayImage, setDisplayImage] = useState("");
  const [roundDisplay, setRoundDisplay] = useState(callCount + "/" + month);
  const [successCount, setSuccessCount] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);

  /**
   * gameOver
   * 
   * Purpose: Determines if the game has ended based on the number of rounds played.
   */
  const GameOver = useCallback(() => {
    if (month < 9) {
      if ((month === 3 && callCount === 3) || (month === 6 && callCount === 6)) {
        setGameEnd(true);
      }
    } else {
      if (callCount === month) setGameEnd(true);
    }
  }, [month, callCount]);

  /**
   * generateWordArray
   * 
   * Purpose: Generates a new word array for the grid, shuffling words and preparing the game state for the next round. 
   * Also, selects the question word for each round, and updates it on display.
   */
  const GenerateWordArray = useCallback(() => {
    if (!initWords || initWords.length === 0) return;
    GameOver();

    const currentIndex = callCount % initWords.length;
    const fixedWord = initWords[currentIndex];
    const fixedTextValue = fixedWord.text;
    const fixedImageValue = fixedWord.image;
    const fixedAudioValue = fixedWord.audio;

    let x;
    if (month === 3) {
      x = 6;
    } else if (month === 6) {
      x = 3;
    } else {
      x = 0;
    }

    const newInitWords = initWords.filter((_, index) => index !== currentIndex);
    const shuffleWords = [...newInitWords]
      .concat(
        new Array(x).fill({
          text: "none",
          image: inactivePanel,
          audio: "",
        })
      )
      .sort(() => Math.random() - 0.5);

    const remainingWords = shuffleWords.slice(0, 8);
    const grid = [fixedWord, ...remainingWords].sort(() => Math.random() - 0.5);

    setCallCount((prevCount) => prevCount + 1);
    setBoxes(grid);
    setDisplayText(fixedTextValue);
    setDisplayImage(fixedImageValue);
    setDisplayAudio(fixedAudioValue);
  }, [callCount, initWords, month, GameOver]);

  // Purpose:Update words to be fillled in he grid  based on the month after randomizing the words, initiallize round Count
  useEffect(() => {
    let words = [];
    switch (month) {
      case 3:
        words = WORD_INFO.slice(0, 3);
        break;
      case 6:
        words = WORD_INFO.slice(0, 6);
        break;
      case 9:
        words = WORD_INFO.slice(0, 9);
        break;
      case 12:
        words = WORD_INFO.slice(0, 12);
        break;
      case 15:
        words = WORD_INFO.slice(0, 15);
        break;
      case 18:
        words = WORD_INFO.slice(0, 18);
        break;
      case 20:
        words = WORD_INFO;
        break;
      default:
        words = WORD_INFO.slice(0, 9);
    }
    const randomizeWords = [...words].sort(() => Math.random() - 0.5);
    setCallCount(0);
    setSuccessCount(0);
    setInitWords(randomizeWords);
    setIsInitialized(false);
  }, [month]);

  // Generate the initial grid and update display text after `initWords` is updated
  useEffect(() => {
    if (initWords.length > 0 && !isInitialized) {
      setIsInitialized(true);
      GenerateWordArray();
      setRoundDisplay(callCount  + "/" + month);
    }
  }, [initWords, isInitialized, GenerateWordArray, setRoundDisplay, month, callCount]);

  /**
   * HandleSelection
   * 
   * Purpose: PBoolean to determine if the selected image corresponds to word displayed and give response accordingly. 
   * Also automatically moves to next round after display of result.
   * 
   * paramaters
   * selectedImages: image selected by the user
   */
  const HandleSelection = (selectedImage) => {
    if (selectedImage === displayImage) {
      new Audio(congratulationsAudio).play();
      GenerateWordArray();
      setRoundDisplay((callCount ) + "/" + month);
      setSuccessCount((prevCount) => prevCount + 1);
    } else {
      new Audio(tryAgainAudio).play();
      GenerateWordArray();
      setRoundDisplay((callCount ) + "/" + month);
    }
  };

  /**
   * playAudio
   * 
   * Purpose: Plays the audio associated with the currently displayed word.
   */
  const PlayAudio = () => {
    if (displayAudio) {
      new Audio(displayAudio).play();
    }
  };

  /**
   * newGame
   * 
   * Purpose: Resets the game state to start a new game.
   */
  const NewGame = () => {
    setCallCount(0);
    setSuccessCount(0);
    const reshuffledWords = [...initWords].sort(() => Math.random() - 0.5);
    setInitWords(reshuffledWords);
    setIsInitialized(false);
    setGameEnd(false);
  };
/**
 * Purpose: returns the display of the grid along with question word based on mobile or Desktop view. 
 * Also displays final score after end of a game.
 */
  return (
    <div>
      <MobileView
        gameEnd={gameEnd}
        successCount={successCount}
        onNewGame={NewGame}
        onPlayAudio={PlayAudio}
        displayText={displayText}
        roundDisplay={roundDisplay}
        boxes={boxes}
        onHandleSelection={HandleSelection}
      />
      <DesktopView
        gameEnd={gameEnd}
        successCount={successCount}
        onNewGame={NewGame}
        onPlayAudio={PlayAudio}
        displayText={displayText}
        roundDisplay={roundDisplay}
        boxes={boxes}
        onHandleSelection={HandleSelection}
      />
    </div>
  );
}

export default WordDistribution;
