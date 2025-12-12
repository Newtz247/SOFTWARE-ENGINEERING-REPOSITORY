/**
 * WordBank.js
 * 
 * Purpose: Provides a structured data set of Mi'kmaq words with corresponding translations,
 *          audio files, and images for use in a language learning game. This module also
 *          exports processed data structures for easy integration with other components.
 * 
 * Author(s): Aaron Gonsalves, Preksha Joon, Nokutenda Gumbie
 * Assisted by: ChatGPT (Documentation assistance + Data Transformation)
 * 
 * COTS Used:
 * - Local assets: Images and audio files representing Mi'kmaq words.
 */

// Import audio files and images for Mi'kmaq words
import ninAudio from "./audio/ni'n.mp3";
import ninImage from "./images/ni'n.png";

import kilAudio from "./audio/ki'l.mp3";
import kilImage from "./images/ki'l.png";

import nemituAudio from "./audio/nemitu.mp3";
import nemituImage from "./images/nemitu.png";

import tataAudio from "./audio/ta'ta.mp3";
import tataImage from "./images/ta'ta.png";

import ltuAudio from "./audio/l'tu.mp3";
import ltuImage from "./images/l'tu.png";

import elieyAudio from "./audio/eliey.mp3";
import elieyImage from "./images/eliey.png";

import wiktmAudio from "./audio/wiktm.mp3";
import wiktmImage from "./images/wiktm.png";

import teluisiAudio from "./audio/teluisi.mp3";
import teluisiImage from "./images/teluisi.png";

import mijisiAudio from "./audio/mijisi.mp3";
import mijisiImage from "./images/mijisi.png";

import aqqAudio from "./audio/aqq.mp3";
import aqqImage from "./images/aqq.jpeg";

import wejieyAudio from "./audio/wejiey.mp3";
import wejieyImage from "./images/wejiey.jpeg";

import kesalkAudio from "./audio/kesalk.mp3";
import kesalkImage from "./images/kesalk.png";

import kesatmAudio from "./audio/kesatm.mp3";
import kesatmImage from "./images/kesatm.png";

import kijuAudio from "./audio/kiju'.mp3";
import kijuImage from "./images/kiju'.png";

import nekmAudio from "./audio/nekm.mp3";
import nekmImage from "./images/nekm.png";

import alatuAudio from "./audio/ala'tu.mp3";
import alatuImage from "./images/ala'tu.png";

import ulaAudio from "./audio/ula.mp3";
import ulaImage from "./images/ula.jpg";

import kesalulAudio from "./audio/kesalul.mp3";
import kesalulImage from "./images/kesalul.png";

import weltasiAudio from "./audio/welta'si.mp3";
import weltasiImage from "./images/welta'si.jpg";

import wenAudio from "./audio/wen.mp3";
import wenImage from "./images/wen.jpg";

/**
 * allWords
 * 
 * Purpose: Represents a collection of Mi'kmaq words, each with its English translation,
 *          associated image, and audio file.
 */
const ALL_WORDS = [
  { word: "ni'n", translation: "I", image: ninImage, audio: ninAudio },
  { word: "ki'l", translation: "you", image: kilImage, audio: kilAudio },
  { word: "teluisi", translation: "My name is...", image: teluisiImage, audio: teluisiAudio },
  { word: "aqq", translation: "and", image: aqqImage, audio: aqqAudio },
  { word: "mijisi", translation: "eat", image: mijisiImage, audio: mijisiAudio },
  { word: "wiktm", translation: "I like the taste of it.", image: wiktmImage, audio: wiktmAudio },
  { word: "kesalk", translation: "I love", image: kesalkImage, audio: kesalkAudio },
  { word: "l'tu", translation: "Make it.", image: ltuImage, audio: ltuAudio },
  { word: "eliey", translation: "I am going.", image: elieyImage, audio: elieyAudio },
  { word: "nemitu", translation: "I see it", image: nemituImage, audio: nemituAudio },
  { word: "kesatm", translation: "I like", image: kesatmImage, audio: kesatmAudio },
  { word: "wejiey", translation: "I am coming from", image: wejieyImage, audio: wejieyAudio },
  { word: "ta'ta", translation: "Dad", image: tataImage, audio: tataAudio },
  { word: "kiju'", translation: "Mother or Grandmother", image: kijuImage, audio: kijuAudio },
  { word: "nekm", translation: "Him or Her", image: nekmImage, audio: nekmAudio },
  { word: "ala'tu", translation: "I have it", image: alatuImage, audio: alatuAudio },
  { word: "ula", translation: "Look at this", image: ulaImage, audio: ulaAudio },
  { word: "kesalul", translation: "I love you", image: kesalulImage, audio: kesalulAudio },
  { word: "welta'si", translation: "I am happy", image: weltasiImage, audio: weltasiAudio },
  { word: "wen", translation: "Who", image: wenImage, audio: wenAudio }
];

/**
 * word_info
 * 
 * Purpose: Transforms the `allWords` array into a simplified structure containing only
 *          the word text, associated image, and audio file for use in the game.
 */
const WORD_INFO = ALL_WORDS.map(item => ({
  text: item.word,
  image: item.image,
  audio: item.audio
}));

/**
 * WORDS
 * 
 * Purpose: Transforms the `allWords` array into a simplified structure containing only
 *          the word text, and english translation file for use in the game.
 */
const WORDS = ALL_WORDS.map(item => ({
  mikmaq: item.word,
  english: item.translation  
}));

// Export the processed data structures for use in other components
export {WORD_INFO, WORDS as words };
