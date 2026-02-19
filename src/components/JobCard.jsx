import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/helpers';
import './JobCard.css';

/**
 * JobCard Component for displaying individual job applications
 * @param {object} job - Job data
 * @param {function} onDelete - Delete callback
 */
const JobCard = ({ job, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${job.id}`);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the application for ${job.companyName}?`)) {
      onDelete(job.id);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Applied':
        return 'badge-applied';
      case 'Interview':
        return 'badge-interview';
      case 'Selected':
        return 'badge-selected';
      case 'Rejected':
        return 'badge-rejected';
      default:
        return 'badge-applied';
    }
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <div>
          <h3 className="job-company">{job.companyName}</h3>
          <p className="job-role">{job.jobRole}</p>
        </div>
        <span className={`badge ${getStatusClass(job.status)}`}>
          {job.status}
        </span>
      </div>

      <div className="job-card-body">
        <div className="job-info">
          <span className="job-info-label">📅 Applied on:</span>
          <span className="job-info-value">{formatDate(job.applicationDate)}</span>
        </div>
      </div>

      <div className="job-card-footer">
        <button className="btn btn-sm btn-secondary" onClick={handleEdit}>
          ✏️ Edit
        </button>
        <button className="btn btn-sm btn-danger" onClick={handleDelete}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;