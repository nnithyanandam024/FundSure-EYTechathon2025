import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import { applicationService } from '../../services/applicationService';
import DashboardScreen from './DashboardScreen';
import ApplicationsScreen from './ApplicationsScreen';
import ApplicationModal from './ApplicationModal';

const FundSureAdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    totalApplications: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
    totalDisbursed: 0
  });
  const [selectedApp, setSelectedApp] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load applications and stats
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [appsResponse, statsResponse] = await Promise.all([
        applicationService.getAll(),
        applicationService.getStats()
      ]);

      if (appsResponse.success) {
        setApplications(appsResponse.data);
      }

      if (statsResponse.success) {
        setStats(statsResponse.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (appId) => {
    const result = await applicationService.approve(appId);
    if (result.success) {
      await loadData();
      setSelectedApp(null);
    }
  };

  const handleReject = async (appId) => {
    const result = await applicationService.reject(appId);
    if (result.success) {
      await loadData();
      setSelectedApp(null);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="spinner mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout pendingCount={stats.pending}>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardScreen
              applications={applications}
              stats={stats}
            />
          }
        />
        <Route  
          path="/applications"
          element={
            <ApplicationsScreen
              applications={applications}
              stats={stats}
              onViewDetails={setSelectedApp}
            />
          }
        />
        <Route path="/customers" element={<ComingSoon title="Customers" />} />
        <Route path="/analytics" element={<ComingSoon title="Analytics" />} />
        <Route path="/notifications" element={<ComingSoon title="Notifications" />} />
        <Route path="/settings" element={<ComingSoon title="Settings" />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      {/* Application Detail Modal */}
      {selectedApp && (
        <ApplicationModal
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </MainLayout>
  );
};

// Coming Soon placeholder for unimplemented sections
const ComingSoon = ({ title }) => (
  <div className="text-center py-20">
    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
      <span className="text-4xl">🚧</span>
    </div>
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
    <p className="text-gray-600 dark:text-gray-400 mb-8">This section is coming soon!</p>
  </div>
);

export default FundSureAdminDashboard;