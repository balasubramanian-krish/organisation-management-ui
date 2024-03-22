import React, { useState } from 'react';
import './Modal.css'; // Import CSS for styling modal (create this file as needed)

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h2>Modal Title</h2>
            <p>This is the modal content.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
