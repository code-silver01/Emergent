// Mock AI strings for Mohalla demo

export const MOCK_AI = {
  residentWelcome: (name) =>
    `Welcome to Mohalla, ${name}.\nI can see you just moved into Srinivasa Apartments.\nWant a quick brief on what matters here?`,

  day1BriefIntro: `Here's what I know about your neighbourhood:`,

  contributionAsk:
    `The more you share, the smarter this gets for everyone.\nEven a 2-line observation earns Mohalla coins.`,

  contributionAck: (item, coins) =>
    `Added to the ghost economy map. ${item} is now discoverable by your 34 neighbours.\nYou earned ${coins} coins. 🟡`,

  gigSetupAsk:
    `You said you also offer services. What do you do?\nVoice or type — I'll handle the rest.`,

  gigProfileAck: (skill) =>
    `Got it. I've added "${skill}" to your gig profile.\nYou can list rates and availability anytime.\nYour ghost profile is live — neighbours can discover you.`,

  homeNudgeFood:
    `Noticed you haven't set up food yet. Someone in your building offers home tiffin — 5 neighbours recommend it. Want me to connect you?`,
  homeNudgeFoodSource: 'because you haven\'t mentioned cooking and 5 neighbours have vouched for one provider',

  barterExplain:
    `You've ordered Swiggy 3 nights running. Your neighbour offers home tiffin and has an evening slot.\nThis is a clean swap — no money needed.`,
  barterFairness:
    `On coin balance — your contribution: 3 sessions × 60 = 180.\nArjun + Priya combined: 175. Within 5%. Fair.\nI'll track the rest.`,
  threeWayHint:
    `I found a 3-way match: You → Arjun → Sunita → You. No money changes hands.`,

  scamBroadcast:
    `Fake BESCOM inspector spotted near gate 2. 3 reports in 4 hours. Do NOT open the door.`,

  // Sunita's flow
  sunitaInviteHeadline:
    `Your neighbours are talking about you.`,
  sunitaTrustExplain:
    `Based on these mentions, Mohalla has given you a trust score of 61/100.`,
  sunitaWelcome:
    `Welcome, Sunita.\nYou already have 5 neighbours vouching for you.\nLet me ask a few quick things to make your profile complete.`,
  sunitaAskOffer:
    `What do you currently offer?\n(Just describe in your own words)`,
  sunitaAskCapacity:
    `Perfect. How many people can you serve right now? And roughly what do you charge?`,
  sunitaAskAvail:
    `Last one — when are you usually available?`,
  sunitaProfileDone:
    `Your profile is live. Neighbours who need tiffin will now be directed to you.\n\nAditya in Flat 504 — the one who invited you — just asked about tiffin. Want me to connect you both?`,
  sunitaConnectionMade:
    `Connected. Aditya has your number. You'll earn 25 coins when the first tiffin is delivered. 🟡`,

  // Generic
  empty: `Nothing here yet — but I'm listening. The moment a pattern appears on your street, you'll see it first.`
};
