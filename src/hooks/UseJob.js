import { useState, useEffect } from 'react';

const useJobs = () => {
  // Load from LocalStorage on initialization
  const [jobs, setJobs] = useState(() => {
    try {
      const savedJobs = localStorage.getItem('jobApplications');
      if (savedJobs) {
        return JSON.parse(savedJobs);
      }
      return [];
    } catch (error) {
      console.error('Error loading jobs from LocalStorage:', error);
      return [];
    }
  });

  // Save to LocalStorage whenever jobs change
  useEffect(() => {
    try {
      localStorage.setItem('jobApplications', JSON.stringify(jobs));
    } catch (error) {
      console.error('Error saving jobs to LocalStorage:', error);
    }
  }, [jobs]);

  const addJob = (job) => {
    const newJob = {
      id: Date.now().toString(),
      ...job,
      createdAt: new Date().toISOString()
    };
    setJobs(prevJobs => [...prevJobs, newJob]);
    return newJob;
  };

  const updateJob = (id, updatedJob) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === id ? { ...job, ...updatedJob } : job
      )
    );
  };

  const deleteJob = (id) => {
    setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
  };

  const getJobById = (id) => {
    return jobs.find(job => job.id === id);
  };

  const getStats = () => {
    return {
      total: jobs.length,
      applied: jobs.filter(job => job.status === 'Applied').length,
      interview: jobs.filter(job => job.status === 'Interview').length,
      rejected: jobs.filter(job => job.status === 'Rejected').length,
      selected: jobs.filter(job => job.status === 'Selected').length
    };
  };

  return {
    jobs,
    addJob,
    updateJob,
    deleteJob,
    getJobById,
    getStats
  };
};

export default useJobs;