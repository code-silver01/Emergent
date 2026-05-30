// Mohalla — all hardcoded mock data for the Aditya → Sunita demo flow

export const USERS = {
  aditya: {
    id: 'aditya',
    name: 'Aditya',
    phone: '9900112233',
    flat: 'Flat 504',
    building: 'Srinivasa Apartments',
    neighbourhood: 'Koramangala',
    role: 'both',
    isNewResident: true,
    movedInDaysAgo: 1,
    coins: 0,
    trustScore: 0,
    onboarded: false
  },
  sunita: {
    id: 'sunita',
    name: 'Sunita',
    phone: '9845501234',
    flat: 'Flat 403',
    building: 'Srinivasa Apartments',
    neighbourhood: 'Koramangala',
    role: 'gig',
    inviteCode: 'MOH-7X2K',
    invitedBy: 'aditya',
    shadowMentions: 5,
    shadowCategory: 'Home tiffin',
    coins: 0,
    trustScore: 61,
    onboarded: false,
    claimedProfile: false
  }
};

// Ghost economy nodes — mix of shadow + claimed
export const NODES = [
  {
    id: 'sunita',
    name: 'Sunita',
    title: 'Sunita',
    category: 'food',
    flat: 'Flat 403',
    building: 'Srinivasa Apartments',
    location: 'Block B',
    trustScore: 61,
    mentions: 5,
    available: true,
    status: 'shadow', // becomes 'claimed' after Sunita onboards
    shadowLabel: 'Frequently recommended home tiffin in Block B',
    aiInferredNote: 'Available most evenings. Mentioned she\'s away 12–18 Dec.',
    skills: ['Home tiffin', 'South Indian', 'Lunch & dinner'],
    coinValuePerHr: 25,
    pos: { x: 22, y: 30 },
    emoji: '🍱',
    quotes: [
      'Resident in Flat 302: "Best home food I\'ve had since moving here."',
      'Resident in Flat 107: "Very reliable, never missed a delivery."',
      'Watchman Suresh: "She feeds half the building."'
    ],
    evidence: {
      households: 5,
      months: 3,
      disputes: 0,
      verifiedBy: 'Watchman Suresh'
    }
  },
  {
    id: 'venkat',
    name: 'Venkat',
    title: 'Venkat',
    category: 'repair',
    flat: 'D-12, Workshop lane',
    location: 'Behind 80ft road',
    trustScore: 74,
    mentions: 17,
    available: true,
    status: 'claimed',
    aiInferredNote: 'Replies within 12 min on weekday mornings.',
    skills: ['AC servicing', 'Inverter repair', 'Geyser fix'],
    coinValuePerHr: 60,
    pos: { x: 70, y: 22 },
    emoji: '⚙️',
    quotes: [
      'Resident, Flat F-201: "Fixed my 9-year-old AC for ₹600. Brand quoted ₹4,200."',
      'Resident, Flat A-104: "Honest, no upsell."',
      'Resident, Flat B-303: "Refused payment once because fix took 2 minutes."'
    ],
    evidence: { households: 12, months: 14, disputes: 0 }
  },
  {
    id: 'priya',
    name: 'Priya',
    title: 'Priya',
    category: 'design',
    flat: 'F-501, The Address',
    location: 'Koramangala 5th Block',
    trustScore: 68,
    mentions: 9,
    available: true,
    status: 'claimed',
    aiInferredNote: 'Prefers barter for home services over cash.',
    skills: ['Logo design', 'Wedding invites', 'Instagram reels'],
    coinValuePerHr: 80,
    pos: { x: 80, y: 56 },
    emoji: '✏️',
    quotes: [
      'Resident, Flat F-203: "Did my mom\'s 60th invite in 2 days."',
      'Resident, Flat E-507: "Charges fair, doesn\'t ghost."'
    ],
    evidence: { households: 7, months: 8, disputes: 0 }
  },
  {
    id: 'arjun',
    name: 'Arjun',
    title: 'Arjun',
    category: 'tutor',
    flat: 'A-302, Sai Heritage',
    location: 'Koramangala 4th Block',
    trustScore: 81,
    mentions: 14,
    available: false,
    status: 'claimed',
    aiInferredNote: 'Unavailable till March — board exam season.',
    skills: ['Class 9–10 Math', 'CBSE Physics', 'Olympiad prep'],
    coinValuePerHr: 50,
    pos: { x: 18, y: 64 },
    emoji: '📐',
    quotes: [
      'Resident, Flat B-204: "My son went from 62 to 88 in Math."',
      'Resident, Flat C-301: "Patient with slow learners."'
    ],
    evidence: { households: 9, months: 18, disputes: 0 }
  },
  {
    id: 'kavitha',
    name: 'Kavitha',
    title: 'Kavitha',
    category: 'tailor',
    flat: 'Shop 3, Market lane',
    location: 'Koramangala 4th Block',
    trustScore: 71,
    mentions: 11,
    available: true,
    status: 'claimed',
    aiInferredNote: 'Festival weeks = 4-day backlog. Tuesdays quietest.',
    skills: ['Blouse stitching', 'Alterations', 'Saree fall picot'],
    coinValuePerHr: 35,
    pos: { x: 50, y: 80 },
    emoji: '🪡',
    quotes: [
      'Resident, Flat G-104: "Turned my mom\'s old saree into a kurta."',
      'Resident, Flat A-211: "Quick, neat finishing."'
    ],
    evidence: { households: 8, months: 11, disputes: 0 }
  },
  {
    id: 'raju',
    name: 'Raju',
    title: 'Raju',
    category: 'vehicle',
    flat: 'Garage near 7th cross',
    location: 'Koramangala 1st Block',
    trustScore: 79,
    mentions: 19,
    available: true,
    status: 'claimed',
    aiInferredNote: 'Refuses jobs he can\'t finish in a day.',
    skills: ['Bike servicing', 'Puncture', 'Clutch plate'],
    coinValuePerHr: 45,
    pos: { x: 80, y: 80 },
    emoji: '🔧',
    quotes: [
      'Resident, Flat D-507: "Diagnosed my Activa in 4 mins, fixed in 20."',
      'Resident, Flat B-104: "Doesn\'t overcharge women riders."'
    ],
    evidence: { households: 14, months: 22, disputes: 0 }
  }
];

