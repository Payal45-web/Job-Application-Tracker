import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Toast from './components/Toast';
import Dashboard from './pages/Dashboard';
import AllJobs from './pages/AllJobs';
import AddJob from './pages/AddJob';
import useJobs from './hooks/UseJob';  // ✅ Import the custom hook
import useTheme from './hooks/useTheme';
import './App.css';

function App() {
  // ✅ Use the custom hook instead of useState
  const { jobs, addJob, updateJob, deleteJob, getJobById } = useJobs();
  const { theme, toggleTheme } = useTheme();
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  return (
    <Router>
      <div className="app">
        <Header toggleTheme={toggleTheme} theme={theme} />
        
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  jobs={jobs} 
                  deleteJob={deleteJob}
                  showToast={showToast}
                />
              } 
            />
            <Route 
              path="/jobs" 
              element={
                <AllJobs 
                  jobs={jobs} 
                  deleteJob={deleteJob}
                  showToast={showToast}
                />
              } 
            />
            <Route 
              path="/add" 
              element={
                <AddJob 
                  addJob={addJob}
                  showToast={showToast}
                />
              } 
            />
            <Route 
              path="/edit/:id" 
              element={
                <AddJob 
                  updateJob={updateJob}
                  getJobById={getJobById}
                  showToast={showToast}
                />
              } 
            />
          </Routes>
        </main>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={closeToast}
          />
        )}
      </div>
    </Router>
  );
}

export default App;