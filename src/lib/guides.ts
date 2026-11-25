import "server-only";
import type { Guide, GuideStep } from "@/lib/ideas";

// Full step-by-step plans, one per idea id. Every plan works fully online, from any country.
// Same shape as the original "Edit TikToks" template: phases of steps (with time, sites and
// copy-paste scripts), what to charge, and mistakes to avoid. Text in `d` and `mistakes` may use <b> only.

type Link = [string, string];
const L = {
  maps: ["Google Maps", "https://www.google.com/maps"] as Link,
  canva: ["Canva", "https://www.canva.com"] as Link,
  capcut: ["CapCut", "https://www.capcut.com"] as Link,
  carrd: ["Carrd", "https://carrd.co"] as Link,
  docs: ["Google Docs", "https://docs.google.com"] as Link,
  sheets: ["Google Sheets", "https://sheets.google.com"] as Link,
  drive: ["Google Drive", "https://drive.google.com"] as Link,
  ig: ["Instagram", "https://www.instagram.com"] as Link,
  tiktok: ["TikTok", "https://www.tiktok.com"] as Link,
  youtube: ["YouTube", "https://www.youtube.com"] as Link,
  fiverr: ["Fiverr", "https://www.fiverr.com"] as Link,
  upwork: ["Upwork", "https://www.upwork.com"] as Link,
  paypal: ["PayPal", "https://www.paypal.com"] as Link,
  wave: ["Wave (free invoices)", "https://www.waveapps.com"] as Link,
  etsy: ["Etsy", "https://www.etsy.com"] as Link,
  audacity: ["Audacity (free)", "https://www.audacityteam.org"] as Link,
  calendly: ["Calendly", "https://calendly.com"] as Link,
  meet: ["Google Meet", "https://meet.google.com"] as Link,
  pinterest: ["Pinterest", "https://www.pinterest.com"] as Link,
};

/** The two steps every plan ends with. */
function getPaid(how: string): GuideStep[] {
  return [
    { t: "Get paid", d: how, go: [L.paypal, L.wave] },
    {
      t: "Track every dollar",
      d: "Keep a simple sheet: date, client, amount, platform fees. If this turns into regular income, you'll likely need to report it at tax time wherever you live.",
      go: [L.sheets],
    },
  ];
}
const INVOICE = "Send an invoice through <b>PayPal</b> (or Wave) and ask for <b>the first month or half the job upfront</b>. If you're under 18, you may need a parent's help to set up payouts.";

