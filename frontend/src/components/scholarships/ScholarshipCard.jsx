import React, { useState } from 'react';
import {
  Card, CardContent, CardActions, Typography, Button, Box,
  Chip, Collapse, IconButton, Divider, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MatchScoreBadge from './MatchScoreBadge';

const formatAmount = (scholarship) => {
  if (scholarship.amount?.displayText) return scholarship.amount.displayText;
  if (scholarship.amount?.min && scholarship.amount?.max) {
    return `$${scholarship.amount.min.toLocaleString()} - $${scholarship.amount.max.toLocaleString()}`;
  }
  if (scholarship.amount?.min) return `$${scholarship.amount.min.toLocaleString()}`;
  if (typeof scholarship.amount === 'string') return scholarship.amount;
  return 'Varies';
};

const formatDeadline = (scholarship) => {
  if (scholarship.deadline?.isRolling) return 'Rolling';
  if (scholarship.deadline?.date) {
    const date = new Date(scholarship.deadline.date);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  if (scholarship.deadline?.displayText) return scholarship.deadline.displayText;
  if (typeof scholarship.deadline === 'string') return scholarship.deadline;
  return 'Check website';
};

const isExpired = (scholarship) => {
  if (scholarship.deadline?.isExpired) return true;
  if (scholarship.deadline?.date) {
    return new Date(scholarship.deadline.date) < new Date();
  }
  return false;
};

export default function ScholarshipCard({ scholarship, matchData, showMatchInfo = true }) {
  const [expanded, setExpanded] = useState(false);
  const expired = isExpired(scholarship);

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        opacity: expired ? 0.7 : 1,
        position: 'relative'
      }}
    >
      {expired && (
        <Chip
          label="Expired"
          size="small"
          color="error"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, pr: matchData ? 2 : 0 }}>
            {scholarship.title}
          </Typography>
          {showMatchInfo && matchData && (
            <MatchScoreBadge score={matchData.score} />
          )}
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          <Chip
            icon={<AttachMoneyIcon />}
            label={formatAmount(scholarship)}
            size="small"
            color="success"
            variant="outlined"
          />
          <Chip
            icon={<CalendarTodayIcon />}
            label={formatDeadline(scholarship)}
            size="small"
            color={expired ? 'error' : 'primary'}
            variant="outlined"
          />
        </Box>

        {scholarship.eligibility?.schoolLevels?.length > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
            <SchoolIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {scholarship.eligibility.schoolLevels.join(', ')}
            </Typography>
          </Box>
        )}

        {scholarship.eligibility?.hardRequirements?.locationsAllowed?.length > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
            <LocationOnIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {scholarship.eligibility.hardRequirements.locationsAllowed.slice(0, 3).join(', ')}
              {scholarship.eligibility.hardRequirements.locationsAllowed.length > 3 && '...'}
            </Typography>
          </Box>
        )}

        {scholarship.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {scholarship.description.length > 150
              ? `${scholarship.description.substring(0, 150)}...`
              : scholarship.description}
          </Typography>
        )}

        {/* Match Details Expandable Section */}
        {showMatchInfo && matchData?.matchDetails && (
          <>
            <Box
              onClick={() => setExpanded(!expanded)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                mt: 2,
                '&:hover': { bgcolor: 'action.hover' },
                borderRadius: 1,
                p: 0.5,
                mx: -0.5
              }}
            >
              <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
                Why you match
              </Typography>
              <IconButton size="small" sx={{ ml: 'auto' }}>
                <ExpandMoreIcon
                  sx={{
                    transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s'
                  }}
                />
              </IconButton>
            </Box>

            <Collapse in={expanded}>
              <Divider sx={{ my: 1 }} />
              <List dense disablePadding>
                {matchData.matchDetails.hardRequirements && (
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      {matchData.matchDetails.hardRequirements.passed ? (
                        <CheckCircleIcon color="success" fontSize="small" />
                      ) : (
                        <CancelIcon color="error" fontSize="small" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary="Eligibility Requirements"
                      secondary={matchData.matchDetails.hardRequirements.passed ? 'You meet all requirements' : 'Some requirements not met'}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                )}

                {matchData.reasons?.length > 0 && matchData.reasons.slice(0, 5).map((reason, idx) => (
                  <ListItem key={idx} disableGutters>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={reason}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </>
        )}
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          href={scholarship.applicationLink || scholarship.link}
          target="_blank"
          rel="noopener noreferrer"
          disabled={expired}
        >
          {expired ? 'Expired' : 'Apply Now'}
        </Button>
      </CardActions>
    </Card>
  );
}
