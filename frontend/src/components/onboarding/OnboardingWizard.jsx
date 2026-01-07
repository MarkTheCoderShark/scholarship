import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Stepper, Step, StepLabel, Button, Typography,
  Paper, Container, CircularProgress, Alert
} from '@mui/material';
import { UserContext } from '../UserContext';
import { profileAPI } from '../../services/api';
import { ONBOARDING_STEPS } from '../../utils/constants';

// Import step components
import PersonalInfoStep from './steps/PersonalInfoStep';
import AcademicInfoStep from './steps/AcademicInfoStep';
import LocationStep from './steps/LocationStep';
import FinancialStep from './steps/FinancialStep';
import BackgroundStep from './steps/BackgroundStep';
import InterestsStep from './steps/InterestsStep';
import ActivitiesStep from './steps/ActivitiesStep';
import ReviewStep from './steps/ReviewStep';

const stepComponents = [
  PersonalInfoStep,
  AcademicInfoStep,
  LocationStep,
  FinancialStep,
  BackgroundStep,
  InterestsStep,
  ActivitiesStep,
  ReviewStep
];

export default function OnboardingWizard() {
  const navigate = useNavigate();
  const { user, updateProfile, refreshProfile } = useContext(UserContext);

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Load existing progress on mount
  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const response = await profileAPI.getOnboardingProgress();
      const { onboardingStep, onboardingCompleted } = response.data;

      if (onboardingCompleted) {
        navigate('/scholarships');
        return;
      }

      // Load existing profile data
      try {
        const profileResponse = await profileAPI.getProfile();
        setFormData(profileResponse.data);
        setActiveStep(onboardingStep || 0);
      } catch (err) {
        // No profile yet - start fresh
        setActiveStep(0);
      }
    } catch (err) {
      console.error('Failed to load progress:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    setIsSaving(true);
    setError(null);

    try {
      // Save current step data
      await profileAPI.saveOnboardingStep(activeStep, formData);

      if (activeStep === ONBOARDING_STEPS.length - 1) {
        // Last step - complete onboarding
        await refreshProfile();
        navigate('/scholarships');
      } else {
        setActiveStep(prev => prev + 1);
      }
    } catch (err) {
      console.error('Failed to save step:', err);
      setError('Failed to save your progress. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSkip = () => {
    setActiveStep(prev => prev + 1);
  };

  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const CurrentStepComponent = stepComponents[activeStep];
  const isLastStep = activeStep === ONBOARDING_STEPS.length - 1;
  const currentStepConfig = ONBOARDING_STEPS[activeStep];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Complete Your Profile
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Help us find the best scholarship matches for you
        </Typography>

        {/* Stepper */}
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {ONBOARDING_STEPS.map((step) => (
            <Step key={step.id}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Step Content */}
        <Box sx={{ minHeight: 300, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {currentStepConfig.description}
          </Typography>

          <CurrentStepComponent
            data={formData}
            onUpdate={updateFormData}
          />
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>

          <Box>
            {activeStep < ONBOARDING_STEPS.length - 2 && (
              <Button onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button
              variant="contained"
              onClick={handleNext}
              disabled={isSaving}
            >
              {isSaving ? (
                <CircularProgress size={24} />
              ) : isLastStep ? (
                'Complete Profile'
              ) : (
                'Next'
              )}
            </Button>
          </Box>
        </Box>

        {/* Progress indicator */}
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
          Step {activeStep + 1} of {ONBOARDING_STEPS.length}
        </Typography>
      </Paper>
    </Container>
  );
}
