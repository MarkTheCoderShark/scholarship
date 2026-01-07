import React, { useEffect, useState, useContext, useCallback } from 'react';
import {
  Container, Grid, Box, Typography, Alert, CircularProgress,
  Pagination, Paper, Drawer, IconButton, useMediaQuery, useTheme,
  Chip, Button
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { UserContext } from './UserContext';
import api from '../services/api';
import ScholarshipCard from './scholarships/ScholarshipCard';
import ScholarshipFilters from './scholarships/ScholarshipFilters';

const ITEMS_PER_PAGE = 12;

const ScholarshipList = () => {
  const { isAuthenticated, user } = useContext(UserContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [scholarships, setScholarships] = useState([]);
  const [matchData, setMatchData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [availableFields, setAvailableFields] = useState([]);

  const [filters, setFilters] = useState({
    sort: 'score',
    minScore: 0,
    minAmount: '',
    maxAmount: '',
    hideExpired: true,
    deadlineBefore: '',
    schoolLevels: [],
    fields: [],
    keyword: ''
  });

  const fetchScholarships = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', ITEMS_PER_PAGE);

      if (filters.sort) params.append('sort', filters.sort);
      if (filters.minAmount) params.append('minAmount', filters.minAmount);
      if (filters.maxAmount) params.append('maxAmount', filters.maxAmount);
      if (filters.hideExpired) params.append('hideExpired', 'true');
      if (filters.deadlineBefore) params.append('deadlineBefore', filters.deadlineBefore);
      if (filters.schoolLevels?.length > 0) params.append('schoolLevels', filters.schoolLevels.join(','));
      if (filters.fields?.length > 0) params.append('fields', filters.fields.join(','));
      if (filters.keyword) params.append('keyword', filters.keyword);

      let response;

      if (isAuthenticated && user) {
        // Use matching endpoint for authenticated users
        if (filters.minScore > 0) params.append('minScore', filters.minScore);
        response = await api.get(`/scholarships/match?${params.toString()}`);

        // Process match data
        const matches = {};
        response.data.scholarships.forEach(item => {
          if (item.matchData) {
            matches[item.scholarship._id] = item.matchData;
          }
        });
        setMatchData(matches);
        setScholarships(response.data.scholarships.map(item => item.scholarship));
      } else {
        // Public endpoint for non-authenticated users
        response = await api.get(`/scholarships?${params.toString()}`);
        setScholarships(response.data.scholarships || response.data);
        setMatchData({});
      }

      setTotalCount(response.data.total || response.data.length || 0);
      setTotalPages(response.data.totalPages || Math.ceil((response.data.total || response.data.length) / ITEMS_PER_PAGE));
    } catch (err) {
      console.error('Error fetching scholarships:', err);
      setError('Failed to load scholarships. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [page, filters, isAuthenticated, user]);

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await api.get('/scholarships/filters');
        setAvailableFields(response.data.fields || []);
      } catch (err) {
        console.error('Error fetching filter options:', err);
      }
    };
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    fetchScholarships();
  }, [fetchScholarships]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      sort: 'score',
      minScore: 0,
      minAmount: '',
      maxAmount: '',
      hideExpired: true,
      deadlineBefore: '',
      schoolLevels: [],
      fields: [],
      keyword: ''
    });
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeFilterCount = [
    filters.minScore > 0,
    filters.minAmount,
    filters.maxAmount,
    !filters.hideExpired,
    filters.deadlineBefore,
    filters.schoolLevels?.length > 0,
    filters.fields?.length > 0,
    filters.keyword
  ].filter(Boolean).length;

  const FilterContent = (
    <ScholarshipFilters
      filters={filters}
      onFilterChange={handleFilterChange}
      onClearFilters={handleClearFilters}
      isAuthenticated={isAuthenticated}
      availableFields={availableFields}
    />
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {isAuthenticated ? 'Your Scholarship Matches' : 'Available Scholarships'}
        </Typography>
        {isAuthenticated && user?.onboardingCompleted && (
          <Typography variant="body1" color="text.secondary">
            Scholarships matched to your profile. Higher scores mean better fit.
          </Typography>
        )}
        {isAuthenticated && !user?.onboardingCompleted && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Complete your profile to get personalized scholarship matches with match scores.
          </Alert>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Filters - Desktop Sidebar */}
        {!isMobile && (
          <Grid item md={3}>
            <Paper sx={{ p: 2, position: 'sticky', top: 80 }}>
              {FilterContent}
            </Paper>
          </Grid>
        )}

        {/* Scholarships Grid */}
        <Grid item xs={12} md={9}>
          {/* Mobile Filter Button & Results Count */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {totalCount} scholarship{totalCount !== 1 ? 's' : ''} found
              </Typography>
              {activeFilterCount > 0 && (
                <Chip
                  label={`${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''}`}
                  size="small"
                  onDelete={handleClearFilters}
                />
              )}
            </Box>

            {isMobile && (
              <Button
                startIcon={<FilterListIcon />}
                onClick={() => setMobileFilterOpen(true)}
                variant="outlined"
                size="small"
              >
                Filters
              </Button>
            )}
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : scholarships.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                No scholarships found
              </Typography>
              <Typography color="text.secondary">
                Try adjusting your filters or search criteria.
              </Typography>
              <Button onClick={handleClearFilters} sx={{ mt: 2 }}>
                Clear Filters
              </Button>
            </Paper>
          ) : (
            <>
              <Grid container spacing={2}>
                {scholarships.map((scholarship) => (
                  <Grid item xs={12} sm={6} lg={4} key={scholarship._id}>
                    <ScholarshipCard
                      scholarship={scholarship}
                      matchData={matchData[scholarship._id]}
                      showMatchInfo={isAuthenticated && user?.onboardingCompleted}
                    />
                  </Grid>
                ))}
              </Grid>

              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size={isMobile ? 'small' : 'medium'}
                  />
                </Box>
              )}
            </>
          )}
        </Grid>
      </Grid>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="right"
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={() => setMobileFilterOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          {FilterContent}
        </Box>
      </Drawer>
    </Container>
  );
};

export default ScholarshipList;
