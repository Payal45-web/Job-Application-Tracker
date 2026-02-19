import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import StatCard from '../components/StatCard';
import JobCard from '../components/JobCard';
import EmptyState from '../components/EmptyState';
import { exportToCSV, sortJobsByDate } from '../utils/helpers';
import './Dashboard.css';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

/**
 * Dashboard Page - Main overview of job applications
 */
const Dashboard = ({ jobs, deleteJob, showToast }) => {
  const navigate = useNavigate();

  // Calculate statistics
  const stats = {
    total: jobs.length,
    applied: jobs.filter(job => job.status === 'Applied').length,
    interview: jobs.filter(job => job.status === 'Interview').length,
    rejected: jobs.filter(job => job.status === 'Rejected').length,
    selected: jobs.filter(job => job.status === 'Selected').length
  };

  // Get recent jobs (last 5)
  const recentJobs = sortJobsByDate(jobs, 'desc').slice(0, 5);

  // Chart data for Pie chart
  const pieData = {
    labels: ['Applied', 'Interview', 'Rejected', 'Selected'],
    datasets: [
      {
        data: [stats.applied, stats.interview, stats.rejected, stats.selected],
        backgroundColor: [
          'rgba(67, 97, 238, 0.8)',
          'rgba(255, 214, 10, 0.8)',
          'rgba(239, 71, 111, 0.8)',
          'rgba(6, 214, 160, 0.8)',
        ],
        borderColor: [
          'rgb(67, 97, 238)',
          'rgb(255, 214, 10)',
          'rgb(239, 71, 111)',
          'rgb(6, 214, 160)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Chart data for Bar chart
  const barData = {
    labels: ['Applied', 'Interview', 'Rejected', 'Selected'],
    datasets: [
      {
        label: 'Applications',
        data: [stats.applied, stats.interview, stats.rejected, stats.selected],
        backgroundColor: [
          'rgba(67, 97, 238, 0.8)',
          'rgba(255, 214, 10, 0.8)',
          'rgba(239, 71, 111, 0.8)',
          'rgba(6, 214, 160, 0.8)',
        ],
        borderColor: [
          'rgb(67, 97, 238)',
          'rgb(255, 214, 10)',
          'rgb(239, 71, 111)',
          'rgb(6, 214, 160)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            size: 12,
          },
          color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary'),
        },
      },
    },
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary'),
        },
        grid: {
          color: getComputedStyle(document.documentElement).getPropertyValue('--border-color'),
        },
      },
      x: {
        ticks: {
          color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary'),
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const handleExport = () => {
    exportToCSV(jobs);
    showToast('Jobs exported successfully!', 'success');
  };

  const handleDelete = (id) => {
    deleteJob(id);
    showToast('Job deleted successfully!', 'success');
  };

  if (jobs.length === 0) {
    return (
      <div className="dashboard">
        <div className="container">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p className="text-muted">Track and manage all your job applications</p>
          </div>
          <button className="btn btn-success btn-icon" onClick={handleExport}>
            📥 Export to CSV
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <StatCard
            title="Total Applications"
            value={stats.total}
            icon="📊"
            color="primary"
          />
          <StatCard
            title="Applied"
            value={stats.applied}
            icon="📝"
            color="blue"
          />
          <StatCard
            title="Interviews"
            value={stats.interview}
            icon="💼"
            color="yellow"
          />
          <StatCard
            title="Selected"
            value={stats.selected}
            icon="✅"
            color="green"
          />
        </div>

        {/* Charts Section */}
        {stats.total > 0 && (
          <div className="charts-section">
            <h2>Application Analytics</h2>
            <div className="charts-grid">
              <div className="chart-container">
                <h3>Status Distribution</h3>
                <div className="chart-wrapper">
                  <Pie data={pieData} options={chartOptions} />
                </div>
              </div>
              <div className="chart-container">
                <h3>Status Comparison</h3>
                <div className="chart-wrapper">
                  <Bar data={barData} options={barOptions} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Applications */}
        <div className="recent-section">
          <div className="section-header">
            <h2>Recent Applications</h2>
            <button 
              className="btn btn-outline btn-sm" 
              onClick={() => navigate('/jobs')}
            >
              View All →
            </button>
          </div>
          <div className="jobs-grid">
            {recentJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;