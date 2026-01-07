import React from 'react';
import {
  Box, TextField, FormControl, InputLabel, Select, MenuItem,
  Autocomplete, Chip, FormHelperText, Slider, Typography
} from '@mui/material';
import { SCHOOL_LEVEL_OPTIONS, FIELDS_OF_STUDY } from '../../../utils/constants';

export default function AcademicInfoStep({ data, onUpdate }) {
  const handleChange = (field) => (event) => {
    onUpdate({ [field]: event.target.value });
  };

  const handleGpaChange = (event, newValue) => {
    onUpdate({ gpa: newValue });
  };

  const handleFieldsChange = (event, newValue) => {
    onUpdate({ fieldsOfStudy: newValue });
  };

  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 10 }, (_, i) => currentYear + i);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* GPA */}
      <Box>
        <Typography gutterBottom>
          GPA: {data.gpa?.toFixed(2) || '0.00'} / 4.0
        </Typography>
        <Slider
          value={data.gpa || 0}
          onChange={handleGpaChange}
          min={0}
          max={4}
          step={0.01}
          marks={[
            { value: 0, label: '0.0' },
            { value: 2, label: '2.0' },
            { value: 3, label: '3.0' },
            { value: 4, label: '4.0' }
          ]}
        />
        <FormHelperText>Many scholarships have minimum GPA requirements</FormHelperText>
      </Box>

      {/* School Level */}
      <FormControl fullWidth>
        <InputLabel>Current Education Level</InputLabel>
        <Select
          value={data.schoolLevel || ''}
          label="Current Education Level"
          onChange={handleChange('schoolLevel')}
        >
          {SCHOOL_LEVEL_OPTIONS.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Scholarships are often specific to education levels</FormHelperText>
      </FormControl>

      {/* Major */}
      <Autocomplete
        freeSolo
        options={FIELDS_OF_STUDY}
        value={data.major || ''}
        onChange={(event, newValue) => onUpdate({ major: newValue })}
        onInputChange={(event, newValue) => onUpdate({ major: newValue })}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Major / Field of Study"
            helperText="Your primary area of study"
          />
        )}
      />

      {/* Additional Fields of Interest */}
      <Autocomplete
        multiple
        freeSolo
        options={FIELDS_OF_STUDY}
        value={data.fieldsOfStudy || []}
        onChange={handleFieldsChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Additional Fields of Interest"
            helperText="Select any other fields you're interested in"
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip label={option} {...getTagProps({ index })} key={index} />
          ))
        }
      />

      {/* Expected Graduation Year */}
      <FormControl fullWidth>
        <InputLabel>Expected Graduation Year</InputLabel>
        <Select
          value={data.expectedGraduationYear || ''}
          label="Expected Graduation Year"
          onChange={handleChange('expectedGraduationYear')}
        >
          {graduationYears.map(year => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Current School */}
      <TextField
        fullWidth
        label="Current School / University"
        value={data.currentSchool || ''}
        onChange={handleChange('currentSchool')}
        helperText="Optional - some scholarships are for specific institutions"
      />

      {/* SAT Score (optional) */}
      <TextField
        fullWidth
        type="number"
        label="SAT Score (optional)"
        value={data.satScore || ''}
        onChange={handleChange('satScore')}
        inputProps={{ min: 400, max: 1600 }}
        helperText="400-1600"
      />

      {/* ACT Score (optional) */}
      <TextField
        fullWidth
        type="number"
        label="ACT Score (optional)"
        value={data.actScore || ''}
        onChange={handleChange('actScore')}
        inputProps={{ min: 1, max: 36 }}
        helperText="1-36"
      />
    </Box>
  );
}
