// Mock authentication service for demo

export const authService = {
  // Login
  login: async (email, password) => {
    try {
      // For demo purposes, use mock authentication
      if (email === 'admin@fundsure.com' && password === 'admin123') {
        const mockUser = {
          id: 1,
          name: 'Admin User',
          email: 'admin@fundsure.com',
          role: 'Administrator',
        };
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        return { user: mockUser, token: mockToken };
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    try {
      const userJson = localStorage.getItem('user');
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};