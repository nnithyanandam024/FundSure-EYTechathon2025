import api from './api';

// Mock data for demo
const mockApplications = [
  {
    id: 1,
    applicationId: 'APP-1245',
    customerName: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phoneNumber: '+91 98765 43210',
    loanAmount: 500000,
    tenure: 24,
    purpose: 'Home Renovation',
    creditScore: 750,
    status: 'approved',
    submittedDate: '2024-12-15',
  },
  {
    id: 2,
    applicationId: 'APP-1244',
    customerName: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phoneNumber: '+91 98765 43211',
    loanAmount: 350000,
    tenure: 36,
    purpose: 'Business Expansion',
    creditScore: 720,
    status: 'pending',
    submittedDate: '2024-12-15',
  },
  {
    id: 3,
    applicationId: 'APP-1243',
    customerName: 'Amit Patel',
    email: 'amit.patel@example.com',
    phoneNumber: '+91 98765 43212',
    loanAmount: 700000,
    tenure: 48,
    purpose: 'Vehicle Purchase',
    creditScore: 680,
    status: 'under_review',
    submittedDate: '2024-12-14',
  },
  {
    id: 4,
    applicationId: 'APP-1242',
    customerName: 'Sneha Reddy',
    email: 'sneha.reddy@example.com',
    phoneNumber: '+91 98765 43213',
    loanAmount: 280000,
    tenure: 12,
    purpose: 'Education',
    creditScore: 780,
    status: 'approved',
    submittedDate: '2024-12-14',
  },
  {
    id: 5,
    applicationId: 'APP-1241',
    customerName: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    phoneNumber: '+91 98765 43214',
    loanAmount: 620000,
    tenure: 60,
    purpose: 'Debt Consolidation',
    creditScore: 650,
    status: 'rejected',
    submittedDate: '2024-12-13',
  },
  {
    id: 6,
    applicationId: 'APP-1240',
    customerName: 'Anjali Mehta',
    email: 'anjali.mehta@example.com',
    phoneNumber: '+91 98765 43215',
    loanAmount: 450000,
    tenure: 36,
    purpose: 'Medical Emergency',
    creditScore: 710,
    status: 'approved',
    submittedDate: '2024-12-13',
  },
  {
    id: 7,
    applicationId: 'APP-1239',
    customerName: 'Sanjay Gupta',
    email: 'sanjay.gupta@example.com',
    phoneNumber: '+91 98765 43216',
    loanAmount: 300000,
    tenure: 24,
    purpose: 'Wedding',
    creditScore: 690,
    status: 'pending',
    submittedDate: '2024-12-12',
  },
  {
    id: 8,
    applicationId: 'APP-1238',
    customerName: 'Neha Kapoor',
    email: 'neha.kapoor@example.com',
    phoneNumber: '+91 98765 43217',
    loanAmount: 550000,
    tenure: 48,
    purpose: 'Home Purchase',
    creditScore: 760,
    status: 'under_review',
    submittedDate: '2024-12-12',
  },
];

export const applicationService = {
  // Get all applications
  getApplications: async (params = {}) => {
    try {
      // For demo, return mock data
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
      return mockApplications;

      // Uncomment for real API:
      // const response = await api.get('/applications', { params });
      // return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get application by ID
  getApplicationById: async (id) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const application = mockApplications.find((app) => app.id === id);
      if (!application) {
        throw new Error('Application not found');
      }
      return application;

      // Uncomment for real API:
      // const response = await api.get(`/applications/${id}`);
      // return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new application
  createApplication: async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newApp = {
        ...data,
        id: mockApplications.length + 1,
        applicationId: `APP-${1239 + mockApplications.length}`,
        submittedDate: new Date().toISOString().split('T')[0],
      };
      mockApplications.push(newApp);
      return newApp;

      // Uncomment for real API:
      // const response = await api.post('/applications', data);
      // return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update application
  updateApplication: async (id, data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const index = mockApplications.findIndex((app) => app.id === id);
      if (index !== -1) {
        mockApplications[index] = { ...mockApplications[index], ...data };
        return mockApplications[index];
      }
      throw new Error('Application not found');

      // Uncomment for real API:
      // const response = await api.put(`/applications/${id}`, data);
      // return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete application
  deleteApplication: async (id) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const index = mockApplications.findIndex((app) => app.id === id);
      if (index !== -1) {
        mockApplications.splice(index, 1);
        return { success: true };
      }
      throw new Error('Application not found');

      // Uncomment for real API:
      // const response = await api.delete(`/applications/${id}`);
      // return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update application status
  updateStatus: async (id, status) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const index = mockApplications.findIndex((app) => app.id === id);
      if (index !== -1) {
        mockApplications[index].status = status;
        return mockApplications[index];
      }
      throw new Error('Application not found');

      // Uncomment for real API:
      // const response = await api.patch(`/applications/${id}/status`, { status });
      // return response.data;
    } catch (error) {
      throw error;
    }
  },
};