const { SCORING_WEIGHTS } = require('../config/constants');

/**
 * Calculate the match score between a student profile and a scholarship
 * @param {Object} profile - The student profile
 * @param {Object} scholarship - The scholarship to match against
 * @returns {Object} Match result with score, eligibility, and reasons
 */
function calculateMatchScore(profile, scholarship) {
  const result = {
    score: 0,
    eligible: true,
    matchDetails: {},
    reasons: [],
    failedRequirements: []
  };

  // Get eligibility requirements with defaults
  const hardReqs = scholarship.eligibility?.hardRequirements || {};
  const softPrefs = scholarship.eligibility?.softPreferences || {};

  // ===== STEP 1: Check Hard Requirements =====
  const hardCheckResult = checkHardRequirements(profile, hardReqs, scholarship.eligibility);

  if (!hardCheckResult.passed) {
    return {
      score: 0,
      eligible: false,
      matchDetails: {},
      reasons: hardCheckResult.reasons,
      failedRequirements: hardCheckResult.failed
    };
  }

  result.reasons.push(...hardCheckResult.reasons);

  // ===== STEP 2: Calculate Soft Preference Scores =====
  let totalScore = 0;

  // Major Match (25 points)
  const majorScore = calculateMajorScore(profile, softPrefs);
  totalScore += majorScore.score;
  result.matchDetails.major = majorScore.detail;
  if (majorScore.reason) result.reasons.push(majorScore.reason);

  // Field of Study Match (15 points)
  const fieldScore = calculateFieldScore(profile, softPrefs);
  totalScore += fieldScore.score;
  result.matchDetails.field = fieldScore.detail;
  if (fieldScore.reason) result.reasons.push(fieldScore.reason);

  // Ethnicity Match (10 points)
  const ethnicityScore = calculateEthnicityScore(profile, softPrefs);
  totalScore += ethnicityScore.score;
  result.matchDetails.ethnicity = ethnicityScore.detail;
  if (ethnicityScore.reason) result.reasons.push(ethnicityScore.reason);

  // Gender Match (10 points)
  const genderScore = calculateGenderScore(profile, softPrefs);
  totalScore += genderScore.score;
  result.matchDetails.gender = genderScore.detail;
  if (genderScore.reason) result.reasons.push(genderScore.reason);

  // Financial Need Match (10 points)
  const financialScore = calculateFinancialScore(profile, softPrefs);
  totalScore += financialScore.score;
  result.matchDetails.financialNeed = financialScore.detail;
  if (financialScore.reason) result.reasons.push(financialScore.reason);

  // First Generation Match (10 points)
  const firstGenScore = calculateFirstGenScore(profile, softPrefs);
  totalScore += firstGenScore.score;
  result.matchDetails.firstGeneration = firstGenScore.detail;
  if (firstGenScore.reason) result.reasons.push(firstGenScore.reason);

  // Military Match (5 points)
  const militaryScore = calculateMilitaryScore(profile, softPrefs);
  totalScore += militaryScore.score;
  result.matchDetails.military = militaryScore.detail;
  if (militaryScore.reason) result.reasons.push(militaryScore.reason);

  // Disability Match (5 points)
  const disabilityScore = calculateDisabilityScore(profile, softPrefs);
  totalScore += disabilityScore.score;
  result.matchDetails.disability = disabilityScore.detail;
  if (disabilityScore.reason) result.reasons.push(disabilityScore.reason);

  // Interests Match (5 points)
  const interestsScore = calculateInterestsScore(profile, softPrefs);
  totalScore += interestsScore.score;
  result.matchDetails.interests = interestsScore.detail;
  if (interestsScore.reason) result.reasons.push(interestsScore.reason);

  // Extracurriculars Match (5 points)
  const activitiesScore = calculateActivitiesScore(profile, softPrefs);
  totalScore += activitiesScore.score;
  result.matchDetails.activities = activitiesScore.detail;
  if (activitiesScore.reason) result.reasons.push(activitiesScore.reason);

  result.score = Math.min(100, Math.round(totalScore));

  return result;
}

/**
 * Check hard requirements - these are pass/fail
 */
