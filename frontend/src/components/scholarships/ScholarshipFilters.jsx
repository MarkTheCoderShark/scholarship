import React from 'react';
import {
  Box, Typography, Slider, TextField, FormControl, InputLabel,
  Select, MenuItem, Chip, FormControlLabel, Switch, Button,
  Accordion, AccordionSummary, AccordionDetails, Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import { SCHOOL_LEVEL_OPTIONS } from '../../utils/constants';

const SORT_OPTIONS = [
  { value: 'score', label: 'Match Score' },
  { value: 'deadline', label: 'Deadline (Soonest)' },
  { value: 'amount', label: 'Amount (Highest)' },
  { value: 'title', label: 'Title (A-Z)' }
];

export default function ScholarshipFilters({
  filters,
  onFilterChange,
  onClearFilters,
  isAuthenticated,
  availableFields = []
}) {
  const handleChange = (field) => (event) => {
    const value = event.target?.value ?? event;
    onFilterChange({ ...filters, [field]: value });
  };

  const handleScoreChange = (event, newValue) => {
    onFilterChange({ ...filters, minScore: newValue });
  };

  const handleAmountChange = (field) => (event) => {
    const value = event.target.value ? parseInt(event.target.value, 10) : '';
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterListIcon color="primary" />
          <Typography variant="h6">Filters</Typography>
        </Box>
        <Button
          size="small"
          startIcon={<ClearIcon />}
          onClick={onClearFilters}
        >
          Clear
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Sort */}
      <FormControl fullWidth size="small" sx={{ mb: 3 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={filters.sort || 'score'}
          label="Sort By"
          onChange={handleChange('sort')}
        >
          {SORT_OPTIONS.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Match Score Filter - Only for authenticated users */}
      {isAuthenticated && (
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">Match Score</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Minimum: {filters.minScore || 0}%
            </Typography>
            <Slider
              value={filters.minScore || 0}
              onChange={handleScoreChange}
              min={0}
              max={100}
              step={5}
              marks={[
                { value: 0, label: '0%' },
                { value: 50, label: '50%' },
                { value: 100, label: '100%' }
              ]}
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => `${v}%`}
            />
          </AccordionDetails>
        </Accordion>
      )}

      {/* Amount Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2">Amount</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              label="Min ($)"
              type="number"
              value={filters.minAmount || ''}
              onChange={handleAmountChange('minAmount')}
              inputProps={{ min: 0 }}
            />
            <TextField
              size="small"
              label="Max ($)"
              type="number"
              value={filters.maxAmount || ''}
              onChange={handleAmountChange('maxAmount')}
              inputProps={{ min: 0 }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Deadline Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2">Deadline</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControlLabel
            control={
              <Switch
                checked={filters.hideExpired || false}
                onChange={(e) => onFilterChange({ ...filters, hideExpired: e.target.checked })}
              />
            }
            label="Hide expired"
          />
          <TextField
            size="small"
            fullWidth
            label="Due before"
            type="date"
            value={filters.deadlineBefore || ''}
            onChange={handleChange('deadlineBefore')}
            InputLabelProps={{ shrink: true }}
            sx={{ mt: 2 }}
          />
        </AccordionDetails>
      </Accordion>

      {/* School Level Filter */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2">Education Level</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth size="small">
            <InputLabel>School Level</InputLabel>
            <Select
              multiple
              value={filters.schoolLevels || []}
              label="School Level"
              onChange={handleChange('schoolLevels')}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={SCHOOL_LEVEL_OPTIONS.find(o => o.value === value)?.label || value}
                      size="small"
                    />
                  ))}
                </Box>
              )}
            >
              {SCHOOL_LEVEL_OPTIONS.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* Field of Study Filter */}
      {availableFields.length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">Field of Study</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl fullWidth size="small">
              <InputLabel>Fields</InputLabel>
              <Select
                multiple
                value={filters.fields || []}
                label="Fields"
                onChange={handleChange('fields')}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {availableFields.map(field => (
                  <MenuItem key={field} value={field}>
                    {field}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Keyword Search */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2">Keyword Search</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            size="small"
            fullWidth
            label="Search"
            placeholder="e.g., engineering, women, STEM"
            value={filters.keyword || ''}
            onChange={handleChange('keyword')}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
