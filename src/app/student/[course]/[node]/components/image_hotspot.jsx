'use client'
import React, { useState } from 'react';
import cell from '../../../../../lib/Cell-Biology.png';
import MdText from '@/app/utils/mdText';

const ImageHotspot = ({text, hotspots}) => {
  // State to keep track of which hotspot was clicked and whether modal is visible
  const [modalContent, setModalContent] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Click handler for hotspots
  const handleHotspotClick = (info) => {
    setModalContent(info); // Set modal content based on the clicked hotspot
    setIsModalVisible(true); // Show modal
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Background Image */}
      {/* <img 
        src={cell}
        alt="Hotspot Image" 
        style={{ width: '500px', height: 'auto' }} 
      /> */}
      <MdText>{text}</MdText>
      
      {/* Hotspot 1 */}
      {hotspots.map((e) => <div
        onClick={() => handleHotspotClick(e.info)}
        style={{
          position: 'absolute',
          top: `${e.top}%`,  // Adjust the position based on your image
          left: `${e.left}%`,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 0, 0, 0.5)', // Transparent red color
          cursor: 'pointer',
        }}
      ></div>)}
      
      
      

      {/* Modal */}
      {isModalVisible && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <p>{modalContent}</p>
            <button onClick={handleCloseModal} style={styles.okButton}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles for modal and button
const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  okButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ImageHotspot;
