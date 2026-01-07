import React from 'react';
import {
  Box, FormControl, InputLabel, Select, MenuItem,
  FormControlLabel, Switch, Typography, FormHelperText,
  TextField, Autocomplete, Chip
} from '@mui/material';
import { MILITARY_STATUS_OPTIONS } from '../../../utils/constants';

const DISABILITY_TYPES = [
  'Visual Impairment',
  'Hearing Impairment',
  'Physical Disability',
  'Learning Disability',
  'ADHD',
  'Autism Spectrum',
  'Mental Health Condition',
  'Chronic Illness',
  'Other'
];

export default function BackgroundStep({ data, onUpdate }) {
  const handleChange = (field) => (event) => {
    onUpdate({ [field]: event.target.value });
  };

  const handleSwitchChange = (field) => (event) => {
    onUpdate({ [field]: event.target.checked });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        This information helps us match you with scholarships specifically designed
        for students with these backgrounds. All information is optional and confidential.
      </Typography>

      {/* First Generation */}
      <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <FormControlLabel
          control={
            <Switch
              checked={data.isFirstGeneration || false}
              onChange={handleSwitchChange('isFirstGeneration')}
            />
          }
          label="I am a first-generation college student"
        />
        <Typography variant="body2" color="text.secondary" sx={{ ml: 4.5, mt: 0.5 }}>
          Neither of your parents/guardians completed a 4-year college degree
        </Typography>
      </Box>

      {/* Disability */}
      <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <FormControlLabel
          control={
            <Switch
              checked={data.hasDisability || false}
              onChange={handleSwitchChange('hasDisability')}
            />
          }
          label="I have a disability"
        />
        <Typography variant="body2" color="text.secondary" sx={{ ml: 4.5, mt: 0.5 }}>
          Many scholarships support students with disabilities
        </Typography>

        {data.hasDisability && (
          <Box sx={{ mt: 2, ml: 4.5 }}>
            <Autocomplete
              multiple
              options={DISABILITY_TYPES}
              value={data.disabilityTypes || []}
              onChange={(event, newValue) => onUpdate({ disabilityTypes: newValue })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Type of Disability (optional)"
                  placeholder="Select all that apply"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option} {...getTagProps({ index })} key={index} size="small" />
                ))
              }
            />
          </Box>
        )}
      </Box>

      {/* Military Affiliation */}
      <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <FormControlLabel
          control={
            <Switch
              checked={data.isMilitary || false}
              onChange={handleSwitchChange('isMilitary')}
            />
          }
          label="I have a military affiliation"
        />
        <Typography variant="body2" color="text.secondary" sx={{ ml: 4.5, mt: 0.5 }}>
          Veteran, active duty, or military dependent
        </Typography>

        {data.isMilitary && (
          <Box sx={{ mt: 2, ml: 4.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Military Status</InputLabel>
              <Select
                value={data.militaryStatus || 'none'}
                label="Military Status"
                onChange={handleChange('militaryStatus')}
              >
                {MILITARY_STATUS_OPTIONS.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              size="small"
              label="Branch of Service (optional)"
              value={data.militaryBranch || ''}
              onChange={handleChange('militaryBranch')}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
