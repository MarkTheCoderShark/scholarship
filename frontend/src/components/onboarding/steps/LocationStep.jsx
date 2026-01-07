import React from 'react';
import {
  Box, TextField, FormControl, InputLabel, Select, MenuItem,
  Autocomplete, FormHelperText
} from '@mui/material';
import { US_STATES } from '../../../utils/constants';

export default function LocationStep({ data, onUpdate }) {
  const handleChange = (field) => (event) => {
    onUpdate({ [field]: event.target.value });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Country */}
      <TextField
        fullWidth
        label="Country"
        value={data.country || 'United States'}
        onChange={handleChange('country')}
        helperText="Your current country of residence"
      />

      {/* State (for US residents) */}
      {(data.country === 'United States' || !data.country) && (
        <Autocomplete
          options={US_STATES}
          value={data.state || ''}
          onChange={(event, newValue) => onUpdate({ state: newValue })}
          renderInput={(params) => (
            <TextField
              {...params}
              label="State"
              helperText="Many scholarships are state-specific"
            />
          )}
        />
      )}

      {/* City */}
      <TextField
        fullWidth
        label="City"
        value={data.city || ''}
        onChange={handleChange('city')}
        helperText="Optional - some scholarships are city-specific"
      />
    </Box>
  );
}
