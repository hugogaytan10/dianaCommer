// src/components/Modal.tsx
import React from 'react';
import './Modal.css';



export const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-content-custom">
        <button onClick={onClose} className="modal-close-button-custom">Close</button>
        {children}
      </div>
    </div>
  );
};

