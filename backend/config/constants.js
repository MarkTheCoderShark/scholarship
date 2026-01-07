// Scoring weights for scholarship matching algorithm
const SCORING_WEIGHTS = {
  // Soft preferences (weighted scoring out of 100)
  majorMatch: 25,
  fieldOfStudyMatch: 15,
  ethnicityMatch: 10,
  genderMatch: 10,
  financialNeedMatch: 10,
  firstGenerationMatch: 10,
  militaryMatch: 5,
  disabilityMatch: 5,
  interestsMatch: 5,
  extracurricularsMatch: 5
};

// Enum values for dropdowns
const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' }
];

const CITIZENSHIP_OPTIONS = [
  { value: 'us-citizen', label: 'U.S. Citizen' },
  { value: 'permanent-resident', label: 'Permanent Resident' },
  { value: 'daca', label: 'DACA Recipient' },
  { value: 'international', label: 'International Student' },
  { value: 'refugee', label: 'Refugee/Asylee' },
  { value: 'other', label: 'Other' }
];

const SCHOOL_LEVEL_OPTIONS = [
  { value: 'high-school', label: 'High School' },
  { value: 'undergraduate', label: 'Undergraduate' },
  { value: 'graduate', label: 'Graduate' },
  { value: 'postgraduate', label: 'Postgraduate/PhD' },
  { value: 'vocational', label: 'Vocational/Trade School' }
];

const FINANCIAL_NEED_OPTIONS = [
  { value: 'high', label: 'High Financial Need' },
  { value: 'moderate', label: 'Moderate Financial Need' },
  { value: 'low', label: 'Low Financial Need' },
  { value: 'none', label: 'No Financial Need' }
];

const ETHNICITY_OPTIONS = [
  { value: 'african-american', label: 'African American/Black' },
  { value: 'asian', label: 'Asian' },
  { value: 'caucasian', label: 'Caucasian/White' },
  { value: 'hispanic-latino', label: 'Hispanic/Latino' },
  { value: 'native-american', label: 'Native American/Alaska Native' },
  { value: 'pacific-islander', label: 'Native Hawaiian/Pacific Islander' },
  { value: 'middle-eastern', label: 'Middle Eastern/North African' },
  { value: 'multiracial', label: 'Multiracial' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' }
];

const MILITARY_STATUS_OPTIONS = [
  { value: 'none', label: 'No Military Affiliation' },
  { value: 'veteran', label: 'Veteran' },
  { value: 'active-duty', label: 'Active Duty' },
  { value: 'dependent', label: 'Military Dependent' }
];

const EXTRACURRICULAR_CATEGORIES = [
  { value: 'sports', label: 'Sports/Athletics' },
  { value: 'arts', label: 'Arts/Music/Theater' },
  { value: 'leadership', label: 'Leadership/Student Government' },
  { value: 'volunteer', label: 'Volunteer/Community Service' },
  { value: 'academic', label: 'Academic Clubs' },
  { value: 'work', label: 'Work Experience' },
  { value: 'stem', label: 'STEM/Science Clubs' },
  { value: 'religious', label: 'Religious Organizations' },
  { value: 'cultural', label: 'Cultural Organizations' },
  { value: 'other', label: 'Other' }
];

const FIELDS_OF_STUDY = [
  'Accounting', 'Aerospace Engineering', 'Agriculture', 'Anthropology', 'Architecture',
  'Art/Design', 'Biology', 'Business Administration', 'Chemistry', 'Civil Engineering',
  'Communications', 'Computer Science', 'Criminal Justice', 'Economics', 'Education',
  'Electrical Engineering', 'English/Literature', 'Environmental Science', 'Film/Media',
  'Finance', 'Health Sciences', 'History', 'Hospitality', 'International Relations',
  'Journalism', 'Law/Pre-Law', 'Marketing', 'Mathematics', 'Mechanical Engineering',
  'Medicine/Pre-Med', 'Music', 'Nursing', 'Pharmacy', 'Philosophy', 'Physics',
  'Political Science', 'Psychology', 'Public Health', 'Social Work', 'Sociology',
  'Theater/Drama', 'Undecided', 'Other'
];

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming', 'District of Columbia', 'Puerto Rico'
];

module.exports = {
  SCORING_WEIGHTS,
  GENDER_OPTIONS,
  CITIZENSHIP_OPTIONS,
  SCHOOL_LEVEL_OPTIONS,
  FINANCIAL_NEED_OPTIONS,
  ETHNICITY_OPTIONS,
  MILITARY_STATUS_OPTIONS,
  EXTRACURRICULAR_CATEGORIES,
  FIELDS_OF_STUDY,
  US_STATES
};
