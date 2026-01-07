const mongoose = require('mongoose');

const extracurricularSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ['sports', 'arts', 'leadership', 'volunteer', 'academic', 'work', 'stem', 'religious', 'cultural', 'other']
  },
  yearsInvolved: { type: Number, min: 0, max: 20 },
  leadershipRole: { type: Boolean, default: false },
  description: { type: String }
}, { _id: false });

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String },
  year: { type: Number },
  description: { type: String }
}, { _id: false });

const studentProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },

  // ===== PERSONAL DEMOGRAPHICS =====
  dateOfBirth: { type: Date },
  gender: {
    type: String,
    enum: ['male', 'female', 'non-binary', 'other', 'prefer-not-to-say']
  },
  ethnicity: {
    type: [String],
    default: [],
    enum: [
      'african-american', 'asian', 'caucasian', 'hispanic-latino',
      'native-american', 'pacific-islander', 'middle-eastern',
      'multiracial', 'other', 'prefer-not-to-say'
    ]
  },
  citizenshipStatus: {
    type: String,
    enum: ['us-citizen', 'permanent-resident', 'daca', 'international', 'refugee', 'other']
  },
  countryOfOrigin: { type: String },

  // ===== ACADEMIC INFORMATION =====
  gpa: {
    type: Number,
    min: 0,
    max: 5.0
  },
  gpaScale: {
    type: Number,
    default: 4.0,
    enum: [4.0, 5.0, 10.0, 100]
  },
  major: { type: String },
  fieldsOfStudy: {
    type: [String],
    default: []
  },
  schoolLevel: {
    type: String,
    enum: ['high-school', 'undergraduate', 'graduate', 'postgraduate', 'vocational']
  },
  expectedGraduationYear: {
    type: Number,
    min: 2020,
    max: 2040
  },
  currentSchool: { type: String },
  satScore: { type: Number, min: 400, max: 1600 },
  actScore: { type: Number, min: 1, max: 36 },

  // ===== LOCATION =====
  state: { type: String },
  country: {
    type: String,
    default: 'United States'
  },
  city: { type: String },

  // ===== FINANCIAL & BACKGROUND =====
  financialNeedLevel: {
    type: String,
    enum: ['high', 'moderate', 'low', 'none']
  },
  estimatedFamilyContribution: { type: Number, min: 0 },
  isFirstGeneration: {
    type: Boolean,
    default: false
  },
  householdSize: { type: Number, min: 1, max: 20 },
  householdIncome: {
    type: String,
    enum: ['under-30k', '30k-50k', '50k-75k', '75k-100k', '100k-150k', 'over-150k', 'prefer-not-to-say']
  },

  // ===== SPECIAL CIRCUMSTANCES =====
  hasDisability: {
    type: Boolean,
    default: false
  },
  disabilityTypes: {
    type: [String],
    default: []
  },
  isMilitary: {
    type: Boolean,
    default: false
  },
  militaryStatus: {
    type: String,
    enum: ['none', 'veteran', 'active-duty', 'dependent'],
    default: 'none'
  },
  militaryBranch: { type: String },

  // ===== INTERESTS & GOALS =====
  interests: {
    type: [String],
    default: []
  },
  careerGoals: {
    type: [String],
    default: []
  },

  // ===== EXTRACURRICULARS & ACHIEVEMENTS =====
  extracurriculars: {
    type: [extracurricularSchema],
    default: []
  },
  achievements: {
    type: [achievementSchema],
    default: []
  },
  communityServiceHours: { type: Number, min: 0 },
  workExperience: { type: String },

  // ===== ESSAY & SPECIAL SKILLS =====
  essayTopics: {
    type: [String],
    default: []
  },
  languages: {
    type: [String],
    default: ['English']
  },
  specialSkills: {
    type: [String],
    default: []
  },

  // ===== PROFILE COMPLETION TRACKING =====
  onboardingCompleted: {
    type: Boolean,
    default: false
  },
  onboardingStep: {
    type: Number,
    default: 0,
    min: 0,
    max: 8
  },
  profileCompleteness: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  completedSections: {
    type: [String],
    default: []
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Indexes for efficient querying
studentProfileSchema.index({ userId: 1 });
studentProfileSchema.index({ gpa: 1 });
studentProfileSchema.index({ state: 1 });
studentProfileSchema.index({ schoolLevel: 1 });
studentProfileSchema.index({ major: 'text', fieldsOfStudy: 'text' });

// Update timestamp on save
studentProfileSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Calculate profile completeness
studentProfileSchema.methods.calculateCompleteness = function() {
  const sections = {
    personal: ['dateOfBirth', 'gender', 'citizenshipStatus'],
    academic: ['gpa', 'major', 'schoolLevel', 'expectedGraduationYear'],
    location: ['state', 'country'],
    financial: ['financialNeedLevel'],
    background: ['isFirstGeneration'],
    interests: ['interests', 'careerGoals'],
    activities: ['extracurriculars']
  };

  let completed = 0;
  let total = 0;
  const completedSections = [];

  for (const [sectionName, fields] of Object.entries(sections)) {
    let sectionComplete = true;
    for (const field of fields) {
      total++;
      const value = this[field];
      if (value !== undefined && value !== null && value !== '' &&
          !(Array.isArray(value) && value.length === 0)) {
        completed++;
      } else {
        sectionComplete = false;
      }
    }
    if (sectionComplete) {
      completedSections.push(sectionName);
    }
  }

  this.profileCompleteness = Math.round((completed / total) * 100);
  this.completedSections = completedSections;

  return this.profileCompleteness;
};

// Virtual for age calculation
studentProfileSchema.virtual('age').get(function() {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Ensure virtuals are included in JSON
studentProfileSchema.set('toJSON', { virtuals: true });
studentProfileSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
