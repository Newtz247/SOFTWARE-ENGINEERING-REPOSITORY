 /**
  * DictionaryButton.js
  * 
  * Purpose: This component renders a button that opens a modal containing a dictionary
  *          of Mi'kmaq words and their English meanings. The button is styled and positioned
  *          on the page, and clicking it opens the dictionary in a modal.
  * 
  * Author: Tooba Javed (A00468904)
  */

 import React, { useState, useEffect } from 'react';
 import DictionaryModal from './DictionaryModal';
 import DictionaryImage from './images/DictionaryImage.png'
import { getItem, setItem } from '../utils/localStorage.ts';

 /**
  * DictionaryButton Component
  * 
  * Purpose: Renders a button labeled "Dictionary" that, when clicked, opens a modal displaying
  *          Mi'kmaq words with English translations.
  */
const DictionaryButton = () => {
   // State variable to control the visibility of the dictionary modal
   const [isModalOpen, setIsModalOpen] = useState(false);

   // NEW: state for limiting dictionary access
   const MAX_DICTIONARY_USES = 3;
   const [usesLeft, setUsesLeft] = useState(() => {
      return getItem("dictionaryUsesLeft") ?? MAX_DICTIONARY_USES;
    });

    useEffect(() => {
      setItem("dictionaryUsesLeft", usesLeft);
    }, [usesLeft]);

   /**
    * openModal Function
    * 
    * Purpose: Sets the state to open the modal by setting isModalOpen to true.
    */
  const openModal = () => {
     // NEW: prevent opening when usesLeft is 0
     if (usesLeft <= 0) return;

     setIsModalOpen(true);
     setUsesLeft((prev) => prev - 1); // NEW: decrement use count each time opened
  };

  return (
    <div>
       <section className="Mobile-View flex lg:hidden">
        {/* Button that opens the dictionary modal */}
         <button 
          data-cy="dictionary-button-mobile"
           disabled={usesLeft <= 0} // NEW: disable when out of uses
          className={`w-[30vw] h-[7vh] border rounded-lg mt-0 shadow-sm transition-all font-comic 
            flex items-center justify-center ${
              usesLeft <= 0
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-teal-600 text-gray-300 border-teal-700 hover:bg-teal-700 focus:ring focus:ring-teal-800"
            }`}
          onClick={openModal}
        >
           <img src={DictionaryImage} className='h-[6vh]' alt='Dictionary' />
           {/* NEW: usage counter */}
           <span className="ml-2 text-lg font-bold text-white">{usesLeft}</span>
         </button>

        {/* Conditionally render the DictionaryModal if isModalOpen is true */}
         {isModalOpen && (
           <DictionaryModal closeModal={() => setIsModalOpen(false)} />
        )}
       </section>

       <section className="Desktop-View hidden lg:flex">
        {/* Button that opens the dictionary modal */}
         <button 
          data-cy="dictionary-button-desktop"
           disabled={usesLeft <= 0} // NEW: disable when out of uses
          className={`w-[8vw] py-2 px-3 border rounded-lg shadow-sm transition-all font-comic 
            flex items-center justify-center ${
              usesLeft <= 0
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-teal-600 text-gray-300 border-teal-700 hover:bg-teal-700 focus:ring focus:ring-teal-800"
            }`}
          onClick={openModal}
        >
           <img src={DictionaryImage} className='h-[5vh]' alt='Dictionary' />
           {/* NEW: usage counter */}
           <span className="ml-2 text-lg font-bold text-white">{usesLeft}</span>
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
