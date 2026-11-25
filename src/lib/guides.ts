import "server-only";
import type { Guide } from "@/lib/ideas";

// Full step-by-step plans, one per idea id. Same shape as the original "Edit TikToks" template:
// phases of steps (with time, sites and copy-paste scripts), what to charge, and mistakes to avoid.
// Text in `d` and `mistakes` may use <b> only.

const MAPS: [string, string] = ["Google Maps", "https://www.google.com/maps"];
const MARKETPLACE: [string, string] = ["Facebook Marketplace", "https://www.facebook.com/marketplace"];
const KIJIJI: [string, string] = ["Kijiji", "https://www.kijiji.ca"];
const CANVA: [string, string] = ["Canva", "https://www.canva.com"];
const SHEETS: [string, string] = ["Google Sheets", "https://sheets.google.com"];
const WAVE: [string, string] = ["Wave (free invoices)", "https://www.waveapps.com"];
const NEXTDOOR: [string, string] = ["Nextdoor", "https://nextdoor.com"];
const TRACK = {
  t: "Track every dollar",
  d: "Keep a simple sheet: date, client, amount, what you spent. If this becomes regular income, you'll need to report it at tax time.",
  go: [SHEETS],
};

export const GUIDES: Record<string, Guide> = {
  edits: {
    phases: [
      { when: "Right now", sub: "First 25 minutes", steps: [
        { t: "Find 10 shops with weak videos", min: "15 min",
          d: "Search <b>café, barber, nail salon, gym, bakery</b> near you on Google Maps. Open each one's Instagram or TikTok. Shortlist shops that post, but whose videos have <b>no captions, a slow start, or under 500 views</b>. Those are the easiest yeses.",
          go: [MAPS, ["TikTok", "https://www.tiktok.com"], ["Instagram", "https://www.instagram.com"]] },
        { t: "Set up your free tools", min: "10 min",
          d: "Download <b>CapCut</b> on your phone for editing. Make a free <b>Canva</b> account for cover images and text.",
          go: [["CapCut", "https://www.capcut.com"], CANVA] },
      ] },
      { when: "Today", sub: "Your first sample", steps: [
        { t: "Make one free sample for your #1 shop", min: "40 min",
          d: "Screen-record one of their videos, or film 15 seconds outside the shop. In CapCut: put a <b>hook in the first 2 seconds</b> (\"The best croissant in [city]?\"), add <b>auto captions</b> (Text → Auto captions), cut it to <b>under 20 seconds</b>, and add a sound. Business accounts can only use sounds from TikTok's commercial library, so check there.",
          go: [["CapCut", "https://www.capcut.com"], ["TikTok Creative Center (sounds)", "https://ads.tiktok.com/business/creativecenter"]] },
        { t: "Make a one-page portfolio", min: "20 min",
          d: "On <b>Carrd</b> (free), make one page with your name, your sample before/after, your price and how to reach you. Put the link in your bio.",
          go: [["Carrd", "https://carrd.co"]] },
        { t: "DM your top 5 shops", min: "15 min",
          d: "Send the sample <b>to the shop it's about</b>. Mention one specific thing you like about them. Don't copy-paste the same message to everyone.",
          go: [["Instagram DMs", "https://www.instagram.com/direct/inbox/"], ["TikTok", "https://www.tiktok.com"]],
          script: "Hey [name]! Love your [specific thing]. I made a quick edit of one of your videos to show what it could look like with captions and a stronger hook. It's yours to post, no strings: [link]\n\nI edit short videos for local businesses: 4 videos a month for $120. Want me to do next week's?" },
        { t: "Walk into 2 of them", min: "30 min",
          d: "Show the sample on your phone and ask for the owner or manager. Local shops say yes in person much more than over DMs." },
      ] },
      { when: "This week", sub: "Land your first client", steps: [
        { t: "Follow up after 48 hours", d: "Most yeses come from the follow-up, not the first message.",
          script: "Hey! Just checking you saw the edit I sent. Happy to make one more in a different style if you want to compare." },
        { t: "Agree on the deal in writing",
          d: "Write down 4 things in a simple doc and send it: <b>how many videos</b>, <b>who films</b> (they send raw clips, or you visit), <b>turnaround</b> (48 hours is good) and <b>price</b>.",
          go: [["Google Docs", "https://docs.google.com"]] },
        { t: "Book filming or clip drop-offs",
          d: "Use a free booking link so they pick a time, or a shared folder where they drop raw clips.",
          go: [["Calendly", "https://calendly.com"], ["Google Drive", "https://drive.google.com"]] },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Send an invoice, first month upfront",
          d: "<b>Wave</b> makes free invoices. Get paid by <b>Interac e-Transfer</b> through your bank, or <b>PayPal</b>. Ask for the first month before you start.",
          go: [WAVE, ["PayPal", "https://www.paypal.com"]] },
        TRACK,
      ] },
    ],
    pricing: [["One-off", "1 edited video with captions", "$20–$40"], ["Starter", "4 edits a month", "$80–$120/mo"], ["Growth", "8 edits + you post them", "$200–$300/mo"]],
    pricenote: "Beginner prices. Raise them after 3 happy clients and real view numbers you can show.",
    mistakes: [
      "<b>Pitching without a sample.</b> \"I can edit videos\" gets ignored. A finished video for their shop gets answered.",
      "<b>Copy-paste DMs.</b> Owners can tell. Mention something real about their place.",
      "<b>Working free forever.</b> One free sample, then it's paid.",
      "<b>Promising views or followers.</b> Promise better videos and regular posting, not results you can't control.",
      "<b>Using music they can't use.</b> Stick to the commercial sound library for business accounts.",
    ],
  },

  snow: {
    phases: [
      { when: "Right now", sub: "Before the snow stops", steps: [
        { t: "Check the forecast and pick your morning", min: "5 min",
          d: "The best time is <b>the first morning after 5 cm or more</b>, before people leave for work. Set an alarm for 6:30.",
          go: [["Environment Canada weather", "https://weather.gc.ca"]] },
        { t: "Get your gear ready", min: "10 min",
          d: "A <b>wide shovel</b>, a <b>pusher</b> if you have one, warm gloves and boots with grip. Charge your phone for photos. If you have ice salt, bring a small bag." },
        { t: "Write your one-line offer", min: "5 min",
          d: "Short and specific. Say the price out loud a few times so it doesn't sound like a question.",
          script: "Hi! I'm [name], I live on [street]. I'm clearing driveways this morning: $25 for the driveway and walkway, done in about 30 minutes. Want me to do yours?" },
      ] },
      { when: "Today", sub: "Knock and shovel", steps: [
        { t: "Knock on 10 doors on one street", min: "20 min",
          d: "Start with houses that <b>still have snow and a car in the driveway</b>. Stay on one or two streets so you're not walking between jobs. Expect 2 or 3 yeses." },
        { t: "Shovel properly", min: "30 min each",
          d: "Clear <b>the full width down to the pavement</b>, the walkway, the steps and the bottom of the driveway where the plow leaves a ridge. That ridge is what people hate most, so do it well." },
        { t: "Take a before and after photo", min: "1 min",
          d: "Same angle both times. These photos are your ad for the next storm." },
        { t: "Leave your number for next time", min: "2 min",
          d: "Hand over a small card or text them so they have your number. Ask if they want you <b>every time it snows</b>.",
          script: "Thanks! This is [name], the driveway guy from this morning. Text me any time it snows and I'll come by. Want me to just come automatically after every 5 cm?" },
      ] },
      { when: "This week", sub: "Turn storms into regulars", steps: [
        { t: "Post your before/after locally",
          d: "Post in your neighbourhood Facebook group or on Nextdoor with your price and area. Neighbours trust neighbours.",
          go: [NEXTDOOR, MARKETPLACE] },
        { t: "Offer a season deal",
          d: "Ask your best customers if they want a <b>flat monthly price</b> for every snowfall. You get steady money; they stop worrying." },
        { t: "Make a route",
          d: "List every regular in order of the street so you can do them all in one loop on storm mornings." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Get paid on the spot",
          d: "Cash or <b>Interac e-Transfer</b> right after the job. For season deals, ask for the month upfront." },
        TRACK,
      ] },
    ],
    pricing: [["Single driveway", "Driveway, walkway and steps", "$20–$40"], ["Big or corner lot", "Long driveway or sidewalk too", "$40–$60"], ["Season", "Every snowfall over 5 cm", "$100–$200/mo"]],
    pricenote: "Charge more after heavy or wet snow. It's twice the work.",
    mistakes: [
      "<b>Waiting until noon.</b> By then people have done it themselves. Go early.",
      "<b>Skipping the plow ridge.</b> The heavy ridge at the end of the driveway is the job people pay for.",
      "<b>Throwing snow on the sidewalk or road.</b> It's often against city rules and annoys neighbours.",
      "<b>Not saving numbers.</b> One storm is a few dollars. A list of regulars is a winter of income.",
    ],
  },

  declutter: {
    phases: [
      { when: "Right now", sub: "Pick and photograph", steps: [
        { t: "Grab 5 things you haven't touched in 6 months", min: "10 min",
          d: "Best sellers: <b>electronics, small furniture, gaming stuff, sports gear, kitchen gadgets and kids' items</b>. Ask first if it's not yours to sell." },
        { t: "Clean them and photograph by a window", min: "15 min",
          d: "Wipe them down. Take <b>4–6 photos</b> each on a plain background in daylight: front, back, any brand label, and any damage. Honest photos sell faster." },
        { t: "Check what they really sell for", min: "10 min",
          d: "Search each item on Marketplace and Kijiji. Look at what's listed nearby and price <b>10–20% under</b> similar ones if you want it gone today.",
          go: [MARKETPLACE, KIJIJI] },
      ] },
      { when: "Today", sub: "List and reply fast", steps: [
        { t: "List all 5 with a clear title", min: "20 min",
          d: "Title = <b>brand + item + condition</b> (\"Sony WH-1000XM4 headphones, works perfectly\"). Add size or dimensions. Say <b>pickup only</b> and your general area.",
          go: [MARKETPLACE, KIJIJI] },
        { t: "Answer messages within minutes",
          d: "The first person who gets a fast reply usually buys. Turn notifications on.",
          script: "Hi! Yes, it's still available. I can do pickup today after [time] near [main intersection]. Price is $[price]. Want me to hold it for you?" },
        { t: "Meet safely",
          d: "Meet in daylight, in a public spot or at your door with someone home. Many police stations have a <b>safe exchange zone</b> in the parking lot." },
      ] },
      { when: "This week", sub: "Clear what's left", steps: [
        { t: "Drop the price on anything unsold after 3 days",
          d: "Lower it by 15% and renew the listing so it shows up at the top again." },
        { t: "Bundle the leftovers",
          d: "Small items sell better together: \"Kitchen bundle, 6 items, $20\"." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Cash or e-Transfer only, at pickup",
          d: "Only hand it over once the money has landed. <b>Never accept cheques, \"overpayments\" or courier offers</b>; those are the common scams." },
        TRACK,
      ] },
    ],
    pricing: [["Small items", "Kitchen, decor, books", "$5–$20 each"], ["Mid items", "Small furniture, sports gear", "$20–$80"], ["Electronics", "Consoles, headphones, phones", "$50–$300"]],
    pricenote: "Used stuff usually sells for 30–60% of what it cost new. Price for the market, not for what you paid.",
    mistakes: [
      "<b>Dark, blurry photos.</b> Listings with clear daylight photos sell several times faster.",
      "<b>Pricing at what you paid.</b> Nobody pays retail for used. Check real local listings.",
      "<b>Slow replies.</b> Buyers message 3 sellers and go with whoever answers first.",
      "<b>Falling for shipping or overpayment scams.</b> Local pickup, cash or e-Transfer, done.",
    ],
  },

  carclean: {
    phases: [
      { when: "Right now", sub: "Supplies and offer", steps: [
        { t: "Buy your starter kit", min: "30 min",
          d: "About $15–$20 at a dollar store or Canadian Tire: <b>microfibre cloths, interior wipes, glass cleaner, a soft brush</b> and garbage bags. Use your home vacuum or a shop vac with an extension cord." },
        { t: "Clean your own (or a family) car first", min: "60 min",
          d: "Take <b>before and after photos</b> of the seats, floor mats and cup holders. These are your ad." },
      ] },
      { when: "Today", sub: "Get bookings", steps: [
        { t: "Post your offer", min: "15 min",
          d: "Post in your local Facebook group, Nextdoor and Marketplace with the photos and a clear price.",
          go: [MARKETPLACE, NEXTDOOR],
          script: "Interior car cleaning, I come to you! Full vacuum, wipe-down of every surface, windows inside, cup holders and mats. $25 for a car, $35 for SUVs and vans. Book a spot this Saturday: [your number]" },
        { t: "Book 3 slots back to back",
          d: "Ask people to have the car <b>parked near an outlet</b> with stuff taken out. Text them the day before to confirm." },
      ] },
      { when: "Job day", sub: "Do it right", steps: [
        { t: "Follow the same order every time", min: "45 min",
          d: "<b>Trash out → mats out → vacuum top to bottom → wipe surfaces → windows → mats back.</b> Doing it in order stops you missing spots." },
        { t: "Show them before you leave",
          d: "Open the door and let them look. Ask for a quick review in the group and if they want you <b>every month</b>." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Paid on the spot", d: "Cash or <b>Interac e-Transfer</b> before you leave. Offer $5 off if they book monthly." },
        TRACK,
      ] },
    ],
    pricing: [["Car", "Full interior clean", "$25–$40"], ["SUV / van", "Full interior, more seats", "$35–$60"], ["Monthly", "One clean every month", "$20–$30 each"]],
    pricenote: "Add $10–$15 for dog hair or kids' car seats. It takes much longer.",
    mistakes: [
      "<b>No before/after photos.</b> They're the whole sales pitch.",
      "<b>Not confirming the day before.</b> No-shows kill your Saturday.",
      "<b>Using harsh cleaners on screens or leather.</b> Damp microfibre is safest. Never spray directly on screens.",
      "<b>Undercharging for messy cars.</b> Agree the price after you see it, not before.",
    ],
  },

  tutor: {
    phases: [
      { when: "Right now", sub: "Pick your lane", steps: [
        { t: "Pick one subject and grade range", min: "5 min",
          d: "Choose what you got your best marks in. \"<b>Grade 7–10 math</b>\" sells better than \"any subject\"." },
        { t: "Set your rate", min: "5 min",
          d: "High-school and university students usually charge <b>$20–$40 an hour</b>. Start at the low end and raise it after 3 students." },
        { t: "Make a simple flyer", min: "20 min",
          d: "Use a Canva flyer template: subject, grades, price, online or in person, your first name and number or email.",
          go: [CANVA] },
      ] },
      { when: "Today", sub: "Find your first student", steps: [
        { t: "Post in 2 local parent groups", min: "15 min",
          d: "Search Facebook for \"[your town] parents\" or \"[your school] parents\". Post your flyer with a friendly line.",
          script: "Hi everyone! I'm [name], a [grade/program] student who [got 95% in math / tutors my cousins]. I'm offering Grade [x–y] [subject] tutoring, online or at your place, $[rate]/hour. First 20 minutes free so your kid can see if it clicks. Message me!" },
        { t: "Tell people you already know",
          d: "Text family friends, neighbours and your old teachers. <b>Most first students come from someone who knows you.</b>" },
      ] },
      { when: "This week", sub: "First session", steps: [
        { t: "Ask what's coming up", min: "5 min",
          d: "Before the session, ask the parent for the <b>next test date and the unit</b>. Plan the hour around it." },
        { t: "Run a focused hour", min: "60 min",
          d: "10 min to find the gap, 40 min of practice problems, 10 min recap. Send the parent <b>2 lines after</b> on what you covered.",
          go: [["Google Meet", "https://meet.google.com"], ["Khan Academy (free practice)", "https://www.khanacademy.org"]] },
        { t: "Book the next session before you leave",
          d: "\"Same time next week?\" is the most important sentence in tutoring." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Get paid per session or by the month",
          d: "<b>Interac e-Transfer</b> at the end of each session, or a 4-session bundle paid upfront." },
        TRACK,
      ] },
    ],
    pricing: [["Single hour", "One-off help before a test", "$20–$40"], ["Weekly", "One hour every week", "$80–$150/mo"], ["Exam prep", "3 sessions before finals", "$60–$110"]],
    pricenote: "Group sessions (2–3 students) can be $15 each per hour: more for you, cheaper for them.",
    mistakes: [
      "<b>\"Any subject, any grade.\"</b> It sounds unsure. Pick a lane.",
      "<b>Lecturing the whole hour.</b> Students learn by doing problems with you watching.",
      "<b>Not updating the parent.</b> Parents pay. Two lines after each session keeps them paying.",
      "<b>Doing their homework for them.</b> Teachers notice, and parents stop booking.",
    ],
  },

  templates: {
    phases: [
      { when: "Right now", sub: "Find a niche that sells", steps: [
        { t: "Research what's already selling", min: "20 min",
          d: "On Etsy, search things like <b>\"Canva template instagram\", \"wedding menu template\", \"budget planner\"</b>. Open the best-sellers and look at the number of reviews. Lots of reviews = people buy this.",
          go: [["Etsy", "https://www.etsy.com"]] },
        { t: "Pick one narrow niche", min: "5 min",
          d: "Narrow wins: \"<b>Instagram story templates for nail techs</b>\" beats \"social media templates\"." },
      ] },
      { when: "Today", sub: "Make your first set", steps: [
        { t: "Design 3 templates in one style", min: "2 hrs",
          d: "In Canva, make 3 matching templates with <b>the same fonts and colours</b>. Use only free elements or ones you're allowed to resell, and don't copy someone else's design.",
          go: [CANVA] },
        { t: "Make the template link", min: "10 min",
          d: "In Canva: <b>Share → More → Template link</b>. Buyers get a copy they can edit. Put the link in a simple PDF that says \"Click here to open your template\"." },
        { t: "Make 3 listing images", min: "30 min",
          d: "Show the templates on a phone mockup, show what's included, and show it being edited. These images do the selling." },
      ] },
      { when: "This week", sub: "List and promote", steps: [
        { t: "List it", min: "30 min",
          d: "Etsy charges a small listing fee per item; Gumroad is free to list and takes a cut when you sell. Use a title with the words buyers type: \"Nail Tech Instagram Story Templates, Editable in Canva\".",
          go: [["Etsy seller", "https://www.etsy.com/sell"], ["Gumroad", "https://gumroad.com"]] },
        { t: "Post a 15-second preview video", min: "20 min",
          d: "Screen-record yourself editing one template. Post it on TikTok and Pinterest with a link to the shop.",
          go: [["Pinterest", "https://www.pinterest.com"], ["TikTok", "https://www.tiktok.com"]] },
        { t: "Add one new set a week", d: "Shops with more listings get found more. Same niche, new designs." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Set up payouts", d: "Etsy and Gumroad pay into your bank account. You may need a parent's help if you're under 18." },
        TRACK,
      ] },
    ],
    pricing: [["Single template", "One design", "$3–$6"], ["Set", "10–20 matching templates", "$10–$20"], ["Bundle", "Several sets together", "$20–$40"]],
    pricenote: "This is slow money. Expect your first sale in weeks, not days. It grows as you add listings.",
    mistakes: [
      "<b>Going too broad.</b> \"Instagram templates\" has thousands of shops. Pick a specific buyer.",
      "<b>Using elements you can't resell.</b> Check the licence, and never copy another seller.",
      "<b>Bad listing photos.</b> On Etsy, the first image is the whole ad.",
      "<b>Giving up after week one.</b> Most shops make $0 at first.",
    ],
  },

  dogs: {
    phases: [
      { when: "Right now", sub: "Get set up", steps: [
        { t: "Decide your area and times", min: "5 min",
          d: "Pick <b>a 10-minute walk radius</b> from home and the times you're free. Midday walks are what working owners need most." },
        { t: "Gather your kit", min: "10 min",
          d: "Poop bags, treats (ask the owner first), a spare leash, a small water bottle and your phone charged." },
      ] },
      { when: "Today", sub: "Find dogs", steps: [
        { t: "Post in your building or street group", min: "15 min",
          d: "Start with people who already see you around.",
          go: [NEXTDOOR],
          script: "Hi neighbours! I'm [name] from [street/building]. I walk dogs around here: 30-minute walks for $[price], midday or after school. I'll send a photo every walk. First walk is half price so your dog can meet me." },
        { t: "Create a Rover profile", min: "30 min",
          d: "Rover lets owners find walkers near them and handles payment. Add clear photos of you with dogs and a short bio. Check the minimum age in your area.",
          go: [["Rover", "https://www.rover.com"]] },
      ] },
      { when: "This week", sub: "Meet and walk", steps: [
        { t: "Do a meet-and-greet first", min: "15 min",
          d: "Meet the owner and dog before any walk. Ask: <b>how they act with other dogs, pulling, any food allergies, the vet's number</b>, and where the keys go." },
        { t: "Send a photo during every walk",
          d: "A quick photo or two in the park. This is what makes owners book you again." },
        { t: "Offer a weekly slot",
          d: "\"Want me Monday, Wednesday and Friday at noon?\" Regulars are where the money is." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Get paid weekly", d: "<b>Interac e-Transfer</b> every Friday for the week's walks, or through Rover." },
        TRACK,
      ] },
    ],
    pricing: [["Single walk", "30 minutes", "$15–$25"], ["Weekly", "3 walks a week", "$45–$70/week"], ["Two dogs", "Same home, same walk", "+$5–$10"]],
    pricenote: "Walking two dogs from the same house at once is the easiest raise.",
    mistakes: [
      "<b>Skipping the meet-and-greet.</b> You need to know the dog before you're alone with it.",
      "<b>Letting dogs off leash.</b> Never, unless the owner says so in writing and it's legal there.",
      "<b>Walking too many dogs at once.</b> Start with one or two.",
      "<b>Going silent during walks.</b> A photo builds trust; silence makes owners nervous.",
    ],
  },

  flip: {
    phases: [
      { when: "Right now", sub: "Find a freebie", steps: [
        { t: "Search the free sections near you", min: "15 min",
          d: "On Marketplace, filter price to <b>$0</b>. On Kijiji, look at <b>Free Stuff</b>. Good flips: <b>solid wood furniture, bikes, patio sets, lamps, shelving, kids' outdoor toys</b>.",
          go: [MARKETPLACE, KIJIJI] },
        { t: "Check it's worth it", min: "10 min",
          d: "Search the same item for sale. If cleaned-up ones sell for <b>$40 or more</b> and you can carry it, go." },
      ] },
      { when: "Today", sub: "Pick up and fix", steps: [
        { t: "Message fast and pick up today",
          d: "Free stuff goes in minutes. Have a ride or a friend with a car ready.",
          script: "Hi! I can pick this up today at [time]. Is it still available? Thank you so much!" },
        { t: "Check it works before you take it",
          d: "Open drawers, check legs, plug in lamps. <b>Skip anything with bedbugs, mould or water damage</b>, no matter how good it looks." },
        { t: "Clean and do small fixes", min: "1–2 hrs",
          d: "Soap and water, tighten screws, new knobs or a coat of paint ($10–$20). Take <b>before photos first</b>." },
      ] },
      { when: "This week", sub: "List and sell", steps: [
        { t: "Photograph in daylight and list", min: "20 min",
          d: "Show the before photo too. Buyers love a glow-up. Include measurements.",
          go: [MARKETPLACE, KIJIJI] },
        { t: "Reply fast and meet safely", d: "Pickup only, cash or <b>Interac e-Transfer</b> on arrival." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [TRACK] },
    ],
    pricing: [["Small items", "Lamps, decor, toys", "$15–$40"], ["Furniture", "Dressers, tables, shelves", "$60–$200"], ["Outdoor", "Patio sets, bikes", "$40–$150"]],
    pricenote: "Your profit is the sale price minus paint and gas. Keep fixes under $20 at first.",
    mistakes: [
      "<b>Taking anything with bugs or mould.</b> It can follow you home. Walk away.",
      "<b>Buying fancy supplies first.</b> Soap, a screwdriver and one can of paint is enough.",
      "<b>Picking things too big to move.</b> If it doesn't fit in the car you have, skip it.",
      "<b>No before photo.</b> The transformation is what sells it.",
    ],
  },

  yard: {
    phases: [
      { when: "Right now", sub: "Prep", steps: [
        { t: "Gather tools", min: "10 min",
          d: "<b>Rake, leaf bags, gloves, a broom</b> and a tarp to drag leaves. Check your city's yard waste pickup day and rules for bags." },
        { t: "Walk your street and spot messy yards", min: "15 min",
          d: "Leaves on the lawn, overgrown beds or a messy front walk. Note the addresses." },
      ] },
      { when: "Today", sub: "Knock and quote", steps: [
        { t: "Offer a flat price per yard", min: "30 min",
          d: "Quote on the spot by size. A <b>flat price</b> means a slow job doesn't kill your pay.",
          script: "Hi! I'm [name], I live on [street]. I'm doing yard cleanups this weekend: raking, bagging and sweeping your front walk. For your front yard it's $[price]. I can do it Saturday morning. Interested?" },
        { t: "Post in your local group", go: [NEXTDOOR, MARKETPLACE],
          d: "Add a before/after from your own yard or a family member's." },
      ] },
      { when: "Job day", sub: "Do it well", steps: [
        { t: "Rake, bag and finish the edges", min: "1–3 hrs",
          d: "Rake onto the tarp, bag it, then <b>sweep the walk and driveway</b> and clear leaves from garden beds. The finishing is what people notice." },
        { t: "Ask for the next job",
          d: "Book the spring cleanup or the next fall visit before you leave." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Paid when done", d: "Cash or <b>Interac e-Transfer</b>. Bring a few extra bags so you're not short." },
        TRACK,
      ] },
    ],
    pricing: [["Small front yard", "Rake, bag, sweep", "$40–$60"], ["Front and back", "Full cleanup", "$80–$150"], ["Seasonal", "Spring and fall visits", "$150–$250"]],
    pricenote: "Bags cost money. Either include them in the price or ask the owner to supply them.",
    mistakes: [
      "<b>Charging by the hour to strangers.</b> They worry you'll go slow. Quote a flat price.",
      "<b>Leaving bags in the wrong place.</b> Follow the city's yard waste rules.",
      "<b>Skipping the edges.</b> Clean walks and beds are what makes it look done.",
      "<b>Going alone on huge yards.</b> Bring a friend and split it.",
    ],
  },

  babysit: {
    phases: [
      { when: "Right now", sub: "Get ready", steps: [
        { t: "Take a babysitting or first-aid course", min: "Weekend",
          d: "The <b>Canadian Red Cross</b> runs babysitting and first-aid courses. A certificate makes parents say yes much faster.",
          go: [["Canadian Red Cross courses", "https://www.redcross.ca/training-and-certification"]] },
        { t: "Write your availability", min: "5 min",
          d: "List your free evenings and weekends, and ages you're comfortable with." },
      ] },
      { when: "Today", sub: "Tell people you trust", steps: [
        { t: "Message 5 parents you know", min: "10 min",
          d: "Family friends, neighbours, parents from your old school.",
          script: "Hi [name]! I'm starting to babysit and wanted to let you know first. I have my [Red Cross / first-aid] certificate and I'm free [evenings]. My rate is $[rate]/hour. Happy to come meet the kids first!" },
        { t: "Ask for a reference",
          d: "Ask one adult who knows you well (not family) if parents can call them." },
      ] },
      { when: "This week", sub: "First job", steps: [
        { t: "Meet the kids first", min: "20 min", d: "A short visit while the parents are home. Learn names, routines, bedtime and rules." },
        { t: "Write down the essentials",
          d: "Parents' numbers, address, <b>allergies</b>, bedtime, screen rules and where the first-aid kit is." },
        { t: "Send a short update",
          d: "One text mid-evening: \"All good, they're asleep at 8:15.\" Parents relax and book you again." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Paid at the end of the night", d: "Cash or <b>Interac e-Transfer</b>. Round up to the next half hour." },
        TRACK,
      ] },
    ],
    pricing: [["One child", "Per hour", "$15–$20"], ["Two or three kids", "Per hour", "$18–$25"], ["Regular night", "Same night every week", "Book it weekly"]],
    pricenote: "Late nights after midnight usually get an extra few dollars an hour.",
    mistakes: [
      "<b>No emergency info.</b> Always have numbers, address and allergies written down.",
      "<b>Being on your phone the whole time.</b> Parents ask kids how it went.",
      "<b>Not asking about rules.</b> Screens, snacks and bedtime differ in every home.",
      "<b>Skipping the follow-up.</b> A thank-you text gets you the next booking.",
    ],
  },

  errands: {
    phases: [
      { when: "Right now", sub: "Make your offer", steps: [
        { t: "Decide what you'll do", min: "5 min",
          d: "<b>Groceries, pharmacy pickups, returns, post office, bottle returns.</b> Walking distance or by bike/transit is fine to start." },
        { t: "Make a simple flyer", min: "20 min",
          d: "Big text, your name, a photo, your number and a flat price per trip. Older people prefer phone calls over apps.",
          go: [CANVA] },
      ] },
      { when: "Today", sub: "Get the word out", steps: [
        { t: "Drop 20 flyers", min: "45 min",
          d: "Seniors' buildings (ask the front desk), community centres, places of worship and your own street." },
        { t: "Ask someone they trust to vouch",
          d: "A note from a neighbour, a building manager or your parents helps a lot." },
      ] },
      { when: "This week", sub: "First errands", steps: [
        { t: "Take the list by phone and repeat it back",
          d: "Write it down, read it back, and agree the budget. Ask about brands and substitutions." },
        { t: "Text or show the receipt every time",
          d: "Photo of the receipt plus the change. <b>Trust is the whole business.</b>" },
        { t: "Offer a weekly slot", d: "\"Every Tuesday morning?\" Regulars make this worth it." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Shop with their money", d: "Get the money (or a card they choose to give you) upfront for the shopping, and your fee on delivery." },
        TRACK,
      ] },
    ],
    pricing: [["One trip", "Under an hour", "$15–$25"], ["Hourly", "Several stops", "$15–$20/hr"], ["Weekly", "Groceries every week", "$60–$80/mo"]],
    pricenote: "Never mark up their groceries. Your fee is your fee.",
    mistakes: [
      "<b>Losing receipts.</b> Always show where every dollar went.",
      "<b>Using your own money for big shops.</b> Get it upfront.",
      "<b>Guessing on substitutions.</b> Call and ask.",
      "<b>Being late.</b> For older clients, reliability matters more than speed.",
    ],
  },

  moving: {
    phases: [
      { when: "Right now", sub: "Get set up", steps: [
        { t: "Find a partner", min: "10 min", d: "Moving is a two-person job. Bring a strong friend and split the money." },
        { t: "Get basic gear", min: "15 min",
          d: "Work gloves and good shoes. Borrow a <b>dolly and moving blankets</b> if you can. You don't need a truck; the customer rents one." },
      ] },
      { when: "Today", sub: "Get booked", steps: [
        { t: "Post your offer", min: "15 min",
          d: "Post on Kijiji gigs, Marketplace and local groups. Aim for <b>month-end and weekends</b>, when most people move.",
          go: [KIJIJI, MARKETPLACE],
          script: "Moving help: 2 strong, careful people, $25/hr each (2-hour minimum). We load and unload your truck, carry furniture and stairs. No truck, you rent it, we do the heavy lifting. Message for month-end dates!" },
        { t: "Try TaskRabbit", d: "In bigger Canadian cities, people book movers there. Check the age and city requirements.",
          go: [["TaskRabbit", "https://www.taskrabbit.ca"]] },
      ] },
      { when: "Job day", sub: "Move it safely", steps: [
        { t: "Ask the key questions before", d: "<b>Stairs or elevator? Any heavy items (piano, fridge)? How many rooms?</b> Then confirm the time." },
        { t: "Lift with your legs", d: "Heavy stuff low in the truck, boxes on top, blankets between furniture. Take apart tables if you can." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Paid at the end", d: "Cash or <b>Interac e-Transfer</b>, plus tips. Ask for a review." },
        TRACK,
      ] },
    ],
    pricing: [["Per mover", "Per hour", "$20–$30"], ["Minimum", "2 hours per job", "$40–$60 each"], ["Big moves", "Full house, 2+ people", "Quote by the job"]],
    pricenote: "Charge a bit more for stairs with no elevator.",
    mistakes: [
      "<b>Going alone.</b> Two people is safer and faster.",
      "<b>Lifting pianos or safes.</b> Leave those to pros with proper gear.",
      "<b>No minimum.</b> A 30-minute job isn't worth the trip.",
      "<b>Not asking about stairs.</b> It changes the whole job.",
    ],
  },

  thrift: {
    phases: [
      { when: "Right now", sub: "Learn what sells", steps: [
        { t: "Look up brands that resell well", min: "20 min",
          d: "On Depop and Poshmark, search <b>sold</b> listings for brands like Carhartt, Patagonia, Levi's, Lululemon, Arc'teryx and vintage band tees. Note what actually sold and for how much.",
          go: [["Depop", "https://www.depop.com"], ["Poshmark", "https://poshmark.ca"]] },
        { t: "Save a cheat-sheet on your phone", min: "5 min",
          d: "Write 10 brands with their typical sold price. You'll use it in the store." },
      ] },
      { when: "Today", sub: "Thrift trip", steps: [
        { t: "Spend $20 max at one store", min: "1 hr",
          d: "Check the brand tag first, then condition: <b>no stains, holes or broken zips</b>. Only buy what you know sells for 3× the price." },
        { t: "Wash and photograph", min: "45 min",
          d: "Wash, de-lint, then photograph on a hanger or flat-lay in daylight: front, back, tag, any detail, and <b>measurements</b>." },
      ] },
      { when: "This week", sub: "List and sell", steps: [
        { t: "List on 2 apps at once", min: "30 min",
          d: "Title: <b>brand + item + size + style</b> (\"Vintage Carhartt work jacket, size L, brown duck\"). Mark it sold on the other app the moment it sells.",
          go: [["Depop", "https://www.depop.com"], ["Poshmark", "https://poshmark.ca"]] },
        { t: "Ship within 2 days", d: "Use the app's shipping label. Fast shipping gets good reviews." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Cash out to your bank", d: "The apps pay out after delivery. Their fee comes off the top." },
        TRACK,
      ] },
    ],
    pricing: [["Basics", "Brand tees, hoodies", "$15–$30"], ["Jackets", "Outerwear, workwear", "$40–$120"], ["Vintage finds", "Band tees, rare pieces", "$30–$150"]],
    pricenote: "Your profit is the sale price minus what you paid, the app fee and shipping.",
    mistakes: [
      "<b>Buying what you like instead of what sells.</b> Use your sold-price cheat-sheet.",
      "<b>Missing damage.</b> One hidden stain means a return.",
      "<b>No measurements.</b> Sizes vary; measurements stop returns.",
      "<b>Spending big early.</b> Learn with $20 first.",
    ],
  },

  sneakers: {
    phases: [
      { when: "Right now", sub: "Kit and practice", steps: [
        { t: "Buy a sneaker cleaning kit", min: "20 min",
          d: "About $15–$25: <b>cleaning solution, soft and medium brushes, microfibre cloth</b>. A magic eraser helps on midsoles." },
        { t: "Clean your own pair and film it", min: "45 min",
          d: "Film the <b>before, the scrubbing and the after</b>. That video is your ad." },
      ] },
      { when: "Today", sub: "Get customers", steps: [
        { t: "Post your before/after", min: "15 min",
          d: "TikTok, Instagram and your school or neighbourhood group chats.",
          go: [["TikTok", "https://www.tiktok.com"], ["Instagram", "https://www.instagram.com"]],
          script: "Sneaker cleaning 👟 $20 a pair, back in 2 days looking like this. Pickup and drop-off at [school/area]. DM me!" },
        { t: "Set up pickup and drop-off", d: "Pick a spot (school, a park, your door). Write the owner's name on a tag on each pair." },
      ] },
      { when: "This week", sub: "Do the work", steps: [
        { t: "Follow the same steps", min: "30 min a pair",
          d: "<b>Laces out → dry brush → wash uppers → midsoles → wipe → air dry.</b> Never put them in a dryer. Wash laces separately." },
        { t: "Photograph each finished pair", d: "Ask the owner if you can post it. Every pair is more advertising." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Paid on return", d: "Cash or <b>Interac e-Transfer</b> when they pick up." },
        TRACK,
      ] },
    ],
    pricing: [["Basic clean", "Uppers, midsoles, laces", "$15–$25"], ["Deep clean", "Stains, insoles, de-odour", "$25–$40"], ["3 pairs", "Bundle", "$50–$60"]],
    pricenote: "Suede and white leather take longest. Charge more for them.",
    mistakes: [
      "<b>Using the wrong cleaner on suede.</b> Learn suede on your own shoes first.",
      "<b>Heat drying.</b> It can melt glue and warp shoes.",
      "<b>Mixing up pairs.</b> Tag every pair with a name.",
      "<b>Promising miracles.</b> Some stains don't come out. Say so upfront.",
    ],
  },

  photos: {
    phases: [
      { when: "Right now", sub: "Learn the basics", steps: [
        { t: "Learn phone product photography", min: "20 min",
          d: "Use <b>window light</b>, a plain background, the 1× or 2× lens (not 0.5×), and tap to focus. Shoot from above for food and at eye level for products." },
        { t: "Install a free editor", min: "5 min", d: "Lightroom mobile is free for basic edits.",
          go: [["Lightroom mobile", "https://lightroom.adobe.com"]] },
      ] },
      { when: "Today", sub: "Build your sample", steps: [
        { t: "Pick one local business with weak photos", min: "10 min",
          d: "Look on Google Maps and Instagram for a café or shop whose menu or product photos are dark or blurry.",
          go: [MAPS] },
        { t: "Buy one item and shoot 10 great photos", min: "1 hr",
          d: "A coffee, a pastry, one product. Edit lightly: brightness, warmth, straighten." },
        { t: "Show the owner", min: "15 min",
          d: "Go in person at a quiet time. Show the photos on your phone.",
          script: "Hi! I took these of your [item] this morning. Feel free to use them on your page, no charge. I do photo packs for local shops: 15 edited photos of your menu or products for $[price]. Want me to come back and do the full menu?" },
      ] },
      { when: "This week", sub: "First paid shoot", steps: [
        { t: "Agree on what they get", d: "<b>Number of photos, which items, delivery date, and that they can use them anywhere.</b> Put it in a short message." },
        { t: "Deliver in a shared folder", d: "Send full-size files in Google Drive within 3 days. Ask to be tagged when they post.",
          go: [["Google Drive", "https://drive.google.com"]] },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Half upfront, half on delivery", d: "Invoice with Wave, paid by <b>Interac e-Transfer</b>.", go: [WAVE] },
        TRACK,
      ] },
    ],
    pricing: [["Mini pack", "10 photos, one visit", "$50–$80"], ["Menu shoot", "15–25 photos", "$100–$150"], ["Monthly", "New photos every month", "$100–$200/mo"]],
    pricenote: "Your phone is enough at this price. Upgrade only once you're turning work away.",
    mistakes: [
      "<b>Shooting in dim light.</b> Window light beats any filter.",
      "<b>Over-editing.</b> Food should look real and tasty, not neon.",
      "<b>No agreement on usage.</b> Say clearly where they can use the photos.",
      "<b>Showing only a portfolio, not their product.</b> A sample of their stuff sells.",
    ],
  },

  logos: {
    phases: [
      { when: "Right now", sub: "Build samples", steps: [
        { t: "Make 3 sample logos", min: "2 hrs",
          d: "Invent 3 brands (a café, a gym, a clothing label). Design each with <b>a wordmark, an icon and one colour version</b>. Use Canva or Figma. Don't copy existing logos.",
          go: [CANVA, ["Figma", "https://www.figma.com"]] },
        { t: "Mock them up", min: "20 min", d: "Put each logo on a sign, a cup or a T-shirt mockup. It makes them look real." },
      ] },
      { when: "Today", sub: "Open your gig", steps: [
        { t: "Create a Fiverr gig", min: "45 min",
          d: "Fiverr requires you to be 18 or older. Title example: \"I will design a modern minimalist logo for your small business\". Add your 3 mockups. Fiverr keeps 20% of every order.",
          go: [["Fiverr", "https://www.fiverr.com"]] },
        { t: "Set 3 packages", min: "10 min",
          d: "<b>Basic</b> (1 concept, PNG), <b>Standard</b> (2 concepts, PNG + SVG, 2 revisions), <b>Premium</b> (3 concepts, all files, social kit)." },
      ] },
      { when: "This week", sub: "First orders", steps: [
        { t: "Price low for your first 3 reviews",
          d: "Reviews are what get you ranked. Deliver <b>early</b> and over-deliver a little." },
        { t: "Ask good questions first",
          script: "Thanks for ordering! Quick questions so I get it right: 1) Your business name exactly as it should appear? 2) What do you sell and to who? 3) 2–3 logos you like (any brand)? 4) Colours you love or hate?" },
        { t: "Pitch local too", d: "New shops on Google Maps with no logo or a blurry one are easy to pitch in person.",
          go: [MAPS] },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Withdraw your earnings", d: "Fiverr releases money a couple of weeks after delivery. Withdraw to PayPal or your bank." },
        TRACK,
      ] },
    ],
    pricing: [["Basic", "1 concept, PNG", "$10–$25"], ["Standard", "2 concepts, all files", "$30–$60"], ["Premium", "3 concepts + social kit", "$75–$150"]],
    pricenote: "Raise prices after 5 good reviews. Your first gigs are for reviews, not profit.",
    mistakes: [
      "<b>Copying or tracing logos.</b> It gets you banned and can get the client sued.",
      "<b>Unlimited revisions.</b> Set a number in every package.",
      "<b>Delivering only a PNG.</b> Clients need a vector file (SVG/PDF) too.",
      "<b>Skipping questions.</b> Most redos come from not asking at the start.",
    ],
  },

  va: {
    phases: [
      { when: "Right now", sub: "Define your offer", steps: [
        { t: "List 5 tasks you can do well", min: "10 min",
          d: "Examples: <b>replying to comments and DMs, scheduling posts, finding brand contacts, organizing a Notion or calendar, simple research</b>." },
        { t: "Pick creators who need you", min: "20 min",
          d: "Creators with <b>10k–200k followers</b> who post a lot but reply to few comments. Big enough to pay, small enough to answer." },
      ] },
      { when: "Today", sub: "Pitch 10", steps: [
        { t: "DM or email 10 creators", min: "40 min",
          d: "Use their business email in their bio when they have one. Make it about them.",
          script: "Hi [name]! I've watched your [series/videos] for a while. I noticed [specific thing: lots of unanswered comments / no posting schedule]. I'm a virtual assistant for creators: I handle comments, DMs, scheduling and brand outreach research. Can I do a paid 1-week trial for $[price] so you can see if it saves you time?" },
        { t: "Set up your tools", min: "15 min", go: [["Notion", "https://www.notion.so"], ["Google Calendar", "https://calendar.google.com"]],
          d: "A simple Notion page to track tasks and a calendar for posting schedules." },
      ] },
      { when: "This week", sub: "Run the trial", steps: [
        { t: "Agree on access safely",
          d: "Ask them to add you as a <b>team member or manager</b> (Instagram, YouTube and TikTok all have roles). Never ask for their password." },
        { t: "Send a Friday report",
          d: "3 lines: <b>what you did, what you found, what's next</b>. This is what turns a trial into a monthly deal." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Monthly invoice", d: "Invoice monthly upfront with Wave. Get paid by <b>Interac e-Transfer</b> or PayPal.", go: [WAVE] },
        TRACK,
      ] },
    ],
    pricing: [["Trial week", "5 hours of tasks", "$50–$100"], ["Part-time", "10 hrs/week", "$600–$1,000/mo"], ["Hourly", "Ad-hoc tasks", "$15–$25/hr"]],
    pricenote: "Ask for a written list of what you're allowed to say and do on their behalf.",
    mistakes: [
      "<b>Asking for passwords.</b> Use team roles and access features instead.",
      "<b>Vague offers.</b> \"I can help with anything\" gets ignored. Name the tasks.",
      "<b>No reporting.</b> If they can't see what you did, they stop paying.",
      "<b>Replying in your own voice.</b> Learn how they talk first.",
    ],
  },

  captions: {
    phases: [
      { when: "Right now", sub: "Find a business", steps: [
        { t: "Find a business with a dead Instagram", min: "15 min",
          d: "Search local gyms, salons and restaurants. Look for <b>no posts in 30+ days or posts with no caption</b>.",
          go: [MAPS, ["Instagram", "https://www.instagram.com"]] },
      ] },
      { when: "Today", sub: "Make the sample", steps: [
        { t: "Write 3 sample posts for them", min: "45 min",
          d: "Each one: <b>a hook line, 2–3 short lines of value, a call to action</b> (\"Book your trial class, link in bio\"). Use AI for a first draft if you like, then rewrite it in their voice.",
          go: [CANVA] },
        { t: "Design them in Canva", min: "30 min", d: "Use their colours and logo. Put the 3 posts in one PDF." },
        { t: "Send it", min: "10 min",
          script: "Hi [name]! I love [something real about the business]. I noticed your Instagram has been quiet, so I made 3 ready-to-post ideas for you, free to use: [link]\n\nI write and design posts for local businesses: 12 posts a month for $[price]. Want me to plan next month?" },
      ] },
      { when: "This week", sub: "Close it", steps: [
        { t: "Follow up in 2 days", d: "A short, friendly nudge. Offer to walk them through it by phone." },
        { t: "Agree on a monthly plan", d: "<b>Number of posts, who posts them, approval process, price.</b> Send a content calendar once a month for approval.",
          go: [SHEETS] },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Monthly, upfront", d: "Invoice at the start of each month. <b>Interac e-Transfer</b> or PayPal.", go: [WAVE] },
        TRACK,
      ] },
    ],
    pricing: [["Starter", "8 posts a month", "$100–$150/mo"], ["Standard", "12 posts + captions", "$150–$250/mo"], ["Plus", "12 posts + you post them", "$250–$400/mo"]],
    pricenote: "Show results monthly: reach, follows, messages. That's how you keep clients.",
    mistakes: [
      "<b>Generic AI captions.</b> Owners can tell. Use their real details and voice.",
      "<b>No approval step.</b> Always get a yes before anything posts.",
      "<b>Promising followers.</b> Promise consistent posting, not numbers.",
      "<b>Pitching without a sample.</b> The free sample does the selling.",
    ],
  },

  bake: {
    phases: [
      { when: "Right now", sub: "Check and plan", steps: [
        { t: "Check your local rules", min: "15 min",
          d: "Selling home-baked food has rules that differ by province and city. Search \"<b>[your city] home-based food business</b>\" or call public health. Low-risk baked goods like cookies are usually the easiest." },
        { t: "Pick one thing you bake really well", min: "5 min", d: "Cookies, brownies or banana bread. One product, done great." },
        { t: "Price it", min: "10 min",
          d: "Add up ingredients and packaging per box, then <b>at least double it</b>. Example: $5 cost → $12 a box." },
      ] },
      { when: "Today", sub: "Pre-sell", steps: [
        { t: "Pre-sell before you bake", min: "15 min",
          d: "Post in group chats and your Instagram story. Take orders first so nothing goes to waste.",
          script: "Baking a batch of [item] this Saturday 🍪 Boxes of 6 for $[price], delivered Sunday around [area]. Reply with how many boxes! Ingredients: [list, including allergens]." },
        { t: "List allergens clearly", d: "Always say if there's <b>nuts, dairy, eggs, gluten</b>, and that your kitchen isn't nut-free." },
      ] },
      { when: "This week", sub: "Bake and deliver", steps: [
        { t: "Bake, cool and box", d: "Use clean boxes or bags with a label: item, date, allergens." },
        { t: "Deliver in one round", d: "Plan the route so you deliver all orders in one trip." },
        { t: "Ask for a photo", d: "Repost happy customers' photos. Ask if they want a weekly order." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Paid when they order", d: "Ask for <b>Interac e-Transfer</b> when they order, not on delivery." },
        TRACK,
      ] },
    ],
    pricing: [["Box of 6", "Cookies or brownies", "$10–$15"], ["Dozen", "Party size", "$18–$28"], ["Custom", "Birthdays, events", "$30+"]],
    pricenote: "Count your packaging and your oven time. Don't sell at cost.",
    mistakes: [
      "<b>Ignoring local rules.</b> Check what's allowed where you live first.",
      "<b>Not listing allergens.</b> This can genuinely hurt someone.",
      "<b>Baking before orders.</b> Pre-sell, then bake.",
      "<b>Too many products.</b> One great item sells better than five okay ones.",
    ],
  },

  techhelp: {
    phases: [
      { when: "Right now", sub: "Make your offer", steps: [
        { t: "List what you can fix", min: "10 min",
          d: "<b>Phone setup, Wi-Fi problems, TV and streaming apps, printers, email, video calls with family, photo backups.</b>" },
        { t: "Make a big-text flyer", min: "20 min",
          d: "\"<b>Phone, Wi-Fi or TV problems? $25 a visit.</b>\" Your name, photo and phone number.",
          go: [CANVA] },
      ] },
      { when: "Today", sub: "Spread it", steps: [
        { t: "Post flyers where older people go", min: "45 min",
          d: "Seniors' buildings (ask the front desk), libraries, community centres and church boards." },
        { t: "Tell your own family", d: "Grandparents' friends are the best first customers." },
      ] },
      { when: "This week", sub: "First visits", steps: [
        { t: "Be patient and write it down",
          d: "Fix the problem, then <b>write simple steps on paper</b> so they can do it themselves next time." },
        { t: "Never take passwords home",
          d: "Have them type passwords themselves. Never install anything they didn't ask for. Watch for scams and warn them." },
        { t: "Leave your number on their fridge", d: "They'll call you back and tell their friends." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Paid per visit", d: "Cash or <b>Interac e-Transfer</b> at the end." },
        TRACK,
      ] },
    ],
    pricing: [["Visit", "Up to 1 hour", "$25–$40"], ["Setup", "New phone or TV", "$40–$60"], ["Monthly", "One visit a month", "$30–$50"]],
    pricenote: "Fixed prices feel safer to older clients than hourly rates.",
    mistakes: [
      "<b>Rushing.</b> Kindness is what gets you called back.",
      "<b>Handling passwords or bank stuff.</b> Let them type it. Stay out of banking.",
      "<b>Fixing without explaining.</b> Leave written steps.",
      "<b>Opening up hardware.</b> Stick to settings and setup.",
    ],
  },

  bikes: {
    phases: [
      { when: "Right now", sub: "Learn on your bike", steps: [
        { t: "Learn the basic tune-up", min: "1 hr",
          d: "Park Tool's free repair guides cover <b>brake adjustment, gear indexing, chain cleaning and tire pressure</b>. Practise on your own bike.",
          go: [["Park Tool repair help", "https://www.parktool.com/en-us/blog/repair-help"]] },
        { t: "Get basic tools", min: "30 min",
          d: "Hex keys, tire levers, a pump with a gauge, chain lube and rags. About $15–$30." },
      ] },
      { when: "Today", sub: "Get customers", steps: [
        { t: "Post your offer", min: "15 min",
          d: "Post in local groups with a photo of your work.",
          go: [MARKETPLACE, NEXTDOOR],
          script: "Bike tune-ups 🚲 $25: brakes adjusted, gears tuned, chain cleaned and oiled, tires pumped. Done in a day. Spring is coming. Message me to book!" },
      ] },
      { when: "This week", sub: "Do the work", steps: [
        { t: "Check before you quote", d: "Spin wheels, squeeze brakes, shift every gear. If it needs parts, <b>tell them the cost first</b>." },
        { t: "Test ride every bike", d: "Never hand back a bike you haven't ridden. Brakes must work." },
        { t: "Take before/after photos", d: "Clean chain photos are surprisingly good ads." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Paid on pickup", d: "Cash or <b>Interac e-Transfer</b>. Parts are extra, at cost." },
        TRACK,
      ] },
    ],
    pricing: [["Basic tune-up", "Brakes, gears, chain", "$20–$30"], ["Flat fix", "Tube replaced", "$10 + tube"], ["Spring special", "Tune-up + wash", "$35–$45"]],
    pricenote: "Spring is the busy season. Book people early.",
    mistakes: [
      "<b>Taking jobs you can't finish.</b> Hydraulic brakes and wheel truing can wait.",
      "<b>Skipping the test ride.</b> Safety first, always.",
      "<b>Surprise part costs.</b> Quote parts before buying them.",
      "<b>Too much lube.</b> Wipe the chain after oiling or it collects dirt.",
    ],
  },

  cans: {
    phases: [
      { when: "Right now", sub: "Learn the rules", steps: [
        { t: "Check what your depot pays", min: "10 min",
          d: "Deposits and returns differ by province. Find your nearest <b>bottle depot or return spot</b> and check what they accept and pay per container.",
          go: [MAPS] },
        { t: "Get bags and gloves", min: "5 min", d: "Big clear bags make sorting easy." },
      ] },
      { when: "Today", sub: "Find a steady supply", steps: [
        { t: "Ask 5 neighbours to save their empties", min: "20 min",
          script: "Hi! I'm [name] from down the street. I'm collecting bottles and cans for the deposit. Can I pick up your empties every Sunday? I'll bring bags so it's no mess." },
        { t: "Ask bigger sources", d: "Building managers, sports teams, party hosts and small bars often have lots and are happy to have them gone." },
      ] },
      { when: "This week", sub: "Pick up and return", steps: [
        { t: "Collect on a fixed day", d: "Same day every week, so people remember to put them out." },
        { t: "Sort before the depot", d: "Sort by type (cans, plastic, glass) to speed up the counter." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Cash at the depot", d: "Most depots pay cash or a voucher on the spot." },
        TRACK,
      ] },
    ],
    pricing: [["Per container", "Depends on province", "About 10¢"], ["Weekly route", "5–10 houses", "$15–$40/week"], ["Events", "After a party or game", "$10–$50"]],
    pricenote: "Small money each time. Volume from regular pickups is what makes it worth it.",
    mistakes: [
      "<b>Going through people's bins.</b> Only take what's offered.",
      "<b>Not sorting.</b> Sorting at home saves time at the counter.",
      "<b>Random pickup days.</b> A fixed day builds the habit.",
      "<b>Leaving a mess.</b> Rinsed or bagged only.",
    ],
  },

  windows: {
    phases: [
      { when: "Right now", sub: "Kit and practice", steps: [
        { t: "Buy your kit", min: "20 min",
          d: "A <b>squeegee, a scrubber, a bucket</b>, microfibre cloths and a drop of dish soap in water. About $20." },
        { t: "Practise on your own windows", min: "45 min",
          d: "Scrub, then pull the squeegee in an S-shape, wiping the blade each pass. Photograph before and after." },
      ] },
      { when: "Today", sub: "Get bookings", steps: [
        { t: "Knock on your street", min: "45 min",
          script: "Hi! I'm [name], I live on [street]. I'm washing ground-floor windows this weekend, inside and out, for $[price] for your house. I'll do your neighbours the same day. Interested?" },
        { t: "Post your before/after", go: [NEXTDOOR, MARKETPLACE], d: "Clear glass photos are very convincing." },
      ] },
      { when: "Job day", sub: "Do it right", steps: [
        { t: "Ground floor only", d: "<b>No ladders on second floors</b> unless you have the right gear and experience. It's not worth the risk." },
        { t: "Do the frames and sills", d: "Wipe the sills and frames too. That's what makes it look done." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Paid when done", d: "Cash or <b>Interac e-Transfer</b>. Offer spring and fall visits." },
        TRACK,
      ] },
    ],
    pricing: [["Small house", "Ground floor, outside", "$40–$60"], ["Inside + outside", "Ground floor", "$60–$100"], ["Twice a year", "Spring and fall", "Book both now"]],
    pricenote: "Book neighbours on the same day so you're not travelling between jobs.",
    mistakes: [
      "<b>Climbing ladders on high windows.</b> Ground floor only.",
      "<b>Working in direct hot sun.</b> It dries streaky. Do the shady side first.",
      "<b>Too much soap.</b> A few drops is enough.",
      "<b>Skipping sills.</b> Dirty sills make clean windows look unfinished.",
    ],
  },

  plants: {
    phases: [
      { when: "Right now", sub: "Make your offer", steps: [
        { t: "Decide what you'll do", min: "5 min",
          d: "<b>Water plants, bring in mail and packages, check the house, feed a cat, put bins out.</b>" },
        { t: "Set a daily rate", min: "5 min", d: "Usually $10–$25 a day depending on what's included." },
      ] },
      { when: "Today", sub: "Tell people", steps: [
        { t: "Message neighbours and family friends", min: "15 min",
          script: "Hi! Heading away this winter or spring break? I'm house-sitting for neighbours: I'll water plants, bring in mail, feed pets and check everything's okay, with a photo each visit. $[rate]/day. Happy to meet first!" },
        { t: "Post before holidays", d: "Post 2–3 weeks before March break, summer and December holidays.", go: [NEXTDOOR] },
      ] },
      { when: "Before they leave", sub: "Get the details", steps: [
        { t: "Do a walkthrough", min: "20 min",
          d: "Which plants and how much water, where the mail goes, alarm code, emergency contact, <b>what to do if something goes wrong</b>." },
        { t: "Write it down", d: "Keep a checklist on your phone and tick it every visit." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Text a photo each visit", d: "Then get paid when they return, by cash or <b>Interac e-Transfer</b>." },
        TRACK,
      ] },
    ],
    pricing: [["Daily visit", "Plants + mail", "$10–$15/day"], ["With pets", "Feeding + litter", "$15–$25/day"], ["Week away", "7 visits", "$70–$150"]],
    pricenote: "Leave a short note when they're back: plants, mail, anything you noticed.",
    mistakes: [
      "<b>Skipping a visit.</b> One missed day can mean a dead plant or a full mailbox.",
      "<b>Not knowing the emergency plan.</b> Ask before they leave.",
      "<b>Posting that a house is empty.</b> Never share where clients live or when they're away.",
      "<b>Overwatering.</b> Ask exactly how much each plant needs.",
    ],
  },

  usertest: {
    phases: [
      { when: "Right now", sub: "Sign up", steps: [
        { t: "Join 2 testing sites", min: "20 min",
          d: "These pay you to try websites and apps and say what you think out loud, or to answer research studies. Most need you to be <b>18+</b> and have a computer with a microphone.",
          go: [["UserTesting", "https://www.usertesting.com/get-paid-to-test"], ["Prolific (studies)", "https://www.prolific.com"]] },
        { t: "Fill in your profile honestly", min: "15 min",
          d: "Tests are matched to your profile. Honest answers get you better matches. Lying gets you removed." },
      ] },
      { when: "Today", sub: "Pass the practice", steps: [
        { t: "Do the practice test", min: "20 min",
          d: "<b>Think out loud the whole time.</b> Say what you expect, what confuses you and why. That's what they pay for." },
        { t: "Set up a quiet spot", d: "Clear audio matters. A cheap headset with a mic helps." },
      ] },
      { when: "This week", sub: "Catch tests", steps: [
        { t: "Check a few times a day", d: "Tests go fast. Turn on notifications and grab them quickly." },
        { t: "Answer screeners honestly", d: "You'll fail many screeners. That's normal; keep going." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Cash out via PayPal", d: "Most sites pay to PayPal a few days to a couple of weeks after each test.", go: [["PayPal", "https://www.paypal.com"]] },
        TRACK,
      ] },
    ],
    pricing: [["Short test", "About 20 minutes", "$5–$10"], ["Live interview", "30–60 minutes", "$30–$60+"], ["Studies", "Surveys and tasks", "Varies"]],
    pricenote: "Side money, not a job. Tests come in waves.",
    mistakes: [
      "<b>Going quiet during tests.</b> Talking out loud is the whole job.",
      "<b>Lying on screeners.</b> It gets accounts banned.",
      "<b>Paying to join.</b> Real testing sites are free. Anything charging a fee is a scam.",
      "<b>Expecting full-time pay.</b> Treat it as extra money.",
    ],
  },

  transcribe: {
    phases: [
      { when: "Right now", sub: "Get set up", steps: [
        { t: "Test your typing speed", min: "5 min", d: "You'll want <b>50+ words per minute</b> with few mistakes. Practise if you're under." },
        { t: "Apply to a transcription site", min: "45 min",
          d: "Most have an entry test on grammar and a short audio clip. Read their style guide first; that's what the test checks.",
          go: [["Rev freelancers", "https://www.rev.com/freelancers"], ["TranscribeMe", "https://www.transcribeme.com"]] },
      ] },
      { when: "Today", sub: "Practise", steps: [
        { t: "Use good headphones", d: "Over-ear headphones make a huge difference with unclear audio." },
        { t: "Learn the shortcuts", d: "Pause, rewind 2 seconds, and slow playback. Most transcription tools have them." },
      ] },
      { when: "This week", sub: "Take jobs", steps: [
        { t: "Start with short, clear files", d: "Your pay rate goes up as you get faster. Pick clean audio first." },
        { t: "Later: pitch podcasters directly",
          d: "Small podcasts often want transcripts for their show notes.",
          script: "Hi [name]! I love [episode]. I transcribe podcasts: a clean, readable transcript of each episode within 48 hours for $[price]. Great for show notes and search. Want me to do your latest one as a sample?" },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Weekly payouts", d: "Sites usually pay weekly to PayPal. Direct clients pay by <b>Interac e-Transfer</b> or PayPal." },
        TRACK,
      ] },
    ],
    pricing: [["Sites", "Per audio minute", "Low at first"], ["Direct podcast", "Per episode", "$30–$80"], ["Rush", "Within 24 hours", "+25%"]],
    pricenote: "Hourly pay starts low and improves with speed. Direct clients pay best.",
    mistakes: [
      "<b>Skipping the style guide.</b> Most fails come from formatting, not typing.",
      "<b>Guessing unclear words.</b> Mark them as the guide says.",
      "<b>Cheap earbuds.</b> Good headphones = faster, more accurate.",
      "<b>Paying for a \"course\" to get started.</b> The sites are free to join.",
    ],
  },

  commissions: {
    phases: [
      { when: "Right now", sub: "Build samples", steps: [
        { t: "Draw 3 pets for friends, free", min: "2–3 hrs",
          d: "Ask for a <b>clear, well-lit photo</b> of the pet. Pick one style (cartoon, realistic, line art) and keep it consistent.",
          go: [["Procreate", "https://procreate.com"]] },
        { t: "Photograph or export them nicely", min: "15 min", d: "Show the original photo next to your drawing." },
      ] },
      { when: "Today", sub: "Open orders", steps: [
        { t: "Post with a clear price", min: "15 min",
          d: "Instagram, TikTok (a time-lapse of you drawing does well) and local pet groups.",
          go: [["Instagram", "https://www.instagram.com"], ["TikTok", "https://www.tiktok.com"]],
          script: "Custom pet portraits are open! 🐶🐱 Digital $[price], printed $[price]. Send me a clear photo of your pet and it's done in about 5 days. DM to order!" },
        { t: "Write your order steps", d: "What you need (photo, name, background colour), price, timeline, and how many changes are included." },
      ] },
      { when: "This week", sub: "Deliver", steps: [
        { t: "Send a sketch first", d: "Get a thumbs-up on the rough sketch before you finish. Saves redos." },
        { t: "Deliver high-res", d: "Send a full-size file; for prints, use a local print shop or mail it in a hard envelope." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "50% upfront, 50% on delivery", d: "By <b>Interac e-Transfer</b> or PayPal." },
        TRACK,
      ] },
    ],
    pricing: [["Digital", "One pet, simple background", "$15–$35"], ["Detailed", "Realistic or full background", "$35–$60"], ["Printed", "Framed or mailed", "+$15–$25"]],
    pricenote: "Holidays and pet memorials are your busiest times. Post ahead of December.",
    mistakes: [
      "<b>No sample work.</b> Nobody buys art they can't see.",
      "<b>Bad reference photos.</b> Ask for a clearer one before starting.",
      "<b>Unlimited changes.</b> Include one or two, then charge.",
      "<b>Switching styles every piece.</b> Be known for one style.",
    ],
  },

  organize: {
    phases: [
      { when: "Right now", sub: "Get your proof", steps: [
        { t: "Organize your own closet or garage", min: "2 hrs",
          d: "Sort into <b>keep, donate, sell, trash</b>. Group like with like, label shelves. Take before and after photos from the same spot." },
        { t: "Get supplies", min: "15 min", d: "Garbage bags, a label maker or tape and marker, and a few bins." },
      ] },
      { when: "Today", sub: "Get bookings", steps: [
        { t: "Post your before/after", min: "15 min",
          go: [NEXTDOOR, MARKETPLACE],
          script: "Garage or closet a mess? I'll sort it, clear it and organize it in an afternoon. 3-hour package $[price]. I'll even list the stuff you don't want or drop it at the donation centre. See my before/after!" },
      ] },
      { when: "Job day", sub: "Do it right", steps: [
        { t: "They decide what goes", d: "<b>Never throw anything out without asking.</b> Hold it up: keep, donate, sell or trash?" },
        { t: "Empty, clean, then put back", d: "Take everything out, sweep or wipe, then put things back in groups with labels." },
        { t: "Offer to sell or donate the rest", d: "List sellable items for them (for a cut) and drop donations off." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Paid when done", d: "Cash or <b>Interac e-Transfer</b>. Take after photos for your ads." },
        TRACK,
      ] },
    ],
    pricing: [["Closet", "One closet or pantry", "$40–$75"], ["Garage", "3-hour package", "$75–$120"], ["Hourly", "Bigger spaces", "$20–$30/hr"]],
    pricenote: "Selling their leftovers for them is a great extra: 20–30% of the sale.",
    mistakes: [
      "<b>Throwing things out without asking.</b> Always let them decide.",
      "<b>Buying fancy bins first.</b> Organize with what they have.",
      "<b>Making it worse before it's better without warning.</b> Tell them it gets messy mid-way.",
      "<b>No before photos.</b> You lose your best ad.",
    ],
  },

  ugc: {
    phases: [
      { when: "Right now", sub: "Make samples", steps: [
        { t: "Film 3 sample videos", min: "1–2 hrs",
          d: "Use products you already own. Each 15–30 seconds: <b>hook (first 2 seconds), show it in use, one honest reason you like it</b>. Natural light, clear audio.",
          go: [["CapCut", "https://www.capcut.com"]] },
        { t: "Make a simple portfolio page", min: "30 min",
          d: "A Canva website or Carrd page with your 3 videos, what you make and how to contact you.",
          go: [CANVA, ["Carrd", "https://carrd.co"]] },
      ] },
      { when: "Today", sub: "Pitch 10 brands", steps: [
        { t: "Find small brands", min: "20 min",
          d: "Small and growing brands on Instagram and TikTok that already post creator videos. Find their <b>business email</b> on their site." },
        { t: "Send a short pitch", min: "30 min",
          script: "Hi [brand] team! I'm [name], a UGC creator. I love your [product] and made a sample of the kind of video I'd make for you: [link]\n\nI create short videos you can use on your page and in ads. Packages start at $[price] for 3 videos. Would you like to work together?" },
      ] },
      { when: "This week", sub: "First deal", steps: [
        { t: "Agree on usage rights", d: "Organic posting only, or ads too? <b>Ads usage should cost more.</b> Put it in writing." },
        { t: "Deliver raw and edited", d: "Send the edited video plus raw clips in a shared folder." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Invoice per package", d: "Half upfront for new brands. PayPal or <b>Interac e-Transfer</b>.", go: [WAVE] },
        TRACK,
      ] },
    ],
    pricing: [["Single video", "Organic use", "$50–$150"], ["3-video pack", "Organic use", "$150–$350"], ["Ads usage", "Paid ads rights", "+30–50%"]],
    pricenote: "Your first deals might pay in product. Ask for cash once you have 3 brand samples.",
    mistakes: [
      "<b>No hook.</b> The first 2 seconds decide everything.",
      "<b>Giving away ad rights for free.</b> Charge extra for ads.",
      "<b>Fake reviews.</b> Only say what's true about the product.",
      "<b>Long, wordy pitches.</b> Lead with the sample video.",
    ],
  },

  resumes: {
    phases: [
      { when: "Right now", sub: "Build your sample", steps: [
        { t: "Redo your own resume", min: "45 min",
          d: "One page, clean layout, <b>results not duties</b> (\"Served 80+ customers a shift\" beats \"Worked cash\"). Use a simple Google Docs or Canva template.",
          go: [["Google Docs", "https://docs.google.com"], CANVA] },
        { t: "Fix 2 friends' resumes free", min: "1 hr", d: "Ask for a short testimonial and permission to show a blurred before/after." },
      ] },
      { when: "Today", sub: "Get clients", steps: [
        { t: "Post your offer", min: "15 min",
          d: "Post in student, newcomer and job-hunting groups.",
          script: "Resume glow-up 📄 I'll rewrite your resume into a clean one-page version that shows your results, in 48 hours, for $[price]. Cover letter add-on $[price]. Before/after in the comments!" },
      ] },
      { when: "This week", sub: "Deliver", steps: [
        { t: "Ask 5 questions first",
          d: "<b>What job are you applying for? Your top 3 achievements? Numbers you're proud of? Skills? Anything to hide or explain?</b>" },
        { t: "Deliver as Google Doc and PDF", d: "They can edit the Doc later; send the PDF for applying." },
      ] },
      { when: "Get paid", sub: "Money in", steps: [
        { t: "Paid upfront", d: "<b>Interac e-Transfer</b> or PayPal before you start." },
        TRACK,
      ] },
    ],
    pricing: [["Resume fix", "Cleanup + layout", "$15–$40"], ["Rewrite", "Full rewrite for one job type", "$40–$75"], ["Add cover letter", "Tailored letter", "+$20–$30"]],
    pricenote: "Students and newcomers are your best market. Keep prices friendly.",
    mistakes: [
      "<b>Making things up.</b> Never add fake jobs, titles or schools.",
      "<b>Fancy designs.</b> Many companies read resumes with software. Simple layouts work best.",
      "<b>Two-page resumes for students.</b> One page.",
      "<b>Skipping the questions.</b> A generic rewrite isn't worth paying for.",
    ],
  },
};
