import React from 'react';
import {
  Box, TextField, FormControl, InputLabel, Select, MenuItem,
  FormHelperText, Typography
} from '@mui/material';
import { FINANCIAL_NEED_OPTIONS, HOUSEHOLD_INCOME_OPTIONS } from '../../../utils/constants';

export default function FinancialStep({ data, onUpdate }) {
  const handleChange = (field) => (event) => {
    onUpdate({ [field]: event.target.value });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        This information helps us match you with need-based scholarships.
        All financial information is kept confidential.
      </Typography>

      {/* Financial Need Level */}
      <FormControl fullWidth>
        <InputLabel>Financial Need Level</InputLabel>
        <Select
          value={data.financialNeedLevel || ''}
          label="Financial Need Level"
          onChange={handleChange('financialNeedLevel')}
        >
          {FINANCIAL_NEED_OPTIONS.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          Many scholarships prioritize students with financial need
        </FormHelperText>
      </FormControl>

      {/* Household Income (optional) */}
      <FormControl fullWidth>
        <InputLabel>Household Income (optional)</InputLabel>
        <Select
          value={data.householdIncome || ''}
          label="Household Income (optional)"
          onChange={handleChange('householdIncome')}
        >
          {HOUSEHOLD_INCOME_OPTIONS.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          Approximate annual household income
        </FormHelperText>
      </FormControl>

      {/* Household Size */}
      <TextField
        fullWidth
        type="number"
        label="Household Size"
        value={data.householdSize || ''}
        onChange={handleChange('householdSize')}
        inputProps={{ min: 1, max: 20 }}
        helperText="Number of people in your household"
      />

      {/* EFC (optional) */}
      <TextField
        fullWidth
        type="number"
        label="Expected Family Contribution (EFC)"
        value={data.estimatedFamilyContribution || ''}
        onChange={handleChange('estimatedFamilyContribution')}
        helperText="Optional - from your FAFSA if available"
        inputProps={{ min: 0 }}
      />
    </Box>
  );
}
