import React from 'react';
import {
  Box, TextField, FormControl, InputLabel, Select, MenuItem,
  Autocomplete, Chip, FormHelperText
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { GENDER_OPTIONS, CITIZENSHIP_OPTIONS, ETHNICITY_OPTIONS } from '../../../utils/constants';

export default function PersonalInfoStep({ data, onUpdate }) {
  const handleChange = (field) => (event) => {
    onUpdate({ [field]: event.target.value });
  };

  const handleDateChange = (date) => {
    onUpdate({ dateOfBirth: date ? date.toISOString() : null });
  };

  const handleEthnicityChange = (event, newValue) => {
    onUpdate({ ethnicity: newValue.map(v => v.value || v) });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Date of Birth */}
        <DatePicker
          label="Date of Birth"
          value={data.dateOfBirth ? dayjs(data.dateOfBirth) : null}
          onChange={handleDateChange}
          slotProps={{
            textField: {
              fullWidth: true,
              helperText: "Used to determine age-based eligibility"
            }
          }}
        />

        {/* Gender */}
        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select
            value={data.gender || ''}
            label="Gender"
            onChange={handleChange('gender')}
          >
            {GENDER_OPTIONS.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Some scholarships target specific genders</FormHelperText>
        </FormControl>

        {/* Ethnicity */}
        <Autocomplete
          multiple
          options={ETHNICITY_OPTIONS}
          getOptionLabel={(option) => option.label || option}
          value={ETHNICITY_OPTIONS.filter(opt =>
            (data.ethnicity || []).includes(opt.value)
          )}
          onChange={handleEthnicityChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Ethnicity"
              helperText="Select all that apply - some scholarships target specific backgrounds"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option.label}
                {...getTagProps({ index })}
                key={option.value}
              />
            ))
          }
        />

        {/* Citizenship Status */}
        <FormControl fullWidth>
          <InputLabel>Citizenship Status</InputLabel>
          <Select
            value={data.citizenshipStatus || ''}
            label="Citizenship Status"
            onChange={handleChange('citizenshipStatus')}
          >
            {CITIZENSHIP_OPTIONS.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Many scholarships have citizenship requirements</FormHelperText>
        </FormControl>

        {/* Country of Origin */}
        {(data.citizenshipStatus === 'international' || data.citizenshipStatus === 'refugee') && (
          <TextField
            fullWidth
            label="Country of Origin"
            value={data.countryOfOrigin || ''}
            onChange={handleChange('countryOfOrigin')}
            helperText="Some scholarships target students from specific countries"
          />
        )}
      </Box>
    </LocalizationProvider>
  );
}
