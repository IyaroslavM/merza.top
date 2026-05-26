export const TWEAK_DEFAULTS = {
  "palette":      "emerald-orchid",
  "splitMotion":  "magnetic",
  "showDecor":    true,
  "lineStyle":    "gradient",
  "showWordmark": true
};

export const PALETTES = {
  "emerald-orchid":{ y: "#E8DDB5", k: "#B85EE0", yBg: "#2E7D32", kBg: "#FAFAFA", label: "Emerald × Orchid" },
  "cobalt-orchid": { y: "#3770E8", k: "#B85EE0", yBg: "#080C14", kBg: "#FAFAFA", label: "Cobalt × Orchid" },
  "ink-rose":      { y: "#7AB0FF", k: "#D26A8C", yBg: "#0B0F18", kBg: "#FBF7F4", label: "Ice × Rose" },
  "amber-jade":    { y: "#E5A24A", k: "#3FA585", yBg: "#0E0B08", kBg: "#F4F7F2", label: "Amber × Jade" },
  "mono":          { y: "#F1F1F1", k: "#1D1D1F", yBg: "#0A0A0B", kBg: "#FAFAFA", label: "Light × Dark" }
};

export const PEOPLE = {
  y: {
    label: "Merza",
    surname: "YAROSLAV",
    role: "Product Owner_",
    quietRole: "Product Owner",
    bio: "Digital product strategist with 10+ years turning complex business challenges into scalable digital products.",
    ghost: `{
  discipline: "product",
  experience: "10+ years",
  shipped:    [BROCARD, DOC.ua, Crystal]
  // 2M+ users · 4 products
  thinking:   "systems",
  vision:     ∞
}`,
    testimonial: {
      quote: "Yaroslav approaches product like a business partner, not a backlog manager. His ability to scope complexity into shippable increments without losing the vision is rare — and the results speak for themselves.",
      author: "LinkedIn recommendation",
      role: "Replace with a real quote from your connections"
    },
    timelineHead: "Experience",
    timeline: [
      { co: "BROCARD",                       role: "Product Owner",                           period: "2023 — Present",     href: "https://www.brocard.ua/" },
      { co: "Crystal Blockchain Analytics",  role: "Freelance Consultant",                    period: "May 2022 — Feb 2025", href: "https://crystalintelligence.com/" },
      { co: "DOC.ua",                        role: "Product Owner",                           period: "2020 — 2022",        href: "https://doc.ua/" },
      { co: "MSD Ukraine",                   role: "Digital & Campaign Marketing Strategist", period: "2018 — 2020",        href: "https://www.msd.ua/" }
    ],
    links: [
      { label: "View Portfolio", kind: "filled",   action: "yportfolio" },
      { label: "View LinkedIn",  kind: "outlined", href: "https://www.linkedin.com/in/iaroslavmerza/" },
      { label: "merza@outlook.com", kind: "outlined", href: "mailto:merza@outlook.com" }
    ]
  },
  k: {
    label: "Merza",
    surname: "KSENIYA",
    role: "Product Designer",
    quietRole: "Product Designer",
    bio: "Product designer crafting intuitive interfaces and meaningful user experiences.",
    timelineHead: "Craft",
    timeline: [
      { co: "IT X100",                   role: "UX/UI Designer",      period: "Dec 2020 — Feb 2022" },
      { co: "SportLabs Group",           role: "UX/UI Designer",      period: "Oct 2019 — Oct 2020" },
      { co: "BETLAB",                    role: "Web Designer",        period: "Jun 2018 — Oct 2019" },
      { co: "Uteam software solutions",  role: "UX/UI Designer",      period: "Apr 2017 — Jun 2018" },
      { co: "Воробьевы горы",            role: "Web & Graphic Designer", period: "2014 — Apr 2017" }
    ],
    projects: ["Research", "UX Flow", "Metrics"],
    links: [
      { label: "View Portfolio", kind: "filled",   action: "portfolio" },
      { label: "View LinkedIn",  kind: "outlined", href: "https://www.linkedin.com/in/kseniya-merza-08754077/" },
      { label: "merza@outlook.com", kind: "outlined", href: "mailto:merza@outlook.com" }
    ]
  }
};

