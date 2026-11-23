import "server-only";
// Idea catalogue. Server-only so the plans are only sent to people who land on them.
// time: 1 = under 30 min, 2 = 1–2 hrs, 3 = all day. budget: 0 = free, 20 = up to $20.

export type Where = "home" | "out" | "online";
export type Level = "Easy" | "Medium";

export interface Idea {
  id: string;
  name: string;
  how: string;
  real: string;
  time: 1 | 2 | 3;
  budget: 0 | 20;
  where: Where;
  earn: string;
  cost: string;
  diff: Level;
  steps: string[];
  tools: string[];
}

export interface GuideStep {
  t: string;
  min?: string;
  /** Trusted HTML (only <b>) written by us. */
  d: string;
  go?: [string, string][];
  script?: string;
}

export interface Guide {
  phases: { when: string; sub: string; steps: GuideStep[] }[];
  pricing: [string, string, string][];
  pricenote: string;
  /** Trusted HTML (only <b>) written by us. */
  mistakes: string[];
}

export const IDEAS: Idea[] = [
  {
    "id": "snow",
    "name": "Shovel driveways after a snowfall",
    "how": "Neighbours pay you per driveway, usually $20 to $40 each, in cash or e-transfer.",
    "real": "Only works after it snows, and plenty of people say no. Ten doors usually gets you two or three yeses.",
    "time": 2,
    "budget": 0,
    "where": "out",
    "earn": "$40–$120",
    "cost": "$0",
    "diff": "Easy",
    "steps": [
      "Pick a morning right after snow",
      "Knock on 10 doors with a one-line offer",
      "Snap a before/after of each driveway",
      "Leave your number for the next storm"
    ],
    "tools": [
      "Your shovel",
      "Phone camera"
    ]
  },
  {
    "id": "declutter",
    "name": "Sell 5 things you don't use",
    "how": "Buyers pay you when they pick up from your marketplace listing.",
    "real": "Stuff sells for less than you think. Price low and it goes today; price high and it sits for weeks.",
    "time": 1,
    "budget": 0,
    "where": "home",
    "earn": "$30–$200",
    "cost": "$0",
    "diff": "Easy",
    "steps": [
      "Grab 5 things you haven't touched in 6 months",
      "Photograph each by a window",
      "Price 10–20% under similar listings",
      "Reply fast; first replies usually buy"
    ],
    "tools": [
      "Facebook Marketplace",
      "Kijiji"
    ]
  },
  {
    "id": "edits",
    "name": "Edit TikToks for a local business",
    "how": "Shops pay you a monthly fee for a set number of edited videos.",
    "real": "Most shops won't answer. Expect to pitch 5 to 10 before one says yes.",
    "time": 2,
    "budget": 0,
    "where": "online",
    "earn": "$50–$200/mo",
    "cost": "$0",
    "diff": "Medium",
    "steps": [
      "Pick a shop with weak videos",
      "Re-edit one of their clips with captions and a hook",
      "DM it to them as a free sample",
      "Offer 4 edits a month for a flat price"
    ],
    "tools": [
      "CapCut",
      "Instagram DMs"
    ]
  },
  {
    "id": "carclean",
    "name": "Clean car interiors",
    "how": "Car owners pay about $25 per car, on the spot.",
    "real": "You spend about $15 on supplies first. Weather and no-shows are the real risk.",
    "time": 3,
    "budget": 20,
    "where": "out",
    "earn": "$50–$150",
    "cost": "~$15",
    "diff": "Easy",
    "steps": [
      "Buy wipes and microfibre cloths",
      "Post \"$25 interior clean, I come to you\" in a local group",
      "Book 3 slots",
      "Film a before/after of each car"
    ],
    "tools": [
      "Neighbourhood groups",
      "Home vacuum"
    ]
  },
  {
    "id": "tutor",
    "name": "Tutor a subject you're good at",
    "how": "Parents pay you per one-hour session.",
    "real": "Finding the first student is the hard part. After that, parents refer each other.",
    "time": 1,
    "budget": 0,
    "where": "online",
    "earn": "$20–$40/hr",
    "cost": "$0",
    "diff": "Medium",
    "steps": [
      "Pick your strongest subject",
      "Make a simple flyer with your price",
      "Post in 2 local parent groups",
      "Book the next session before you hang up"
    ],
    "tools": [
      "Google Meet",
      "Canva"
    ]
  },
  {
    "id": "templates",
    "name": "Sell Canva templates",
    "how": "Buyers pay per download on Etsy or Gumroad, and you keep what's left after fees.",
    "real": "Most new listings make $0 in week one. This builds slowly over months.",
    "time": 3,
    "budget": 0,
    "where": "online",
    "earn": "$0–$50 first month",
    "cost": "Small listing fees",
    "diff": "Medium",
    "steps": [
      "Find a best-selling niche (planners, menus, story covers)",
      "Design 3 templates in one style",
      "List them with clear titles",
      "Post a 15-second preview video"
    ],
    "tools": [
      "Canva",
      "Etsy or Gumroad"
    ]
  },
  {
    "id": "dogs",
    "name": "Walk dogs in your area",
    "how": "Owners pay you per walk, often $15 to $25 for 30 minutes.",
    "real": "People won't hand their dog to a stranger right away. Start with neighbours who know you.",
    "time": 2,
    "budget": 0,
    "where": "out",
    "earn": "$20–$60",
    "cost": "$0",
    "diff": "Easy",
    "steps": [
      "Post in your building or street group",
      "Offer a 30-minute walk at a flat price",
      "Meet the owner and dog first",
      "Offer a weekly slot"
    ],
    "tools": [
      "Rover",
      "Neighbourhood groups"
    ]
  },
  {
    "id": "flip",
    "name": "Flip something listed for free",
    "how": "You pick up a free item, clean it up and sell it for more.",
    "real": "Some free stuff is free for a reason. Check it works before you haul it home.",
    "time": 3,
    "budget": 20,
    "where": "out",
    "earn": "$20–$150",
    "cost": "$0–$20",
    "diff": "Medium",
    "steps": [
      "Search the free section near you",
      "Pick something easy to clean or fix",
      "Clean it and take good photos",
      "List it with a before photo"
    ],
    "tools": [
      "Facebook Marketplace",
      "Soap and a cloth"
    ]
  },
  {
    "id": "yard",
    "name": "Do yard cleanups",
    "how": "Homeowners pay per yard to rake, bag and tidy before winter or spring.",
    "real": "It's real work and weather-dependent. Quote per yard so a slow job doesn't kill your rate.",
    "time": 3,
    "budget": 0,
    "where": "out",
    "earn": "$40–$120",
    "cost": "$0",
    "diff": "Easy",
    "steps": [
      "Walk your street and spot messy yards",
      "Offer a flat price per yard",
      "Bring bags and gloves",
      "Ask for a review and the next job"
    ],
    "tools": [
      "Rake",
      "Lawn bags"
    ]
  },
  {
    "id": "babysit",
    "name": "Babysit for families you know",
    "how": "Parents pay you by the hour, usually cash at the end of the night.",
    "real": "Parents hire people they trust. Start with family friends and get a reference.",
    "time": 3,
    "budget": 0,
    "where": "out",
    "earn": "$15–$25/hr",
    "cost": "$0",
    "diff": "Easy",
    "steps": [
      "Tell 5 parents you know you're available",
      "Share your free evenings",
      "Get a first-aid basics refresher",
      "Ask happy parents to pass your name on"
    ],
    "tools": [
      "Family group chats",
      "Free first-aid videos"
    ]
  },
  {
    "id": "errands",
    "name": "Run errands for seniors",
    "how": "Older neighbours pay per trip or per hour for groceries, pharmacy runs and returns.",
    "real": "Trust is everything. A note from someone they know helps a lot.",
    "time": 2,
    "budget": 0,
    "where": "out",
    "earn": "$15–$40",
    "cost": "$0",
    "diff": "Easy",
    "steps": [
      "Make a simple flyer with your name and number",
      "Drop it at 20 doors or a seniors' building",
      "Set a flat price per trip",
      "Text a receipt photo after every errand"
    ],
    "tools": [
      "Printed flyer",
      "Phone"
    ]
  },
  {
    "id": "moving",
    "name": "Help people move",
    "how": "People moving pay you hourly to carry boxes and furniture.",
    "real": "Heavy, and jobs are mostly weekends and month-end. Bring a friend for bigger jobs.",
    "time": 3,
    "budget": 0,
    "where": "out",
    "earn": "$20–$30/hr",
    "cost": "$0",
    "diff": "Easy",
    "steps": [
      "Post \"Moving help, $25/hr\" in local groups",
      "Aim for the last weekend of the month",
      "Bring gloves and a dolly if you can",
      "Ask for a tip and a review"
    ],
    "tools": [
      "Local groups",
      "Kijiji gigs"
    ]
  },
  {
    "id": "thrift",
    "name": "Thrift and resell clothes",
    "how": "You buy cheap at thrift stores and sell for more on resale apps.",
    "real": "Most of what you find won't sell high. Learn brands first and buy only what you know.",
    "time": 3,
    "budget": 20,
    "where": "out",
    "earn": "$20–$100",
    "cost": "$10–$20",
    "diff": "Medium",
    "steps": [
      "Look up 5 brands that resell well",
      "Spend $20 max at one thrift store",
      "Photograph each piece on a hanger in daylight",
      "List on 2 apps at once"
    ],
    "tools": [
      "Depop",
      "Vinted"
    ]
  },
  {
    "id": "sneakers",
    "name": "Clean sneakers for people",
    "how": "People pay $15 to $30 a pair to get dirty sneakers looking new.",
    "real": "You need a good before/after to get trust. Practise on your own pairs first.",
    "time": 2,
    "budget": 20,
    "where": "home",
    "earn": "$30–$90",
    "cost": "~$15",
    "diff": "Easy",
    "steps": [
      "Buy a sneaker cleaning kit",
      "Clean your own pair and film the before/after",
      "Post it with your price",
      "Offer pickup and drop-off at school or nearby"
    ],
    "tools": [
      "Sneaker cleaning kit",
      "TikTok"
    ]
  },
  {
    "id": "photos",
    "name": "Shoot photos for small businesses",
    "how": "Cafés and shops pay per shoot for menu, product or social photos.",
    "real": "Your phone is enough to start, but you'll need a few great samples before anyone pays.",
    "time": 3,
    "budget": 0,
    "where": "out",
    "earn": "$50–$150 per shoot",
    "cost": "$0",
    "diff": "Medium",
    "steps": [
      "Shoot 10 great photos of one local product for free",
      "Show them to the owner",
      "Offer a monthly photo pack",
      "Ask to be tagged when they post"
    ],
    "tools": [
      "Phone camera",
      "Lightroom mobile (free)"
    ]
  },
  {
    "id": "logos",
    "name": "Design logos on Fiverr",
    "how": "Buyers pay per gig and Fiverr takes a cut.",
    "real": "The first few gigs are cheap to get reviews. Prices go up once you have them.",
    "time": 3,
    "budget": 0,
    "where": "online",
    "earn": "$10–$50 per gig",
    "cost": "$0",
    "diff": "Medium",
    "steps": [
      "Make 3 sample logos for made-up brands",
      "Create a gig with clear packages",
      "Price your first gig low for reviews",
      "Deliver early and ask for a review"
    ],
    "tools": [
      "Canva or Figma",
      "Fiverr"
    ]
  },
  {
    "id": "va",
    "name": "Be a virtual assistant for a creator",
    "how": "Creators pay hourly or monthly for inbox, scheduling and comment help.",
    "real": "Creators need to trust you with their accounts. Start small and be reliable.",
    "time": 2,
    "budget": 0,
    "where": "online",
    "earn": "$15–$25/hr",
    "cost": "$0",
    "diff": "Medium",
    "steps": [
      "List 5 tasks you can do (DMs, scheduling, research)",
      "DM 10 small creators with a specific offer",
      "Offer a paid one-week trial",
      "Send a short end-of-week report"
    ],
    "tools": [
      "Notion",
      "Google Calendar"
    ]
  },
  {
    "id": "captions",
    "name": "Write social posts for a business",
    "how": "Businesses pay a monthly fee for a set of posts and captions.",
    "real": "Owners care about results. Show a sample post written for them, not a general pitch.",
    "time": 1,
    "budget": 0,
    "where": "online",
    "earn": "$100–$300/mo",
    "cost": "$0",
    "diff": "Medium",
    "steps": [
      "Pick a business with a dead Instagram",
      "Write 3 sample posts for them",
      "DM or email them the samples",
      "Offer 12 posts a month for a flat fee"
    ],
    "tools": [
      "Canva",
      "ChatGPT for drafts"
    ]
  },
  {
    "id": "bake",
    "name": "Bake and sell treats",
    "how": "Friends, coworkers or classmates pay per box of cookies or brownies.",
    "real": "Check your local rules on selling home food. Start with people you know.",
    "time": 3,
    "budget": 20,
    "where": "home",
    "earn": "$30–$100",
    "cost": "~$20",
    "diff": "Medium",
    "steps": [
      "Pick one thing you bake well",
      "Bake a batch and price per box of 6",
      "Pre-sell in a group chat before baking more",
      "Deliver in one round"
    ],
    "tools": [
      "Group chats",
      "Instagram stories"
    ]
  },
  {
    "id": "techhelp",
    "name": "Help neighbours with tech",
    "how": "Neighbours pay per visit to set up phones, Wi-Fi, TVs and printers.",
    "real": "Patience matters more than skill. Older people will call you back if you're kind.",
    "time": 2,
    "budget": 0,
    "where": "out",
    "earn": "$20–$60",
    "cost": "$0",
    "diff": "Easy",
    "steps": [
      "Make a flyer: \"Phone, Wi-Fi or TV problems? $25 a visit\"",
      "Post it in a seniors' building or community board",
      "Write simple steps on paper for them",
      "Leave your number on their fridge"
    ],
    "tools": [
      "Printed flyer",
      "Phone"
    ]
  },
  {
    "id": "bikes",
    "name": "Tune up bikes",
    "how": "Riders pay per tune-up for brakes, gears and chains.",
    "real": "Learn on your own bike first using free videos. Don't take jobs you can't finish.",
    "time": 2,
    "budget": 20,
    "where": "home",
    "earn": "$20–$60",
    "cost": "~$15",
    "diff": "Medium",
    "steps": [
      "Watch tune-up videos and practise on your bike",
      "Buy a basic tool kit and chain lube",
      "Offer $20 tune-ups in local groups",
      "Take before/after photos"
    ],
    "tools": [
      "Free repair videos",
      "Basic bike tools"
    ]
  },
  {
    "id": "cans",
    "name": "Collect bottles and cans for deposits",
    "how": "Bottle depots pay you the deposit on every container you return.",
    "real": "It's small money per can. Partner with a building or a party host for volume.",
    "time": 2,
    "budget": 0,
    "where": "out",
    "earn": "$10–$40",
    "cost": "$0",
    "diff": "Easy",
    "steps": [
      "Ask a neighbour, building or bar to save empties for you",
      "Pick up in bags",
      "Sort by type before the depot",
      "Set up a weekly pickup"
    ],
    "tools": [
      "Garbage bags",
      "Local bottle depot"
    ]
  },
  {
    "id": "windows",
    "name": "Wash windows",
    "how": "Homeowners pay per house to clean inside and outside ground-floor windows.",
    "real": "Ground floor only unless you have proper gear. Bad weather cancels jobs.",
    "time": 3,
    "budget": 20,
    "where": "out",
    "earn": "$40–$120",
    "cost": "~$20",
    "diff": "Easy",
    "steps": [
      "Buy a squeegee and a bucket",
      "Clean your own windows and photograph them",
      "Offer a flat price per house",
      "Book neighbouring houses on the same day"
    ],
    "tools": [
      "Squeegee",
      "Bucket"
    ]
  },
  {
    "id": "plants",
    "name": "House-sit for people on vacation",
    "how": "People pay per day for watering plants, getting mail and checking the house.",
    "real": "It's quiet money that depends on trust. Start with people who already know you.",
    "time": 1,
    "budget": 0,
    "where": "out",
    "earn": "$10–$25/day",
    "cost": "$0",
    "diff": "Easy",
    "steps": [
      "Tell neighbours you're available for vacations",
      "Offer a daily rate",
      "Text a photo every visit",
      "Leave a note when they're back"
    ],
    "tools": [
      "Group chats",
      "Phone"
    ]
  },
  {
    "id": "usertest",
    "name": "Do paid website tests",
    "how": "Testing sites pay per test for recording yourself using a website or app.",
    "real": "You'll fail a lot of screener questions. Tests come in waves, so it's side money.",
    "time": 1,
    "budget": 0,
    "where": "online",
    "earn": "$10–$30",
    "cost": "$0",
    "diff": "Easy",
    "steps": [
      "Sign up on 2 testing sites",
      "Fill in your profile honestly",
      "Do the practice test",
      "Check for new tests a few times a day"
    ],
    "tools": [
      "UserTesting",
      "Other testing sites"
    ]
  },
  {
    "id": "transcribe",
    "name": "Transcribe audio",
    "how": "Transcription sites and podcasters pay per minute of audio typed.",
    "real": "Pay per hour starts low until you get fast. Good for quiet evenings.",
    "time": 2,
    "budget": 0,
    "where": "online",
    "earn": "$5–$15/hr to start",
    "cost": "$0",
    "diff": "Easy",
    "steps": [
      "Take the entry test on a transcription site",
      "Practise with free audio",
      "Start with short files",
      "Offer podcasters a per-episode rate later"
    ],
    "tools": [
      "Rev or similar sites",
      "Headphones"
    ]
  },
  {
    "id": "commissions",
    "name": "Draw custom pet portraits",
    "how": "Pet owners pay per drawing, digital or on paper.",
    "real": "You need 3 strong samples first. Draw your friends' pets for free to get them.",
    "time": 3,
    "budget": 0,
    "where": "online",
    "earn": "$15–$50 per piece",
    "cost": "$0",
    "diff": "Medium",
    "steps": [
      "Draw 3 pets for friends for free",
      "Post them with a price",
      "Take orders through DMs",
      "Deliver a high-res file or mail the print"
    ],
    "tools": [
      "Procreate or paper",
      "Instagram"
    ]
  },
  {
    "id": "organize",
    "name": "Organize garages and closets",
    "how": "Homeowners pay hourly to sort, clear and organize messy spaces.",
    "real": "It's physical and people get attached to stuff. Let them decide what goes.",
    "time": 3,
    "budget": 0,
    "where": "out",
    "earn": "$20–$30/hr",
    "cost": "$0",
    "diff": "Easy",
    "steps": [
      "Post before/after photos of your own closet",
      "Offer a 3-hour garage package",
      "Bring bags and labels",
      "Offer to sell or donate what they don't keep"
    ],
    "tools": [
      "Labels",
      "Garbage bags"
    ]
  },
  {
    "id": "ugc",
    "name": "Make UGC videos for brands",
    "how": "Brands pay per short video of you showing their product.",
    "real": "Your first deals may pay in free product. Cash comes once you have samples.",
    "time": 3,
    "budget": 0,
    "where": "home",
    "earn": "$0–$150 per video",
    "cost": "$0",
    "diff": "Medium",
    "steps": [
      "Film 3 sample videos with products you own",
      "Make a simple portfolio page",
      "Pitch 10 small brands by email or DM",
      "Ask for paid usage once they like your work"
    ],
    "tools": [
      "CapCut",
      "Canva portfolio"
    ]
  },
  {
    "id": "resumes",
    "name": "Fix resumes for people",
    "how": "Job seekers pay per resume for cleanup and a better layout.",
    "real": "You need to be good with words. Do 2 free ones first to get testimonials.",
    "time": 1,
    "budget": 0,
    "where": "online",
    "earn": "$15–$40 per resume",
    "cost": "$0",
    "diff": "Medium",
    "steps": [
      "Redo your own resume as a sample",
      "Fix 2 friends' resumes for free",
      "Post a before/after with your price",
      "Deliver within 48 hours"
    ],
    "tools": [
      "Google Docs",
      "Canva resume templates"
    ]
  }
];

