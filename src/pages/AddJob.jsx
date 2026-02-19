import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { validateJobForm } from '../utils/helpers';
import './AddJob.css';

/**
 * AddJob Page - Form to add or edit job applications
 */
const AddJob = ({ addJob, updateJob, getJobById, showToast }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    companyName: '',
    jobRole: '',
    applicationDate: '',
    status: 'Applied'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load job data if editing
  useEffect(() => {
    if (isEditMode) {
      const job = getJobById(id);
      if (job) {
        setFormData({
          companyName: job.companyName,
          jobRole: job.jobRole,
          applicationDate: job.applicationDate,
          status: job.status
        });
      } else {
        showToast('Job not found!', 'error');
        navigate('/jobs');
      }
    }
  }, [id, isEditMode, getJobById, navigate, showToast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateJobForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast('Please fix the errors in the form', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      if (isEditMode) {
        updateJob(id, formData);
        showToast('Job updated successfully!', 'success');
      } else {
        addJob(formData);
        showToast('Job added successfully!', 'success');
      }
      
      setIsSubmitting(false);
      navigate('/jobs');
    }, 500);
  };

  const handleCancel = () => {
    navigate('/jobs');
  };

  return (
    <div className="add-job">
      <div className="container">
        <div className="form-container">
          <div className="form-header">
            <h1>{isEditMode ? '✏️ Edit Job Application' : '➕ Add New Job Application'}</h1>
            <p className="text-muted">
              {isEditMode 
                ? 'Update the details of your job application'
                : 'Fill in the details of your new job application'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="job-form">
            <div className="form-group">
              <label htmlFor="companyName">
                Company Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g., Google, Microsoft, Amazon"
                className={errors.companyName ? 'error' : ''}
              />
              {errors.companyName && (
                <span className="error-message">{errors.companyName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="jobRole">
                Job Role <span className="required">*</span>
              </label>
              <input
                type="text"
                id="jobRole"
                name="jobRole"
                value={formData.jobRole}
                onChange={handleChange}
                placeholder="e.g., Frontend Developer, Product Manager"
                className={errors.jobRole ? 'error' : ''}
              />
              {errors.jobRole && (
                <span className="error-message">{errors.jobRole}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="applicationDate">
                Application Date <span className="required">*</span>
              </label>
              <input
                type="date"
                id="applicationDate"
                name="applicationDate"
                value={formData.applicationDate}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                className={errors.applicationDate ? 'error' : ''}
              />
              {errors.applicationDate && (
                <span className="error-message">{errors.applicationDate}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="status">
                Application Status <span className="required">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={errors.status ? 'error' : ''}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
              {errors.status && (
                <span className="error-message">{errors.status}</span>
              )}
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="btn-loading">
                    <span className="spinner"></span>
                    {isEditMode ? 'Updating...' : 'Adding...'}
                  </span>
                ) : (
                  isEditMode ? 'Update Job' : 'Add Job'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJob;