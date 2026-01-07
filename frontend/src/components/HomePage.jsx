import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box, Container, Typography, Button, Grid, Card, CardContent,
  Avatar, Stack, Chip, useTheme, useMediaQuery, Paper, TextField,
  Link, IconButton, Divider
} from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import StarIcon from '@mui/icons-material/Star';
import LockIcon from '@mui/icons-material/Lock';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const stats = [
    { value: "10,000+", label: "Verified Scholarships", icon: <SchoolIcon /> },
    { value: "$50M+", label: "In Available Funding", icon: <TrendingUpIcon /> },
    { value: "95%", label: "Match Accuracy", icon: <AutoAwesomeIcon /> },
    { value: "50K+", label: "Students Matched", icon: <StarIcon /> },
  ];

  const features = [
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: 32 }} />,
      title: "AI-Powered Matching",
      description: "Our algorithm analyzes 20+ profile criteria to find scholarships you're most likely to win."
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 32 }} />,
      title: "Save 10+ Hours Weekly",
      description: "Stop scrolling endlessly. Get a curated list of matches ranked by your win probability."
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 32 }} />,
      title: "Track Everything",
      description: "Deadline reminders, application status, saved favorites—all in one dashboard."
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 32 }} />,
      title: "100% Verified",
      description: "Every scholarship is vetted. No scams, no expired listings, no wasted applications."
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Create Your Profile",
      description: "Answer questions about your academics, background, and interests. Takes just 5 minutes.",
      highlight: "5 min setup"
    },
    {
      number: "2",
      title: "Get Matched Instantly",
      description: "Our AI analyzes your profile against 10,000+ scholarships and ranks your best matches.",
      highlight: "AI-powered"
    },
    {
      number: "3",
      title: "Apply & Win",
      description: "Focus on high-match scholarships. Track deadlines. Maximize your success rate.",
      highlight: "95% accuracy"
    },
  ];

  const testimonials = [
    {
      name: "Sarah Martinez",
      role: "Stanford '26 | Won $25,000",
      quote: "I was applying to random scholarships for months with no luck. SortAid matched me with 12 scholarships I actually qualified for—I won 3 of them!",
      avatar: "S",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "First-Generation Student",
      quote: "As a first-gen student, I had no guidance. SortAid found scholarships specifically for students like me that I never knew existed.",
      avatar: "M",
      rating: 5
    },
    {
      name: "Emily Chen",
      role: "High School Senior | Won $15,000",
      quote: "The match scores saved me so much time. I only applied to scholarships with 80%+ match rates and won 4 out of 15 applications!",
      avatar: "E",
      rating: 5
    },
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Get started with scholarship matching",
      features: [
        { text: "View up to 10 matched scholarships", included: true },
        { text: "Basic profile matching", included: true },
        { text: "Email deadline reminders", included: true },
        { text: "Unlimited scholarship views", included: false },
        { text: "Advanced match scoring", included: false },
        { text: "Priority support", included: false },
      ],
      cta: "Start Free",
      highlighted: false
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "/month",
      description: "Unlock your full scholarship potential",
      features: [
        { text: "Unlimited matched scholarships", included: true },
        { text: "Advanced AI matching (20+ criteria)", included: true },
        { text: "Smart deadline reminders", included: true },
        { text: "Application tracking dashboard", included: true },
        { text: "Detailed match breakdowns", included: true },
        { text: "Priority email support", included: true },
      ],
      cta: "Start 7-Day Free Trial",
      highlighted: true,
      badge: "Most Popular"
    },
  ];

  // Accessible color palette with proper contrast ratios
  const colors = {
    primary: '#1565c0',
    primaryDark: '#0d47a1',
    primaryLight: '#e3f2fd',
    accent: '#00897b',
    accentLight: '#e0f2f1',
    textOnDark: '#ffffff',
    textOnLight: '#1a1a2e',
    textMuted: '#5f6368',
    success: '#2e7d32',
    warning: '#f57c00',
    surface: '#ffffff',
    background: '#f8fafc',
    footerBg: '#1a1a2e',
  };

  return (
    <Box component="main" sx={{ overflow: 'hidden' }}>
      {/* Skip Navigation Link - Accessibility */}
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: 'absolute',
          left: '-9999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          '&:focus': {
            position: 'fixed',
            top: 0,
            left: 0,
            width: 'auto',
            height: 'auto',
            padding: '16px 24px',
            bgcolor: colors.primary,
            color: colors.textOnDark,
            zIndex: 9999,
            fontSize: '1rem',
            fontWeight: 600,
            textDecoration: 'none',
            outline: '3px solid #ffd700',
          }
        }}
      >
        Skip to main content
      </Box>

      {/* Hero Section - Optimized for conversion */}
      <Box
        id="main-content"
        component="section"
        aria-labelledby="hero-heading"
        sx={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
          color: colors.textOnDark,
          pt: { xs: 6, md: 10 },
          pb: { xs: 12, md: 18 },
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              {/* Trust Signal Badge */}
              <Chip
                icon={<StarIcon sx={{ color: '#ffd700 !important', fontSize: 18 }} />}
                label="Trusted by 50,000+ students nationwide"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.15)',
                  color: colors.textOnDark,
                  mb: 3,
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  py: 0.5,
                  '& .MuiChip-icon': { ml: 1 }
                }}
              />

              {/* Main Headline - Clear Value Proposition */}
              <Typography
                id="hero-heading"
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '2.25rem', sm: '2.75rem', md: '3.25rem', lg: '3.75rem' },
                  fontWeight: 800,
                  lineHeight: 1.15,
                  mb: 2.5,
                  letterSpacing: '-0.02em',
                }}
              >
                Stop Guessing.
                <br />
                <Box
                  component="span"
                  sx={{
                    color: '#bbdefb', // WCAG AA compliant on dark blue (4.5:1+)
                  }}
                >
                  Start Winning Scholarships.
                </Box>
              </Typography>

              {/* Subheadline with specific benefit */}
              <Typography
                variant="h2"
                component="p"
                sx={{
                  mb: 4,
                  fontWeight: 400,
                  fontSize: { xs: '1.1rem', md: '1.35rem' },
                  lineHeight: 1.6,
                  maxWidth: 520,
                  opacity: 0.95,
                }}
              >
                Our AI matches you with scholarships you'll actually qualify for—saving
                you <strong>10+ hours</strong> of research every week.
              </Typography>

              {/* Primary CTA - High contrast, clear action */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ mb: 3 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/register")}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: colors.textOnDark,
                    color: colors.primaryDark,
                    px: { xs: 3, sm: 4 },
                    py: 1.75,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 2,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                    '&:hover': {
                      bgcolor: '#f5f5f5',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                    },
                    '&:focus-visible': {
                      outline: '3px solid #ffd700',
                      outlineOffset: '2px',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  Start Free Trial
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  sx={{
                    borderColor: 'rgba(255,255,255,0.6)',
                    borderWidth: 2,
                    color: colors.textOnDark,
                    px: { xs: 3, sm: 4 },
                    py: 1.75,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    '&:hover': {
                      borderColor: colors.textOnDark,
                      bgcolor: 'rgba(255,255,255,0.1)',
                      borderWidth: 2,
                    },
                    '&:focus-visible': {
                      outline: '3px solid #ffd700',
                      outlineOffset: '2px',
                    },
                  }}
                >
                  See How It Works
                </Button>
              </Stack>

              {/* Trust Signals */}
              <Stack
                direction="row"
                spacing={3}
                flexWrap="wrap"
                sx={{ gap: 1 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <CheckCircleIcon sx={{ fontSize: 18, color: '#81c784' }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    No credit card required
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <CheckCircleIcon sx={{ fontSize: 18, color: '#81c784' }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    5-minute setup
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <CheckCircleIcon sx={{ fontSize: 18, color: '#81c784' }} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Cancel anytime
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            {/* Hero Visual - Scholarship Preview Cards */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  p: { xs: 2, md: 3 },
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
                role="img"
                aria-label="Example scholarship matches showing 94%, 87%, and 82% match scores"
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    fontWeight: 600,
                    letterSpacing: 1.5,
                    mb: 2,
                    display: 'block'
                  }}
                >
                  Your Top Matches
                </Typography>
                <Stack spacing={2}>
                  {[
                    { score: 94, name: "STEM Excellence Award", amount: "$10,000", deadline: "Mar 15" },
                    { score: 87, name: "First-Gen Scholars Fund", amount: "$5,000", deadline: "Apr 1" },
                    { score: 82, name: "Community Leaders Grant", amount: "$7,500", deadline: "Apr 30" },
                  ].map((item, idx) => (
                    <Paper
                      key={idx}
                      elevation={0}
                      sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        bgcolor: colors.surface,
                        borderRadius: 2,
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateX(4px)',
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: '50%',
                          bgcolor: item.score >= 90 ? '#e8f5e9' : item.score >= 80 ? '#fff8e1' : '#ffebee',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          color: item.score >= 90 ? colors.success : item.score >= 80 ? colors.warning : '#c62828',
                          flexShrink: 0,
                        }}
                        aria-label={`${item.score}% match`}
                      >
                        {item.score}%
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          color="text.primary"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Typography variant="body2" color="success.main" fontWeight={700}>
                            {item.amount}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Due {item.deadline}
                          </Typography>
                        </Stack>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Decorative wave divider */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: { xs: 60, md: 100 },
            bgcolor: colors.background,
            clipPath: 'ellipse(75% 100% at 50% 100%)',
          }}
        />
      </Box>

      {/* Stats Section - Social Proof */}
      <Box
        component="section"
        aria-label="Platform statistics"
        sx={{
          bgcolor: colors.background,
          pt: { xs: 2, md: 4 },
          pb: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              py: { xs: 3, md: 4 },
              px: { xs: 2, md: 4 },
              border: '1px solid',
              borderColor: 'grey.200',
              bgcolor: colors.surface,
            }}
          >
            <Grid container spacing={3} justifyContent="center">
              {stats.map((stat, idx) => (
                <Grid size={{ xs: 6, md: 3 }} key={idx}>
                  <Box
                    textAlign="center"
                    sx={{
                      p: { xs: 1, md: 2 },
                    }}
                  >
                    <Box
                      sx={{
                        color: colors.primary,
                        mb: 1,
                        '& svg': { fontSize: { xs: 28, md: 36 } }
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="h3"
                      component="p"
                      sx={{
                        fontWeight: 800,
                        color: colors.textOnLight,
                        fontSize: { xs: '1.75rem', md: '2.5rem' },
                        lineHeight: 1.2,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: colors.textMuted,
                        fontWeight: 500,
                        mt: 0.5,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box
        id="how-it-works"
        component="section"
        aria-labelledby="how-it-works-heading"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: colors.surface,
          scrollMarginTop: '80px',
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" mb={{ xs: 6, md: 8 }}>
            <Typography
              id="how-it-works-heading"
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                color: colors.textOnLight,
              }}
            >
              How It Works
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                color: colors.textMuted,
                maxWidth: 600,
                mx: 'auto',
                fontWeight: 400,
              }}
            >
              Get matched with scholarships in three simple steps
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 1, sm: 2, md: 4 }} alignItems="stretch">
            {steps.map((step, idx) => (
              <Grid size={4} key={idx}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: { xs: 2, sm: 3, md: 4 },
                    borderRadius: 4,
                    border: '2px solid',
                    borderColor: 'grey.100',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: colors.primary,
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px rgba(21, 101, 192, 0.12)',
                    },
                    '&:focus-within': {
                      borderColor: colors.primary,
                      outline: '3px solid',
                      outlineColor: colors.primaryLight,
                    }
                  }}
                >
                  {/* Step number */}
                  <Box
                    sx={{
                      width: { xs: 36, sm: 48, md: 56 },
                      height: { xs: 36, sm: 48, md: 56 },
                      borderRadius: '50%',
                      bgcolor: colors.primaryLight,
                      color: colors.primary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                      fontWeight: 800,
                      mx: 'auto',
                      mb: { xs: 1, sm: 2, md: 3 },
                    }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </Box>

                  {/* Highlight chip - hidden on mobile for space */}
                  <Chip
                    label={step.highlight}
                    size="small"
                    sx={{
                      bgcolor: colors.accentLight,
                      color: colors.accent,
                      fontWeight: 600,
                      mb: { xs: 1, sm: 2 },
                      display: { xs: 'none', sm: 'inline-flex' },
                    }}
                  />

                  <Typography
                    variant="h5"
                    component="h3"
                    fontWeight={700}
                    gutterBottom
                    sx={{
                      color: colors.textOnLight,
                      fontSize: { xs: '0.875rem', sm: '1.1rem', md: '1.25rem' },
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: colors.textMuted,
                      lineHeight: 1.6,
                      fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                      display: { xs: 'none', sm: 'block' },
                    }}
                  >
                    {step.description}
                  </Typography>

                  {/* Connector arrow (desktop only) */}
                  {idx < steps.length - 1 && !isMobile && (
                    <ArrowForwardIcon
                      aria-hidden="true"
                      sx={{
                        position: 'absolute',
                        right: -28,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: 32,
                        color: 'grey.300',
                        zIndex: 1,
                      }}
                    />
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        component="section"
        aria-labelledby="features-heading"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: colors.background,
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" mb={{ xs: 6, md: 8 }}>
            <Typography
              id="features-heading"
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                color: colors.textOnLight,
              }}
            >
              Why Students Choose SortAid
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                color: colors.textMuted,
                maxWidth: 600,
                mx: 'auto',
                fontWeight: 400,
              }}
            >
              We've helped thousands of students find and win scholarships. Here's how.
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
            {features.map((feature, idx) => (
              <Grid size={{ xs: 6, md: 3 }} key={idx}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    p: { xs: 1.5, sm: 2, md: 3 },
                    borderRadius: { xs: 2, md: 3 },
                    bgcolor: colors.surface,
                    border: '1px solid',
                    borderColor: 'grey.200',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                      borderColor: colors.primary,
                    },
                  }}
                >
                  <Box
                    sx={{
                      color: colors.primary,
                      mb: { xs: 1, sm: 2 },
                      display: 'inline-flex',
                      p: { xs: 1, sm: 1.5 },
                      borderRadius: 2,
                      bgcolor: colors.primaryLight,
                      '& svg': { fontSize: { xs: 24, sm: 28, md: 32 } },
                    }}
                    aria-hidden="true"
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    fontWeight={700}
                    gutterBottom
                    sx={{
                      color: colors.textOnLight,
                      fontSize: { xs: '0.8rem', sm: '0.95rem', md: '1.1rem' },
                      lineHeight: 1.3,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: colors.textMuted,
                      lineHeight: 1.5,
                      fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                      display: { xs: 'none', sm: 'block' },
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box
        id="pricing"
        component="section"
        aria-labelledby="pricing-heading"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: colors.surface,
        }}
      >
        <Container maxWidth="md">
          <Box textAlign="center" mb={{ xs: 6, md: 8 }}>
            <Typography
              id="pricing-heading"
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                color: colors.textOnLight,
              }}
            >
              Simple, Transparent Pricing
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                color: colors.textMuted,
                maxWidth: 500,
                mx: 'auto',
                fontWeight: 400,
              }}
            >
              Start free and upgrade when you're ready to unlock your full potential
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 1, sm: 2, md: 4 }} justifyContent="center">
            {pricingPlans.map((plan, idx) => (
              <Grid size={6} key={idx}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    p: { xs: 1.5, sm: 2.5, md: 4 },
                    borderRadius: 4,
                    border: '2px solid',
                    borderColor: plan.highlighted ? colors.primary : 'grey.200',
                    position: 'relative',
                    bgcolor: plan.highlighted ? colors.primaryLight : colors.surface,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    }
                  }}
                >
                  {plan.badge && (
                    <Chip
                      label={plan.badge}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: -12,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bgcolor: colors.primary,
                        color: colors.textOnDark,
                        fontWeight: 700,
                        px: 1,
                      }}
                    />
                  )}

                  <Typography
                    variant="h5"
                    component="h3"
                    fontWeight={700}
                    gutterBottom
                    sx={{
                      color: colors.textOnLight,
                      fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                    }}
                  >
                    {plan.name}
                  </Typography>

                  <Box sx={{ mb: { xs: 1, sm: 2 } }}>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
                        fontWeight: 800,
                        color: colors.textOnLight,
                      }}
                    >
                      {plan.price}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        color: colors.textMuted,
                        fontSize: { xs: '0.7rem', sm: '0.875rem' },
                      }}
                    >
                      {plan.period}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      color: colors.textMuted,
                      mb: { xs: 1, sm: 2, md: 3 },
                      fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                      display: { xs: 'none', sm: 'block' },
                    }}
                  >
                    {plan.description}
                  </Typography>

                  <Divider sx={{ my: { xs: 1, sm: 2, md: 3 } }} />

                  <Stack spacing={{ xs: 0.5, sm: 1, md: 2 }} sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
                    {plan.features.map((feature, fIdx) => (
                      <Box
                        key={fIdx}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: { xs: 0.5, sm: 1, md: 1.5 },
                        }}
                      >
                        {feature.included ? (
                          <CheckIcon
                            sx={{
                              fontSize: { xs: 14, sm: 18, md: 20 },
                              color: colors.success,
                              flexShrink: 0,
                            }}
                          />
                        ) : (
                          <CloseIcon
                            sx={{
                              fontSize: { xs: 14, sm: 18, md: 20 },
                              color: 'grey.400',
                              flexShrink: 0,
                            }}
                          />
                        )}
                        <Typography
                          variant="body2"
                          sx={{
                            color: feature.included ? colors.textOnLight : colors.textMuted,
                            fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.875rem' },
                            lineHeight: 1.3,
                          }}
                        >
                          {feature.text}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>

                  <Button
                    variant={plan.highlighted ? "contained" : "outlined"}
                    fullWidth
                    size="large"
                    onClick={() => navigate("/register")}
                    sx={{
                      py: { xs: 1, sm: 1.25, md: 1.5 },
                      fontWeight: 700,
                      borderRadius: 2,
                      fontSize: { xs: '0.7rem', sm: '0.85rem', md: '1rem' },
                      ...(plan.highlighted ? {
                        bgcolor: colors.primary,
                        '&:hover': {
                          bgcolor: colors.primaryDark,
                        }
                      } : {
                        borderColor: colors.primary,
                        color: colors.primary,
                        borderWidth: 2,
                        '&:hover': {
                          borderWidth: 2,
                          bgcolor: colors.primaryLight,
                        }
                      }),
                      '&:focus-visible': {
                        outline: '3px solid',
                        outlineColor: colors.primary,
                        outlineOffset: '2px',
                      }
                    }}
                  >
                    {plan.cta}
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography
            variant="body2"
            textAlign="center"
            sx={{
              mt: 4,
              color: colors.textMuted,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <LockIcon sx={{ fontSize: 16 }} />
            Secure payment powered by Stripe. Cancel anytime.
          </Typography>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box
        component="section"
        aria-labelledby="testimonials-heading"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: colors.background,
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" mb={{ xs: 6, md: 8 }}>
            <Typography
              id="testimonials-heading"
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                color: colors.textOnLight,
              }}
            >
              Real Students. Real Results.
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                color: colors.textMuted,
                fontWeight: 400,
              }}
            >
              See how SortAid has helped students win thousands in scholarships
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 1, sm: 2, md: 4 }}>
            {testimonials.map((testimonial, idx) => (
              <Grid size={4} key={idx}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    p: { xs: 1.5, sm: 2.5, md: 4 },
                    borderRadius: { xs: 2, md: 4 },
                    bgcolor: colors.surface,
                    border: '1px solid',
                    borderColor: 'grey.200',
                    position: 'relative',
                  }}
                >
                  {/* Star Rating */}
                  <Stack direction="row" spacing={0.25} sx={{ mb: { xs: 1, sm: 2 } }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon
                        key={i}
                        sx={{ fontSize: { xs: 12, sm: 16, md: 20 }, color: '#ffc107' }}
                        aria-hidden="true"
                      />
                    ))}
                  </Stack>
                  <Typography
                    variant="srOnly"
                    component="span"
                  >
                    {testimonial.rating} out of 5 stars
                  </Typography>

                  <FormatQuoteIcon
                    aria-hidden="true"
                    sx={{
                      position: 'absolute',
                      top: { xs: 8, sm: 16, md: 20 },
                      right: { xs: 8, sm: 16, md: 20 },
                      fontSize: { xs: 20, sm: 30, md: 40 },
                      color: 'grey.100',
                      display: { xs: 'none', sm: 'block' },
                    }}
                  />

                  <Typography
                    variant="body1"
                    sx={{
                      mb: { xs: 1.5, sm: 2, md: 3 },
                      color: colors.textOnLight,
                      lineHeight: { xs: 1.4, sm: 1.6, md: 1.8 },
                      fontStyle: 'italic',
                      fontSize: { xs: '0.7rem', sm: '0.85rem', md: '1rem' },
                      display: '-webkit-box',
                      WebkitLineClamp: { xs: 4, sm: 6, md: 'unset' },
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    "{testimonial.quote}"
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5, md: 2 } }}>
                    <Avatar
                      sx={{
                        bgcolor: colors.primary,
                        width: { xs: 28, sm: 36, md: 48 },
                        height: { xs: 28, sm: 36, md: 48 },
                        fontWeight: 700,
                        fontSize: { xs: '0.75rem', sm: '1rem', md: '1.25rem' },
                      }}
                      aria-hidden="true"
                    >
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontWeight={700}
                        sx={{
                          color: colors.textOnLight,
                          fontSize: { xs: '0.65rem', sm: '0.8rem', md: '0.875rem' },
                        }}
                      >
                        {testimonial.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.textMuted,
                          fontSize: { xs: '0.55rem', sm: '0.7rem', md: '0.8rem' },
                          display: { xs: 'none', sm: 'block' },
                        }}
                      >
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <Box
        component="section"
        aria-labelledby="final-cta-heading"
        sx={{
          py: { xs: 8, md: 12 },
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
          color: colors.textOnDark,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            id="final-cta-heading"
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: '1.75rem', md: '2.5rem' },
            }}
          >
            Ready to Find Scholarships You'll Actually Win?
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{
              opacity: 0.95,
              mb: 4,
              maxWidth: 550,
              mx: 'auto',
              fontWeight: 400,
              lineHeight: 1.7,
            }}
          >
            Join 50,000+ students who stopped wasting time on scholarships they'd never
            qualify for. Start your free trial today.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/register")}
            endIcon={<ArrowForwardIcon />}
            sx={{
              bgcolor: colors.textOnDark,
              color: colors.primaryDark,
              px: 5,
              py: 2,
              fontSize: '1.15rem',
              fontWeight: 700,
              borderRadius: 2,
              boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
              '&:hover': {
                bgcolor: '#f5f5f5',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
              },
              '&:focus-visible': {
                outline: '3px solid #ffd700',
                outlineOffset: '2px',
              },
              transition: 'all 0.2s ease',
            }}
          >
            Start Your Free Trial
          </Button>

          <Typography
            variant="body2"
            sx={{
              mt: 3,
              opacity: 0.9,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 16 }} />
            No credit card required • 7-day free trial • Cancel anytime
          </Typography>
        </Container>
      </Box>

      {/* Footer - Semantic HTML & Accessible */}
      <Box
        component="footer"
        role="contentinfo"
        sx={{
          bgcolor: colors.footerBg,
          color: colors.textOnDark,
          py: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Brand Column */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                variant="h5"
                component="p"
                fontWeight={800}
                gutterBottom
                sx={{ letterSpacing: '-0.02em' }}
              >
                SortAid
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.8,
                  mb: 3,
                  maxWidth: 280,
                  lineHeight: 1.7,
                }}
              >
                Making scholarship search smarter, faster, and more accessible for students everywhere.
              </Typography>

              {/* Social Links */}
              <Stack direction="row" spacing={1}>
                <IconButton
                  component="a"
                  href="https://twitter.com/sortaid"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Twitter"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    '&:hover': { color: colors.textOnDark, bgcolor: 'rgba(255,255,255,0.1)' },
                    '&:focus-visible': { outline: '2px solid #ffd700' },
                  }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://linkedin.com/company/sortaid"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on LinkedIn"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    '&:hover': { color: colors.textOnDark, bgcolor: 'rgba(255,255,255,0.1)' },
                    '&:focus-visible': { outline: '2px solid #ffd700' },
                  }}
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://instagram.com/sortaid"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    '&:hover': { color: colors.textOnDark, bgcolor: 'rgba(255,255,255,0.1)' },
                    '&:focus-visible': { outline: '2px solid #ffd700' },
                  }}
                >
                  <InstagramIcon />
                </IconButton>
              </Stack>
            </Grid>

            {/* Navigation Columns */}
            <Grid size={{ xs: 6, sm: 4, md: 2 }}>
              <Typography
                variant="subtitle2"
                component="h3"
                fontWeight={700}
                gutterBottom
                sx={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem' }}
              >
                Product
              </Typography>
              <Stack component="nav" aria-label="Product links" spacing={1.5}>
                <Link
                  component={RouterLink}
                  to="/scholarships"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': { color: colors.textOnDark },
                    '&:focus-visible': { outline: '2px solid #ffd700', outlineOffset: 2 },
                  }}
                >
                  Browse Scholarships
                </Link>
                <Link
                  href="#pricing"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': { color: colors.textOnDark },
                    '&:focus-visible': { outline: '2px solid #ffd700', outlineOffset: 2 },
                  }}
                >
                  Pricing
                </Link>
                <Link
                  href="#how-it-works"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': { color: colors.textOnDark },
                    '&:focus-visible': { outline: '2px solid #ffd700', outlineOffset: 2 },
                  }}
                >
                  How It Works
                </Link>
              </Stack>
            </Grid>

            <Grid size={{ xs: 6, sm: 4, md: 2 }}>
              <Typography
                variant="subtitle2"
                component="h3"
                fontWeight={700}
                gutterBottom
                sx={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem' }}
              >
                Company
              </Typography>
              <Stack component="nav" aria-label="Company links" spacing={1.5}>
                <Link
                  href="/about"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': { color: colors.textOnDark },
                    '&:focus-visible': { outline: '2px solid #ffd700', outlineOffset: 2 },
                  }}
                >
                  About Us
                </Link>
                <Link
                  href="/blog"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': { color: colors.textOnDark },
                    '&:focus-visible': { outline: '2px solid #ffd700', outlineOffset: 2 },
                  }}
                >
                  Blog
                </Link>
                <Link
                  href="/careers"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': { color: colors.textOnDark },
                    '&:focus-visible': { outline: '2px solid #ffd700', outlineOffset: 2 },
                  }}
                >
                  Careers
                </Link>
              </Stack>
            </Grid>

            <Grid size={{ xs: 6, sm: 4, md: 2 }}>
              <Typography
                variant="subtitle2"
                component="h3"
                fontWeight={700}
                gutterBottom
                sx={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem' }}
              >
                Support
              </Typography>
              <Stack component="nav" aria-label="Support links" spacing={1.5}>
                <Link
                  href="/help"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': { color: colors.textOnDark },
                    '&:focus-visible': { outline: '2px solid #ffd700', outlineOffset: 2 },
                  }}
                >
                  Help Center
                </Link>
                <Link
                  href="/contact"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': { color: colors.textOnDark },
                    '&:focus-visible': { outline: '2px solid #ffd700', outlineOffset: 2 },
                  }}
                >
                  Contact Us
                </Link>
                <Link
                  href="mailto:support@sortaid.com"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    '&:hover': { color: colors.textOnDark },
                    '&:focus-visible': { outline: '2px solid #ffd700', outlineOffset: 2 },
                  }}
                >
                  <EmailIcon sx={{ fontSize: 16 }} />
                  Email Support
                </Link>
              </Stack>
            </Grid>

            <Grid size={{ xs: 6, sm: 4, md: 2 }}>
              <Typography
                variant="subtitle2"
                component="h3"
                fontWeight={700}
                gutterBottom
                sx={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem' }}
              >
                Legal
              </Typography>
              <Stack component="nav" aria-label="Legal links" spacing={1.5}>
                <Link
                  href="/terms"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': { color: colors.textOnDark },
                    '&:focus-visible': { outline: '2px solid #ffd700', outlineOffset: 2 },
                  }}
                >
                  Terms of Service
                </Link>
                <Link
                  href="/privacy"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': { color: colors.textOnDark },
                    '&:focus-visible': { outline: '2px solid #ffd700', outlineOffset: 2 },
                  }}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/cookies"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    '&:hover': { color: colors.textOnDark },
                    '&:focus-visible': { outline: '2px solid #ffd700', outlineOffset: 2 },
                  }}
                >
                  Cookie Policy
                </Link>
              </Stack>
            </Grid>
          </Grid>

          {/* Copyright */}
          <Box
            sx={{
              borderTop: '1px solid rgba(255,255,255,0.1)',
              mt: 6,
              pt: 4,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{ opacity: 0.7 }}
            >
              © {new Date().getFullYear()} SortAid. All rights reserved.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.7,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              Made with ❤️ for students everywhere
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