function checkHardRequirements(profile, hardReqs, legacyEligibility) {
  const result = {
    passed: true,
    reasons: [],
    failed: []
  };

  // GPA Check
  const minGpa = hardReqs.minGpa || legacyEligibility?.gpa;
  if (minGpa && profile.gpa) {
    // Normalize GPA if different scales
    const normalizedProfileGpa = normalizeGpa(profile.gpa, profile.gpaScale || 4.0);

    if (normalizedProfileGpa < minGpa) {
      result.passed = false;
      result.failed.push(`Minimum GPA ${minGpa} required (yours: ${profile.gpa})`);
    } else {
      result.reasons.push(`Your GPA (${profile.gpa}) meets the requirement`);
    }
  }

  // Citizenship Check
  if (hardReqs.citizenshipRequired && hardReqs.citizenshipRequired.length > 0) {
    if (!hardReqs.citizenshipRequired.includes(profile.citizenshipStatus)) {
      result.passed = false;
      result.failed.push(`Citizenship requirement not met`);
    } else {
      result.reasons.push(`Your citizenship status qualifies`);
    }
  }

  // Location Check
  const allowedLocations = hardReqs.locationsAllowed || [];
  const legacyLocation = legacyEligibility?.location;

  if (allowedLocations.length > 0) {
    const profileLocations = [profile.state, profile.country, profile.city].filter(Boolean);
    const locationMatch = allowedLocations.some(loc =>
      profileLocations.some(pLoc =>
        pLoc && loc && pLoc.toLowerCase().includes(loc.toLowerCase())
      )
    );

    if (!locationMatch) {
      result.passed = false;
      result.failed.push(`Location requirement not met`);
    } else {
      result.reasons.push(`Your location qualifies`);
    }
  } else if (legacyLocation && legacyLocation !== 'N/A' && legacyLocation !== 'US') {
    // Check against legacy location field
    const profileLocations = [profile.state, profile.country].filter(Boolean);
    const locationMatch = profileLocations.some(pLoc =>
      pLoc && legacyLocation.toLowerCase().includes(pLoc.toLowerCase())
    );
    // Don't fail for legacy - just note it
  }

  // School Level Check
  if (hardReqs.schoolLevels && hardReqs.schoolLevels.length > 0) {
    if (!hardReqs.schoolLevels.includes(profile.schoolLevel)) {
      result.passed = false;
      result.failed.push(`School level requirement not met`);
    } else {
      result.reasons.push(`Your education level qualifies`);
    }
  }

  // Age Check
  if (profile.age !== null && profile.age !== undefined) {
    if (hardReqs.ageMin && profile.age < hardReqs.ageMin) {
      result.passed = false;
      result.failed.push(`Minimum age ${hardReqs.ageMin} required`);
    }
    if (hardReqs.ageMax && profile.age > hardReqs.ageMax) {
      result.passed = false;
      result.failed.push(`Maximum age ${hardReqs.ageMax} required`);
    }
  }

  return result;
}

/**
 * Calculate major match score
 */
function calculateMajorScore(profile, softPrefs) {
  const maxPoints = SCORING_WEIGHTS.majorMatch;

  // If no preferred majors, award full points
  if (!softPrefs.preferredMajors || softPrefs.preferredMajors.length === 0) {
    return { score: maxPoints, detail: 'open', reason: null };
  }

  const profileMajor = (profile.major || '').toLowerCase();

  // Check for exact match
  const exactMatch = softPrefs.preferredMajors.some(m =>
    m.toLowerCase() === profileMajor
  );

  if (exactMatch) {
    return {
      score: maxPoints,
      detail: 'exact',
      reason: `Your major matches scholarship preferences`
    };
  }

  // Check for partial/related match
  const partialMatch = softPrefs.preferredMajors.some(m =>
    profileMajor.includes(m.toLowerCase()) || m.toLowerCase().includes(profileMajor)
  );

  if (partialMatch) {
    return {
      score: Math.round(maxPoints * 0.6),
      detail: 'partial',
      reason: `Your major is related to preferred fields`
    };
  }

  return { score: 0, detail: 'none', reason: null };
}

/**
 * Calculate field of study match score
 */