/** Ideas with a full step-by-step plan. The rest get their short plan until they are written up. */
export const GUIDES: Record<string, Guide> = {
  "edits": {
    "phases": [
      {
        "when": "Right now",
        "sub": "First 25 minutes",
        "steps": [
          {
            "t": "Find 10 shops with weak videos",
            "min": "15 min",
            "d": "Search <b>café, barber, nail salon, gym, bakery</b> near you on Google Maps. Open each one's Instagram or TikTok. Shortlist shops that post, but whose videos have <b>no captions, a slow start, or under 500 views</b>. Those are the easiest yeses.",
            "go": [
              [
                "Google Maps",
                "https://www.google.com/maps"
              ],
              [
                "TikTok",
                "https://www.tiktok.com"
              ],
              [
                "Instagram",
                "https://www.instagram.com"
              ]
            ]
          },
          {
            "t": "Set up your free tools",
            "min": "10 min",
            "d": "Download <b>CapCut</b> on your phone for editing. Make a free <b>Canva</b> account for cover images and text.",
            "go": [
              [
                "CapCut",
                "https://www.capcut.com"
              ],
              [
                "Canva",
                "https://www.canva.com"
              ]
            ]
          }
        ]
      },
      {
        "when": "Today",
        "sub": "Your first sample",
        "steps": [
          {
            "t": "Make one free sample for your #1 shop",
            "min": "40 min",
            "d": "Screen-record one of their videos, or film 15 seconds outside the shop. In CapCut: put a <b>hook in the first 2 seconds</b> (\"The best croissant in [city]?\"), add <b>auto captions</b> (Text → Auto captions), cut it to <b>under 20 seconds</b>, and add a sound. Business accounts can only use sounds from TikTok's commercial library, so check there.",
            "go": [
              [
                "CapCut",
                "https://www.capcut.com"
              ],
              [
                "TikTok Creative Center (sounds)",
                "https://ads.tiktok.com/business/creativecenter"
              ]
            ]
          },
          {
            "t": "Make a one-page portfolio",
            "min": "20 min",
            "d": "On <b>Carrd</b> (free), make one page with your name, your sample before/after, your price and how to reach you. Put the link in your bio.",
            "go": [
              [
                "Carrd",
                "https://carrd.co"
              ]
            ]
          },
          {
            "t": "DM your top 5 shops",
            "min": "15 min",
            "d": "Send the sample <b>to the shop it's about</b>. Mention one specific thing you like about them. Don't copy-paste the same message to everyone.",
            "go": [
              [
                "Instagram DMs",
                "https://www.instagram.com/direct/inbox/"
              ],
              [
                "TikTok",
                "https://www.tiktok.com"
              ]
            ],
            "script": "Hey [name]! Love your [specific thing]. I made a quick edit of one of your videos to show what it could look like with captions and a stronger hook. It's yours to post, no strings: [link]\n\nI edit short videos for local businesses: 4 videos a month for $120. Want me to do next week's?"
          },
          {
            "t": "Walk into 2 of them",
            "min": "30 min",
            "d": "Show the sample on your phone and ask for the owner or manager. Local shops say yes in person much more than over DMs."
          }
        ]
      },
      {
        "when": "This week",
        "sub": "Land your first client",
        "steps": [
          {
            "t": "Follow up after 48 hours",
            "d": "Most yeses come from the follow-up, not the first message.",
            "script": "Hey! Just checking you saw the edit I sent. Happy to make one more in a different style if you want to compare."
          },
          {
            "t": "Agree on the deal in writing",
            "d": "Write down 4 things in a simple doc and send it: <b>how many videos</b>, <b>who films</b> (they send raw clips, or you visit), <b>turnaround</b> (48 hours is good) and <b>price</b>.",
            "go": [
              [
                "Google Docs",
                "https://docs.google.com"
              ]
            ]
          },
          {
            "t": "Book filming or clip drop-offs",
            "d": "Use a free booking link so they pick a time, or a shared folder where they drop raw clips.",
            "go": [
              [
                "Calendly",
                "https://calendly.com"
              ],
              [
                "Google Drive",
                "https://drive.google.com"
              ]
            ]
          }
        ]
      },
      {
        "when": "Get paid",
        "sub": "Money in",
        "steps": [
          {
            "t": "Send an invoice, first month upfront",
            "d": "<b>Wave</b> makes free invoices. Get paid by <b>Interac e-Transfer</b> through your bank, or <b>PayPal</b>. Ask for the first month before you start.",
            "go": [
              [
                "Wave (free invoices)",
                "https://www.waveapps.com"
              ],
              [
                "PayPal",
                "https://www.paypal.com"
              ]
            ]
          },
          {
            "t": "Track every dollar",
            "d": "Keep a simple sheet: client, amount, date. If this turns into regular income, you'll need to report it at tax time.",
            "go": [
              [
                "Google Sheets",
                "https://sheets.google.com"
              ]
            ]
          }
        ]
      }
    ],
    "pricing": [
      [
        "One-off",
        "1 edited video with captions",
        "$20–$40"
      ],
      [
        "Starter",
        "4 edits a month",
        "$80–$120/mo"
      ],
      [
        "Growth",
        "8 edits + you post them",
        "$200–$300/mo"
      ]
    ],
    "pricenote": "Beginner prices. Raise them after 3 happy clients and real view numbers you can show.",
    "mistakes": [
      "<b>Pitching without a sample.</b> \"I can edit videos\" gets ignored. A finished video for their shop gets answered.",
      "<b>Copy-paste DMs.</b> Owners can tell. Mention something real about their place.",
      "<b>Working free forever.</b> One free sample, then it's paid.",
      "<b>Promising views or followers.</b> Promise better videos and regular posting, not results you can't control.",
      "<b>Using music they can't use.</b> Stick to the commercial sound library for business accounts."
    ]
  }
};
