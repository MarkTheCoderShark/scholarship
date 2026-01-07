import React from 'react';
import {
  Box, TextField, Autocomplete, Chip, Typography
} from '@mui/material';
import { INTEREST_OPTIONS, CAREER_GOALS } from '../../../utils/constants';

export default function InterestsStep({ data, onUpdate }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Tell us about your interests and career goals to help match you with
        relevant scholarships in your areas of passion.
      </Typography>

      {/* Interests */}
      <Autocomplete
        multiple
        freeSolo
        options={INTEREST_OPTIONS}
        value={data.interests || []}
        onChange={(event, newValue) => onUpdate({ interests: newValue })}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Interests & Passions"
            placeholder="Add interests..."
            helperText="Select from the list or type your own"
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={option}
              {...getTagProps({ index })}
              key={index}
              color="primary"
              variant="outlined"
            />
          ))
        }
      />

      {/* Career Goals */}
      <Autocomplete
        multiple
        freeSolo
        options={CAREER_GOALS}
        value={data.careerGoals || []}
        onChange={(event, newValue) => onUpdate({ careerGoals: newValue })}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Career Goals"
            placeholder="Add career goals..."
            helperText="What careers are you interested in pursuing?"
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={option}
              {...getTagProps({ index })}
              key={index}
              color="secondary"
              variant="outlined"
            />
          ))
        }
      />

      {/* Languages */}
      <Autocomplete
        multiple
        freeSolo
        options={['English', 'Spanish', 'French', 'German', 'Mandarin', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Portuguese']}
        value={data.languages || ['English']}
        onChange={(event, newValue) => onUpdate({ languages: newValue })}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Languages"
            placeholder="Add languages..."
            helperText="Languages you speak"
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={option}
              {...getTagProps({ index })}
              key={index}
              size="small"
            />
          ))
        }
      />
    </Box>
  );
}