function calculateFieldScore(profile, softPrefs) {
  const maxPoints = SCORING_WEIGHTS.fieldOfStudyMatch;

  if (!softPrefs.preferredFieldsOfStudy || softPrefs.preferredFieldsOfStudy.length === 0) {
    return { score: maxPoints, detail: 'open', reason: null };
  }

  const profileFields = (profile.fieldsOfStudy || []).map(f => f.toLowerCase());

  if (profileFields.length === 0) {
    return { score: 0, detail: 'none', reason: null };
  }

  const overlap = softPrefs.preferredFieldsOfStudy.filter(f =>
    profileFields.some(pf => pf.includes(f.toLowerCase()) || f.toLowerCase().includes(pf))
  );

  const overlapRatio = overlap.length / softPrefs.preferredFieldsOfStudy.length;
  const score = Math.round(maxPoints * overlapRatio);

  if (overlapRatio > 0) {
    return {
      score,
      detail: overlapRatio > 0.5 ? 'strong' : 'partial',
      reason: `Your fields of study align with scholarship`
    };
  }

  return { score: 0, detail: 'none', reason: null };
}

/**
 * Calculate ethnicity match score
 */
function calculateEthnicityScore(profile, softPrefs) {
  const maxPoints = SCORING_WEIGHTS.ethnicityMatch;

  if (!softPrefs.targetEthnicities || softPrefs.targetEthnicities.length === 0) {
    return { score: maxPoints, detail: 'open', reason: null };
  }

  const profileEthnicities = profile.ethnicity || [];

  if (profileEthnicities.length === 0) {
    return { score: 0, detail: 'unknown', reason: null };
  }

  const match = softPrefs.targetEthnicities.some(e =>
    profileEthnicities.includes(e)
  );

  if (match) {
    return {
      score: maxPoints,
      detail: 'match',
      reason: `Scholarship targets your demographic background`
    };
  }

  return { score: 0, detail: 'none', reason: null };
}

/**
 * Calculate gender match score
 */
function calculateGenderScore(profile, softPrefs) {
  const maxPoints = SCORING_WEIGHTS.genderMatch;

  if (!softPrefs.targetGenders || softPrefs.targetGenders.length === 0) {
    return { score: maxPoints, detail: 'open', reason: null };
  }

  if (!profile.gender) {
    return { score: 0, detail: 'unknown', reason: null };
  }

  if (softPrefs.targetGenders.includes(profile.gender)) {
    return {
      score: maxPoints,
      detail: 'match',
      reason: `Scholarship targets your gender`
    };
  }

  return { score: 0, detail: 'none', reason: null };
}

/**
 * Calculate financial need score
 */
function calculateFinancialScore(profile, softPrefs) {
  const maxPoints = SCORING_WEIGHTS.financialNeedMatch;

  if (!softPrefs.financialNeedPreferred) {
    return { score: maxPoints, detail: 'not-required', reason: null };
  }

  const highNeedLevels = ['high', 'moderate'];

  if (highNeedLevels.includes(profile.financialNeedLevel)) {
    return {
      score: maxPoints,
      detail: 'match',
      reason: `Scholarship prioritizes students with financial need`
    };
  }

  return { score: 0, detail: 'none', reason: null };
}

/**
 * Calculate first generation score
 */
function calculateFirstGenScore(profile, softPrefs) {
  const maxPoints = SCORING_WEIGHTS.firstGenerationMatch;

  if (!softPrefs.firstGenerationPreferred) {
    return { score: maxPoints, detail: 'not-required', reason: null };
  }

  if (profile.isFirstGeneration) {
    return {
      score: maxPoints,
      detail: 'match',
      reason: `Scholarship prioritizes first-generation students`
    };
  }

  return { score: 0, detail: 'none', reason: null };
}

/**
 * Calculate military affiliation score
 */
function calculateMilitaryScore(profile, softPrefs) {
  const maxPoints = SCORING_WEIGHTS.militaryMatch;

  if (!softPrefs.militaryAffiliationPreferred) {
    return { score: maxPoints, detail: 'not-required', reason: null };
  }

  if (profile.isMilitary || (profile.militaryStatus && profile.militaryStatus !== 'none')) {
    return {
      score: maxPoints,
      detail: 'match',
      reason: `Scholarship prioritizes military-affiliated students`
    };
  }

  return { score: 0, detail: 'none', reason: null };
}

/**
 * Calculate disability score
 */
