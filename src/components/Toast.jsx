import React, { useEffect } from 'react';
import './Toast.css';

/**
 * Toast Component for displaying temporary notifications
 * @param {string} message - Message to display
 * @param {string} type - Type of toast (success, error, info, warning)
 * @param {function} onClose - Callback when toast closes
 */
const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <span className="toast-icon">{getIcon(type)}</span>
        <p className="toast-message">{message}</p>
      </div>
      <button className="toast-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return '✓';
    case 'error':
      return '✕';
    case 'warning':
      return '⚠';
    default:
      return 'ℹ';
  }
};

export default Toast;