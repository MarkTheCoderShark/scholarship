const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  source: { type: String, required: true },
  description: { type: String },

  // ===== AMOUNT - Normalized =====
  amount: {
    min: { type: Number },
    max: { type: Number },
    displayText: { type: String }, // Original string like "$5,000 - $10,000"
    type: {
      type: String,
      enum: ['fixed', 'range', 'variable', 'full-tuition'],
      default: 'variable'
    }
  },

  // Legacy amount field for backward compatibility with scraped data
  amountRaw: { type: String },

  // ===== DEADLINE - Normalized =====
  deadline: {
    date: { type: Date },
    displayText: { type: String }, // Original string
    isRolling: { type: Boolean, default: false },
    isExpired: { type: Boolean, default: false }
  },

  // Legacy deadline field for backward compatibility
  deadlineRaw: { type: String },

  // ===== ELIGIBILITY REQUIREMENTS =====
  eligibility: {
    // Hard Requirements (disqualifying if not met)
    hardRequirements: {
      minGpa: { type: Number, min: 0, max: 5.0 },
      maxGpa: { type: Number, min: 0, max: 5.0 },
      citizenshipRequired: {
        type: [String],
        default: [] // Empty = any citizenship
      },
      locationsAllowed: {
        type: [String],
        default: [] // Empty = any location
      },
      schoolLevels: {
        type: [String],
        default: [] // Empty = any level
      },
      ageMin: { type: Number, min: 10, max: 100 },
      ageMax: { type: Number, min: 10, max: 100 }
    },

    // Soft Preferences (improve match score but don't disqualify)
    softPreferences: {
      preferredMajors: {
        type: [String],
        default: []
      },
      preferredFieldsOfStudy: {
        type: [String],
        default: []
      },
      targetEthnicities: {
        type: [String],
        default: []
      },
      targetGenders: {
        type: [String],
        default: []
      },
      financialNeedPreferred: { type: Boolean, default: false },
      firstGenerationPreferred: { type: Boolean, default: false },
      militaryAffiliationPreferred: { type: Boolean, default: false },
      disabilityPreferred: { type: Boolean, default: false },
      interestsRelated: {
        type: [String],
        default: []
      },
      extracurricularsRelated: {
        type: [String],
        default: []
      }
    },

    // Legacy eligibility fields for backward compatibility
    course: { type: String },
    gpa: { type: Number },
    location: { type: String }
  },

  // ===== METADATA =====
  applicationLink: { type: String, required: true },
  applicationProcess: { type: String }, // Essay, interview, application form, etc.
  isRenewable: { type: Boolean, default: false },
  renewalCriteria: { type: String },
  awardFrequency: {
    type: String,
    enum: ['one-time', 'annual', 'semester', 'monthly', 'varies'],
    default: 'one-time'
  },

  // ===== SOURCE TRACKING =====
  scrapedAt: { type: Date, default: Date.now },
  lastVerified: { type: Date },
  sourceUrl: { type: String },
  isActive: { type: Boolean, default: true },
  scrapedFrom: {
    type: String,
    enum: ['scholarships360', 'fastweb', 'internationalscholarships', 'manual', 'other']
  },

  // ===== SEARCH OPTIMIZATION =====
  keywords: {
    type: [String],
    default: []
  },

  // ===== STATS =====
  views: { type: Number, default: 0 },
  applications: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// ===== INDEXES =====
scholarshipSchema.index({ 'deadline.date': 1 });
scholarshipSchema.index({ 'deadline.isExpired': 1 });
scholarshipSchema.index({ 'amount.min': 1, 'amount.max': 1 });
scholarshipSchema.index({ 'eligibility.hardRequirements.minGpa': 1 });
scholarshipSchema.index({ 'eligibility.hardRequirements.schoolLevels': 1 });
scholarshipSchema.index({ isActive: 1 });
scholarshipSchema.index({ keywords: 'text', title: 'text', description: 'text' });

