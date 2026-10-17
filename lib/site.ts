// Site content. Facts and figures come from the current o7solutions.in (see docs/SITE_KNOWLEDGE.md).
import type { StaticImageData } from "next/image";
import trumath from "@/assets/work/trumath.jpg";
import rightClickJobs from "@/assets/work/rightclickjobs.jpg";
import sardarni from "@/assets/work/sardarni.jpg";
import dlm from "@/assets/work/dlm.jpg";
import skTraders from "@/assets/work/sktraders.jpg";

export const company = {
  name: "O7 Solutions",
  url: "https://www.o7solutions.in",
  email: "enquiry@o7solutions.in",
  phone: "+91 95019 99044",
  phoneAlt: "+91 62845 45231",
  whatsapp: "919501999044",
  city: "Jalandhar",
  region: "Punjab",
  country: "IN",
  certification: "ISO 9001:2015",
  geo: { lat: 31.3137145, lng: 75.591036 },
  mapsUrl: "https://maps.app.goo.gl/VizrLMwyzDeRovgD7",
  social: {
    instagram: "https://www.instagram.com/o7_solutions/",
    facebook: "https://www.facebook.com/o7solutions/",
    linkedin: "https://www.linkedin.com/company/26619023",
    x: "https://twitter.com/o7_solutions",
  },
};

export const social = [
  { label: "Instagram", href: company.social.instagram },
  { label: "LinkedIn", href: company.social.linkedin },
  { label: "Facebook", href: company.social.facebook },
  { label: "X / Twitter", href: company.social.x },
];

export const nav = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

// From the "Company Details" box on their About page.
export const stats = [
  { value: "200+", label: "Projects delivered" },
  { value: "150", label: "Clients" },
  { value: "35+", label: "Team members" },
  { value: "24×6", label: "Technical support" },
];

// Their mission / vision / goal lines, lightly tidied.
export const values = [
  {
    title: "Mission",
    quote: "We’re on a mission to become the best in the world of IT.",
    text: "Technically sound solutions that are excellent and affordable, with a transparent process.",
  },
  {
    title: "Vision",
    quote: "Vision is the picture of the future that produces passion.",
    text: "Keep innovating to grow our clients’ businesses, and build trust that lasts.",
  },
  {
    title: "Goal",
    quote: "Set your goals high and don’t stop until you get there.",
    text: "The best possible websites, apps, software and marketing for every client.",
  },
];

export const promises = [
  "Making technology approachable",
  "Client satisfaction is our motto",
  "Quality products, on time",
  "Separate QA team",
  "Support after deployment",
];

export const steps = ["Plan", "Design", "Develop", "Market"];

export type Project = {
  name: string;
  category: string;
  url: string;
  image: StaticImageData;
  summary: string;
  tags: string[];
};

// Live client sites from their portfolio page (the others no longer load).
export const projects: Project[] = [
  {
    name: "TruMath",
    category: "Education",
    url: "https://trumath.in/",
    image: trumath,
    summary: "Maths coaching for IIT JEE, with course purchase, free trials and student login.",
    tags: ["Courses", "Free trial", "Login"],
  },
  {
    name: "Right Click Jobs",
    category: "Job portal",
    url: "https://rightclickjobs.com/",
    image: rightClickJobs,
    summary: "A job portal for freshers: search by role and city, packages and registration.",
    tags: ["Job search", "Packages", "Accounts"],
  },
  {
    name: "Sardarni Upto Date",
    category: "E-commerce",
    url: "https://sardarniuptodate.com/",
    image: sardarni,
    summary: "An online collection of Punjabi suits with product pages and Instagram.",
    tags: ["Online store", "Products", "Instagram"],
  },
  {
    name: "DLM School",
    category: "School",
    url: "https://dlmschoolgsp.in/",
    image: dlm,
    summary: "Divine Light Modern School, Gurdaspur: admissions, courses, infrastructure and CBSE pages.",
    tags: ["Admissions", "Courses", "CBSE"],
  },
  {
    name: "SK Traders Fitness",
    category: "E-commerce",
    url: "https://sktradersfitness.com/",
    image: skTraders,
    summary: "A fitness equipment store with a video homepage, shop and cart.",
    tags: ["Shop", "Video", "Cart"],
  },
];

export type Service = {
  slug: string;
  title: string;
  summary: string;
  points: string[];
  visual: string;
};

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Website Development",
    summary: "Informative, e-commerce and custom websites, designed and developed in-house.",
    points: ["E-commerce", "CMS development", "Custom development", "ERP solutions", "Interactive websites"],
    visual: "/services/web.svg",
  },
  {
    slug: "mobile-development",
    title: "Mobile Apps",
    summary: "Static, custom and e-commerce apps for Android and iOS.",
    points: ["Android apps", "iOS apps", "Hybrid apps", "iOS UI/UX design", "Multi-platform"],
    visual: "/services/mobile.svg",
  },
  {
    slug: "software-development",
    title: "Business Software",
    summary: "GST billing, inventory, CRM and ERP software built around how you work.",
    points: ["GST / billing", "Inventory", "CRM", "ERP", "Custom software"],
    visual: "/services/software.svg",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    summary: "SEO, social media, PPC, content and email marketing to grow your business online.",
    points: ["SEO", "Social media", "Google Ads (PPC)", "Content & email", "Google Analytics"],
    visual: "/services/marketing.svg",
  },
  {
    slug: "it-integration",
    title: "IT & Networks",
    summary: "Network design, structured cabling, wireless and network security.",
    points: ["Network security", "Structured cabling", "Wireless setup", "Network design", "LAN, WAN & VPN"],
    visual: "/services/network.svg",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  project: string;
  // Path to an .mp4 in /public turns the card into a video review.
  video?: string;
};

// From the testimonials on their homepage. Only business names are given there.
export const testimonials: Testimonial[] = [
  {
    quote: "They rebuilt our old website exactly the way we wanted, then handled our SEO and social media too.",
    name: "Hymoon Tours",
    project: "Website, SEO & social",
  },
  {
    quote: "Very professional and knowledgeable. Their customer service has been outstanding on the phone and by email.",
    name: "St. Soldier",
    project: "Mobile app",
  },
  {
    quote: "They came up with a design we never would have thought of, at an affordable price, and guided us every step.",
    name: "Namdhari Homeopathic",
    project: "Website",
  },
  {
    quote: "Beyond our expectations. The colours, the design, the responsiveness: everything was amazing.",
    name: "Aspella De Stella",
    project: "WordPress website",
  },
  {
    quote: "They built our security app and ERP, finished well ahead of schedule, and visited our premises whenever needed.",
    name: "HR International",
    project: "Security app & ERP",
  },
];