export const PROJECTS = [
  {
    id: "sushi-master",
    index: "01",
    name: "Sushi Master",
    tagline: "From scroll to checkout in under 3 minutes",
    type: "E-commerce Redesign · Web & Mobile Web",
    role: "Lead UX/UI Designer",
    timeline: "12 weeks · 2022",
    tools: ["Figma", "Hotjar", "Maze", "Miro"],
    accent: "#C0392B",
    accentLight: "rgba(192,57,43,0.08)",
    problem: "sushi-master.ua — Ukraine's leading sushi delivery chain — had a 71% cart abandonment rate on mobile. A flat list of 200+ items with no hierarchy, a cart hidden behind four taps, and delivery time estimates revealed only after payment left users confused and calling support instead of ordering.",
    research: [
      { label: "Heatmap sessions", value: "1,200+", note: "Hotjar — 3 weeks of mobile traffic" },
      { label: "Cart abandonment", value: "71%", note: "measured via funnel analytics" },
      { label: "Support calls", value: "34%", note: "related to delivery ETA confusion" },
      { label: "Avg time to order", value: "8.4 min", note: "vs 2.1 min on competitor" },
    ],
    insights: [
      "Users scanned 3–5 items then left — undifferentiated list caused decision paralysis",
      "Hidden cart created anxiety: people didn't know items were added and tapped repeatedly",
      "ETA shown post-payment felt like bait-and-switch — 18% cancelled after seeing it",
    ],
    decisions: [
      { title: "Visual category navigation", desc: "Replaced flat list with photo-first categories and a sticky filter row. Top items surfaced by order frequency." },
      { title: "Persistent mini-cart", desc: "Cart count and total visible at all times. One-tap expand without leaving the menu page." },
      { title: "ETA upfront", desc: "Delivery window shown on the first screen via geolocation — before any item is selected." },
    ],
    metrics: [
      { value: "+52%", label: "cart completion rate", delta: "up" },
      { value: "2.9 min", label: "avg time to order (was 8.4)", delta: "down" },
      { value: "−41%", label: "support calls (ETA)", delta: "down" },
      { value: "+29%", label: "avg order value", delta: "up" },
    ],
    palette: ["#FFF5F4","#FFD4CF","#C0392B","#922B21","#1A1A1F"],
    screens: [
      { label: "Menu Browse", color: "#C0392B" },
      { label: "Item Detail", color: "#922B21" },
      { label: "Checkout", color: "#FFD4CF" },
    ]
  },
  {
    id: "monopizza",
    index: "02",
    name: "Monopizza",
    tagline: "Building the perfect order in one screen",
    type: "Web Platform · Responsive",
    role: "UX/UI Designer · UX Researcher",
    timeline: "10 weeks · 2023",
    tools: ["Figma", "FullStory", "Optimal Workshop", "Principle"],
    accent: "#E8763A",
    accentLight: "rgba(232,118,58,0.08)",
    problem: "monopizza.com.ua was desktop-first in a world where 78% of orders came from phones. The restaurant locator demanded a full postcode before showing any menu, the pizza customizer ran across 9 sequential screens, and there was no combo logic — average order value sat at ₴180 against a ₴290 industry benchmark.",
    research: [
      { label: "Mobile traffic share", value: "78%", note: "GA — yet UI was desktop-first" },
      { label: "Locator drop-off", value: "63%", note: "users quit before seeing the menu" },
      { label: "Avg order value", value: "₴180", note: "vs ₴290 industry benchmark" },
      { label: "Customizer exits", value: "49%", note: "abandoned mid-flow at step 5–7" },
    ],
    insights: [
      "Requiring a postcode before showing the menu blocked intent — users came to browse, not commit",
      "9-step customizer felt like a government form, not a food experience",
      "No combo logic meant every extra item required a separate flow — upsell was structurally impossible",
    ],
    decisions: [
      { title: "Geo-first, commit-later", desc: "Browser geolocation auto-selects the nearest location. Menu visible instantly; postcode only confirmed at checkout." },
      { title: "Visual pizza builder", desc: "Collapsed 9 steps into a single interactive screen with a live pizza preview. Toppings toggle in place." },
      { title: "Smart combo engine", desc: "After adding a pizza, a contextual combo card appears — one tap adds a drink + side at a bundled price." },
    ],
    metrics: [
      { value: "₴264", label: "avg order value (was ₴180)", delta: "up" },
      { value: "+67%", label: "menu-to-cart conversion", delta: "up" },
      { value: "−72%", label: "customizer drop-off", delta: "down" },
      { value: "4.7★", label: "post-launch App Store", delta: "up" },
    ],
    palette: ["#FFF8F3","#FFE0CC","#E8763A","#C05A1F","#1A1A1F"],
    screens: [
      { label: "Menu & Location", color: "#E8763A" },
      { label: "Pizza Builder", color: "#C05A1F" },
      { label: "Combo Upsell", color: "#FFE0CC" },
    ]
  },
  {
    id: "babysitter",
    index: "03",
    name: "Babysitter",
    tagline: "Rebuilding trust in childcare",
    type: "Mobile App · iOS & Android",
    role: "Lead UX/UI Designer",
    timeline: "14 weeks · 2021",
    tools: ["Figma", "Maze", "Hotjar", "Principle"],
    accent: "#B85EE0",
    accentLight: "rgba(184,94,224,0.08)",
    problem: "Parents couldn't find trusted babysitters quickly. The original onboarding took 11 steps, verification felt opaque, and 68% of users abandoned at the trust-confirmation screen — costing the platform thousands of potential bookings monthly.",
    research: [
      { label: "Interviews", value: "18 parents + 12 sitters", note: "moderated, 45 min each" },
      { label: "Drop-off audit", value: "68%", note: "abandoned at step 7 of 11" },
      { label: "SUS baseline", value: "41 / 100", note: "\"marginal\" usability" },
      { label: "Top pain point", value: "\"How do I know they're safe?\"", note: "stated by 14 of 18 parents" },
    ],
    insights: [
      "Trust signals were buried — background-check badges hidden behind 3 taps",
      "Form fatigue: 11 fields on a single screen killed momentum",
      "Sitters had no personality — photo + name only, no voice or story",
    ],
    decisions: [
      { title: "Trust-first architecture", desc: "Moved verified badges and safety scores to the card level — visible before any tap." },
      { title: "Progressive onboarding", desc: "Collapsed 11 steps into 3 contextual micro-flows triggered by intent, not sequence." },
      { title: "Sitter story cards", desc: "60-second video intro replaced static photo — converted 2.3× better in A/B test." },
    ],
    metrics: [
      { value: "+38%", label: "booking completion", delta: "up" },
      { value: "−61%", label: "drop-off at trust step", delta: "down" },
      { value: "79", label: "SUS score (was 41)", delta: "up" },
      { value: "4.8★", label: "App Store rating", delta: "up" },
    ],
    palette: ["#F9F0FF","#EDD6F9","#B85EE0","#7E3DA0","#1A1A1F"],
    screens: [
      { label: "Onboarding", color: "#B85EE0" },
      { label: "Sitter Card", color: "#7E3DA0" },
      { label: "Booking Flow", color: "#EDD6F9" },
    ],
    concept: true
  }
];

