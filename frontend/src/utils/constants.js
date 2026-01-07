// Dropdown options for forms

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' }
];

export const CITIZENSHIP_OPTIONS = [
  { value: 'us-citizen', label: 'U.S. Citizen' },
  { value: 'permanent-resident', label: 'Permanent Resident' },
  { value: 'daca', label: 'DACA Recipient' },
  { value: 'international', label: 'International Student' },
  { value: 'refugee', label: 'Refugee/Asylee' },
  { value: 'other', label: 'Other' }
];

export const SCHOOL_LEVEL_OPTIONS = [
  { value: 'high-school', label: 'High School' },
  { value: 'undergraduate', label: 'Undergraduate' },
  { value: 'graduate', label: 'Graduate' },
  { value: 'postgraduate', label: 'Postgraduate/PhD' },
  { value: 'vocational', label: 'Vocational/Trade School' }
];

export const FINANCIAL_NEED_OPTIONS = [
  { value: 'high', label: 'High Financial Need' },
  { value: 'moderate', label: 'Moderate Financial Need' },
  { value: 'low', label: 'Low Financial Need' },
  { value: 'none', label: 'No Financial Need' }
];

export const ETHNICITY_OPTIONS = [
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

export const MILITARY_STATUS_OPTIONS = [
  { value: 'none', label: 'No Military Affiliation' },
  { value: 'veteran', label: 'Veteran' },
  { value: 'active-duty', label: 'Active Duty' },
  { value: 'dependent', label: 'Military Dependent' }
];

export const HOUSEHOLD_INCOME_OPTIONS = [
  { value: 'under-30k', label: 'Under $30,000' },
  { value: '30k-50k', label: '$30,000 - $50,000' },
  { value: '50k-75k', label: '$50,000 - $75,000' },
  { value: '75k-100k', label: '$75,000 - $100,000' },
  { value: '100k-150k', label: '$100,000 - $150,000' },
  { value: 'over-150k', label: 'Over $150,000' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' }
];

export const EXTRACURRICULAR_CATEGORIES = [
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

export const FIELDS_OF_STUDY = [
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

export const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming', 'District of Columbia', 'Puerto Rico'
];

export const INTEREST_OPTIONS = [
  'Technology', 'Science', 'Arts & Culture', 'Business', 'Healthcare', 'Education',
  'Environment', 'Social Justice', 'Sports', 'Music', 'Writing', 'Engineering',
  'Research', 'Entrepreneurship', 'Public Service', 'Law', 'International Affairs',
  'Media & Communications', 'Agriculture', 'Fashion', 'Architecture', 'Psychology',
  'Finance', 'Marketing', 'Data Science', 'Artificial Intelligence'
];

export const CAREER_GOALS = [
  'Doctor/Physician', 'Lawyer', 'Engineer', 'Teacher/Professor', 'Business Executive',
  'Entrepreneur', 'Scientist/Researcher', 'Artist/Designer', 'Writer/Journalist',
  'Software Developer', 'Nurse', 'Accountant', 'Marketing Professional', 'Social Worker',
  'Psychologist', 'Architect', 'Financial Analyst', 'Data Scientist', 'Consultant',
  'Public Service/Government', 'Non-Profit Leader', 'Healthcare Administrator',
  'Environmental Scientist', 'Musician/Performer', 'Other'
];

// Onboarding steps configuration
export const ONBOARDING_STEPS = [
  { id: 0, label: 'Personal Info', description: 'Tell us about yourself' },
  { id: 1, label: 'Academic', description: 'Your education details' },
  { id: 2, label: 'Location', description: 'Where are you located?' },
  { id: 3, label: 'Financial', description: 'Financial background' },
  { id: 4, label: 'Background', description: 'Additional background' },
  { id: 5, label: 'Interests', description: 'Your interests and goals' },
  { id: 6, label: 'Activities', description: 'Extracurricular activities' },
  { id: 7, label: 'Review', description: 'Review your profile' }
];

// Match score colors
export const getMatchScoreColor = (score) => {
  if (score >= 70) return '#4caf50'; // Green
  if (score >= 50) return '#ff9800'; // Orange
  if (score >= 30) return '#f44336'; // Red
  return '#9e9e9e'; // Gray
};

export const getMatchScoreLabel = (score) => {
  if (score >= 70) return 'Strong Match';
  if (score >= 50) return 'Good Match';
  if (score >= 30) return 'Partial Match';
  return 'Low Match';
};
