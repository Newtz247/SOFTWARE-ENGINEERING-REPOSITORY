import React, { useEffect, useState, useCallback } from "react";
import { WORD_INFO } from "../WordBank";
import MobileView from "./MobileView";
import DesktopView from "./DesktopView";
import wrongAnswer from "../audio/wrongAnswer.mp3";
import correctAnswer from "../audio/correctAnswer.mp3";
import inactivePanel from "../images/colour.jpg";

function WordDistribution({ month }) {
  const [callCount, setCallCount] = useState(0);
  const [boxes, setBoxes] = useState([]);
  const [initWords, setInitWords] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [displayAudio, setDisplayAudio] = useState("");
  const [displayImage, setDisplayImage] = useState("");
  const [roundDisplay, setRoundDisplay] = useState(`${callCount}/${month}`);
  const [successCount, setSuccessCount] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);

  const GameOver = useCallback(() => {
    if (month < 9) {
      if ((month === 3 && callCount === 3) || (month === 6 && callCount === 6)) {
        setGameEnd(true);
      }
    } else if (callCount === month) {
      setGameEnd(true);
    }
  }, [month, callCount]);

  const GenerateWordArray = useCallback(() => {
    if (!initWords.length) return;
    GameOver();

    const currentIndex = callCount % initWords.length;
    const fixedWord = initWords[currentIndex];

    const fillerCount = month === 3 ? 6 : month === 6 ? 3 : 0;

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

    const remaining = shuffled.slice(0, 8);
    const grid = [fixedWord, ...remaining].sort(() => Math.random() - 0.5);

    setCallCount((n) => n + 1);
    setBoxes(grid);
    setDisplayText(fixedWord.text);
    setDisplayImage(fixedWord.image);
    setDisplayAudio(fixedWord.audio);
  }, [callCount, initWords, month, GameOver]);

  useEffect(() => {
    let words;
    switch (month) {
      case 3:  words = WORD_INFO.slice(0, 3); break;
      case 6:  words = WORD_INFO.slice(0, 6); break;
      case 9:  words = WORD_INFO.slice(0, 9); break;
      case 12: words = WORD_INFO.slice(0, 12); break;
      case 15: words = WORD_INFO.slice(0, 15); break;
      case 18: words = WORD_INFO.slice(0, 18); break;
      case 20: words = WORD_INFO; break;
      default: words = WORD_INFO.slice(0, 9);
    }
    setInitWords([...words].sort(() => Math.random() - 0.5));
    setCallCount(0);
    setSuccessCount(0);
    setIsInitialized(false);
    setGameEnd(false);
  }, [month]);

  useEffect(() => {
    if (initWords.length && !isInitialized) {
      setIsInitialized(true);
      GenerateWordArray();
      setRoundDisplay(`${callCount}/${month}`);
    }
  }, [initWords, isInitialized, GenerateWordArray, callCount, month]);

  const HandleSelection = (selectedImage) => {
    if (selectedImage === displayImage) {
      new Audio(correctAnswer).play();
      setSuccessCount((p) => p + 1);
    } else {
      new Audio(wrongAnswer).play();
    }
    GenerateWordArray();
    setRoundDisplay(`${callCount}/${month}`);
  };

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