export const Y_PROJECTS = [
  {
    id: "brocard",
    index: "01",
    name: "BROCARD",
    tagline: "From 0 to Ukraine's #1 beauty app",
    type: "Mobile E-commerce · iOS & Android",
    role: "Product Owner",
    timeline: "6-month MVP · 2023 — Present",
    tools: ["Jira", "Confluence", "Amplitude", "Figma"],
    accent: "#E8DDB5",
    accentLight: "rgba(232,221,181,0.06)",
    problem: "BROCARD — Ukraine's largest beauty retailer — had zero mobile presence. All digital revenue flowed through a desktop website. The 18–25 demographic was churning to competitors with native apps. Leadership tasked the team with building a full-featured shopping app from scratch, with a 6-month window to App Store launch.",
    research: [
      { label: "Mobile revenue share", value: "60%",      note: "before launch — 100% desktop" },
      { label: "18–25 segment",        value: "Churning", note: "moving to mobile-native competitors" },
      { label: "MVP window",           value: "6 months", note: "App Store approval added 2 months" },
      { label: "App Store ranking",    value: "Top 5",    note: "Shopping category · Ukraine" },
    ],
    insights: [
      "Young users expected loyalty integration from day one — not as a later phase",
      "AR try-on was a trust-builder, not just a novelty — it reduced returns and increased add-to-cart confidence",
      "Gamification ('Shake for discount') drove 3–5% audience shift during promos with near-zero dev cost",
    ],
    decisions: [
      { title: "Loyalty in v1",        desc: "Integrated digital loyalty card at launch rather than delaying to v2 — drove immediate repeat purchase behaviour." },
      { title: "AR as conversion lever",desc: "Shipped virtual makeup try-on via ARKit/ARCore. Reduced product return rate and increased add-to-cart confidence." },
      { title: "Gamification loop",    desc: "'Shake for discount' mechanic created viral sharing moments during promo events — built into the core feature set, not added on." },
    ],
    metrics: [
      { value: "2M+",   label: "total installs",       delta: "up" },
      { value: "400K+", label: "monthly active users", delta: "up" },
      { value: "+20%",  label: "total sales growth",   delta: "up" },
      { value: "+30%",  label: "18–25 segment growth", delta: "up" },
    ],
    stats: [
      { label: "Installs",    value: "2,000,000+", sub: "total" },
      { label: "MAU",         value: "400,000+",   sub: "monthly active" },
      { label: "Sales",       value: "+20%",       sub: "total growth" },
      { label: "Segment",     value: "+30%",       sub: "18-25 growth" },
    ],
  },
  {
    id: "crystal",
    index: "02",
    name: "Crystal Blockchain",
    tagline: "Top of funnel, top of search",
    type: "B2B SaaS · Blockchain Intelligence",
    role: "Freelance Product Consultant",
    timeline: "33 months · May 2022 — Feb 2025",
    tools: ["Google Analytics", "Ahrefs", "SEMrush", "Hotjar"],
    accent: "#5FAD6A",
    accentLight: "rgba(95,173,106,0.06)",
    problem: "Crystal Blockchain Analytics — trusted by financial institutions for on-chain intelligence — had strong product-market fit but a weak top of funnel. Organic traffic was flat year-over-year, lead quality was inconsistent, and key product pages were missing from Google's first page despite strong brand recognition in the blockchain space.",
    research: [
      { label: "Organic traffic",  value: "Flat YoY",   note: "despite growing brand presence" },
      { label: "Target rankings",  value: "Page 2–3",   note: "missing high-intent search queries" },
      { label: "Lead quality",     value: "Low",        note: "volume present, conversion inconsistent" },
      { label: "Content gaps",     value: "Critical",   note: "competitors outranking on core terms" },
    ],
    insights: [
      "High-intent B2B searchers were landing on unoptimised pages with no clear conversion path",
      "Competitor content was deeper and more authoritative — Crystal ranked for brand only, not for category",
      "Lead forms had friction for institutional buyers — procurement workflows weren't accommodated",
    ],
    decisions: [
      { title: "Use-case-first content", desc: "Rebuilt core pages around high-intent keywords with depth. Shifted from feature pages to use-case landing pages targeting buyer jobs-to-be-done." },
      { title: "Conversion path redesign",desc: "Redesigned lead capture to match institutional buyer journey — multi-step, lower friction, demo-first CTA above the fold." },
      { title: "Technical SEO foundation",desc: "Addressed crawlability, Core Web Vitals, and structured data gaps that were suppressing indexation across key product pages." },
    ],
    metrics: [
      { value: "+40%", label: "organic traffic",        delta: "up" },
      { value: "+20%", label: "lead growth",            delta: "up" },
      { value: "#1",   label: "key Google rankings",    delta: "up" },
      { value: "Top 3",label: "for all target queries", delta: "up" },
    ],
    stats: [
      { label: "Traffic",   value: "+40%",  sub: "organic growth" },
      { label: "Leads",     value: "+20%",  sub: "lead growth" },
      { label: "Rankings",  value: "#1",    sub: "key queries" },
      { label: "Position",  value: "Top 3", sub: "target queries" },
    ],
  },
  {
    id: "docua",
    index: "03",
    name: "DOC.ua",
    tagline: "Scaling Ukraine's health marketplace",
    type: "Medical Marketplace · Web & Mobile",
    role: "Product Owner",
    timeline: "2 years · 2020 — 2022",
    tools: ["Jira", "Mixpanel", "Hotjar", "Confluence"],
    accent: "#7AB0FF",
    accentLight: "rgba(122,176,255,0.06)",
    problem: "DOC.ua — Ukraine's largest online medical appointment platform — was experiencing growing pains at scale. The core booking flow had accumulated UX debt, doctor profile pages had low conversion, and specialty search had poor relevance. As Product Owner, the mandate was to improve conversion and patient experience across web and mobile.",
    research: [
      { label: "Lifetime bookings",  value: "3M+",          note: "total appointments on platform" },
      { label: "Drop-off point #1",  value: "Doctor profiles",note: "patients couldn't evaluate quality" },
      { label: "Search relevance",   value: "Low",           note: "symptoms mapped to wrong specialties" },
      { label: "Mobile experience",  value: "Mobile-first", note: "form UX causing high abandonment" },
    ],
    insights: [
      "Doctor profile pages were the #1 drop-off — patients couldn't evaluate quality without digging through multiple screens",
      "Specialty search had poor relevance — users typed symptoms, got specialty codes they didn't understand",
      "Mobile booking was an afterthought — desktop-first forms caused abandonment on small screens",
    ],
    decisions: [
      { title: "Doctor profile overhaul",      desc: "Rebuilt profiles with a social proof hierarchy — patient ratings, review count, and booking volume surfaced above the fold." },
      { title: "Symptom-to-specialty mapping", desc: "Built a natural-language search layer mapping plain-language inputs to correct specialties — cut zero-result searches significantly." },
      { title: "Mobile-first booking flow",    desc: "Redesigned appointment flow for thumb-first interaction — simplified date pickers, fewer steps, summary confirmation before commit." },
    ],
    metrics: [
      { value: "3M+",  label: "appointments booked",       delta: "up" },
      { value: "+28%", label: "booking conversion",         delta: "up" },
      { value: "−40%", label: "zero-result searches",       delta: "down" },
      { value: "#1",   label: "medical platform in Ukraine", delta: "up" },
    ],
    stats: [
      { label: "Bookings",    value: "3M+",  sub: "total" },
      { label: "Conversion",  value: "+28%", sub: "booking rate" },
      { label: "Search",      value: "−40%", sub: "zero results" },
      { label: "Position",    value: "#1",   sub: "Ukraine medtech" },
    ],
  },
];