export const CATEGORY_META = {
  food: { label: 'Food', color: '#3d6b3e', emoji: '🍱' },
  repair: { label: 'Repair', color: '#7a5c1e', emoji: '⚙️' },
  design: { label: 'Design', color: '#4a3d9e', emoji: '✏️' },
  tutor: { label: 'Tutor', color: '#1e4f78', emoji: '📐' },
  tailor: { label: 'Tailoring', color: '#7a1e4f', emoji: '🪡' },
  vehicle: { label: 'Vehicles', color: '#bf4e1e', emoji: '🔧' },
  resource: { label: 'Resources', color: '#3d3022', emoji: '📦' }
};

// Resources layer — objects/knowledge, not people
export const RESOURCES = [
  { id: 'r1', emoji: '🪜', label: 'Ladder', flat: 'Flat 201', pos: { x: 35, y: 50 } },
  { id: 'r2', emoji: '🔩', label: 'Drill', flat: 'Flat 406', pos: { x: 60, y: 70 } },
  { id: 'r3', emoji: '🚗', label: 'Carpool E.City Wed/Fri', flat: 'Flat 308', pos: { x: 42, y: 18 } }
];

export const BARTERS = [
  {
    id: 'b1',
    name: 'Priya',
    flat: 'F-501',
    offers: '1 logo design + 5 Instagram reels',
    wants: 'Home-cooked lunches, 2 weeks',
    matchScore: 'very_high',
    coinSuggestion: '2 hrs design ≈ 14 meals',
    aiContext: 'You\'ve ordered Swiggy 3 nights running. Priya\'s mum is visiting and wants a break from cooking. Clean swap — no money needed.',
    aiSource: 'your delivery history + Priya\'s last status update'
  },
  {
    id: 'b2',
    name: 'Arjun',
    flat: 'A-302',
    offers: 'Class 9 Math tuition (3 sessions)',
    wants: 'WordPress blog setup',
    matchScore: 'high',
    coinSuggestion: '3 tuition sessions ≈ 1 day of dev work',
    aiContext: 'You set up 4 WordPress sites last year. Arjun\'s daughter is in Class 9 — useful if your kid is in school.',
    aiSource: 'your past projects'
  }
];

