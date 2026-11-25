import "server-only";
// Idea catalogue. Every idea can be done fully online, from anywhere, with a phone or a computer.
// Server-only so the plans are only sent to people who land on them.
// time: how long today's first steps take (1 = under 30 min, 2 = 1–2 hrs, 3 = most of the day).
// budget: 0 = free to start, 20 = up to $20 to start.

export type Kind = "design" | "video" | "writing" | "helping";
export type Level = "Easy" | "Medium";

export interface Idea {
  id: string;
  name: string;
  how: string;
  real: string;
  time: 1 | 2 | 3;
  budget: 0 | 20;
  kind: Kind;
  earn: string;
  cost: string;
  diff: Level;
  /** Short fallback plan, used only if an idea has no entry in guides.ts. */
  steps: string[];
  tools: string[];
}

export interface GuideStep {
  t: string;
  min?: string;
  /** Trusted HTML (only <b>) written by us. */
  d?: string;
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

type Row = [string, string, string, string, Idea["time"], Idea["budget"], Kind, string, string, Level, string[], string[]];
const ROWS: Row[] = [
  ["edits", "Edit TikToks for a small business", "Businesses pay you a monthly fee for a set number of edited short videos.", "Most businesses won't answer. Expect to pitch 10 to 20 before one says yes.", 2, 0, "video", "$50–$200/mo", "$0", "Medium",
    ["Find 10 businesses with weak videos", "Re-edit one clip as a free sample", "DM it to them", "Offer 4 edits a month for a flat price"], ["CapCut", "Instagram DMs"]],
  ["tutor", "Tutor a subject online", "Parents or students pay you per one-hour video session.", "The first student is the hard part. After that, reviews and referrals bring more.", 1, 0, "helping", "$20–$40/hr", "$0", "Medium",
    ["Pick your strongest subject", "Make a tutor profile", "Post in online parent and student groups", "Book the next session before you hang up"], ["Google Meet", "Canva"]],
  ["templates", "Sell Canva templates", "Buyers pay per download on Etsy or Gumroad, and you keep what's left after fees.", "Most new listings make $0 in week one. This builds slowly over months.", 3, 0, "design", "$0–$50 first month", "Small listing fees", "Medium",
    ["Find a best-selling niche", "Design 3 templates in one style", "List them with clear titles", "Post a 15-second preview video"], ["Canva", "Etsy or Gumroad"]],
  ["logos", "Design logos on Fiverr", "Buyers pay per gig and Fiverr takes a cut.", "The first few gigs are cheap to get reviews. Prices go up once you have them. Fiverr is 18+.", 3, 0, "design", "$10–$50 per gig", "$0", "Medium",
    ["Make 3 sample logos", "Create a gig with clear packages", "Price your first gig low for reviews", "Deliver early and ask for a review"], ["Canva or Figma", "Fiverr"]],
  ["va", "Be a virtual assistant for a creator", "Creators pay hourly or monthly for inbox, scheduling and comment help.", "Creators need to trust you with their accounts. Start small and be reliable.", 2, 0, "helping", "$15–$25/hr", "$0", "Medium",
    ["List 5 tasks you can do", "Pitch 10 small creators", "Offer a paid one-week trial", "Send a short end-of-week report"], ["Notion", "Google Calendar"]],
  ["captions", "Write social posts for a business", "Businesses pay a monthly fee for a set of posts and captions.", "Owners care about results. Show a sample written for them, not a general pitch.", 1, 0, "writing", "$100–$300/mo", "$0", "Medium",
    ["Find a business with a quiet Instagram", "Write 3 sample posts for them", "Send them the samples", "Offer 12 posts a month"], ["Canva", "Google Docs"]],
  ["usertest", "Do paid website tests", "Testing sites pay per test for recording yourself using a website or app.", "You'll fail a lot of screener questions. Tests come in waves, so it's side money. Most sites are 18+.", 1, 0, "helping", "$10–$30", "$0", "Easy",
    ["Sign up on 2 testing sites", "Fill in your profile honestly", "Do the practice test", "Check for tests a few times a day"], ["UserTesting", "Prolific"]],
  ["transcribe", "Transcribe audio", "Transcription sites and podcasters pay per minute of audio typed.", "Pay per hour starts low until you get fast. Good for quiet evenings.", 2, 0, "writing", "$5–$15/hr to start", "$0", "Easy",
    ["Take a transcription site's entry test", "Practise with free audio", "Start with short, clear files", "Pitch podcasters later"], ["Rev", "Headphones"]],
  ["commissions", "Draw digital pet portraits", "Pet owners anywhere pay per drawing, delivered as a file.", "You need 3 strong samples first. Draw friends' pets for free to get them.", 3, 0, "design", "$15–$50 per piece", "$0", "Medium",
    ["Draw 3 pets for friends", "Post them with a price", "Take orders through DMs", "Deliver a high-res file"], ["Procreate or free drawing apps", "Instagram"]],
  ["adcreative", "Make video ads for online brands", "Online brands pay per short ad that you edit from their own product photos and clips. You never need the product in your hands.", "Brands judge you on the first 2 seconds. Make 3 sample ads before you pitch anyone.", 3, 0, "video", "$25–$100 per ad", "$0", "Medium",
    ["Pick 3 online brands", "Download their product photos and clips", "Edit a 15-second sample ad for each", "Email the best one to the brand"], ["CapCut", "Canva"]],
  ["resumes", "Fix resumes online", "Job seekers pay per resume for a cleaner layout and better wording.", "You need to be good with words. Do 2 free ones first to get testimonials.", 1, 0, "writing", "$15–$40 per resume", "$0", "Medium",
    ["Redo your own resume", "Fix 2 friends' resumes free", "Post a before/after with your price", "Deliver within 48 hours"], ["Google Docs", "Canva"]],
  ["faceless", "Start a faceless TikTok page", "Pick a niche and post short videos without showing your face. Money comes from affiliate links and paid shoutouts as the page grows.", "Most pages earn nothing in the first month or two. You need 1 to 3 posts a day. TikTok's own payouts need 10,000 followers and you must be 18+.", 1, 0, "video", "$0–$100 first month", "$0", "Easy",
    ["Pick one niche", "Make 3 videos from screen recordings or stock clips", "Post daily at the same times", "Add an affiliate link once you have viewers"], ["CapCut", "TikTok"]],
  ["thumbnails", "Design YouTube thumbnails", "YouTubers pay per thumbnail or for a monthly batch.", "Creators judge you on samples only. Make 5 strong ones before you pitch anyone.", 2, 0, "design", "$10–$40 each", "$0", "Medium",
    ["Redesign 5 thumbnails from real videos", "Post a before/after", "Pitch 10 small YouTubers", "Offer a 4-thumbnail pack"], ["Canva or Photopea", "YouTube"]],
  ["clips", "Cut clips from podcasts and streams", "Podcasters and streamers pay per clip or monthly for short clips of their best moments.", "You'll watch a lot of footage. The skill is spotting the 30 seconds worth posting.", 2, 0, "video", "$5–$25 per clip", "$0", "Easy",
    ["Pick a podcaster with no clips", "Cut 3 sample clips with captions", "Send them over", "Offer 10 clips a month"], ["CapCut", "YouTube"]],
  ["subtitles", "Add subtitles to creators' videos", "Creators pay per video for accurate subtitles, and more if you translate into another language.", "Auto-captions do most of the work, so you're paid for fixing them well. Translation pays more if you're fluent.", 2, 0, "writing", "$10–$40 per video", "$0", "Easy",
    ["Subtitle one of a creator's videos as a sample", "Send it to them", "Offer a per-video price", "Add translation if you're bilingual"], ["YouTube Studio", "Subtitle Edit"]],
  ["websites", "Build one-page websites for small businesses", "Businesses pay a one-time fee for a simple site, plus a small monthly fee for updates.", "Lots of tiny businesses still only have a Facebook page. Finding them is easy; getting replies takes volume.", 3, 0, "design", "$100–$300 per site", "$0 (they pay hosting)", "Medium",
    ["Find businesses with no website", "Build a free demo for one", "Send them the link", "Charge for launch and updates"], ["Carrd", "Google Maps"]],
  ["gbp", "Fix Google listings for local businesses", "Businesses pay a flat fee to have their Google Business Profile filled in with photos, hours and posts. You do it all online.", "Owners must add you as a manager themselves. Some won't bother, so pitch the ones that clearly need help.", 1, 0, "helping", "$50–$150 per business", "$0", "Easy",
    ["Find 10 listings with missing info", "Write a short list of what's missing for one", "Send it to the owner", "Offer to fix it for a flat fee"], ["Google Maps", "Google Business Profile"]],
  ["proofread", "Proofread newsletters and blogs", "Writers and small businesses pay per piece or per 1,000 words to have mistakes fixed before they publish.", "You need a sharp eye and good grammar. One missed typo in a sample loses the client.", 1, 0, "writing", "$10–$30 per piece", "$0", "Easy",
    ["Find 10 newsletters with typos", "Send one a short list of fixes", "Offer a per-issue price", "Turn around in 24 hours"], ["Google Docs", "Substack"]],
  ["productdesc", "Write product descriptions for online stores", "Online shop owners pay per description or per batch to make their listings sell better.", "Shops with 5 sales a month can't pay much. Look for shops that are already selling.", 2, 0, "writing", "$5–$20 per product", "$0", "Easy",
    ["Find 10 shops with weak descriptions", "Rewrite 3 of one shop's listings", "Send them as a free sample", "Offer a batch price"], ["Etsy", "Shopify stores"]],
  ["newsletter", "Write email newsletters for businesses", "Businesses pay monthly for you to write and send their email newsletter.", "Most small businesses have an email list they never use. You'll need to show what one good email looks like.", 2, 0, "writing", "$100–$300/mo", "$0", "Medium",
    ["Find a business that collects emails but never sends", "Write one sample email for them", "Send it", "Offer 2 to 4 emails a month"], ["Mailchimp", "Google Docs"]],
  ["pinterest", "Run Pinterest for small online shops", "Shop owners pay monthly for you to design and post pins that send people to their store.", "Pinterest is slow to build, usually 2 to 3 months before traffic grows. Say so upfront.", 2, 0, "design", "$100–$250/mo", "$0", "Medium",
    ["Learn how pins send traffic", "Design 5 pins for one shop as a sample", "Pitch the owner", "Offer 20 pins a month"], ["Pinterest", "Canva"]],
  ["discord", "Moderate Discord servers", "Creators and communities pay monthly for moderators who keep chats clean and answer questions.", "A lot of mod work is unpaid at first. Mod for free in one server to get the experience that gets you paid.", 1, 0, "helping", "$50–$300/mo", "$0", "Easy",
    ["Learn Discord moderation basics", "Volunteer in one active server", "Ask small creators if they need paid mods", "Offer set hours each week"], ["Discord", "Discord Moderator Academy"]],
  ["dataentry", "Clean up spreadsheets for small businesses", "Businesses pay hourly or per job to have messy lists, contacts and inventory sorted into clean spreadsheets.", "It's repetitive work. Accuracy is what gets you hired again, not speed.", 2, 0, "helping", "$15–$25/hr", "$0", "Easy",
    ["Learn sorting, filters and VLOOKUP", "Make a before/after sample", "Make a profile on a freelance site", "Bid on small jobs"], ["Google Sheets", "Upwork"]],
  ["photoedit", "Edit photos for photographers", "Photographers pay per photo or per shoot for you to cull and colour-edit their pictures.", "Busy photographers hate editing, but they're picky. Match their style exactly.", 3, 0, "design", "$0.50–$2 per photo", "$0", "Medium",
    ["Learn Lightroom basics", "Edit 20 free sample RAW photos", "Pitch 10 photographers", "Offer to edit one shoot"], ["Lightroom", "Instagram"]],
  ["voiceover", "Record voiceovers", "Businesses and creators pay per script for you to record a clean voiceover. Fiverr takes a cut.", "You need a quiet room. A closet full of clothes works better than you'd think. Fiverr is 18+.", 2, 20, "video", "$10–$50 per script", "$0–$20 (mic optional)", "Easy",
    ["Record 3 samples in a quiet spot", "Clean the audio for free", "Make a voiceover gig", "Deliver fast to earn reviews"], ["Audacity", "Fiverr"]],
  ["beats", "Sell beats online", "Rappers and singers pay to license your beats on beat-selling sites.", "Only for people who already make music. It takes many uploads before the first sale.", 3, 0, "video", "$20–$100 per licence", "$0", "Medium",
    ["Pick your 5 best beats", "Tag and upload them", "Post 15-second previews", "Message artists who'd fit"], ["BeatStars", "YouTube"]],
  ["headshots", "Make AI headshots for LinkedIn", "People pay per set of polished profile photos that you make from their selfies with an AI headshot tool and then touch up.", "Anyone can use these tools, so you're selling convenience and a good eye. Fix weird hands and ears, get clear permission and delete their photos after.", 2, 20, "design", "$15–$40 per person", "$10–$20 in AI credits", "Easy",
    ["Make your own set first", "Post a before and after", "Offer 3 friends a set for a review", "Charge per set after that"], ["AI headshot app", "Canva"]],
  ["blog", "Write blog posts for businesses", "Businesses pay per article so their website shows up in Google searches.", "Clients want posts that sound human and are accurate. AI-only drafts get noticed and rejected.", 3, 0, "writing", "$30–$100 per post", "$0", "Medium",
    ["Write 2 sample posts in a niche you know", "Put them on a free portfolio", "Pitch 10 businesses with quiet blogs", "Offer 2 posts a month"], ["Google Docs", "Medium"]],
  ["language", "Teach a language you speak online", "Learners pay per 30- or 60-minute video call to practise speaking with you.", "Teaching sites have lots of tutors, so your profile video matters most.", 2, 0, "helping", "$10–$25/hr", "$0", "Easy",
    ["Record a 1-minute intro video", "Make a teacher profile", "Price your first lessons low", "Plan simple conversation topics"], ["italki", "Preply"]],
  ["podcastedit", "Edit podcast audio", "Podcasters pay per episode for you to cut mistakes, balance volume and remove background noise.", "Free tools can do it, but you need patience and good headphones.", 2, 0, "video", "$20–$60 per episode", "$0", "Medium",
    ["Learn basic audio editing", "Clean up 5 minutes of a real podcast as a sample", "Send it to the host", "Offer a per-episode price"], ["Audacity", "Descript"]],
];

export const IDEAS: Idea[] = ROWS.map(([id, name, how, real, time, budget, kind, earn, cost, diff, steps, tools]) => ({
  id, name, how, real, time, budget, kind, earn, cost, diff, steps, tools,
}));

// Full plans for every idea live in guides.ts.
