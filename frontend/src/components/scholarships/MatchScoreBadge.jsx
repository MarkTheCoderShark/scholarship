import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';

const getScoreColor = (score) => {
  if (score >= 70) return { bg: '#e8f5e9', color: '#2e7d32', label: 'Great Match' };
  if (score >= 50) return { bg: '#fff3e0', color: '#ef6c00', label: 'Good Match' };
  if (score >= 30) return { bg: '#fff8e1', color: '#f9a825', label: 'Partial Match' };
  return { bg: '#ffebee', color: '#c62828', label: 'Low Match' };
};

export default function MatchScoreBadge({ score, size = 'medium' }) {
  if (score === undefined || score === null) return null;

  const { bg, color, label } = getScoreColor(score);
  const dimensions = size === 'small' ? 40 : size === 'large' ? 60 : 50;
  const fontSize = size === 'small' ? '0.75rem' : size === 'large' ? '1.25rem' : '1rem';

  return (
    <Tooltip title={label} arrow>
      <Box
        sx={{
          width: dimensions,
          height: dimensions,
          borderRadius: '50%',
          bgcolor: bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `2px solid ${color}`,
          flexShrink: 0
        }}
      >
        <Typography
          sx={{
            color,
            fontWeight: 700,
            fontSize,
            lineHeight: 1
          }}
        >
          {Math.round(score)}%
        </Typography>
      </Box>
    </Tooltip>
  );
}
