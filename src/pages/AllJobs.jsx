import React, { useState, useMemo } from 'react';
import JobCard from '../components/JobCard';
import EmptyState from '../components/EmptyState';
import { filterJobsByStatus, searchJobs, sortJobsByDate } from '../utils/helpers';
import './AllJobs.css';

/**
 * AllJobs Page - Display all job applications with filtering and search
 */
const AllJobs = ({ jobs, deleteJob, showToast }) => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;

  // Apply filters and search
  const filteredJobs = useMemo(() => {
    let result = jobs;

    // Apply status filter
    result = filterJobsByStatus(result, statusFilter);

    // Apply search
    result = searchJobs(result, searchTerm);

    // Apply sorting
    result = sortJobsByDate(result, sortOrder);

    return result;
  }, [jobs, statusFilter, searchTerm, sortOrder]);

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleDelete = (id) => {
    deleteJob(id);
    showToast('Job deleted successfully!', 'success');
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (jobs.length === 0) {
    return (
      <div className="all-jobs">
        <div className="container">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="all-jobs">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>All Job Applications</h1>
            <p className="text-muted">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'application' : 'applications'} found
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="filters-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Search by company or role..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
            />
          </div>

          <div className="filter-controls">
            <div className="filter-group">
              <label htmlFor="status-filter">Filter by Status:</label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="filter-select"
              >
                <option value="All">All Status</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="sort-order">Sort by Date:</label>
              <select
                id="sort-order"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="filter-select"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No jobs found</h3>
            <p>Try adjusting your filters or search term</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setStatusFilter('All');
                setSearchTerm('');
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="jobs-grid">
              {currentJobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </button>

                <div className="pagination-numbers">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllJobs;