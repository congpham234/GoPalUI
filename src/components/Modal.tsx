import React from 'react';
import './Modal.scss';
import CustomButton from './CustomButton';
import { FiX } from "react-icons/fi";

interface ModalProps {
  title: string;
  image: string;
  content: string;
  primaryactiontitle: string;
  secondaryactiontitle: string;
  isDisabled: boolean;
  primaryaction: () => void;
  secondaryaction: () => void;
  onClose: () => void;  // Add a prop for closing the modal
}

const Modal: React.FC<ModalProps> = ({ 
  title, 
  image, 
  content, 
  primaryactiontitle, 
  secondaryactiontitle, 
  isDisabled, 
  primaryaction, 
  secondaryaction, 
  onClose 
}) => {
  return (
    <div className="modal-overlay">
    <div className="modal">
      <div className="modal-title">
        <h2>{title}</h2>
        <FiX onClick={onClose} style={{ cursor: 'pointer' }} /> {/* Close button */}
      </div>
      <div className="modal-image">
      {image && <img src={image} alt={title} />}
      </div>
      <div className="modal-content">
        
        <p>{content}</p>
        <CustomButton 
          customVariant="primary" 
          onClick={primaryaction} 
          disabled={isDisabled}
        >
          {primaryactiontitle}
        </CustomButton>
        <CustomButton 
          customVariant="secondary" 
          onClick={secondaryaction} 
          disabled={isDisabled}
        >
          {secondaryactiontitle}
        </CustomButton>
      </div>
    </div>
    </div>
  );
};

export default Modal;
