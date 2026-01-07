import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Container, Typography, Button, Grid, Card, CardContent,
  Avatar, Stack, Chip, useTheme, useMediaQuery, Paper
} from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const stats = [
    { value: "10,000+", label: "Scholarships" },
    { value: "$50M+", label: "In Funding" },
    { value: "95%", label: "Match Rate" },
    { value: "50K+", label: "Students Helped" },
  ];

  const features = [
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: 40 }} />,
      title: "AI-Powered Matching",
      description: "Our smart algorithm analyzes your profile and matches you with scholarships you're most likely to win."
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: "Save Hours of Research",
      description: "Stop scrolling through thousands of scholarships. We curate the best matches for your unique profile."
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: "Track Your Progress",
      description: "Monitor application deadlines, save favorites, and track your scholarship journey all in one place."
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: "Verified Opportunities",
      description: "Every scholarship is verified and updated regularly. No scams, no expired listings."
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Tell us about your academics, interests, and background. It only takes 5 minutes."
    },
    {
      number: "02",
      title: "Get Matched",
      description: "Our algorithm instantly finds scholarships that fit your unique profile and goals."
    },
    {
      number: "03",
      title: "Apply & Win",
      description: "Apply to your top matches with confidence. Track deadlines and maximize your chances."
    },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Stanford University, Class of 2026",
      quote: "SortAid helped me find $25,000 in scholarships I never knew I qualified for. The matching is incredibly accurate!",
      avatar: "S"
    },
    {
      name: "Marcus J.",
      role: "First-Generation Student",
      quote: "As a first-gen student, I had no idea where to start. SortAid made the process so much easier and less overwhelming.",
      avatar: "M"
    },
    {
      name: "Emily C.",
      role: "High School Senior",
      quote: "I applied to 15 scholarships through SortAid and won 4 of them! The match scores really helped me prioritize.",
      avatar: "E"
    },
  ];

  const benefits = [
    "Personalized scholarship matches based on 20+ criteria",
    "Real-time deadline tracking and reminders",
    "No duplicate or expired scholarships",
    "Free to use - forever",
    "New scholarships added daily",
    "Works for high school, undergrad, and grad students",
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 50%, #0d47a1 100%)',
          color: 'white',
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 16 },
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: 'linear-gradient(to top right, #fff 50%, transparent 50%)',
          }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Chip
                label="Trusted by 50,000+ students"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  mb: 3,
                  fontWeight: 500
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 3
                }}
              >
                Find Scholarships
                <br />
                <Box component="span" sx={{ color: '#90caf9' }}>
                  You Actually Qualify For
                </Box>
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontWeight: 400,
                  lineHeight: 1.6,
                  maxWidth: 540
                }}
              >
                Stop wasting time on scholarships you won't win. Our AI matches you with opportunities tailored to your unique profile.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/register")}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: '#f5f5f5',
                    }
                  }}
                  endIcon={<ArrowForwardIcon />}
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/scholarships")}
                  sx={{
                    borderColor: 'rgba(255,255,255,0.5)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                    }
                  }}
                >
                  Browse Scholarships
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  p: 4,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Stack spacing={2}>
                  {[
                    { score: 94, name: "STEM Excellence Award", amount: "$10,000" },
                    { score: 87, name: "First-Gen Scholars Fund", amount: "$5,000" },
                    { score: 82, name: "Community Leaders Grant", amount: "$7,500" },
                  ].map((item, idx) => (
                    <Paper
                      key={idx}
                      sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        bgcolor: 'white',
                        borderRadius: 2
                      }}
                    >
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          bgcolor: item.score >= 90 ? '#e8f5e9' : item.score >= 80 ? '#fff3e0' : '#ffebee',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          color: item.score >= 90 ? '#2e7d32' : item.score >= 80 ? '#ef6c00' : '#c62828',
                        }}
                      >
                        {item.score}%
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="success.main" fontWeight={600}>
                          {item.amount}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 1 }}>
        <Paper elevation={3} sx={{ borderRadius: 4, py: 4, px: 2 }}>
          <Grid container spacing={2} justifyContent="center">
            {stats.map((stat, idx) => (
              <Grid item xs={6} md={3} key={idx}>
                <Box textAlign="center">
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: 'primary.main',
                      fontSize: { xs: '1.8rem', md: '2.5rem' }
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#fafafa' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.75rem' }
              }}
            >
              Why Students Love SortAid
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              We've helped thousands of students find and win scholarships. Here's how we make it happen.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 2,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    }
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        color: 'primary.main',
                        mb: 2,
                        display: 'inline-flex',
                        p: 2,
                        borderRadius: '50%',
                        bgcolor: 'primary.50',
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.75rem' }
              }}
            >
              How It Works
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Get matched with scholarships in three simple steps
            </Typography>
          </Box>

          <Grid container spacing={4} alignItems="stretch">
            {steps.map((step, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 4,
                    height: '100%',
                    position: 'relative',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '5rem',
                      fontWeight: 800,
                      color: 'primary.100',
                      lineHeight: 1,
                      mb: 2
                    }}
                  >
                    {step.number}
                  </Typography>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {step.description}
                  </Typography>
                  {idx < steps.length - 1 && !isMobile && (
                    <ArrowForwardIcon
                      sx={{
                        position: 'absolute',
                        right: -20,
                        top: '40%',
                        fontSize: 40,
                        color: 'grey.300'
                      }}
                    />
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'primary.main', color: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '2.75rem' }
                }}
              >
                Everything You Need to Fund Your Education
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
                SortAid gives you the tools and insights to maximize your scholarship success.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/register")}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                  }
                }}
              >
                Start Finding Scholarships
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                {benefits.map((benefit, idx) => (
                  <Grid item xs={12} sm={6} key={idx}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                      <CheckCircleIcon sx={{ color: '#90caf9', mt: 0.3 }} />
                      <Typography variant="body1">{benefit}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.75rem' }
              }}
            >
              Students Love SortAid
            </Typography>
            <Typography variant="h6" color="text.secondary">
              See what our community has to say
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card
                  sx={{
                    height: '100%',
                    p: 3,
                    position: 'relative',
                    bgcolor: idx === 1 ? 'primary.50' : 'white',
                  }}
                >
                  <FormatQuoteIcon
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      fontSize: 40,
                      color: 'grey.200'
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 3,
                        fontStyle: 'italic',
                        lineHeight: 1.8
                      }}
                    >
                      "{testimonial.quote}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: '2rem', md: '2.75rem' }
            }}
          >
            Ready to Find Your Perfect Scholarship?
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4, maxWidth: 600, mx: 'auto' }}>
            Join 50,000+ students who have discovered scholarships they never knew existed. It's free, fast, and could change your future.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/register")}
              sx={{
                bgcolor: 'white',
                color: '#764ba2',
                px: 5,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: '#f5f5f5',
                }
              }}
              endIcon={<ArrowForwardIcon />}
            >
              Create Free Account
            </Button>
          </Stack>
          <Typography variant="body2" sx={{ mt: 3, opacity: 0.8 }}>
            No credit card required. Start finding scholarships in under 5 minutes.
          </Typography>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#1a1a2e', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                SortAid
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>
                Making scholarship search smarter, faster, and more accessible for students everywhere.
              </Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Product
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  Features
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  Scholarships
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  Pricing
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Company
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  About
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  Blog
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  Careers
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Support
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  Help Center
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  Contact
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  Privacy
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Legal
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  Terms
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  Privacy
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, cursor: 'pointer', '&:hover': { opacity: 1 } }}>
                  Cookies
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 4, pt: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ opacity: 0.5 }}>
              © {new Date().getFullYear()} SortAid. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
