/**
 * FlipCard.js
 *
 * Purpose: This component represents a flip card that displays a Mi'kmaq word with its English
 *          meaning on the front. When clicked, the card flips to reveal an associated image
 *          and plays a corresponding audio pronunciation.
 *
 * Author: Tooba Javed (A00468904)
 */

import { WORD_INFO } from "./WordBank.js";
import { useState, useEffect, useRef } from "react";
import "./FlipCard.css";
import { useAudioState } from "../contexts/audio-context.jsx";
// import { useAudioState } from "../components/audio/audio-context.jsx";

const AUTO_FLIP_BACK_MS = 3000; // 3000ms = 3s, 5000ms = 5s

/**
 * FlipCard Component
 *
 * Parameters:
 * - mikmaqWord: The Mi'kmaq word to be displayed and pronounced.
 * - englishMeaning: The English translation of the Mi'kmaq word.
 */
const FlipCard = ({ mikmaqWord, englishMeaning }) => {
  const { useSoundEffects } = useAudioState();
  const [isFlipped, setIsFlipped] = useState(false); // Tracks whether the card is flipped
  const flipBackTimer = useRef(null); // Reference to the flip back timer

  // Find the word data (image, audio, etc.) that matches the mikmaqWord
  const wordData = WORD_INFO.find((item) => item.text === mikmaqWord);

  /**
   * Toggles the card's flipped state when clicked, showing either the front or back.
   */
  const handleClick = () => {
    setIsFlipped((prev) => !prev);
  };

  /**
   * Plays audio (if enabled) when flipped, and schedules auto-unflip.
   */
  useEffect(() => {
    if (isFlipped) {
      if (wordData && useSoundEffects) {
        new Audio(wordData.audio).play();
      }

      flipBackTimer.current = setTimeout(() => setIsFlipped(false), AUTO_FLIP_BACK_MS);
    }

    // cleanup on unflip or unmount
    return () => {
      if (flipBackTimer.current) {
        clearTimeout(flipBackTimer.current);
        flipBackTimer.current = null;
      }
    };
  }, [isFlipped, wordData, useSoundEffects]);

  return (
    <div className="flip-card" onClick={handleClick}>
      <div className={`flip-card-inner ${isFlipped ? "is-flipped" : ""}`}>
        {/* Front side showing the word and meaning */}
        <div className="flip-card-front">
          <div className="mikmaq-text">{mikmaqWord}</div>
          <div className="english-text">({englishMeaning})</div>
        </div>

        {/* Back side showing the image */}
        <div className="flip-card-back">
          {wordData ? (
            <img src={wordData.image} alt={mikmaqWord} className="flip-card-image" />
          ) : (
            <p>Image missing</p> // If no image is found for the word
          )}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