export const THREE_WAY = {
  chain: ['You', 'Arjun', 'Sunita', 'You'],
  description: 'You teach Arjun WordPress → Arjun tutors Sunita\'s son → Sunita sends you tiffin for a week.',
  coinDelta: 0
};

export const ALERTS = [
  {
    id: 'a1',
    type: 'Fake BESCOM inspector',
    description: 'Claiming to update meter records, asking ₹500. Do NOT pay.',
    aiNote: 'BESCOM never collects cash at home. This is a known pattern — 4 buildings affected this week.',
    reportCount: 4,
    status: 'active',
    timestamp: 'First seen 2 days ago'
  },
  {
    id: 'a2',
    type: 'WhatsApp KYC scam',
    description: 'SMS claiming bank account will be blocked unless you click a KYC link.',
    aiNote: 'Banks never use shortened URLs. Forward to 1909 (DoT spam) and delete.',
    reportCount: 2,
    status: 'active',
    timestamp: '5 hours ago'
  },
  {
    id: 'a3',
    type: 'Fake gas leak service',
    description: 'Door-to-door caller offering "free safety check", then quoting ₹4,200 for fake parts.',
    aiNote: 'Blocked after 11 reports. Last seen 6 days ago.',
    reportCount: 11,
    status: 'resolved',
    timestamp: 'Resolved 3 days ago'
  }
];

export const FAVOURS = [
  {
    id: 'f1',
    needed: 'Borrow a power drill for 30 mins (mounting a curtain rod)',
    flat: 'Flat 203',
    askedAgo: '1 hr ago',
    aiReason: 'You mentioned having a drill unused.',
    coinReward: 5
  },
  {
    id: 'f2',
    needed: 'Pick up parcel from gate 3 (stuck at office till 8pm)',
    flat: 'Flat 104',
    askedAgo: '20 min ago',
    aiReason: 'You usually walk past gate 3 around 7:15pm.',
    coinReward: 3
  }
];

export const JOBS = [
  {
    id: 'j1',
    requester: 'Anita',
    requesterFlat: 'Flat B-507',
    jobType: 'AC stopped cooling — split unit, 1.5 ton',
    urgency: 'Today',
    foundVia: '7 community mentions over 4 months',
    status: 'pending'
  },
  {
    id: 'j2',
    requester: 'Rohan',
    requesterFlat: 'Flat F-203',
    jobType: 'Geyser noise + low pressure',
    urgency: 'This week',
    foundVia: 'WhatsApp group · Sunita Aunty recommended you',
    status: 'pending'
  }
];

export const DEMAND_FORECAST = [
  { day: 'Mon', value: 25, high: false },
  { day: 'Tue', value: 18, high: false },
  { day: 'Wed', value: 42, high: false },
  { day: 'Thu', value: 88, high: true },
  { day: 'Fri', value: 92, high: true },
  { day: 'Sat', value: 60, high: false },
  { day: 'Sun', value: 35, high: false }
];

export const DAY1_BRIEF = [
  { emoji: '🕖', text: 'Water supply cuts at 7am sharp. Fill by 6:50.' },
  { emoji: '🔧', text: 'Best plumber: Ramesh (8 trust pts). Call before 9am.' },
  { emoji: '🍱', text: 'Home tiffin: someone in Block B, ₹80/meal. 5 mentions.' },
  { emoji: '⚠️', text: 'Active scam: fake BESCOM inspector, 4 reports this week.' },
  { emoji: '💬', text: '34 neighbours are on Mohalla here.' }
];

export const COLD_START_DATA = [
  { emoji: '⚡', label: 'BESCOM schedule', detail: 'Power maintenance Mon 11am–2pm' },
  { emoji: '💧', label: 'Water supply', detail: 'Tue/Thu/Sat 6–8am' },
  { emoji: '🗑️', label: 'Garbage', detail: 'Wet: daily 7am. Dry: Wed/Sat' },
  { emoji: '🚕', label: 'Auto stand', detail: '5th cross, 120m east' }
];

export const LORE = 'The chai stall at the corner of 5th Cross has been run by the same family since 1983. The current owner\'s father served the first cup the year this building was constructed.';
