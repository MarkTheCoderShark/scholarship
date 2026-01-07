import { useState, useEffect, useCallback } from 'react';
import { authAPI, profileAPI, setTokens, clearTokens, getAccessToken } from '../services/api';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check auth status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = getAccessToken();

    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await authAPI.getMe();
      setUser(response.data.user);
      setIsAuthenticated(true);

      // Try to get profile
      try {
        const profileResponse = await profileAPI.getProfile();
        setProfile(profileResponse.data);
      } catch (profileError) {
        // Profile might not exist yet - that's ok
        console.log('No profile found');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      clearTokens();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback(async (email, password) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await authAPI.login({ email, password });
      const { user, accessToken, refreshToken } = response.data;

      setTokens(accessToken, refreshToken);
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(user));

      // Try to get profile
      try {
        const profileResponse = await profileAPI.getProfile();
        setProfile(profileResponse.data);
      } catch (profileError) {
        // No profile yet
      }

      return { success: true, user };
    } catch (error) {
      const message = error.response?.data?.error || 'Login failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await authAPI.register({ name, email, password });
      const { user, accessToken, refreshToken } = response.data;

      setTokens(accessToken, refreshToken);
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(user));

      return { success: true, user };
    } catch (error) {
      const message = error.response?.data?.error ||
                      error.response?.data?.errors?.[0]?.msg ||
                      'Registration failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearTokens();
      setUser(null);
      setProfile(null);
      setIsAuthenticated(false);
    }
  }, []);

  const updateProfile = useCallback((newProfile) => {
    setProfile(newProfile);
  }, []);

  const updateUser = useCallback((updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  }, []);

  return {
    user,
    profile,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    updateUser,
    checkAuthStatus
  };
}
