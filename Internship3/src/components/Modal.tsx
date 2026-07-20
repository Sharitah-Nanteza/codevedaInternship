import React, { useEffect } from 'react';
import './Modal.css'; // We can style this next

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // Close modal when 'Escape' key is pressed
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent background scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    // The backdrop overlay
    <div className="modal-overlay" onClick={onClose}>
      {/* ARIA Attributes Explained:
        - role="dialog": Tells screen readers this is a popup dialog
        - aria-modal="true": Tells screen readers to ignore everything behind it
        - aria-labelledby: Links the modal to its title for screen readers
      */}
      <div 
        className="modal-content" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
      >
        <header className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </header>
        
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};