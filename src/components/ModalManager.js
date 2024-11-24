import React, { useState, useEffect } from 'react';
import UserTypeModal from './UserTypeModal';
import UserEarlyAccessModal from './UserEarlyAccessModal';
import EarlyAccessModal from './EarlyAccessModal';

const ModalManager = ({ isOpen, onClose, lang = 'en-US' }) => {
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showMainModal, setShowMainModal] = useState(false);
  const [userType, setUserType] = useState(null);

  // Watch for isOpen changes and reset states accordingly
  useEffect(() => {
    if (isOpen) {
      setShowTypeModal(true);
    } else {
      // Reset all states when modal is closed
      setShowTypeModal(false);
      setShowMainModal(false);
      setUserType(null);
    }
  }, [isOpen]);

  // Handle the selection from UserTypeModal
  const handleTypeSelection = (type) => {
    setUserType(type);
    setShowTypeModal(false);
    setShowMainModal(true);
  };

  // Handle the main modal close
  const handleMainModalClose = () => {
    onClose();
  };

  // If the parent says we're not open, don't show anything
  if (!isOpen) return null;

  return (
    <>
      <UserTypeModal 
        isOpen={showTypeModal}
        onClose={onClose}
        onNext={handleTypeSelection}
      />
      
      {/* Show UserEarlyAccessModal for property seekers and others */}
      {showMainModal && (userType === 'seeker' || userType === 'other') && (
        <UserEarlyAccessModal 
          isOpen={true}
          onClose={handleMainModalClose}
          lang={lang}
          userType={userType}
        />
      )}

      {/* Show AgentEarlyAccessModal for agents */}
      {showMainModal && userType === 'agent' && (
        <EarlyAccessModal 
          isOpen={true}
          onClose={handleMainModalClose}
          lang={lang}
        />
      )}
    </>
  );
};

export default ModalManager;