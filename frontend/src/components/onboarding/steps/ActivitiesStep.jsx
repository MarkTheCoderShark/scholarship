import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography, Card, CardContent,
  IconButton, FormControl, InputLabel, Select, MenuItem,
  FormControlLabel, Checkbox, Chip, Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { EXTRACURRICULAR_CATEGORIES } from '../../../utils/constants';

export default function ActivitiesStep({ data, onUpdate }) {
  const [newActivity, setNewActivity] = useState({
    name: '',
    category: '',
    yearsInvolved: 1,
    leadershipRole: false
  });

  const handleAddActivity = () => {
    if (!newActivity.name || !newActivity.category) return;

    const activities = [...(data.extracurriculars || []), newActivity];
    onUpdate({ extracurriculars: activities });
    setNewActivity({
      name: '',
      category: '',
      yearsInvolved: 1,
      leadershipRole: false
    });
  };

  const handleRemoveActivity = (index) => {
    const activities = (data.extracurriculars || []).filter((_, i) => i !== index);
    onUpdate({ extracurriculars: activities });
  };

  const handleChange = (field) => (event) => {
    onUpdate({ [field]: event.target.value });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Add your extracurricular activities, volunteer work, and achievements.
        Many scholarships value leadership and community involvement.
      </Typography>

      {/* Add New Activity Form */}
      <Card variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
        <Typography variant="subtitle2" gutterBottom>
          Add Extracurricular Activity
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            size="small"
            label="Activity Name"
            value={newActivity.name}
            onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
            placeholder="e.g., Debate Club, Basketball Team"
          />

          <FormControl size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={newActivity.category}
              label="Category"
              onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value })}
            >
              {EXTRACURRICULAR_CATEGORIES.map(cat => (
                <MenuItem key={cat.value} value={cat.value}>
                  {cat.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            size="small"
            type="number"
            label="Years Involved"
            value={newActivity.yearsInvolved}
            onChange={(e) => setNewActivity({ ...newActivity, yearsInvolved: parseInt(e.target.value) })}
            inputProps={{ min: 1, max: 20 }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={newActivity.leadershipRole}
                onChange={(e) => setNewActivity({ ...newActivity, leadershipRole: e.target.checked })}
              />
            }
            label="I held a leadership role"
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddActivity}
            disabled={!newActivity.name || !newActivity.category}
          >
            Add Activity
          </Button>
        </Box>
      </Card>

      {/* Activities List */}
      {(data.extracurriculars || []).length > 0 && (
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Your Activities ({data.extracurriculars.length})
          </Typography>
          <Stack spacing={1}>
            {data.extracurriculars.map((activity, index) => (
              <Card key={index} variant="outlined">
                <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body1" fontWeight={500}>
                        {activity.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                        <Chip
                          label={EXTRACURRICULAR_CATEGORIES.find(c => c.value === activity.category)?.label || activity.category}
                          size="small"
                        />
                        <Chip
                          label={`${activity.yearsInvolved} year${activity.yearsInvolved > 1 ? 's' : ''}`}
                          size="small"
                          variant="outlined"
                        />
                        {activity.leadershipRole && (
                          <Chip
                            label="Leadership"
                            size="small"
                            color="primary"
                          />
                        )}
                      </Box>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveActivity(index)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      )}

      {/* Community Service Hours */}
      <TextField
        fullWidth
        type="number"
        label="Total Community Service Hours"
        value={data.communityServiceHours || ''}
        onChange={handleChange('communityServiceHours')}
        helperText="Approximate total volunteer hours"
        inputProps={{ min: 0 }}
      />

      {/* Work Experience */}
      <TextField
        fullWidth
        multiline
        rows={2}
        label="Work Experience (optional)"
        value={data.workExperience || ''}
        onChange={handleChange('workExperience')}
        placeholder="Briefly describe any jobs or internships"
      />
    </Box>
  );
}
