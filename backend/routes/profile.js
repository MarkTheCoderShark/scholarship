const express = require('express');
const router = express.Router();
const StudentProfile = require('../models/StudentProfile');
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');

// ===== ONBOARDING ENDPOINTS =====

// POST: Save onboarding step data
router.post('/onboarding', authenticate, async (req, res) => {
  try {
    const { step, data } = req.body;
    const userId = req.userId;

    let profile = await StudentProfile.findOne({ userId });

    if (!profile) {
      profile = new StudentProfile({ userId });
    }

    // Merge step data into profile
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined) {
        profile[key] = data[key];
      }
    });

    // Update onboarding progress
    profile.onboardingStep = Math.max(profile.onboardingStep, step);

    // Check if onboarding is complete (step 8 is Review/final step)
    if (step >= 7) {
      profile.onboardingCompleted = true;

      // Also update the user record
      await User.findByIdAndUpdate(userId, { onboardingCompleted: true });
    }

    // Calculate profile completeness
    profile.calculateCompleteness();

    await profile.save();

    res.json({
      message: 'Onboarding step saved',
      profile,
      onboardingStep: profile.onboardingStep,
      profileCompleteness: profile.profileCompleteness
    });
  } catch (err) {
    console.error('Onboarding error:', err);
    res.status(500).json({ error: 'Failed to save onboarding data' });
  }
});

// GET: Get onboarding progress
router.get('/onboarding/progress', authenticate, async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ userId: req.userId });

    if (!profile) {
      return res.json({
        onboardingStep: 0,
        onboardingCompleted: false,
        profileCompleteness: 0,
        completedSections: []
      });
    }

    res.json({
      onboardingStep: profile.onboardingStep,
      onboardingCompleted: profile.onboardingCompleted,
      profileCompleteness: profile.profileCompleteness,
      completedSections: profile.completedSections
    });
  } catch (err) {
    console.error('Get onboarding progress error:', err);
    res.status(500).json({ error: 'Failed to get onboarding progress' });
  }
});

// ===== PROFILE CRUD ENDPOINTS =====

// POST: Create or update a student profile
router.post('/', authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    let profile = await StudentProfile.findOne({ userId });

    if (profile) {
      // Update existing profile
      Object.keys(req.body).forEach(key => {
        if (req.body[key] !== undefined && key !== 'userId') {
          profile[key] = req.body[key];
        }
      });

      profile.calculateCompleteness();
      await profile.save();
      return res.json(profile);
    }

    // Create new profile
    profile = new StudentProfile({
      userId,
      ...req.body
    });

    profile.calculateCompleteness();
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    console.error('Create/update profile error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET: Get current user's profile
router.get('/me', authenticate, async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ userId: req.userId });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET: Get profile completeness breakdown
router.get('/completeness', authenticate, async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ userId: req.userId });

    if (!profile) {
      return res.json({
        profileCompleteness: 0,
        completedSections: [],
        missingSections: ['personal', 'academic', 'location', 'financial', 'background', 'interests', 'activities']
      });
    }

    const allSections = ['personal', 'academic', 'location', 'financial', 'background', 'interests', 'activities'];
    const missingSections = allSections.filter(s => !profile.completedSections.includes(s));

    res.json({
      profileCompleteness: profile.profileCompleteness,
      completedSections: profile.completedSections,
      missingSections
    });
  } catch (err) {
    console.error('Get completeness error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET: Retrieve a student profile by userId (legacy support)
router.get('/:userId', async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ userId: req.params.userId });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error('Get profile by userId error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT: Update a student profile
router.put('/:userId', authenticate, async (req, res) => {
  try {
    // Verify user is updating their own profile
    if (req.params.userId !== req.userId.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this profile' });
    }

    const profile = await StudentProfile.findOne({ userId: req.params.userId });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Update fields
    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined && key !== 'userId') {
        profile[key] = req.body[key];
      }
    });

    profile.calculateCompleteness();
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH: Update specific profile section
router.patch('/section/:section', authenticate, async (req, res) => {
  try {
    const { section } = req.params;
    const profile = await StudentProfile.findOne({ userId: req.userId });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Define which fields belong to each section
    const sectionFields = {
      personal: ['dateOfBirth', 'gender', 'ethnicity', 'citizenshipStatus', 'countryOfOrigin'],
      academic: ['gpa', 'gpaScale', 'major', 'fieldsOfStudy', 'schoolLevel', 'expectedGraduationYear', 'currentSchool', 'satScore', 'actScore'],
      location: ['state', 'country', 'city'],
      financial: ['financialNeedLevel', 'estimatedFamilyContribution', 'householdSize', 'householdIncome'],
      background: ['isFirstGeneration', 'hasDisability', 'disabilityTypes', 'isMilitary', 'militaryStatus', 'militaryBranch'],
      interests: ['interests', 'careerGoals'],
      activities: ['extracurriculars', 'achievements', 'communityServiceHours', 'workExperience', 'languages', 'specialSkills']
    };

    const allowedFields = sectionFields[section];

    if (!allowedFields) {
      return res.status(400).json({ error: 'Invalid section' });
    }

    // Only update fields in the specified section
    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key) && req.body[key] !== undefined) {
        profile[key] = req.body[key];
      }
    });

    profile.calculateCompleteness();
    await profile.save();

    res.json({
      message: `Section '${section}' updated`,
      profile,
      profileCompleteness: profile.profileCompleteness
    });
  } catch (err) {
    console.error('Update section error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE: Delete a student profile
router.delete('/:userId', authenticate, async (req, res) => {
  try {
    // Verify user is deleting their own profile
    if (req.params.userId !== req.userId.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this profile' });
    }

    const profile = await StudentProfile.findOneAndDelete({ userId: req.params.userId });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({ message: 'Profile deleted' });
  } catch (err) {
    console.error('Delete profile error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
