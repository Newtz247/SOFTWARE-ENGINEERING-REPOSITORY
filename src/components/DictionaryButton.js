/**
 * DictionaryButton.js
 * 
 * Purpose: This component renders a button that opens a modal containing a dictionary
 *          of Mi'kmaq words and their English meanings. The button is styled and positioned
 *          on the page, and clicking it opens the dictionary in a modal.
 * 
 * Author: Tooba Javed (A00468904)
 */

import React, { useState } from 'react';
import DictionaryModal from './DictionaryModal';
import DictionaryImage from './images/DictionaryImage.png'

/**
 * DictionaryButton Component
 * 
 * Purpose: Renders a button labeled "Dictionary" that, when clicked, opens a modal displaying
 *          Mi'kmaq words with English translations.
 */
const DictionaryButton = () => {
  // State variable to control the visibility of the dictionary modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * openModal Function
   * 
   * Purpose: Sets the state to open the modal by setting isModalOpen to true.
   */
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
    <section className="Mobile-View flew lg:hidden">
      {/* Button that opens the dictionary modal */}
      <button 
       //ID for locating the button on the mobile view
      data-cy= "dictionary-button-mobile"
        className="w-[30vw] h-[7vh] bg-teal-600 text-gray-300 border border-teal-700 rounded-lg mt-0
                     shadow-sm hover:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-800 
                     transition-all font-comic flex items-center justify-center" 
        onClick={openModal}
      >
        <img src={DictionaryImage} className='h-[6vh]' alt='Dictionary'></img>
      </button>

      {/* Conditionally render the DictionaryModal if isModalOpen is true */}
      {isModalOpen && (
        <DictionaryModal closeModal={() => setIsModalOpen(false)} />
      )}
    </section>
    <section className="Dektop-View hidden lg:flex">
      {/* Button that opens the dictionary modal */}
      <button 
      //ID for locating the button on the desktop view
      data-cy ="dictionary-button-desktop"
        className="w-[8vw] bg-teal-600 text-gray-300 border border-teal-700 rounded-lg py-2 px-3 
                     shadow-sm hover:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-800 
                     transition-all font-comic flex items-center justify-center" 
        onClick={openModal}
      >
        <img src={DictionaryImage} className='h-[5vh]'alt='Dictionary'></img>
      </button>

      {/* Conditionally render the DictionaryModal if isModalOpen is true */}
      {isModalOpen && (
        <DictionaryModal closeModal={() => setIsModalOpen(false)} />
      )}
    </section>
    </div>
  );
};

export default DictionaryButton;