function calculateDisabilityScore(profile, softPrefs) {
  const maxPoints = SCORING_WEIGHTS.disabilityMatch;

  if (!softPrefs.disabilityPreferred) {
    return { score: maxPoints, detail: 'not-required', reason: null };
  }

  if (profile.hasDisability) {
    return {
      score: maxPoints,
      detail: 'match',
      reason: `Scholarship supports students with disabilities`
    };
  }

  return { score: 0, detail: 'none', reason: null };
}

/**
 * Calculate interests overlap score
 */
function calculateInterestsScore(profile, softPrefs) {
  const maxPoints = SCORING_WEIGHTS.interestsMatch;

  if (!softPrefs.interestsRelated || softPrefs.interestsRelated.length === 0) {
    return { score: maxPoints, detail: 'open', reason: null };
  }

  const profileInterests = (profile.interests || []).map(i => i.toLowerCase());

  if (profileInterests.length === 0) {
    return { score: 0, detail: 'none', reason: null };
  }

  const overlap = softPrefs.interestsRelated.filter(i =>
    profileInterests.some(pi => pi.includes(i.toLowerCase()) || i.toLowerCase().includes(pi))
  );

  const overlapRatio = overlap.length / softPrefs.interestsRelated.length;
  const score = Math.round(maxPoints * Math.min(1, overlapRatio * 2)); // Boost partial matches

  if (overlapRatio > 0) {
    return {
      score,
      detail: 'match',
      reason: `Your interests align with scholarship focus`
    };
  }

  return { score: 0, detail: 'none', reason: null };
}

/**
 * Calculate extracurriculars score
 */
function calculateActivitiesScore(profile, softPrefs) {
  const maxPoints = SCORING_WEIGHTS.extracurricularsMatch;

  if (!softPrefs.extracurricularsRelated || softPrefs.extracurricularsRelated.length === 0) {
    return { score: maxPoints, detail: 'open', reason: null };
  }

  const profileActivities = (profile.extracurriculars || []).map(e =>
    e.category?.toLowerCase() || e.name?.toLowerCase()
  ).filter(Boolean);

  if (profileActivities.length === 0) {
    return { score: 0, detail: 'none', reason: null };
  }

  const overlap = softPrefs.extracurricularsRelated.filter(a =>
    profileActivities.some(pa => pa.includes(a.toLowerCase()) || a.toLowerCase().includes(pa))
  );

  const overlapRatio = overlap.length / softPrefs.extracurricularsRelated.length;
  const score = Math.round(maxPoints * Math.min(1, overlapRatio * 2));

  if (overlapRatio > 0) {
    return {
      score,
      detail: 'match',
      reason: `Your activities align with scholarship preferences`
    };
  }

  return { score: 0, detail: 'none', reason: null };
}

/**
 * Normalize GPA to 4.0 scale
 */
function normalizeGpa(gpa, scale) {
  if (scale === 4.0 || !scale) return gpa;
  if (scale === 5.0) return (gpa / 5.0) * 4.0;
  if (scale === 10.0) return (gpa / 10.0) * 4.0;
  if (scale === 100) return (gpa / 100) * 4.0;
  return gpa;
}

/**
 * Match a profile against multiple scholarships
 * @param {Object} profile - Student profile
 * @param {Array} scholarships - Array of scholarships
 * @param {Object} options - Filtering options
 * @returns {Array} Sorted array of scholarships with match scores
 */
function matchScholarships(profile, scholarships, options = {}) {
  const { minScore = 0, onlyEligible = false, limit = 100 } = options;

  const results = scholarships.map(scholarship => {
    const matchResult = calculateMatchScore(profile, scholarship);
    return {
      scholarship: scholarship.toObject ? scholarship.toObject() : scholarship,
      ...matchResult
    };
  });

  // Filter results
  let filtered = results;

  if (onlyEligible) {
    filtered = filtered.filter(r => r.eligible);
  }

  if (minScore > 0) {
    filtered = filtered.filter(r => r.score >= minScore);
  }

  // Sort by score (descending)
  filtered.sort((a, b) => b.score - a.score);

  // Apply limit
  if (limit) {
    filtered = filtered.slice(0, limit);
  }

  return filtered;
}

module.exports = {
  calculateMatchScore,
  matchScholarships,
  checkHardRequirements
};
