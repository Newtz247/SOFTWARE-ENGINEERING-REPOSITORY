/**
 * FlipCard.js
 * 
 * Purpose: This component represents a flip card that displays a Mi'kmaq word with its English
 *          meaning on the front. When clicked, the card flips to reveal an associated image
 *          and plays a corresponding audio pronunciation.
 * 
 * Author: Tooba Javed (A00468904)
 */

import {  WORD_INFO } from "./WordBank.js";
import React, { useState, useEffect } from 'react';
import './FlipCard.css';

/**
 * FlipCard Component
 * 
 * Purpose: This component represents an interactive flip card. It displays a Mi'kmaq word with
 *          its English translation on the front. When clicked, the card flips to reveal an image
 *          and plays an audio pronunciation.
 * 
 * Parameters:
 * - mikmaqWord: The Mi'kmaq word to be displayed and pronounced.
 * - englishMeaning: The English translation of the Mi'kmaq word.
 */
const FlipCard = ({ mikmaqWord, englishMeaning }) => {
  const [isFlipped, setIsFlipped] = useState(false); // Tracks whether the card is flipped

  /**
   * handleClick Function
   * 
   * Purpose: Toggles the card's flipped state when clicked, showing either the front or back.
   */
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  // Find the word data (image, audio, etc.) that matches the mikmaqWord
  const wordData = WORD_INFO.find(item => item.text === mikmaqWord);

  /**
   * useEffect Hook
   * 
   * Purpose: Plays the audio pronunciation whenever the card is flipped to show the back side.
   * Dependencies: Runs whenever 'isFlipped' or 'wordImgs' changes.
   */
    
    useEffect(() => {
      if (isFlipped && wordData) {
        const audio = new Audio(wordData.audio);  // Play the corresponding audio
        audio.play();
      }
    }, [isFlipped, wordData]);

  return (
    <div className="flip-card" onClick={handleClick}>
      <div className={`flip-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
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
