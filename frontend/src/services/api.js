import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Token management
let accessToken = localStorage.getItem('accessToken');
let refreshToken = localStorage.getItem('refreshToken');

export const setTokens = (access, refresh) => {
  accessToken = access;
  refreshToken = refresh;
  if (access) {
    localStorage.setItem('accessToken', access);
  } else {
    localStorage.removeItem('accessToken');
  }
  if (refresh) {
    localStorage.setItem('refreshToken', refresh);
  } else {
    localStorage.removeItem('refreshToken');
  }
};

export const getAccessToken = () => accessToken;
export const getRefreshToken = () => refreshToken;

export const clearTokens = () => {
  accessToken = null;
  refreshToken = null;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we have a refresh token and haven't already retried
    if (error.response?.status === 401 &&
        refreshToken &&
        !originalRequest._retry &&
        error.response?.data?.code === 'TOKEN_EXPIRED') {

      originalRequest._retry = true;

      try {
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken
        });

        const newAccessToken = response.data.accessToken;
        setTokens(newAccessToken, refreshToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear tokens and redirect to login
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ===== AUTH API =====
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout', { refreshToken }),
  refresh: () => api.post('/auth/refresh', { refreshToken }),
  getMe: () => api.get('/auth/me'),
  changePassword: (data) => api.put('/auth/password', data)
};

// ===== PROFILE API =====
export const profileAPI = {
  getProfile: () => api.get('/profile/me'),
  updateProfile: (data) => api.post('/profile', data),
  updateSection: (section, data) => api.patch(`/profile/section/${section}`, data),
  getCompleteness: () => api.get('/profile/completeness'),

  // Onboarding
  saveOnboardingStep: (step, data) => api.post('/profile/onboarding', { step, data }),
  getOnboardingProgress: () => api.get('/profile/onboarding/progress')
};

// ===== SCHOLARSHIPS API =====
export const scholarshipsAPI = {
  // Public
  getAll: (params = {}) => api.get('/scholarships', { params }),
  getFilters: () => api.get('/scholarships/filters'),
  getById: (id) => api.get(`/scholarships/detail/${id}`),

  // Authenticated - matching
  getMatches: (params = {}) => api.get('/scholarships/match', { params }),
  getMatchScore: (scholarshipId) => api.get(`/scholarships/match-score/${scholarshipId}`)
};

export default api;