export const GUIDES: Record<string, Guide> = {
  edits: {
    phases: [
      { when: "Right now", sub: "First 25 minutes", steps: [
        { t: "Find 10 businesses with weak videos", min: "15 min",
          d: "Search TikTok and Instagram for <b>cafés, barbers, nail salons, gyms, bakeries or online shops</b> anywhere. Shortlist ones that post, but whose videos have <b>no captions, a slow start, or under 500 views</b>. Those are the easiest yeses.",
          go: [L.tiktok, L.ig] },
        { t: "Set up your free tools", min: "10 min",
          d: "Download <b>CapCut</b> for editing. Make a free <b>Canva</b> account for cover images and text.", go: [L.capcut, L.canva] },
      ] },
      { when: "Today", sub: "Your first sample", steps: [
        { t: "Make one free sample for your #1 business", min: "40 min",
          d: "Download or screen-record one of their videos. In CapCut: put a <b>hook in the first 2 seconds</b> (\"The best croissant in town?\"), add <b>auto captions</b> (Text → Auto captions), cut it to <b>under 20 seconds</b>, and add a sound. Business accounts can only use sounds from TikTok's commercial library, so check there.",
          go: [L.capcut, ["TikTok Creative Center (sounds)", "https://ads.tiktok.com/business/creativecenter"]] },
        { t: "Make a one-page portfolio", min: "20 min",
          d: "On <b>Carrd</b> (free), make one page with your name, your before/after sample, your price and how to reach you. Put the link in your bio.", go: [L.carrd] },
        { t: "DM your top 5", min: "15 min",
          d: "Send the sample <b>to the business it's about</b>. Mention one specific thing you like about them. Don't copy-paste the same message to everyone.",
          go: [["Instagram DMs", "https://www.instagram.com/direct/inbox/"], L.tiktok],
          script: "Hey [name]! Love your [specific thing]. I made a quick edit of one of your videos to show what it could look like with captions and a stronger hook. It's yours to post, no strings: [link]\n\nI edit short videos for small businesses: 4 videos a month for $120. Want me to do next week's?" },
        { t: "Email the ones that don't use DMs", min: "15 min",
          d: "Many owners check email more than DMs. Find the address on their website or Google listing and send the same sample." },
      ] },
      { when: "This week", sub: "Land your first client", steps: [
        { t: "Follow up after 48 hours", d: "Most yeses come from the follow-up, not the first message.",
          script: "Hey! Just checking you saw the edit I sent. Happy to make one more in a different style if you want to compare." },
        { t: "Agree on the deal in writing",
          d: "Write down 4 things and send them: <b>how many videos</b>, <b>how they send you raw clips</b>, <b>turnaround</b> (48 hours is good) and <b>price</b>.", go: [L.docs] },
        { t: "Set up a shared folder", d: "They drop raw clips into a shared folder; you drop finished edits back.", go: [L.drive] },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid(INVOICE) },
    ],
    pricing: [["One-off", "1 edited video with captions", "$20–$40"], ["Starter", "4 edits a month", "$80–$120/mo"], ["Growth", "8 edits + you post them", "$200–$300/mo"]],
    pricenote: "Beginner prices. Raise them after 3 happy clients and real view numbers you can show.",
    mistakes: [
      "<b>Pitching without a sample.</b> \"I can edit videos\" gets ignored. A finished video for their business gets answered.",
      "<b>Copy-paste DMs.</b> Owners can tell. Mention something real about them.",
      "<b>Working free forever.</b> One free sample, then it's paid.",
      "<b>Promising views or followers.</b> Promise better videos and regular posting, not results you can't control.",
      "<b>Using music they can't use.</b> Stick to the commercial sound library for business accounts.",
    ],
  },

  tutor: {
    phases: [
      { when: "Right now", sub: "Pick your lane", steps: [
        { t: "Pick one subject and grade range", min: "5 min",
          d: "Choose what you got your best marks in. \"<b>Grade 7–10 math</b>\" sells better than \"any subject\"." },
        { t: "Set your rate", min: "5 min", d: "Student tutors usually charge <b>$20–$40 an hour</b>. Start low and raise it after 3 students." },
        { t: "Make a tutor card", min: "20 min",
          d: "Use a Canva template: subject, grades, price, \"online by video call\", your first name and how to book.", go: [L.canva] },
      ] },
      { when: "Today", sub: "Find your first student", steps: [
        { t: "Post in online parent and student groups", min: "20 min",
          d: "Search Facebook and Reddit for homeschool, parent and study groups that allow tutor posts. Read the group rules first.",
          script: "Hi everyone! I'm [name], a [grade/program] student who [got 95% in math]. I tutor Grade [x–y] [subject] online over video call, $[rate]/hour. The first 20 minutes are free so your kid can see if it clicks. Message me!" },
        { t: "Tell people you already know", d: "Text family friends and old teachers. <b>Most first students come from someone who knows you.</b>" },
        { t: "Make a booking link", min: "10 min", d: "A free Calendly link lets parents pick a time without back-and-forth.", go: [L.calendly] },
      ] },
      { when: "This week", sub: "First session", steps: [
        { t: "Ask what's coming up", min: "5 min", d: "Before the session, ask for the <b>next test date and the unit</b>. Plan the hour around it." },
        { t: "Run a focused hour", min: "60 min",
          d: "10 min to find the gap, 40 min of practice problems while sharing a screen, 10 min recap. Send the parent <b>2 lines after</b> on what you covered.",
          go: [L.meet, ["Khan Academy (free practice)", "https://www.khanacademy.org"]] },
        { t: "Book the next session before you hang up", d: "\"Same time next week?\" is the most important sentence in tutoring." },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid("Get paid through <b>PayPal</b> before each session, or sell a 4-session bundle upfront.") },
    ],
    pricing: [["Single hour", "One-off help before a test", "$20–$40"], ["Weekly", "One hour every week", "$80–$150/mo"], ["Exam prep", "3 sessions before finals", "$60–$110"]],
    pricenote: "Small groups (2–3 students on one call) can be $15 each per hour: more for you, cheaper for them.",
    mistakes: [
      "<b>\"Any subject, any grade.\"</b> It sounds unsure. Pick a lane.",
      "<b>Lecturing the whole hour.</b> Students learn by doing problems while you watch.",
      "<b>Not updating the parent.</b> Parents pay. Two lines after each session keeps them paying.",
      "<b>Doing their homework for them.</b> Teachers notice, and parents stop booking.",
    ],
  },

  templates: {
    phases: [
      { when: "Right now", sub: "Find a niche that sells", steps: [
        { t: "Research what's already selling", min: "20 min",
          d: "On Etsy, search <b>\"Canva template instagram\", \"wedding menu template\", \"budget planner\"</b>. Open the best-sellers and look at review counts. Lots of reviews = people buy this.", go: [L.etsy] },
        { t: "Pick one narrow niche", min: "5 min", d: "Narrow wins: \"<b>Instagram story templates for nail techs</b>\" beats \"social media templates\"." },
      ] },
      { when: "Today", sub: "Make your first set", steps: [
        { t: "Design 3 templates in one style", min: "2 hrs",
          d: "Make 3 matching templates with <b>the same fonts and colours</b>. Use only free elements or ones you're allowed to resell, and don't copy someone else's design.", go: [L.canva] },
        { t: "Make the template link", min: "10 min",
          d: "In Canva: <b>Share → More → Template link</b>. Buyers get a copy they can edit. Put the link in a simple PDF that says \"Click here to open your template\"." },
        { t: "Make 3 listing images", min: "30 min", d: "Show the templates on a phone mockup, what's included, and one being edited. These images do the selling." },
      ] },
      { when: "This week", sub: "List and promote", steps: [
        { t: "List it", min: "30 min",
          d: "Etsy charges a small listing fee per item; Gumroad is free to list and takes a cut when you sell. Use a title with the words buyers type: \"Nail Tech Instagram Story Templates, Editable in Canva\".",
          go: [["Etsy seller", "https://www.etsy.com/sell"], ["Gumroad", "https://gumroad.com"]] },
        { t: "Post a 15-second preview video", min: "20 min",
          d: "Screen-record yourself editing one template. Post it on TikTok and Pinterest with a link to the shop.", go: [L.pinterest, L.tiktok] },
        { t: "Add one new set a week", d: "Shops with more listings get found more. Same niche, new designs." },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid("Etsy and Gumroad pay out to your bank or PayPal on a schedule. Under 18? These sites need an adult to own the account.") },
    ],
    pricing: [["Single template", "One design", "$3–$6"], ["Set", "10–20 matching templates", "$10–$20"], ["Bundle", "Several sets together", "$20–$40"]],
    pricenote: "This is slow money. Expect your first sale in weeks, not days. It grows as you add listings.",
    mistakes: [
      "<b>Going too broad.</b> \"Instagram templates\" has thousands of shops. Pick a specific buyer.",
      "<b>Using elements you can't resell.</b> Check the licence, and never copy another seller.",
      "<b>Weak listing photos.</b> On Etsy, the first image is the whole ad.",
      "<b>Giving up after week one.</b> Most shops make $0 at first.",
    ],
  },

  logos: {
    phases: [
      { when: "Right now", sub: "Build samples", steps: [
        { t: "Make 3 sample logos", min: "2 hrs",
          d: "Invent 3 brands (a café, a gym, a clothing label). Design each with <b>a wordmark, an icon and one colour version</b>. Don't copy existing logos.", go: [L.canva, ["Figma", "https://www.figma.com"]] },
        { t: "Mock them up", min: "20 min", d: "Put each logo on a sign, a cup or a T-shirt mockup. It makes them look real." },
      ] },
      { when: "Today", sub: "Open your gig", steps: [
        { t: "Create a Fiverr gig", min: "45 min",
          d: "Fiverr requires you to be <b>18 or older</b>. Title example: \"I will design a modern minimalist logo for your small business\". Add your 3 mockups. Fiverr keeps 20% of every order.", go: [L.fiverr] },
        { t: "Set 3 packages", min: "10 min",
          d: "<b>Basic</b> (1 concept, PNG), <b>Standard</b> (2 concepts, PNG + SVG, 2 revisions), <b>Premium</b> (3 concepts, all files, social kit)." },
      ] },
      { when: "This week", sub: "First orders", steps: [
        { t: "Price low for your first 3 reviews", d: "Reviews get you ranked. Deliver <b>early</b> and over-deliver a little." },
        { t: "Ask good questions first",
          script: "Thanks for ordering! Quick questions so I get it right: 1) Your business name exactly as it should appear? 2) What do you sell and to who? 3) 2–3 logos you like (any brand)? 4) Colours you love or hate?" },
        { t: "Post your work", d: "Post each finished logo (with permission) on Instagram and Behance. Buyers find designers there too.",
          go: [L.ig, ["Behance", "https://www.behance.net"]] },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid("Fiverr releases money a couple of weeks after delivery. Withdraw to PayPal or your bank.") },
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
          d: "Use the business email in their bio when they have one. Make it about them.",
          script: "Hi [name]! I've watched your [series/videos] for a while. I noticed [specific thing: lots of unanswered comments / no posting schedule]. I'm a virtual assistant for creators: I handle comments, DMs, scheduling and brand outreach research. Can I do a paid 1-week trial for $[price] so you can see if it saves you time?" },
        { t: "Set up your tools", min: "15 min", d: "A simple Notion page to track tasks and a calendar for posting schedules.",
          go: [["Notion", "https://www.notion.so"], ["Google Calendar", "https://calendar.google.com"]] },
      ] },
      { when: "This week", sub: "Run the trial", steps: [
        { t: "Agree on access safely", d: "Ask them to add you as a <b>team member or manager</b> (Instagram, YouTube and TikTok all have roles). Never ask for their password." },
        { t: "Send a Friday report", d: "3 lines: <b>what you did, what you found, what's next</b>. This turns a trial into a monthly deal." },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid(INVOICE) },
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
        { t: "Find a business with a quiet Instagram", min: "15 min",
          d: "Search Instagram for gyms, salons, restaurants or online shops anywhere. Look for <b>no posts in 30+ days or posts with no caption</b>.", go: [L.ig] },
      ] },
      { when: "Today", sub: "Make the sample", steps: [
        { t: "Write 3 sample posts for them", min: "45 min",
          d: "Each one: <b>a hook line, 2–3 short lines of value, a call to action</b> (\"Book your trial class, link in bio\"). Use AI for a first draft if you like, then rewrite it in their voice.", go: [L.docs] },
        { t: "Design them in Canva", min: "30 min", d: "Use their colours and logo. Put the 3 posts in one PDF.", go: [L.canva] },
        { t: "Send it", min: "10 min",
          script: "Hi [name]! I love [something real about the business]. I noticed your Instagram has been quiet, so I made 3 ready-to-post ideas for you, free to use: [link]\n\nI write and design posts for small businesses: 12 posts a month for $[price]. Want me to plan next month?" },
      ] },
      { when: "This week", sub: "Close it", steps: [
        { t: "Follow up in 2 days", d: "A short, friendly nudge. Offer a quick video call to walk them through it." },
        { t: "Agree on a monthly plan", d: "<b>Number of posts, who posts them, approval process, price.</b> Send a content calendar each month for approval.", go: [L.sheets] },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid(INVOICE) },
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

  usertest: {
    phases: [
      { when: "Right now", sub: "Sign up", steps: [
        { t: "Join 2 testing sites", min: "20 min",
          d: "These pay you to try websites and apps and say what you think out loud, or to take part in research studies. Most need you to be <b>18+</b> and have a computer with a microphone. Availability varies by country.",
          go: [["UserTesting", "https://www.usertesting.com/get-paid-to-test"], ["Prolific (studies)", "https://www.prolific.com"]] },
        { t: "Fill in your profile honestly", min: "15 min", d: "Tests are matched to your profile. Honest answers get better matches. Lying gets you removed." },
      ] },
      { when: "Today", sub: "Pass the practice", steps: [
        { t: "Do the practice test", min: "20 min", d: "<b>Think out loud the whole time.</b> Say what you expect, what confuses you and why. That's what they pay for." },
        { t: "Set up a quiet spot", d: "Clear audio matters. A cheap headset with a mic helps." },
      ] },
      { when: "This week", sub: "Catch tests", steps: [
        { t: "Check a few times a day", d: "Tests go fast. Turn on notifications and grab them quickly." },
        { t: "Answer screeners honestly", d: "You'll fail many screeners. That's normal; keep going." },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid("Most testing sites pay to <b>PayPal</b> a few days to a couple of weeks after each test.") },
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
          d: "Most have an entry test on grammar and a short audio clip. Read their style guide first; that's what the test checks. Most require 18+.",
          go: [["Rev freelancers", "https://www.rev.com/freelancers"], ["TranscribeMe", "https://www.transcribeme.com"]] },
      ] },
      { when: "Today", sub: "Practise", steps: [
        { t: "Use good headphones", d: "Over-ear headphones make a huge difference with unclear audio." },
        { t: "Learn the shortcuts", d: "Pause, rewind 2 seconds, and slow playback. Most transcription tools have them." },
      ] },
      { when: "This week", sub: "Take jobs", steps: [
        { t: "Start with short, clear files", d: "Your pay rate goes up as you get faster. Pick clean audio first." },
        { t: "Later: pitch podcasters directly", d: "Small podcasts often want transcripts for show notes.",
          script: "Hi [name]! I love [episode]. I transcribe podcasts: a clean, readable transcript of each episode within 48 hours for $[price]. Great for show notes and search. Want me to do your latest one as a sample?" },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid("Sites usually pay weekly to <b>PayPal</b>. Direct clients pay by PayPal invoice.") },
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
          d: "Ask for a <b>clear, well-lit photo</b> of the pet. Pick one style (cartoon, realistic, line art) and keep it consistent. Free apps like Krita work fine.",
          go: [["Krita (free)", "https://krita.org"], ["Procreate", "https://procreate.com"]] },
        { t: "Export them nicely", min: "15 min", d: "Show the original photo next to your drawing." },
      ] },
      { when: "Today", sub: "Open orders", steps: [
        { t: "Post with a clear price", min: "15 min",
          d: "Instagram, TikTok (time-lapses of you drawing do well) and online pet communities that allow it.", go: [L.ig, L.tiktok],
          script: "Custom digital pet portraits are open! 🐶🐱 $[price] per pet, delivered as a high-res file you can print or post. Send me a clear photo of your pet and it's done in about 5 days. DM to order!" },
        { t: "Write your order steps", d: "What you need (photo, name, background colour), price, timeline, and how many changes are included." },
      ] },
      { when: "This week", sub: "Deliver", steps: [
        { t: "Send a sketch first", d: "Get a thumbs-up on the rough sketch before you finish. Saves redos." },
        { t: "Deliver high-res", d: "Send a full-size file (at least 3000 px wide) through Google Drive so they can print it.", go: [L.drive] },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid("Take <b>50% upfront</b> and 50% on delivery through PayPal.") },
    ],
    pricing: [["Simple", "One pet, plain background", "$15–$35"], ["Detailed", "Realistic or full background", "$35–$60"], ["Extra pet", "Same picture", "+$10–$20"]],
    pricenote: "Holidays and pet memorials are your busiest times. Post ahead of December.",
    mistakes: [
      "<b>No sample work.</b> Nobody buys art they can't see.",
      "<b>Bad reference photos.</b> Ask for a clearer one before starting.",
      "<b>Unlimited changes.</b> Include one or two, then charge.",
      "<b>Switching styles every piece.</b> Be known for one style.",
    ],
  },

  ugc: {
    phases: [
      { when: "Right now", sub: "Make samples", steps: [
        { t: "Film 3 sample videos", min: "1–2 hrs",
          d: "Use products you already own. Each 15–30 seconds: <b>hook (first 2 seconds), show it in use, one honest reason you like it</b>. Natural light, clear audio.", go: [L.capcut] },
        { t: "Make a simple portfolio page", min: "30 min", d: "A Carrd or Canva page with your 3 videos, what you make and how to contact you.", go: [L.carrd, L.canva] },
      ] },
      { when: "Today", sub: "Pitch 10 brands", steps: [
        { t: "Find small brands", min: "20 min", d: "Small and growing brands on Instagram and TikTok that already post creator videos. Find their <b>business email</b> on their site." },
        { t: "Send a short pitch", min: "30 min",
          script: "Hi [brand] team! I'm [name], a UGC creator. I love your [product] and made a sample of the kind of video I'd make for you: [link]\n\nI create short videos you can use on your page and in ads. Packages start at $[price] for 3 videos. Would you like to work together?" },
      ] },
      { when: "This week", sub: "First deal", steps: [
        { t: "Agree on usage rights", d: "Organic posting only, or ads too? <b>Ads usage should cost more.</b> Put it in writing." },
        { t: "Deliver raw and edited", d: "Send the edited video plus raw clips in a shared folder.", go: [L.drive] },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid(INVOICE) },
    ],
    pricing: [["Single video", "Organic use", "$50–$150"], ["3-video pack", "Organic use", "$150–$350"], ["Ads usage", "Paid ads rights", "+30–50%"]],
    pricenote: "Your first deals might pay in product. Ask for cash once you have 3 brand samples.",
    mistakes: [
      "<b>No hook.</b> The first 2 seconds decide everything.",
      "<b>Giving away ad rights for free.</b> Charge extra for ads.",
      "<b>Fake reviews.</b> Only say what's true, and follow ad-disclosure rules when you post for a brand.",
      "<b>Long, wordy pitches.</b> Lead with the sample video.",
    ],
  },

  resumes: {
    phases: [
      { when: "Right now", sub: "Build your sample", steps: [
        { t: "Redo your own resume", min: "45 min",
          d: "One page, clean layout, <b>results not duties</b> (\"Served 80+ customers a shift\" beats \"Worked cash\"). Use a simple Google Docs or Canva template.", go: [L.docs, L.canva] },
        { t: "Fix 2 friends' resumes free", min: "1 hr", d: "Ask for a short testimonial and permission to show a blurred before/after." },
      ] },
      { when: "Today", sub: "Get clients", steps: [
        { t: "Post your offer", min: "15 min",
          d: "Post in online student, career and job-hunting communities that allow it, and on your own socials.",
          script: "Resume glow-up 📄 I'll rewrite your resume into a clean one-page version that shows your results, in 48 hours, for $[price]. Cover letter add-on $[price]. Before/after below!" },
        { t: "Open a Fiverr gig too", d: "Fiverr is 18+. Same offer, same before/after.", go: [L.fiverr] },
      ] },
      { when: "This week", sub: "Deliver", steps: [
        { t: "Ask 5 questions first", d: "<b>What job are you applying for? Your top 3 achievements? Numbers you're proud of? Skills? Anything to explain?</b>" },
        { t: "Deliver as Google Doc and PDF", d: "They can edit the Doc later; send the PDF for applying." },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid("Get paid upfront through <b>PayPal</b> before you start.") },
    ],
    pricing: [["Resume fix", "Cleanup + layout", "$15–$40"], ["Rewrite", "Full rewrite for one job type", "$40–$75"], ["Add cover letter", "Tailored letter", "+$20–$30"]],
    pricenote: "Students and career changers are your best market. Keep prices friendly.",
    mistakes: [
      "<b>Making things up.</b> Never add fake jobs, titles or schools.",
      "<b>Fancy designs.</b> Many companies read resumes with software. Simple layouts work best.",
      "<b>Two-page resumes for students.</b> One page.",
      "<b>Skipping the questions.</b> A generic rewrite isn't worth paying for.",
    ],
  },

  declutter: {
    phases: [
      { when: "Right now", sub: "Pick and photograph", steps: [
        { t: "Grab 5 small things you don't use", min: "10 min",
          d: "Best for shipping: <b>video games, headphones, phone accessories, books, small electronics, brand-name clothes</b>. Light and unbreakable is easiest. Ask first if it isn't yours to sell." },
        { t: "Check what they really sell for", min: "10 min",
          d: "On eBay, search the item and turn on the <b>Sold items</b> filter. That's the real price, not what people are asking.",
          go: [["eBay", "https://www.ebay.com"], ["Mercari", "https://www.mercari.com"]] },
        { t: "Photograph in daylight", min: "15 min", d: "Clean it, then <b>4–6 photos</b> on a plain background: front, back, brand label, any damage." },
      ] },
      { when: "Today", sub: "List them", steps: [
        { t: "List all 5 with clear titles", min: "30 min",
          d: "Title = <b>brand + item + model + condition</b>. Weigh each item (a kitchen scale works) so the shipping cost is right. Under 18? You'll need a parent's account." },
        { t: "Answer questions fast", d: "Quick, honest answers turn watchers into buyers." },
      ] },
      { when: "This week", sub: "Ship and repeat", steps: [
        { t: "Ship within 2 days", d: "Print the label from the app, pack it well, and drop it off with the carrier. Fast shipping gets good reviews." },
        { t: "Drop the price on anything unsold after a week", d: "Lower it by 10–15% or send offers to watchers." },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid("The marketplace pays you after the buyer gets the item. Fees and shipping come off the top.") },
    ],
    pricing: [["Small items", "Accessories, books", "$5–$20 each"], ["Games and gear", "Video games, headphones", "$15–$80"], ["Electronics", "Consoles, phones", "$50–$300"]],
    pricenote: "Your profit is the sale price minus fees and shipping. Skip heavy, cheap items.",
    mistakes: [
      "<b>Guessing shipping.</b> Weigh it first or the postage eats your profit.",
      "<b>Hiding damage.</b> It means a return and a bad review.",
      "<b>Pricing at what you paid.</b> Use sold listings, not asking prices.",
      "<b>Deals off the platform.</b> Never accept payment outside the app. That's where scams happen.",
    ],
  },

  thumbnails: {
    phases: [
      { when: "Right now", sub: "Learn what works", steps: [
        { t: "Study 20 high-view thumbnails", min: "20 min",
          d: "Pick a niche (gaming, finance, vlogs). Note what wins: <b>a big face with emotion, 3 words max, high contrast, one clear subject</b>.", go: [L.youtube] },
        { t: "Pick your tool", min: "5 min", d: "Canva works. Photopea is a free Photoshop-style editor in your browser.", go: [L.canva, ["Photopea (free)", "https://www.photopea.com"]] },
      ] },
      { when: "Today", sub: "Build samples", steps: [
        { t: "Redesign 5 thumbnails from real small channels", min: "2 hrs", d: "Size: <b>1280 × 720</b>. Show the original next to yours. Keep it readable on a phone screen." },
        { t: "Post a before/after", min: "15 min", d: "Post on X, Instagram or TikTok where creators hang out." },
      ] },
      { when: "This week", sub: "Pitch", steps: [
        { t: "Pitch 10 small YouTubers", min: "45 min",
          d: "Channels with <b>1k–50k subscribers</b> that upload weekly. Use the email on their About page.",
          script: "Hey [name]! Loved [video]. I redesigned its thumbnail to show what a higher-click version could look like: [image link]. Free to use. I design thumbnails for YouTubers: 4 a month for $[price]. Want me to do your next upload?" },
        { t: "Deliver 2 versions", d: "Give them 2 options so they can A/B test using YouTube's thumbnail test feature." },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid(INVOICE) },
    ],
    pricing: [["Single", "1 thumbnail, 2 versions", "$10–$40"], ["Monthly", "4 thumbnails", "$40–$120/mo"], ["Rush", "Within 24 hours", "+50%"]],
    pricenote: "Raise prices once a client's click-through rate goes up and they tell you.",
    mistakes: [
      "<b>Too much text.</b> 3 words max, or none.",
      "<b>Using images you can't use.</b> Use the creator's own frames and free-to-use assets.",
      "<b>Designing on a big screen only.</b> Check it at phone size.",
      "<b>Clickbait that lies.</b> It hurts the channel. Make it bold but true.",
    ],
  },

  clips: {
    phases: [
      { when: "Right now", sub: "Find a creator", steps: [
        { t: "Find a podcast or streamer with no clips", min: "15 min",
          d: "Look for <b>long videos with good moments but no Shorts, Reels or TikToks</b>. Small to mid-size channels answer more often.", go: [L.youtube, ["Twitch", "https://www.twitch.tv"]] },
      ] },
      { when: "Today", sub: "Make 3 samples", steps: [
        { t: "Find the 3 best 30-second moments", min: "40 min", d: "Look for a <b>strong opinion, a funny moment or a surprising fact</b>. It has to make sense without context." },
        { t: "Edit them vertical with captions", min: "45 min", d: "Crop to 9:16, add <b>big auto captions</b>, and put the best line first.", go: [L.capcut] },
        { t: "Send them over", min: "10 min",
          script: "Hey [name]! I'm a clip editor. I cut 3 vertical clips from your latest episode, ready to post on Shorts, TikTok and Reels: [link]. They're yours, no strings. I can do 10 clips a month for $[price] so every episode gets reach. Interested?" },
      ] },
      { when: "This week", sub: "Make it monthly", steps: [
        { t: "Agree on a set number per episode", d: "<b>Clips per week, turnaround, who posts.</b> Get it in writing." },
        { t: "Use a shared folder", d: "Drop finished clips with suggested captions in a shared folder.", go: [L.drive] },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid(INVOICE) },
    ],
    pricing: [["Per clip", "Vertical with captions", "$5–$25"], ["Monthly", "10–20 clips", "$100–$300/mo"], ["Plus posting", "You post them too", "+$50–$100/mo"]],
    pricenote: "Only post clips to your own accounts if the creator says yes in writing.",
    mistakes: [
      "<b>Posting their content without permission.</b> Always ask first.",
      "<b>Clips that need context.</b> If a stranger wouldn't get it, pick another moment.",
      "<b>Tiny captions.</b> Most people watch muted.",
      "<b>Slow starts.</b> The first second has to hook.",
    ],
  },

  subtitles: {
    phases: [
      { when: "Right now", sub: "Learn the tools", steps: [
        { t: "Learn subtitle basics", min: "20 min",
          d: "YouTube Studio auto-generates captions you can fix. Subtitle Edit is free for <b>.srt</b> files. Lines should be short (about 42 characters) and timed to speech.",
          go: [["YouTube Studio", "https://studio.youtube.com"], ["Subtitle Edit (free)", "https://www.nikse.dk/subtitleedit"]] },
      ] },
      { when: "Today", sub: "Sample", steps: [
        { t: "Subtitle one creator's video", min: "1 hr",
          d: "Pick a small creator whose videos have <b>no captions or bad auto-captions</b>. Fix a 5–10 minute video into a clean .srt file. If you're fluent in another language, translate it too." },
        { t: "Send it", min: "10 min",
          script: "Hi [name]! I made accurate subtitles for your video [title]. Here's the .srt file you can upload in YouTube Studio: [link]. Captions help viewers who watch muted and can bring in viewers in other languages. I can do every upload for $[price] per video. Want me to?" },
      ] },
      { when: "This week", sub: "Get regulars", steps: [
        { t: "Offer translation as an add-on", d: "Spanish, French, Portuguese and Hindi subtitles can open new audiences. Only offer languages you truly know." },
        { t: "Join a freelance marketplace", d: "Upwork and Fiverr both have subtitle and translation jobs. Both are 18+.", go: [L.upwork, L.fiverr] },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid(INVOICE) },
    ],
    pricing: [["Captions", "Per 10-minute video", "$10–$20"], ["Translation", "Per 10-minute video", "$25–$60"], ["Monthly", "All uploads", "Quote per month"]],
    pricenote: "Translation pays more, but only sell languages you speak well.",
    mistakes: [
      "<b>Trusting auto-captions.</b> Your job is to fix them, especially names and slang.",
      "<b>Machine translation only.</b> Viewers notice. Check every line.",
      "<b>Long lines.</b> Keep them short and readable.",
      "<b>Bad timing.</b> Subtitles that lag feel broken.",
    ],
  },

  websites: {
    phases: [
      { when: "Right now", sub: "Find businesses", steps: [
        { t: "Find 10 businesses with no website", min: "20 min",
          d: "On Google Maps, search a type of business in any city. Open listings and look for <b>no website link, or only a Facebook page</b>. Note good reviews and photos you could use with permission.", go: [L.maps] },
      ] },
      { when: "Today", sub: "Build one demo", steps: [
        { t: "Build a free demo site for your best pick", min: "2 hrs",
          d: "Use Carrd or Google Sites. Include <b>what they do, hours, location, reviews, photos and a big call or booking button</b>. Make it look great on a phone.",
          go: [L.carrd, ["Google Sites", "https://sites.google.com"]] },
        { t: "Send them the link", min: "10 min",
          script: "Hi [name]! I noticed [business] doesn't have a website, so I built you a free demo to show what it could look like: [link]. If you like it, I can put it on your own domain and keep it updated for $[price] once plus $[price]/month. Happy to change anything!" },
      ] },
      { when: "This week", sub: "Launch it", steps: [
        { t: "Let them own the domain", d: "Have the owner buy the domain in <b>their own name</b> (about $10–$20 a year). You connect it. Never hold their domain hostage." },
        { t: "Add it to their Google listing", d: "Add the website link to their Google Business Profile so customers find it." },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid("Take <b>half upfront</b> and half at launch through PayPal. Invoice the monthly fee at the start of each month.") },
    ],
    pricing: [["Starter site", "One page, their domain", "$100–$300"], ["With booking", "Page + booking or menu", "$200–$400"], ["Care plan", "Updates and changes", "$15–$40/mo"]],
    pricenote: "The care plan is the real money. Ten small clients add up.",
    mistakes: [
      "<b>Owning their domain.</b> It belongs to them. Always.",
      "<b>Using photos without asking.</b> Get permission or use their own.",
      "<b>Ignoring phones.</b> Most visitors are on mobile.",
      "<b>Endless changes.</b> Say how many revisions are included.",
    ],
  },

  gbp: {
    phases: [
      { when: "Right now", sub: "Find listings to fix", steps: [
        { t: "Find 10 listings with missing info", min: "20 min",
          d: "On Google Maps, open small businesses in any city. Look for <b>no hours, few photos, no description, unanswered reviews</b>.", go: [L.maps] },
        { t: "Learn what a complete profile has", min: "15 min",
          d: "Read Google's help pages on Business Profiles: hours, categories, description, photos, products, posts and review replies.",
          go: [["Google Business Profile help", "https://support.google.com/business"]] },
      ] },
      { when: "Today", sub: "Pitch with a checklist", steps: [
        { t: "Write a 5-point fix list for one business", min: "15 min", d: "Make it specific: \"Your Sunday hours are missing\", \"12 reviews have no reply\"." },
        { t: "Send it to the owner", min: "10 min",
          script: "Hi [name]! I was looking at [business] on Google and noticed a few quick fixes that could bring in more customers: [3–5 points]. I fix Google listings for small businesses, fully online: $[price] one time, and I'll show you before and after. Want me to do it?" },
      ] },
      { when: "This week", sub: "Do the work", steps: [
        { t: "Get added as a manager", d: "The owner adds your email as a <b>manager</b> in their Business Profile. Never ask for their Google password." },
        { t: "Fix everything on the list", d: "Fill in details, upload their photos, write a description, and draft review replies for them to approve." },
        { t: "Offer monthly posts", d: "A weekly post and review replies keep the listing active." },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid("Invoice through <b>PayPal</b>. Take half upfront for new clients.") },
    ],
    pricing: [["Full setup", "One-time fix", "$50–$150"], ["Monthly", "Weekly posts + review replies", "$40–$100/mo"], ["Photos", "Upload and caption theirs", "Included"]],
    pricenote: "Never promise a ranking. Promise a complete, active listing.",
    mistakes: [
      "<b>Asking for passwords.</b> Manager access only.",
      "<b>Fake reviews.</b> Never write or buy reviews. It breaks Google's rules.",
      "<b>Promising #1 on Google.</b> Nobody can promise that.",
      "<b>Replying to reviews without approval.</b> The owner says yes first.",
    ],
  },

  proofread: {
    phases: [
      { when: "Right now", sub: "Sharpen up", steps: [
        { t: "Pick your style", min: "10 min",
          d: "Decide which English you'll check (US or UK spelling) and keep a free grammar checker open as a second pair of eyes.", go: [["LanguageTool", "https://languagetool.org"]] },
      ] },
      { when: "Today", sub: "Find writers with typos", steps: [
        { t: "Find 10 newsletters or blogs with mistakes", min: "30 min",
          d: "Browse Substack and small business blogs. Look for <b>typos, missing words and messy sentences</b>.", go: [["Substack", "https://substack.com"]] },
        { t: "Send one a short, kind fix list", min: "15 min",
          script: "Hi [name]! I really enjoyed [post]. I'm a proofreader and spotted a few small fixes, in case they're useful: [3 fixes]. I proofread newsletters before they go out, usually within 24 hours, for $[price] an issue. Want me to check your next one?" },
      ] },
      { when: "This week", sub: "Make it regular", steps: [
        { t: "Agree a turnaround", d: "<b>Same day or 24 hours</b>, with edits shown in Google Docs suggestion mode so they can accept or reject.", go: [L.docs] },
        { t: "Open a Fiverr gig", d: "Fiverr is 18+. Offer a price per 1,000 words.", go: [L.fiverr] },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid(INVOICE) },
    ],
    pricing: [["Per piece", "Up to 1,000 words", "$10–$30"], ["Monthly", "Weekly newsletter", "$40–$100/mo"], ["Rush", "Within 3 hours", "+50%"]],
    pricenote: "Never proofread school essays or assignments for someone to hand in as their own.",
    mistakes: [
      "<b>A typo in your pitch.</b> Read it twice.",
      "<b>Rewriting their voice.</b> Fix mistakes; don't change how they write.",
      "<b>Editing without tracking changes.</b> Always use suggestion mode.",
      "<b>Being rude about errors.</b> Be kind. Everyone makes them.",
    ],
  },

  productdesc: {
    phases: [
      { when: "Right now", sub: "Find shops that sell", steps: [
        { t: "Find 10 shops with weak descriptions", min: "20 min",
          d: "On Etsy or small online stores, look for listings with <b>one-line descriptions, no sizes or materials, or copy-paste text</b>, but some sales and reviews.", go: [L.etsy] },
      ] },
      { when: "Today", sub: "Sample", steps: [
        { t: "Rewrite 3 of one shop's listings", min: "45 min",
          d: "Each: <b>a benefit-first opening line, 3–5 short bullet details (size, material, care), and who it's perfect for</b>. Use the words buyers would search.", go: [L.docs] },
        { t: "Send them as a free sample", min: "10 min",
          script: "Hi [name]! I love your [product]. I rewrote 3 of your listing descriptions to help them show up in search and convert better, free to use: [link]. I write product descriptions for online shops: $[price] each or $[price] for 10. Want me to do the rest?" },
      ] },
      { when: "This week", sub: "Get more clients", steps: [
        { t: "Pitch 10 more shops", d: "Same method, a fresh sample for each." },
        { t: "Open an Upwork or Fiverr profile", d: "Search \"product descriptions\" jobs. Both are 18+.", go: [L.upwork, L.fiverr] },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid(INVOICE) },
    ],
    pricing: [["Single", "One product", "$5–$20"], ["Batch", "10 products", "$50–$150"], ["Full shop", "Whole catalogue", "Quote"]],
    pricenote: "Only write true claims about a product. Ask the owner when unsure.",
    mistakes: [
      "<b>Making up claims.</b> Never say a product does something it doesn't.",
      "<b>Long paragraphs.</b> Buyers skim. Use short lines.",
      "<b>Forgetting sizes and materials.</b> Missing details cause returns.",
      "<b>Copying other shops.</b> Write it fresh every time.",
    ],
  },

  newsletter: {
    phases: [
      { when: "Right now", sub: "Find a business", steps: [
        { t: "Find businesses that collect emails but never send", min: "20 min",
          d: "Sign up to the email list on 10 small business websites (\"10% off when you join\"). The ones that send nothing for weeks are your leads." },
      ] },
      { when: "Today", sub: "Write a sample", steps: [
        { t: "Write one sample email for them", min: "45 min",
          d: "<b>A short subject line, one story or tip, one offer, one button.</b> Under 200 words.", go: [L.docs] },
        { t: "Send it", min: "10 min",
          script: "Hi [name]! I joined your email list and noticed it's been quiet. I wrote a sample email you could send this week, free to use: [link]. I write and send newsletters for small businesses: 2 emails a month for $[price]. Want me to handle the next one?" },
      ] },
      { when: "This week", sub: "Set it up", steps: [
        { t: "Get access the right way", d: "They add you as a <b>user</b> in their email tool (Mailchimp and most others allow this). No password sharing.",
          go: [["Mailchimp", "https://mailchimp.com"]] },
        { t: "Send a draft for approval", d: "They approve every email before it goes out. Report open and click rates each month." },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid(INVOICE) },
    ],
    pricing: [["Per email", "Written + set up", "$40–$100"], ["Monthly", "2–4 emails", "$100–$300/mo"], ["Welcome series", "3 automated emails", "$150–$300"]],
    pricenote: "Only email people who signed up. Never add contacts the business bought or scraped.",
    mistakes: [
      "<b>Emailing people who didn't sign up.</b> It breaks anti-spam laws in many countries.",
      "<b>Long emails.</b> One idea per email.",
      "<b>No approval step.</b> The owner always signs off.",
      "<b>Forgetting the unsubscribe link.</b> Every email needs one.",
    ],
  },

  pinterest: {
    phases: [
      { when: "Right now", sub: "Learn the basics", steps: [
        { t: "Learn how pins send traffic", min: "30 min",
          d: "Pins work like search results: <b>a tall image (1000 × 1500), a keyword title and a link</b>. Read Pinterest's free business guides.", go: [["Pinterest Business", "https://business.pinterest.com"]] },
      ] },
      { when: "Today", sub: "Sample", steps: [
        { t: "Pick an online shop that isn't on Pinterest", min: "15 min", d: "Home decor, recipes, fashion, crafts and printables do best on Pinterest." },
        { t: "Design 5 pins for them", min: "1 hr", d: "Use their product photos, a short headline and their brand colours.", go: [L.canva] },
        { t: "Pitch the owner", min: "10 min",
          script: "Hi [name]! Your [products] would do really well on Pinterest, where people search for ideas to buy. I designed 5 sample pins for your shop: [link]. I can run your Pinterest for $[price]/month: 20 fresh pins, keywords and monthly stats. Interested?" },
      ] },
      { when: "This week", sub: "Run it", steps: [
        { t: "Schedule pins", d: "Use Pinterest's built-in scheduler. A few pins a day beats 30 at once." },
        { t: "Send monthly stats", d: "<b>Impressions, saves and outbound clicks.</b> It grows slowly; show the trend." },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid(INVOICE) },
    ],
    pricing: [["Setup", "Profile + boards", "$50–$100"], ["Monthly", "20–30 pins", "$100–$250/mo"], ["Plus", "60 pins + stats", "$250–$400/mo"]],
    pricenote: "Tell clients upfront that Pinterest takes 2–3 months to build.",
    mistakes: [
      "<b>Square images.</b> Pins should be tall.",
      "<b>No keywords.</b> Pinterest is a search engine. Titles matter.",
      "<b>Promising fast sales.</b> It's slow. Be honest.",
      "<b>Pinning other people's images as theirs.</b> Use the client's own photos.",
    ],
  },

  discord: {
    phases: [
      { when: "Right now", sub: "Learn the job", steps: [
        { t: "Learn moderation basics", min: "30 min",
          d: "Read Discord's safety and moderation resources: <b>server rules, AutoMod, roles and handling reports</b>. Discord's minimum age is 13 (older in some countries).", go: [["Discord Safety Center", "https://discord.com/safety"]] },
      ] },
      { when: "Today", sub: "Get experience", steps: [
        { t: "Join 3 active servers in a topic you know", min: "20 min", d: "Gaming, a creator's community, study groups. Be helpful in chat for a few days." },
        { t: "Apply to moderate one as a volunteer", d: "Many servers post mod applications. One volunteer role is your proof." },
      ] },
      { when: "This week", sub: "Go paid", steps: [
        { t: "Pitch small creators with busy servers", min: "30 min",
          script: "Hi [name]! I'm in your Discord and noticed [spam / unanswered questions] at night. I'm an experienced mod (I help run [server]). I can cover [time zone] hours, set up AutoMod and keep things clean for $[price]/month. Want to try it for 2 weeks?" },
        { t: "Agree on rules and hours in writing", d: "<b>Hours covered, what you can act on, and who to escalate to.</b>" },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid("Invoice monthly through <b>PayPal</b>.") },
    ],
    pricing: [["Part-time", "A few hours a day", "$50–$150/mo"], ["Head mod", "Team + AutoMod setup", "$150–$300/mo"], ["Setup", "Roles, rules, bots", "$50–$100 once"]],
    pricenote: "Paid mod work usually comes from people who already know you from the server.",
    mistakes: [
      "<b>Power-tripping.</b> Be fair and calm. Creators hire mods their fans like.",
      "<b>No written rules.</b> Agree what you can act on.",
      "<b>Ignoring serious reports.</b> Threats and harm go to the owner and Discord right away.",
      "<b>Burning out.</b> Set hours and stick to them.",
    ],
  },

  dataentry: {
    phases: [
      { when: "Right now", sub: "Learn the skills", steps: [
        { t: "Learn the spreadsheet basics", min: "1 hr",
          d: "Get comfortable with <b>sorting, filters, removing duplicates, splitting text to columns, and VLOOKUP/XLOOKUP</b>. Google's Sheets help pages and free YouTube tutorials cover all of it.", go: [L.sheets] },
        { t: "Make a before/after sample", min: "30 min", d: "Take a messy made-up contact list (mixed caps, duplicates, merged names) and clean it. Screenshot both." },
      ] },
      { when: "Today", sub: "Get on a platform", steps: [
        { t: "Make an Upwork or Fiverr profile", min: "45 min",
          d: "Both are 18+. Headline: \"Spreadsheet cleanup and data entry, fast and accurate\". Add your before/after.", go: [L.upwork, L.fiverr] },
        { t: "Bid on 5 small jobs", min: "30 min",
          script: "Hi! I can clean and organize this for you within [time]. I'll remove duplicates, fix formatting and send it back in Google Sheets or Excel. Here's a before/after of a similar job: [link]. Happy to do a small test section first." },
      ] },
      { when: "This week", sub: "Deliver well", steps: [
        { t: "Double-check everything", d: "Spot-check 10 random rows before you deliver. Accuracy is the whole job." },
        { t: "Ask for a review", d: "Early reviews get you more jobs." },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid("Upwork and Fiverr pay out to your bank or PayPal after the client approves.") },
    ],
    pricing: [["Small job", "Up to 500 rows", "$15–$40"], ["Hourly", "Ongoing entry", "$15–$25/hr"], ["Big cleanup", "Thousands of rows", "Quote"]],
    pricenote: "Never pay to get data-entry work. Real clients pay you.",
    mistakes: [
      "<b>\"Pay a fee to start\" jobs.</b> Those are scams.",
      "<b>Editing the only copy.</b> Always work on a copy of their file.",
      "<b>Skipping the double-check.</b> One wrong row loses the client.",
      "<b>Mishandling private data.</b> Don't share or keep client data after the job.",
    ],
  },

  photoedit: {
    phases: [
      { when: "Right now", sub: "Learn the basics", steps: [
        { t: "Learn Lightroom basics", min: "1 hr",
          d: "Lightroom has a free mobile version and a desktop trial. Learn <b>exposure, white balance, cropping, and syncing edits across a batch</b>. darktable is a free alternative.",
          go: [["Lightroom", "https://lightroom.adobe.com"], ["darktable (free)", "https://www.darktable.org"]] },
      ] },
      { when: "Today", sub: "Build samples", steps: [
        { t: "Edit 20 free sample photos", min: "2 hrs",
          d: "Download free sample RAW files (many photographers and camera sites share them). Edit them in <b>one consistent style</b>, then make before/after pairs." },
        { t: "Post your before/afters", min: "15 min", d: "Instagram and a simple portfolio page.", go: [L.ig, L.carrd] },
      ] },
      { when: "This week", sub: "Pitch photographers", steps: [
        { t: "Pitch 10 wedding, event or real estate photographers", min: "45 min",
          d: "Find them on Instagram or Google. Busy ones post a lot and mention long turnaround times.",
          script: "Hi [name]! Love your work, especially [shoot]. I'm a photo editor: I cull and colour-edit shoots to match a photographer's style, so you get your time back. Here are some before/afters: [link]. Want me to edit 50 photos from your next shoot as a trial?" },
        { t: "Match their style exactly", d: "Ask for a few finished photos or their presets. Your job is to edit like them, not like you." },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid(INVOICE) },
    ],
    pricing: [["Per photo", "Colour edit", "$0.50–$2"], ["Wedding", "500–800 photos", "$200–$500"], ["Real estate", "Per property set", "$15–$40"]],
    pricenote: "Speed comes with practice. Your hourly rate rises as you get faster.",
    mistakes: [
      "<b>Your style instead of theirs.</b> Match the photographer.",
      "<b>Over-editing skin.</b> Keep people looking real.",
      "<b>Missing deadlines.</b> Photographers have clients waiting.",
      "<b>Sharing their photos without permission.</b> Ask before you post anything.",
    ],
  },

  voiceover: {
    phases: [
      { when: "Right now", sub: "Set up a quiet spot", steps: [
        { t: "Find your quietest space", min: "10 min",
          d: "A <b>closet full of clothes</b> or under a blanket kills echo. Turn off fans and anything humming nearby. Your phone's voice recorder is enough to start." },
        { t: "Install a free audio editor", min: "10 min", d: "Audacity is free. Learn noise reduction and normalize.", go: [L.audacity] },
      ] },
      { when: "Today", sub: "Make samples", steps: [
        { t: "Record 3 samples", min: "1 hr", d: "<b>An ad (30 sec), an explainer (60 sec) and a narration.</b> Write your own scripts." },
        { t: "Clean the audio", min: "30 min", d: "Remove breaths and mouth clicks, reduce noise, and normalize the volume." },
      ] },
      { when: "This week", sub: "Open your gig", steps: [
        { t: "Make a voiceover gig", min: "45 min",
          d: "On Fiverr (18+). Say your accent, voice style and turnaround. Upload your 3 samples.", go: [L.fiverr, ["Voices.com", "https://www.voices.com"]] },
        { t: "Deliver fast to earn reviews", d: "Your first orders are for reviews. Deliver early and offer one free retake." },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid("Fiverr releases money after delivery. Withdraw to PayPal or your bank.") },
    ],
    pricing: [["Short script", "Up to 100 words", "$10–$25"], ["Explainer", "Up to 300 words", "$25–$60"], ["Commercial use", "Ads and broadcast", "+50–100%"]],
    pricenote: "A $20–$60 USB mic is worth it once you get regular orders.",
    mistakes: [
      "<b>Echoey rooms.</b> Record in a closet or under a blanket.",
      "<b>Background noise.</b> One hum ruins a whole take.",
      "<b>Free ad usage.</b> Commercial and ad use should cost more.",
      "<b>Reading too fast.</b> Slow down. Clear beats quick.",
    ],
  },

  beats: {
    phases: [
      { when: "Right now", sub: "Pick your best work", steps: [
        { t: "Pick your 5 best beats", min: "20 min",
          d: "Only beats that are <b>finished and mixed</b>. Only use samples you're allowed to use; uncleared samples can get your beats taken down.", go: [["BandLab (free)", "https://www.bandlab.com"]] },
      ] },
      { when: "Today", sub: "Upload", steps: [
        { t: "Set up a beat store", min: "45 min",
          d: "BeatStars lets you sell licences. Set a <b>basic lease</b> (MP3), a <b>premium lease</b> (WAV) and an <b>exclusive</b> price.", go: [["BeatStars", "https://www.beatstars.com"]] },
        { t: "Tag and title them well", min: "20 min", d: "Use the words artists search: genre, mood, \"type beat\" and BPM." },
      ] },
      { when: "This week", sub: "Get heard", steps: [
        { t: "Post 15-second previews", d: "TikTok, Instagram and YouTube Shorts. Show the beat playing with a visual.", go: [L.tiktok, L.youtube] },
        { t: "Message artists who'd fit", d: "Find small artists in your style and send one beat, not a whole list.",
          script: "Yo [name], your track [song] goes hard. I made a beat I think fits your sound: [link]. Free to try. If you want to record on it, leases are on my page. No pressure!" },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid("BeatStars pays out to PayPal or your bank. Under 18? An adult needs to own the account.") },
    ],
    pricing: [["Basic lease", "MP3, limited streams", "$20–$40"], ["Premium lease", "WAV + stems", "$50–$100"], ["Exclusive", "Full rights", "$200+"]],
    pricenote: "It usually takes many uploads before the first sale. Post consistently.",
    mistakes: [
      "<b>Uncleared samples.</b> They get beats taken down and cause disputes.",
      "<b>Unmixed beats.</b> Artists pass on beats that sound unfinished.",
      "<b>No tags.</b> Artists find beats by searching.",
      "<b>Spamming links.</b> One fitting beat per artist works better.",
    ],
  },

  pod: {
    phases: [
      { when: "Right now", sub: "Pick a niche", steps: [
        { t: "Pick a niche with a sense of humour", min: "15 min",
          d: "<b>Nurses, teachers, gamers, a specific dog breed, a hobby.</b> People buy shirts and stickers that say who they are." },
        { t: "Check the rules", min: "10 min",
          d: "<b>No brand names, logos, characters, celebrity faces or song lyrics.</b> Those get removed and can get you banned." },
      ] },
      { when: "Today", sub: "Make designs", steps: [
        { t: "Make 10 simple designs", min: "2 hrs", d: "Short, funny text with a simple graphic works best. Use a transparent background.", go: [L.canva] },
        { t: "Upload with good tags", min: "45 min",
          d: "Redbubble and similar sites print and ship for you. Use the words buyers search in your titles and tags.",
          go: [["Redbubble", "https://www.redbubble.com"], ["TeePublic", "https://www.teepublic.com"]] },
      ] },
      { when: "This week", sub: "Get eyes on it", steps: [
        { t: "Post where your niche hangs out", d: "Make a short TikTok or a Pinterest pin of the design on a mockup.", go: [L.tiktok, L.pinterest] },
        { t: "Add 5 designs a week", d: "More designs means more chances. Watch which ones get views and make more like them." },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid("The site pays your cut monthly to PayPal or your bank. Under 18? An adult needs to own the account.") },
    ],
    pricing: [["Your cut", "Per shirt sold", "$2–$6"], ["Stickers", "Per sticker sold", "$0.50–$2"], ["Catalogue", "100 designs up", "Varies a lot"]],
    pricenote: "This is a slow numbers game. A few designs end up making most of the sales.",
    mistakes: [
      "<b>Using brands, characters or lyrics.</b> Instant takedown.",
      "<b>Too much detail.</b> Simple designs print and sell better.",
      "<b>Bad tags.</b> Nobody can buy what they can't find.",
      "<b>Quitting after 10 designs.</b> Most sellers need 50–100.",
    ],
  },

  blog: {
    phases: [
      { when: "Right now", sub: "Pick a niche", steps: [
        { t: "Pick a niche you know", min: "10 min", d: "Gaming, fitness, pets, beauty, trades, tech. Knowing the topic makes your posts better and faster." },
      ] },
      { when: "Today", sub: "Build a portfolio", steps: [
        { t: "Write 2 sample posts", min: "2–3 hrs",
          d: "Each 600–900 words, answering <b>one question people search</b> (\"How often should you groom a husky?\"). Short paragraphs, clear headings. Check every fact.", go: [L.docs] },
        { t: "Publish them free", min: "15 min", d: "Put them on Medium or share a Google Doc link as your portfolio.", go: [["Medium", "https://medium.com"]] },
      ] },
      { when: "This week", sub: "Pitch", steps: [
        { t: "Pitch 10 businesses with quiet blogs", min: "45 min",
          d: "Look for business sites in your niche whose blog hasn't been updated in months.",
          script: "Hi [name]! I noticed your blog hasn't had a new post since [month]. Fresh posts help customers find you on Google. I write blog posts for [niche] businesses. Here's a sample: [link]. I can write 2 posts a month for $[price]. Want a topic list for next month?" },
        { t: "Try Upwork too", d: "Search for blog writing jobs in your niche. It's 18+.", go: [L.upwork] },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid(INVOICE) },
    ],
    pricing: [["Short post", "600–900 words", "$30–$75"], ["Long post", "1,500+ words", "$75–$150"], ["Monthly", "2–4 posts", "$100–$400/mo"]],
    pricenote: "If you use AI to draft, rewrite and fact-check it. Clients pay for human-quality posts.",
    mistakes: [
      "<b>Unchecked facts.</b> One wrong fact costs the client trust.",
      "<b>Pure AI copy.</b> It reads flat and clients notice.",
      "<b>Walls of text.</b> Short paragraphs and headings.",
      "<b>No topic list.</b> Pitch with ideas, not just \"I can write\".",
    ],
  },

  language: {
    phases: [
      { when: "Right now", sub: "Set up", steps: [
        { t: "Pick the language you'll teach", min: "5 min",
          d: "Your first language or one you speak fluently. Conversation practice is the easiest lesson to start with." },
        { t: "Record a 1-minute intro video", min: "20 min",
          d: "Good light, quiet room, smile. Say who you are, where you're from and what a lesson with you feels like. <b>This video is what students pick you on.</b>" },
      ] },
      { when: "Today", sub: "Make your profile", steps: [
        { t: "Make a teacher profile", min: "45 min",
          d: "italki and Preply let you teach conversation without a teaching certificate. Check their age and country requirements.",
          go: [["italki teach", "https://teach.italki.com"], ["Preply", "https://preply.com/en/teach"]] },
        { t: "Price your first lessons low", d: "A lower price and a trial lesson get you your first reviews faster." },
      ] },
      { when: "This week", sub: "First lessons", steps: [
        { t: "Plan simple conversation topics", d: "<b>Food, travel, work, hobbies, movies.</b> Have 10 questions ready per topic." },
        { t: "Send notes after each lesson", d: "A short list of new words and mistakes to fix. Students book again when they see progress." },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid("The platform pays your earnings out to PayPal or your bank. It takes a commission.") },
    ],
    pricing: [["Trial lesson", "30 minutes", "$5–$10"], ["Conversation", "Per hour", "$10–$25"], ["Package", "5 lessons", "Small discount"]],
    pricenote: "Raise your price after 10–20 good reviews.",
    mistakes: [
      "<b>A dull intro video.</b> It's your whole shop window.",
      "<b>Talking the whole lesson.</b> The student should speak most.",
      "<b>No notes after.</b> Students stay when they see progress.",
      "<b>Taking lessons off the platform.</b> It breaks the rules and can get you banned.",
    ],
  },

  podcastedit: {
    phases: [
      { when: "Right now", sub: "Learn the basics", steps: [
        { t: "Learn basic audio editing", min: "1 hr",
          d: "In Audacity (free) or Descript, learn to <b>cut mistakes, remove long pauses, level volume between speakers and reduce background noise</b>.",
          go: [L.audacity, ["Descript", "https://www.descript.com"]] },
      ] },
      { when: "Today", sub: "Sample", steps: [
        { t: "Find a podcast with rough audio", min: "20 min", d: "Small shows with echo, volume jumps or long \"umms\". YouTube and podcast apps are full of them." },
        { t: "Clean up 5 minutes as a sample", min: "1 hr", d: "Use a short public clip, clean it, and make a before/after." },
        { t: "Send it to the host", min: "10 min",
          script: "Hi [name]! I enjoy [podcast]. I'm a podcast editor and cleaned up 5 minutes of your latest episode to show the difference: [before] / [after]. I can edit full episodes for $[price] each, back in 48 hours. Want me to do the next one?" },
      ] },
      { when: "This week", sub: "Make it regular", steps: [
        { t: "Agree on a workflow", d: "<b>How they send raw files, turnaround, intro and outro music, and how many revisions.</b>", go: [L.drive] },
        { t: "Offer show notes as an add-on", d: "A short summary and timestamps for each episode." },
      ] },
      { when: "Get paid", sub: "Money in", steps: getPaid(INVOICE) },
    ],
    pricing: [["Basic", "Clean-up, up to 60 min", "$20–$60"], ["Full", "Edit + intro/outro + levels", "$50–$100"], ["Show notes", "Summary + timestamps", "+$10–$20"]],
    pricenote: "Monthly deals for weekly shows are the steady money.",
    mistakes: [
      "<b>Over-cutting.</b> Remove mistakes, not the personality.",
      "<b>Volume jumps.</b> Level every speaker.",
      "<b>Music they can't use.</b> Use licensed or royalty-free tracks.",
      "<b>Missing the deadline.</b> Podcasts publish on a schedule.",
    ],
  },
};
