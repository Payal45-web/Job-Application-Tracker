import React from 'react';
import './StatCard.css';

/**
 * StatCard Component for displaying statistics
 * @param {string} title - Card title
 * @param {number} value - Statistic value
 * @param {string} icon - Icon to display
 * @param {string} color - Card color theme
 */
const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-title">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;