// All mock seed data for Mohalla
export const SEED_NODES = [
  {
    id: 'n1',
    name: 'Sunita',
    title: 'Sunita Aunty',
    category: 'food',
    flat: 'B-204, Sai Heritage',
    location: 'Koramangala 4th Block',
    trustScore: 86,
    mentions: 23,
    available: true,
    aiInferredNote: 'AI inferred unavailable 12–18 Dec — mentioned daughter\'s visit in chat',
    skills: ['North Indian tiffin', 'Sunday Pulao', 'Pickle hampers'],
    coinValuePerHr: 40,
    color: 'moss',
    pos: { x: 28, y: 22 },
    quotes: [
      'Sunita aunty\'s phulkas saved my Mondays — Resident, Flat A-302',
      'Her pickle is honestly better than the brands — Resident, Flat C-110',
      'Best tiffin in 4th block, no debate — Resident, Flat B-507'
    ]
  },
  {
    id: 'n2',
    name: 'Venkat',
    title: 'Venkat Anna',
    category: 'repair',
    flat: 'D-12, Workshop lane',
    location: 'Behind 80ft road',
    trustScore: 74,
    mentions: 17,
    available: true,
    aiInferredNote: 'AI inferred high availability — usually replies within 12 min on weekday mornings',
    skills: ['AC servicing', 'Inverter repair', 'Geyser fix'],
    coinValuePerHr: 60,
    color: 'gold',
    pos: { x: 62, y: 36 },
    quotes: [
      'Venkat fixed my 9-year-old AC for ₹600. Brand guy quoted ₹4200 — Resident, Flat F-201',
      'Honest, no upsell — Resident, Flat A-104',
      'He once refused payment because the fix was 2 minutes — Resident, Flat B-303'
    ]
  },
  {
    id: 'n3',
    name: 'Priya',
    title: 'Priya',
    category: 'design',
    flat: 'F-501, The Address',
    location: 'Koramangala 5th Block',
    trustScore: 68,
    mentions: 9,
    available: true,
    aiInferredNote: 'AI inferred — freelance designer, prefers barter for home services over cash',
    skills: ['Logo design', 'Wedding invites', 'Instagram reels'],
    coinValuePerHr: 80,
    color: 'purple',
    pos: { x: 78, y: 64 },
    quotes: [
      'Did my mom\'s 60th invite in 2 days — Resident, Flat F-203',
      'Charges fair, doesn\'t ghost — Resident, Flat E-507'
    ]
  },
  {
    id: 'n4',
    name: 'Arjun',
    title: 'Arjun Sir',
    category: 'tutor',
    flat: 'A-302, Sai Heritage',
    location: 'Koramangala 4th Block',
    trustScore: 81,
    mentions: 14,
    available: false,
    aiInferredNote: 'AI inferred unavailable till March — mentioned board exam season in WhatsApp group',
    skills: ['Class 9–10 Math', 'CBSE Physics', 'Olympiad prep'],
    coinValuePerHr: 50,
    color: 'sky',
    pos: { x: 18, y: 58 },
    quotes: [
      'My son went from 62 to 88 in Math — Resident, Flat B-204',
      'Patient with slow learners — Resident, Flat C-301'
    ]
  },
  {
    id: 'n5',
    name: 'Kavitha',
    title: 'Kavitha',
    category: 'tailor',
    flat: 'Shop 3, Market lane',
    location: 'Koramangala 4th Block',
    trustScore: 71,
    mentions: 11,
    available: true,
    aiInferredNote: 'AI inferred — slowest queues on Tuesdays. Festival weeks = 4-day backlog',
    skills: ['Blouse stitching', 'Alterations', 'Saree fall picot'],
    coinValuePerHr: 35,
    color: 'moss',
    pos: { x: 46, y: 76 },
    quotes: [
      'Got my mom\'s old saree turned into a kurta — Resident, Flat G-104',
      'Quick, neat finishing — Resident, Flat A-211'
    ]
  },
  {
    id: 'n6',
    name: 'Raju',
    title: 'Raju Bhai',
    category: 'vehicle',
    flat: 'Garage near 7th cross',
    location: 'Koramangala 1st Block',
    trustScore: 79,
    mentions: 19,
    available: true,
    aiInferredNote: 'AI inferred — best for two-wheelers. Refuses jobs he can\'t finish in a day',
    skills: ['Bike servicing', 'Puncture', 'Clutch plate'],
    coinValuePerHr: 45,
    color: 'rust',
    pos: { x: 52, y: 14 },
    quotes: [
      'Diagnosed my Activa in 4 mins, fixed in 20 — Resident, Flat D-507',
      'Doesn\'t overcharge women riders — Resident, Flat B-104'
    ]
  }
];

