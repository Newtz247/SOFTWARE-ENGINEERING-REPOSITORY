import React, { useEffect, useState, useCallback } from "react";
import { WORD_INFO } from "../WordBank";
import MobileView from "./MobileView";
import DesktopView from "./DesktopView";
import wrongAnswer from "../audio/wrongAnswer.mp3";
import correctAnswer from "../audio/correctAnswer.mp3";
import inactivePanel from "../images/colour.jpg";
import { setItem, getItem } from "../../utils/localStorage.ts";


function WordDistribution({ month }) {

//track how many rounds have been played and persist in local storage
  const [callCount, setCallCount] = useState(() => {
    return getItem("currentCallCount") || 0;
  });

  // Update local storage whenever callCount changes
  useEffect(() => {
    setItem("currentCallCount", callCount);
  }, [callCount]);

  const [boxes, setBoxes] = useState([]);
  const [initWords, setInitWords] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [displayText, setDisplayText] = useState();
  const [displayAudio, setDisplayAudio] = useState();
  const [displayImage, setDisplayImage] = useState();
  const [roundDisplay, setRoundDisplay] = useState(`${callCount}/${month}`);

  const [successCount, setSuccessCount] = useState(()=> {
    return getItem("successCount") || 0;
  });
  useEffect(() => {
    setItem("successCount", successCount);
  }, [successCount]);

  const [gameEnd, setGameEnd] = useState(false);

  //check if the game is over
  const GameOver = useCallback(() => {
    if (callCount === 3) {
      setGameEnd(true);
    }
  }, [callCount]);

  // Generate the array of words for the grid
  const GenerateWordArray = useCallback(() => {
    if (!initWords.length) return;
    GameOver(); // Check if game is over before generating new array

    //find which word to show based on callCount
    const currentIndex = callCount % initWords.length;
    const fixedWord = initWords[currentIndex];
    console.log("Fixed word:", fixedWord);
    console.log("Current callCount:", callCount);
    console.log("initWords: ", initWords);

    // # of filler panels to add
    const fillerCount = 6 + (month === 20 ? 1 : 0);

    //shuffle the remaining words and add filler panels
    const withoutCurrent = initWords.filter((_, i) => i !== currentIndex);
    const shuffled = [...withoutCurrent]
      .concat(
        new Array(fillerCount).fill({
          text: "none",
          image: inactivePanel,
          audio: "",
        })
      )
      .sort(() => Math.random() - 0.5);

    // Select 8 random words from the shuffled list
    const remaining = shuffled.slice(0, 8);
    // Combine fixed word with remaining and shuffle
    const grid = [fixedWord, ...remaining].sort(() => Math.random() - 0.5);

    // Update states
    setBoxes(grid);
    setDisplayText(fixedWord.text);
    setDisplayImage(fixedWord.image);
    setDisplayAudio(fixedWord.audio);

  }, [initWords, month, GameOver]); 
  
  // get a list of words from WORD_INFO based on month
  useEffect(() => {
    let words;
    switch (month) {
      case 3:  words = WORD_INFO.slice(0, 3); break;
      case 6:  words = WORD_INFO.slice(3, 6); break;
      case 9:  words = WORD_INFO.slice(6, 9); break;
      case 12: words = WORD_INFO.slice(9, 12); break;
      case 15: words = WORD_INFO.slice(12, 15); break;
      case 18: words = WORD_INFO.slice(15, 18); break;
      case 20: words = WORD_INFO.slice(18,20); break;
      default: words = WORD_INFO.slice(0, 9);
    }
    if (getItem("currentCallCount") === null) {
      setInitWords([...words].sort(() => Math.random() - 0.5));
    } else{
      setInitWords([...words]);
    }
    
    //setSuccessCount(0);
    setIsInitialized(false);
    setGameEnd(false);
    
  }, [month]);

  useEffect(() => {
  // Normal initialization
  if (initWords.length && !isInitialized) {
    setIsInitialized(true);
    GenerateWordArray();
    setRoundDisplay(`${callCount}/3`);
  }
}, [initWords, isInitialized, callCount, month]);

  const HandleSelection = (selectedImage) => {
    if (selectedImage === displayImage) {
      new Audio(correctAnswer).play();
      setSuccessCount((p) => p + 1);
    } else {
      new Audio(wrongAnswer).play();
    }
    setCallCount((n) => n + 1);
    setItem("currentCallCount", callCount);
//     setCallCount((prev) => {
//     const newValue = prev + 1;
//     setItem("currentCallCount", newValue); // save the correct updated value
//     return newValue;
// });
    //GenerateWordArray();
    //setRoundDisplay(`${callCount}/3`);
  };
  
  // Update round display when callCount changes
  useEffect(() => {
    setRoundDisplay(`${callCount}/3`);
  }, [callCount]);

  // Generate new word and check for game end when callCount changes
  useEffect(() => {
    if (!isInitialized) return;

    // generate new word after count updates
    GenerateWordArray();

    // check if game should end
    if (callCount >= 3) {
      setGameEnd(true);
    }

  }, [callCount, isInitialized]);


  const PlayAudio = () => {
    if (displayAudio) new Audio(displayAudio).play();
  };

  const PlayAudioSlow = () => {
    if (!displayAudio) return;
    const a = new Audio(displayAudio);
    a.playbackRate = 0.6; // tweak speed if desired
    a.play();
  };

  const NewGame = () => {
    localStorage.removeItem("currentCallCount");
    setCallCount(0);
    setSuccessCount(0);
    setInitWords((prev) => [...prev].sort(() => Math.random() - 0.5));
    setIsInitialized(false);
    setGameEnd(false);
  };

  return (
    <div>
      <MobileView
        gameEnd={gameEnd}
        successCount={successCount}
        onNewGame={NewGame}
        onPlayAudio={PlayAudio}
        onPlayAudioSlow={PlayAudioSlow}
        displayText={displayText}
        roundDisplay={roundDisplay}
        boxes={boxes}
        onHandleSelection={HandleSelection}
      />
      <DesktopView
        gameEnd={gameEnd}
        successCount={successCount}
        setSuccessCount={setSuccessCount}
        month={month}
        setRoundDisplay={setRoundDisplay}
        setCallCount={setCallCount}
        onNewGame={NewGame}
        onPlayAudio={PlayAudio}
        onPlayAudioSlow={PlayAudioSlow}
        displayText={displayText}
        roundDisplay={roundDisplay}
        boxes={boxes}
        onHandleSelection={HandleSelection}
      />
    </div>
  );
}

export default WordDistribution;