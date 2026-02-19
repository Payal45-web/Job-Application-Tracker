import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EmptyState.css';

/**
 * EmptyState Component for when no jobs are available
 */
const EmptyState = () => {
  const navigate = useNavigate();

  return (
    <div className="empty-state">
      <div className="empty-state-icon">📭</div>
      <h2 className="empty-state-title">No Job Applications Yet</h2>
      <p className="empty-state-text">
        Start tracking your job applications by adding your first one!
      </p>
      <button className="btn btn-primary" onClick={() => navigate('/add')}>
        ➕ Add Your First Job
      </button>
    </div>
  );
};

export default EmptyState;