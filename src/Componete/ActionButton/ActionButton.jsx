// components/ActionButton.js
import React from 'react';
import './ActionButton.css';

function ActionButton({ onClick, children, disabled, title }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="action-button"
      title={title}
    >
      {children}
    </button>
  );
}

export default ActionButton;