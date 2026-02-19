/**
 * Utility functions for the Job Tracker application
 */

// Format date to readable string
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Export jobs to CSV
export const exportToCSV = (jobs) => {
  if (jobs.length === 0) {
    alert('No jobs to export!');
    return;
  }

  const headers = ['Company Name', 'Job Role', 'Application Date', 'Status'];
  const csvContent = [
    headers.join(','),
    ...jobs.map(job =>
      [
        `"${job.companyName}"`,
        `"${job.jobRole}"`,
        job.applicationDate,
        job.status
      ].join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `job-applications-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Sort jobs by date
export const sortJobsByDate = (jobs, order = 'desc') => {
  return [...jobs].sort((a, b) => {
    const dateA = new Date(a.applicationDate);
    const dateB = new Date(b.applicationDate);
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

// Filter jobs by status
export const filterJobsByStatus = (jobs, status) => {
  if (!status || status === 'All') return jobs;
  return jobs.filter(job => job.status === status);
};

// Search jobs by company name
export const searchJobs = (jobs, searchTerm) => {
  if (!searchTerm) return jobs;
  const lowerSearch = searchTerm.toLowerCase();
  return jobs.filter(job =>
    job.companyName.toLowerCase().includes(lowerSearch) ||
    job.jobRole.toLowerCase().includes(lowerSearch)
  );
};

// Validate job form
export const validateJobForm = (formData) => {
  const errors = {};

  if (!formData.companyName || formData.companyName.trim() === '') {
    errors.companyName = 'Company name is required';
  }

  if (!formData.jobRole || formData.jobRole.trim() === '') {
    errors.jobRole = 'Job role is required';
  }

  if (!formData.applicationDate) {
    errors.applicationDate = 'Application date is required';
  }

  if (!formData.status) {
    errors.status = 'Status is required';
  }

  return errors;
};