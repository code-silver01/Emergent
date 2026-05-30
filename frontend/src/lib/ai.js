// Mock AI responder
export function getMockAIResponse(context, userInput = '') {
  const map = {
    onboard_greet_resident: 'Welcome to Mohalla. I\'m the neighbourhood layer — I read public signals (WhatsApp groups, building notices, civic data) and surface what actually matters. First — which building do you live in?',
    onboard_confirm_building: 'Got it. I count 184 neighbours in your block and 7 active service providers nearby. Want a 4-line brief on your street, right now?',
    onboard_day1_brief: 'Here\'s your Day 1 brief — purely from listening to your street, no surveys:',
    onboard_greet_gig: 'Hello Ramesh. You\'ve already been mentioned 11 times in 3 different WhatsApp groups around Koramangala 4th block in the last 6 weeks. Your existing trust score is 74. Let\'s build your profile in 30 seconds.',
    onboard_ask_skills: 'What do you do — in one line? (e.g. "AC + inverter repair, weekdays after 5pm")',
    onboard_ask_pricing: 'Rough pricing? You can say "market", "below market", or a number per hour. I\'ll suggest 60 coins/hr based on what others charge.',

    home_nudge_resident: 'You\'ve ordered Swiggy 3 nights this week. Sunita Aunty (4 floors below) makes tiffin — 86 trust, ₹120/meal. She has 2 slots open this week. Want me to introduce?',
    home_nudge_gig: 'Festival week starts Thursday. Demand for AC repair will be 3× normal — block your calendar Thu–Fri evenings.',

    match_explain: 'Here\'s the match: You\'ve ordered Swiggy 3 nights, your kid is in Class 10 and needs Math. Priya needs a fortnight of home lunches (her mum is visiting). Arjun teaches Class 10 Math and wants help with a WordPress blog. I see a triangle: you do WordPress for Arjun → Arjun tutors your kid → Priya cooks for both households. Net coin debt: zero.',
    match_fairness: 'On coin balance — your contribution is 3 sessions × 60 coins = 180. Arjun + Priya combined send back 175. Within 5%, considered fair. I\'ll track the rest.',
    match_3way: 'I found a 3-way match: You → Arjun → Sunita → You. No money changes hands, every household gets one favour they wanted. Want me to introduce all three?',

    scam_broadcast: 'Fake BESCOM inspector spotted near gate 2. 3 reports in 4 hours. Do NOT open the door. Forward this to your building group.',

    favour_match: 'I only show this favour to you because you have a 4-month-unused power drill and you usually walk past gate 3 at 7pm. Nobody else got this card.',

    snapshot_narrative: 'This week, you saved ₹2,840 — mostly by skipping Swiggy twice and bartering for tiffin instead. You contributed to two scam alerts that protected 19 households. Your street\'s health score climbed 4 points. Quiet, but you did real work.',

    empty_state_default: 'Nothing here yet — but I\'m listening. The moment a relevant pattern appears in your street, you\'ll see it first.'
  };
  return map[context] || map.empty_state_default;
}
