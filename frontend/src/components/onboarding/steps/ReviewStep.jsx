import React from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Chip, Divider,
  List, ListItem, ListItemText, LinearProgress
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  GENDER_OPTIONS, CITIZENSHIP_OPTIONS, SCHOOL_LEVEL_OPTIONS,
  FINANCIAL_NEED_OPTIONS, ETHNICITY_OPTIONS, MILITARY_STATUS_OPTIONS,
  EXTRACURRICULAR_CATEGORIES
} from '../../../utils/constants';

const getLabel = (options, value) => {
  const option = options.find(o => o.value === value);
  return option?.label || value || 'Not specified';
};

export default function ReviewStep({ data }) {
  // Calculate profile completeness
  const sections = [
    { name: 'Personal Info', complete: !!(data.dateOfBirth && data.gender && data.citizenshipStatus) },
    { name: 'Academic', complete: !!(data.gpa && data.major && data.schoolLevel) },
    { name: 'Location', complete: !!(data.state || data.country) },
    { name: 'Financial', complete: !!data.financialNeedLevel },
    { name: 'Background', complete: data.isFirstGeneration !== undefined },
    { name: 'Interests', complete: (data.interests?.length > 0 || data.careerGoals?.length > 0) },
    { name: 'Activities', complete: data.extracurriculars?.length > 0 }
  ];

  const completedCount = sections.filter(s => s.complete).length;
  const completeness = Math.round((completedCount / sections.length) * 100);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Completeness Overview */}
      <Card sx={{ bgcolor: 'primary.50' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Profile Completeness: {completeness}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={completeness}
            sx={{ height: 10, borderRadius: 5, mb: 2 }}
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {sections.map((section, index) => (
              <Chip
                key={index}
                label={section.name}
                color={section.complete ? 'success' : 'default'}
                icon={section.complete ? <CheckCircleIcon /> : undefined}
                size="small"
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Personal Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Gender</Typography>
              <Typography>{getLabel(GENDER_OPTIONS, data.gender)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Date of Birth</Typography>
              <Typography>
                {data.dateOfBirth ? new Date(data.dateOfBirth).toLocaleDateString() : 'Not specified'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Citizenship</Typography>
              <Typography>{getLabel(CITIZENSHIP_OPTIONS, data.citizenshipStatus)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Ethnicity</Typography>
              <Typography>
                {(data.ethnicity || []).map(e => getLabel(ETHNICITY_OPTIONS, e)).join(', ') || 'Not specified'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Academic Information */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Academic Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">GPA</Typography>
              <Typography>{data.gpa?.toFixed(2) || 'Not specified'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Education Level</Typography>
              <Typography>{getLabel(SCHOOL_LEVEL_OPTIONS, data.schoolLevel)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Major</Typography>
              <Typography>{data.major || 'Not specified'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Graduation Year</Typography>
              <Typography>{data.expectedGraduationYear || 'Not specified'}</Typography>
            </Grid>
            {data.currentSchool && (
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">School</Typography>
                <Typography>{data.currentSchool}</Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* Location & Financial */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Location & Financial
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Location</Typography>
              <Typography>
                {[data.city, data.state, data.country].filter(Boolean).join(', ') || 'Not specified'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Financial Need</Typography>
              <Typography>{getLabel(FINANCIAL_NEED_OPTIONS, data.financialNeedLevel)}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Background */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Background
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {data.isFirstGeneration && (
              <Chip label="First-Generation Student" color="primary" />
            )}
            {data.hasDisability && (
              <Chip label="Student with Disability" color="primary" />
            )}
            {data.isMilitary && (
              <Chip label={getLabel(MILITARY_STATUS_OPTIONS, data.militaryStatus)} color="primary" />
            )}
            {!data.isFirstGeneration && !data.hasDisability && !data.isMilitary && (
              <Typography color="text.secondary">No special circumstances indicated</Typography>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Interests & Activities */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Interests & Activities
          </Typography>
          {data.interests?.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>Interests</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {data.interests.map((interest, i) => (
                  <Chip key={i} label={interest} size="small" variant="outlined" />
                ))}
              </Box>
            </Box>
          )}
          {data.careerGoals?.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>Career Goals</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {data.careerGoals.map((goal, i) => (
                  <Chip key={i} label={goal} size="small" variant="outlined" />
                ))}
              </Box>
            </Box>
          )}
          {data.extracurriculars?.length > 0 && (
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Extracurriculars ({data.extracurriculars.length})
              </Typography>
              <List dense>
                {data.extracurriculars.slice(0, 5).map((activity, i) => (
                  <ListItem key={i} disableGutters>
                    <ListItemText
                      primary={activity.name}
                      secondary={`${EXTRACURRICULAR_CATEGORIES.find(c => c.value === activity.category)?.label || activity.category} • ${activity.yearsInvolved} years${activity.leadershipRole ? ' • Leadership' : ''}`}
                    />
                  </ListItem>
                ))}
                {data.extracurriculars.length > 5 && (
                  <Typography variant="body2" color="text.secondary">
                    + {data.extracurriculars.length - 5} more activities
                  </Typography>
                )}
              </List>
            </Box>
          )}
        </CardContent>
      </Card>

      <Typography variant="body2" color="text.secondary" align="center">
        Click "Complete Profile" to finish onboarding and see your matched scholarships!
      </Typography>
    </Box>
  );
}
