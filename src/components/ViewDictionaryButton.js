import {Button, Modal} from '@mantine/core';
import DictionaryModal from './DictionaryModal';
import { useState } from 'react';


export default function ViewDictionaryButton () {
   const [isModalOpen, setIsModalOpen] = useState(false);

   const openModal = () => {
    setIsModalOpen(true);
  };
    const closeModal = () => setIsModalOpen(false);
    return (
        <>
      <Modal
        opened={isModalOpen}
        onClose={closeModal}
        fullScreen
        radius={0}
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <DictionaryModal closeModal={() => setIsModalOpen(false)} /> 
      </Modal>
      <Button
            variant="filled"
            color="red"
            onClick ={openModal}
            style={{ 
                zIndex: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
            }}           
         >      
      View Dictionary
    </Button>
    </>
    );
}