export const CATEGORY_META = {
  food: { label: 'Food', color: '#3d6b3e', icon: 'soup' },
  repair: { label: 'Repair', color: '#b8860b', icon: 'tool' },
  design: { label: 'Design', color: '#534ab7', icon: 'palette' },
  tutor: { label: 'Tutor', color: '#2a5f8a', icon: 'book' },
  tailor: { label: 'Tailor', color: '#5a9b5c', icon: 'scissors' },
  vehicle: { label: 'Vehicles', color: '#c4511a', icon: 'motor' }
};

export const SEED_BARTERS = [
  {
    id: 'b1',
    userId: 'u_priya',
    name: 'Priya',
    flat: 'F-501',
    offers: 'Logo + 5 Instagram reels',
    wants: 'Home-cooked lunches for 2 weeks',
    matchScore: 'very_high',
    aiNote: 'You\'ve ordered Swiggy 3 nights this week. Priya\'s mum is hosting next week and wants a break from cooking. Perfect double-coincidence.'
  },
  {
    id: 'b2',
    userId: 'u_arjun',
    name: 'Arjun',
    flat: 'A-302',
    offers: 'Math tuition for Class 9 (3 sessions)',
    wants: 'Help with WordPress blog setup',
    matchScore: 'high',
    aiNote: 'You set up 4 WordPress sites last year (we pulled this from your Reddit). Arjun\'s daughter is in Class 9 — would your kid benefit?'
  },
  {
    id: 'b3',
    userId: 'u_kavitha',
    name: 'Kavitha',
    flat: 'Shop 3',
    offers: 'Blouse stitching + 2 alterations',
    wants: 'Diwali rangoli design templates',
    matchScore: 'medium',
    aiNote: 'You bookmarked 12 rangoli pins on Pinterest in October. Suspicious 😄'
  }
];

export const SEED_3WAY = {
  id: 'b3way',
  chain: ['You', 'Arjun', 'Sunita', 'You'],
  description: 'You teach Arjun WordPress → Arjun tutors Sunita\'s son in Math → Sunita sends you tiffin for a week.',
  coinDelta: 0
};

export const SEED_ALERTS = [
  {
    id: 'a1',
    type: 'Fake BESCOM inspector',
    description: 'Man in BESCOM uniform asking for ₹1500 cash for "meter recalibration". 3 reports today.',
    aiNote: 'BESCOM never collects cash at home. They send paper notices. This is the 4th repeat scam this month.',
    reportCount: 3,
    status: 'active',
    timestamp: '2h ago'
  },
  {
    id: 'a2',
    type: 'WhatsApp KYC scam',
    description: 'SMS claiming bank account will be blocked unless you click a KYC link.',
    aiNote: 'Banks never use shortened URLs. Forward to 1909 (DoT spam) and delete.',
    reportCount: 2,
    status: 'active',
    timestamp: '5h ago'
  },
  {
    id: 'a3',
    type: 'Fake gas leak service',
    description: 'Caller offered "free gas pipe safety check", then quoted ₹4,200 for fake parts.',
    aiNote: 'Resolved — caller blocked after 11 reports. Last seen 6 days ago.',
    reportCount: 11,
    status: 'resolved',
    timestamp: '6d ago'
  }
];

