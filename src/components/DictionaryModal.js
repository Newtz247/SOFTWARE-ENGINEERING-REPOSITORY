/**
 * DictionaryModal.js
 * 
 * Purpose: This component renders a modal displaying a grid of Mi'kmaq words alongside their
 *          English translations. Each word is represented on a flip card that, when clicked,
 *          flips to reveal an associated image and plays a pronunciation audio.
 * 
 * Author: Tooba Javed (A00468904)
 */

import React from 'react';
import FlipCard from './FlipCard';
import { words } from './WordBank';

/**
 * DictionaryModal Component
 * 
 * Purpose: This component renders a modal containing a grid of flip cards. Each card displays
 *          a Mi'kmaq word with its English translation and flips on click to reveal an image
 *          and play audio.
 * 
 * Parameters:
 * - closeModal: A function that closes the modal when the "X" button is clicked.
 */
const DictionaryModal = ({ closeModal }) => {
  
  // Map through the 'words' array to create a list of FlipCard components.
  // Each FlipCard receives 'mikmaq' and 'english' as props to display the word and its translation.
  const flipCards = words.map((word, index) => (
    <FlipCard 
      key={index} 
      mikmaqWord={word.mikmaq} 
      englishMeaning={word.english} 
    />
  ));

  return (
    <div>
      <section className="Mobile-View flex lg:hidden animate-fadeIn">
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center font-comic">
          {/* Modal container with a fixed background and centered content */}
          <div 
          //ID for the pop-up in the mobile version to check if it opens when clicked
          data-cy="dictionary-modal"
          className="bg-red-200 rounded-lg p-8 relative w-[98%] max-w-[400px] max-h-[86vh] overflow-y-auto overflow-x-hidden">
            
            {/* Close button - allows the user to close the modal */}
            <button 
              className="absolute bottom-[76vh] right-[3vw] text-red-700 text-8xl font-bold focus:outline-double" 
              onClick={closeModal}
            >
              ×
            </button>
            
            {/* Grid layout for displaying flip cards - set to two columns with spacing between cards */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-4 mt-2 mr-10 align-center">
              {flipCards}
            </div>
          </div>
        </div>
      </section>

      <section className="Desktop-View hidden lg:flex animate-fadeIn">
      <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center font-comic">
          {/* Modal container with a fixed background and centered content */}
          <div 
          //ID for the desktop version (if not added--> test crashes as there are 2 dictionary Modals)
          data-cy="dictionary-modal-desktop"
          className="bg-red-200 rounded-lg p-8 relative w-[98%] max-w-[80vw] max-h-[90vh] overflow-y-auto overflow-x-hidden">
            
          <div className='w-full inline-flex items-center justify-end'>
              {/* Close button - allows the user to close the modal */}
            <button 
              // className="absolute top-0 right-[2vw] text-red-700 text-8xl font-bold focus:outline-double" 
              className="text-red-700 text-8xl font-bold focus:outline-double" 
              onClick={closeModal}
            >
              ×
            </button>
          </div>
            
            {/* Grid layout for displaying flip cards - set to two columns with spacing between cards */}
            <div className="w-full grid grid-cols-5 gap-x-10 gap-y-4 mt-2 align-center">
              {flipCards}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DictionaryModal;