// Update timestamp on save
scholarshipSchema.pre('save', function(next) {
  this.updatedAt = new Date();

  // Auto-generate keywords from title if not set
  if (this.isModified('title') && (!this.keywords || this.keywords.length === 0)) {
    this.keywords = this.title
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 3);
  }

  // Check if deadline is expired
  if (this.deadline && this.deadline.date) {
    this.deadline.isExpired = new Date(this.deadline.date) < new Date();
  }

  next();
});

// Virtual for days until deadline
scholarshipSchema.virtual('daysUntilDeadline').get(function() {
  if (!this.deadline || !this.deadline.date || this.deadline.isRolling) {
    return null;
  }
  const now = new Date();
  const deadlineDate = new Date(this.deadline.date);
  const diffTime = deadlineDate - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Virtual for formatted amount
scholarshipSchema.virtual('formattedAmount').get(function() {
  if (this.amount && this.amount.displayText) {
    return this.amount.displayText;
  }
  if (this.amount && this.amount.min) {
    if (this.amount.min === this.amount.max) {
      return `$${this.amount.min.toLocaleString()}`;
    }
    return `$${this.amount.min.toLocaleString()} - $${this.amount.max.toLocaleString()}`;
  }
  if (this.amountRaw) {
    return this.amountRaw;
  }
  return 'Variable';
});

// Ensure virtuals are included in JSON
scholarshipSchema.set('toJSON', { virtuals: true });
scholarshipSchema.set('toObject', { virtuals: true });

// Static method to migrate old scholarship data to new format
scholarshipSchema.statics.migrateToNewFormat = async function(scholarship) {
  const updates = {};

  // Migrate amount
  if (scholarship.amountRaw && !scholarship.amount?.min) {
    const amountStr = scholarship.amountRaw || '';
    const cleaned = amountStr.replace(/[$,]/g, '');
    const rangeMatch = cleaned.match(/(\d+)\s*[-to]+\s*(\d+)/);
    const singleMatch = cleaned.match(/(\d+)/);

    if (rangeMatch) {
      updates.amount = {
        min: parseInt(rangeMatch[1]),
        max: parseInt(rangeMatch[2]),
        displayText: amountStr,
        type: 'range'
      };
    } else if (singleMatch) {
      const amt = parseInt(singleMatch[1]);
      updates.amount = {
        min: amt,
        max: amt,
        displayText: amountStr,
        type: 'fixed'
      };
    } else if (amountStr.toLowerCase().includes('full tuition')) {
      updates.amount = {
        displayText: amountStr,
        type: 'full-tuition'
      };
    }
  }

  // Migrate deadline
  if (scholarship.deadlineRaw && !scholarship.deadline?.date) {
    const deadlineStr = scholarship.deadlineRaw || '';

    if (deadlineStr.toLowerCase().includes('rolling') ||
        deadlineStr.toLowerCase().includes('ongoing')) {
      updates.deadline = {
        displayText: deadlineStr,
        isRolling: true,
        isExpired: false
      };
    } else {
      try {
        const parsed = new Date(deadlineStr);
        if (!isNaN(parsed.getTime())) {
          updates.deadline = {
            date: parsed,
            displayText: deadlineStr,
            isRolling: false,
            isExpired: parsed < new Date()
          };
        }
      } catch (e) {
        updates.deadline = {
          displayText: deadlineStr,
          isRolling: false
        };
      }
    }
  }

  // Migrate legacy eligibility fields
  if (scholarship.eligibility) {
    if (scholarship.eligibility.gpa && !scholarship.eligibility.hardRequirements?.minGpa) {
      updates['eligibility.hardRequirements.minGpa'] = scholarship.eligibility.gpa;
    }
    if (scholarship.eligibility.course && !scholarship.eligibility.softPreferences?.preferredMajors?.length) {
      updates['eligibility.softPreferences.preferredMajors'] = [scholarship.eligibility.course];
    }
    if (scholarship.eligibility.location && !scholarship.eligibility.hardRequirements?.locationsAllowed?.length) {
      updates['eligibility.hardRequirements.locationsAllowed'] = [scholarship.eligibility.location];
    }
  }

  return updates;
};

module.exports = mongoose.model('Scholarship', scholarshipSchema);