export const SEED_FAVOURS = [
  {
    id: 'f1',
    needed: 'Borrow a power drill for 30 mins (mounting a curtain rod)',
    flat: 'C-507',
    aiMatchReason: 'AI matched you because you bought a Bosch drill in Aug and haven\'t used it in 4 months.',
    coinReward: 8
  },
  {
    id: 'f2',
    needed: 'Pick up parcel from gate 3 (I\'m stuck at office till 8)',
    flat: 'A-104',
    aiMatchReason: 'AI matched you because you usually walk past gate 3 around 7:15pm.',
    coinReward: 5
  }
];

export const SEED_JOBS = [
  {
    id: 'j1',
    requester: 'Anita',
    requesterFlat: 'B-507',
    jobType: 'AC stopped cooling — split unit, 1.5 ton',
    urgency: 'Today',
    foundVia: 'via 7 community mentions over 4 months',
    status: 'pending'
  },
  {
    id: 'j2',
    requester: 'Rohan',
    requesterFlat: 'F-203',
    jobType: 'Geyser making noise + low pressure',
    urgency: 'This week',
    foundVia: 'via building WhatsApp group (Sunita Aunty recommended you)',
    status: 'pending'
  },
  {
    id: 'j3',
    requester: 'Meera',
    requesterFlat: 'D-105',
    jobType: 'Inverter battery replacement',
    urgency: 'Flexible',
    foundVia: 'via 3 mentions in last 2 weeks',
    status: 'pending'
  }
];

export const SEED_CONTRIBUTIONS = [
  { id: 'c1', description: 'Reported fake BESCOM scam — 3 neighbours protected', coins: 15, timestamp: '2h ago', sign: '+' },
  { id: 'c2', description: 'Lent power drill to flat A-104', coins: 8, timestamp: 'Yesterday', sign: '+' },
  { id: 'c3', description: 'Picked up parcel for elderly neighbour (3F)', coins: 5, timestamp: '2d ago', sign: '+' },
  { id: 'c4', description: 'Tagged Venkat in AC repair recommendation', coins: 3, timestamp: '3d ago', sign: '+' },
  { id: 'c5', description: 'Barter debt — Sunita tiffin (3 days)', coins: 12, timestamp: '4d ago', sign: '-' },
  { id: 'c6', description: 'Hosted neighbourhood plant swap', coins: 20, timestamp: 'Last week', sign: '+' }
];

export const DEMAND_FORECAST = [
  { day: 'Mon', value: 30, high: false },
  { day: 'Tue', value: 22, high: false },
  { day: 'Wed', value: 45, high: false },
  { day: 'Thu', value: 92, high: true },
  { day: 'Fri', value: 88, high: true },
  { day: 'Sat', value: 64, high: false },
  { day: 'Sun', value: 40, high: false }
];

export const LORE_SNIPPETS = [
  'Koramangala was a paddy field until 1978. The lake behind 5th block was a quarry, then a dump, then reborn in 2017.',
  'The banyan on 80ft road is older than the road. Locals still tie threads on it during Aadi.',
  'Sony World junction used to be a single petrol pump and a sugarcane juice cart in 1992.'
];

export const ONBOARD_BRIEF = {
  resident: [
    '🚰 Water comes Tue/Thu/Sat between 6–8am. Sump fills in 22 min, on average.',
    '🔧 Best plumber within 800m: Venkat (74 trust). Charges 30% below market.',
    '⚠ Active scam: fake BESCOM inspector — 3 reports in last 4 hours.',
    '🍱 Top tiffin: Sunita Aunty (86 trust, 23 mentions). ₹120/meal, North Indian.'
  ]
};

export const COIN_USES = [
  'Barter credits — settle uneven trades without cash',
  'Credibility badge — unlocks gig worker visibility boost',
  'Ghost node unlocks — see hidden nodes 2km out',
  'Donate to neighbourhood fund — civic projects'
];
