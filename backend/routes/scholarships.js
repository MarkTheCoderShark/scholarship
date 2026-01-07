const express = require('express');
const router = express.Router();
const StudentProfile = require('../models/StudentProfile');
const Scholarship = require('../models/Scholarship');
const { matchScholarships, calculateMatchScore } = require('../services/matchingService');
const { authenticate, optionalAuth } = require('../middleware/auth');

// ===== PUBLIC ENDPOINTS =====

// GET: Fetch all scholarships with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      sort = 'deadline',
      order = 'asc',
      minAmount,
      maxAmount,
      deadlineAfter,
      deadlineBefore,
      fields,
      schoolLevel,
      keyword,
      hideExpired = 'true'
    } = req.query;

    // Build query
    const query = { isActive: true };

    // Hide expired scholarships by default
    if (hideExpired === 'true') {
      query['$or'] = [
        { 'deadline.isExpired': false },
        { 'deadline.isRolling': true },
        { 'deadline.date': { $exists: false } }
      ];
    }

    // Amount filter
    if (minAmount) {
      query['amount.min'] = { $gte: parseInt(minAmount) };
    }
    if (maxAmount) {
      query['amount.max'] = { $lte: parseInt(maxAmount) };
    }

    // Deadline filter
    if (deadlineAfter) {
      query['deadline.date'] = { ...query['deadline.date'], $gte: new Date(deadlineAfter) };
    }
    if (deadlineBefore) {
      query['deadline.date'] = { ...query['deadline.date'], $lte: new Date(deadlineBefore) };
    }

    // Fields of study filter
    if (fields) {
      const fieldsList = fields.split(',').map(f => f.trim());
      query['$or'] = [
        { 'eligibility.softPreferences.preferredMajors': { $in: fieldsList } },
        { 'eligibility.softPreferences.preferredFieldsOfStudy': { $in: fieldsList } },
        { 'eligibility.course': { $in: fieldsList } }
      ];
    }

    // School level filter
    if (schoolLevel) {
      query['eligibility.hardRequirements.schoolLevels'] = {
        $in: [schoolLevel, []]  // Match if includes level or is empty (any level)
      };
    }

    // Keyword search
    if (keyword) {
      query['$text'] = { $search: keyword };
    }

    // Build sort
    const sortOptions = {};
    if (sort === 'deadline') {
      sortOptions['deadline.date'] = order === 'desc' ? -1 : 1;
    } else if (sort === 'amount') {
      sortOptions['amount.max'] = order === 'desc' ? -1 : 1;
    } else if (sort === 'newest') {
      sortOptions['scrapedAt'] = -1;
    } else {
      sortOptions['deadline.date'] = 1;
    }

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [scholarships, total] = await Promise.all([
      Scholarship.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit)),
      Scholarship.countDocuments(query)
    ]);

    res.json({
      scholarships,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    console.error('Get scholarships error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET: Get available filter options (dynamic based on data)
router.get('/filters', async (req, res) => {
  try {
    const [majors, schoolLevels, sources] = await Promise.all([
      Scholarship.distinct('eligibility.softPreferences.preferredMajors'),
      Scholarship.distinct('eligibility.hardRequirements.schoolLevels'),
      Scholarship.distinct('source')
    ]);

    // Get amount range
    const amountStats = await Scholarship.aggregate([
      { $match: { 'amount.min': { $exists: true, $ne: null } } },
      {
        $group: {
          _id: null,
          minAmount: { $min: '$amount.min' },
          maxAmount: { $max: '$amount.max' }
        }
      }
    ]);

    res.json({
      majors: majors.filter(m => m && m.length > 0).flat(),
      schoolLevels: schoolLevels.filter(s => s && s.length > 0).flat(),
      sources: sources.filter(Boolean),
      amountRange: amountStats[0] || { minAmount: 0, maxAmount: 100000 }
    });
  } catch (err) {
    console.error('Get filters error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET: Fetch a single scholarship by ID
router.get('/detail/:id', async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id);

    if (!scholarship) {
      return res.status(404).json({ error: 'Scholarship not found' });
    }

    // Increment view count
    scholarship.views += 1;
    await scholarship.save();

    res.json(scholarship);
  } catch (err) {
    console.error('Get scholarship error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ===== AUTHENTICATED ENDPOINTS =====

// GET: Match scholarships for authenticated user
router.get('/match', authenticate, async (req, res) => {
  try {
    const {
      minScore = 0,
      onlyEligible = 'false',
      page = 1,
      limit = 20,
      sort = 'score'
    } = req.query;

    // Get user profile
    const profile = await StudentProfile.findOne({ userId: req.userId });

    if (!profile) {
      return res.status(404).json({
        error: 'Profile not found',
        message: 'Please complete your profile to get personalized matches'
      });
    }

    // Get all active scholarships
    const scholarships = await Scholarship.find({
      isActive: true,
      '$or': [
        { 'deadline.isExpired': false },
        { 'deadline.isRolling': true },
        { 'deadline.date': { $exists: false } }
      ]
    });

    // Calculate matches
    const matchedResults = matchScholarships(profile, scholarships, {
      minScore: parseInt(minScore),
      onlyEligible: onlyEligible === 'true'
    });

    // Sort results
    if (sort === 'deadline') {
      matchedResults.sort((a, b) => {
        const dateA = a.scholarship.deadline?.date ? new Date(a.scholarship.deadline.date) : new Date('2099-12-31');
        const dateB = b.scholarship.deadline?.date ? new Date(b.scholarship.deadline.date) : new Date('2099-12-31');
        return dateA - dateB;
      });
    } else if (sort === 'amount') {
      matchedResults.sort((a, b) => (b.scholarship.amount?.max || 0) - (a.scholarship.amount?.max || 0));
    }
    // Default sort is by score (already done in matchScholarships)

    // Paginate
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const paginatedResults = matchedResults.slice(skip, skip + parseInt(limit));

    res.json({
      matches: paginatedResults,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: matchedResults.length,
        pages: Math.ceil(matchedResults.length / parseInt(limit))
      },
      profileCompleteness: profile.profileCompleteness
    });
  } catch (err) {
    console.error('Match scholarships error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET: Match scholarships for a specific user (legacy support)
router.get('/match/:userId', async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ userId: req.params.userId });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const scholarships = await Scholarship.find({ isActive: true });
    const matchedResults = matchScholarships(profile, scholarships, {
      minScore: 0,
      onlyEligible: false
    });

    // Return in legacy format for backward compatibility
    res.json(matchedResults.map(r => ({
      ...r.scholarship,
      matchScore: r.score,
      eligible: r.eligible,
      matchReasons: r.reasons
    })));
  } catch (err) {
    console.error('Match scholarships error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET: Calculate match score for a single scholarship
router.get('/match-score/:scholarshipId', authenticate, async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ userId: req.userId });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const scholarship = await Scholarship.findById(req.params.scholarshipId);

    if (!scholarship) {
      return res.status(404).json({ error: 'Scholarship not found' });
    }

    const matchResult = calculateMatchScore(profile, scholarship);

    res.json({
      scholarship,
      ...matchResult
    });
  } catch (err) {
    console.error('Calculate match score error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ===== ADMIN ENDPOINTS =====

// POST: Create a scholarship
router.post('/', async (req, res) => {
  try {
    const scholarship = new Scholarship(req.body);
    await scholarship.save();
    res.status(201).json(scholarship);
  } catch (err) {
    console.error('Create scholarship error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT: Update a scholarship
router.put('/:id', async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!scholarship) {
      return res.status(404).json({ error: 'Scholarship not found' });
    }

    res.json(scholarship);
  } catch (err) {
    console.error('Update scholarship error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE: Delete a scholarship
router.delete('/:id', async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndDelete(req.params.id);

    if (!scholarship) {
      return res.status(404).json({ error: 'Scholarship not found' });
    }

    res.json({ message: 'Scholarship deleted' });
  } catch (err) {
    console.error('Delete scholarship error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST: Bulk update scholarships (for data migration)
router.post('/migrate', async (req, res) => {
  try {
    const scholarships = await Scholarship.find({});
    let updated = 0;

    for (const scholarship of scholarships) {
      const updates = await Scholarship.migrateToNewFormat(scholarship);

      if (Object.keys(updates).length > 0) {
        await Scholarship.findByIdAndUpdate(scholarship._id, { $set: updates });
        updated++;
      }
    }

    res.json({ message: `Migrated ${updated} scholarships` });
  } catch (err) {
    console.error('Migration error:', err);
    res.status(500).json({ error: 'Migration failed' });
  }
});

module.exports = router;
