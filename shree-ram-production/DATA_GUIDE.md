# Shree Ram Production — Page-by-Page Data Guide

Welcome! This guide is organized **page by page**. Whenever you want to edit a specific page, just jump to that page's section below to see exactly which files control its text, images, and data.

---

## 📑 Table of Contents

1. [🏠 Homepage (`/`)](#1--homepage-)
2. [🛠️ Services Page (`/services`)](#2-️-services-page-services)
3. [💼 Work / Portfolio Page (`/work`)](#3--work--portfolio-page-work)
4. [👥 About Page (`/about`)](#4--about-page-about)
5. [📞 Contact Page (`/contact`)](#5--contact-page-contact)
6. [🌐 Global Info (SEO, Contact Notifications, Footer, Logo)](#6--global-settings--brand-info)

---

# 1. 🏠 Homepage (`/`)

The homepage is composed of several sections from top to bottom. Here is where the data for each section is located:

### Section 1.1: Hero Section (Top Screen)
* **File:** [`src/data/content.ts`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/data/content.ts)
  * **Hero Stats Bar (e.g. 04 Core Pillars, 24+ Services, etc.):**
    Look for `export const HERO_STATS = [...]` (line ~6).
  * **Orbiting Project Cards:**
    Automatically takes the first 6 projects from `PORTFOLIO_ITEMS` in `src/data/content.ts`.

### Section 1.2: Brand Statement ("Everything Your Business Needs To Grow")
* **File:** [`src/components/BrandStatement.tsx`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/components/BrandStatement.tsx)
  * Contains the large headline and the agency narrative text.

### Section 1.3: 4 Core Pillars Overview (Horizontal Cards)
* **File:** [`src/data/content.ts`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/data/content.ts)
  * Look for `export const SERVICE_PILLARS = [...]` (line ~13).
  * Edit the 4 main pillar cards: `title`, `tagline`, `description`, `capabilities` list, and `image`.

### Section 1.4: Homepage Project Showreel (3 Animated Marquee Rows)
* **File:** [`src/data/content.ts`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/data/content.ts) (`PORTFOLIO_ITEMS`)
* **File:** [`src/components/Portfolio.tsx`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/components/Portfolio.tsx#L40-L63)
  * `row1Projects`, `row2Projects`, and `row3Projects` select specific projects from `PORTFOLIO_ITEMS` to show on the animated homepage marquee.

### Section 1.5: 4-Step Process Flywheel (Discover ➔ Create ➔ Launch ➔ Scale)
* **File:** [`src/data/content.ts`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/data/content.ts)
  * Look for `export const PROCESS_STEPS: ProcessStep[] = [...]` (line ~332).
  * Edit each phase's `phase`, `title`, `description`, and `outcomes` bullet points.

### Section 1.6: Client Testimonials & Reviews
* **File:** [`src/data/content.ts`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/data/content.ts)
  * Look for `export const TESTIMONIALS: Testimonial[] = [...]` (line ~450).
  * Edit `quote`, `author`, `role`, `company`, `impactMetric`, and `avatar`.

### Section 1.7: Behind The Scenes (BTS Studio Gallery)
* **File:** [`src/data/content.ts`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/data/content.ts)
  * Look for `export const BEHIND_THE_SCENES = [...]` (line ~367).
  * Edit camera setup photos, gear titles, tags, and captions.

### Section 1.8: Interactive Project Calculator
* **File:** [`src/data/content.ts`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/data/content.ts)
  * Look for `export const CALCULATOR_OPTIONS = [...]` (line ~398).
  * Edit service package names, timelines, and impact tiers.

---

# 2. 🛠️ Services Page (`/services`)

The Services page displays the 4 Core Pillars. Each pillar has its own list of capabilities and an infinite project showcase.

### 2.1 Pillar Capabilities (Titles & Descriptions)
* **File:** [`src/data/servicesData.ts`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/data/servicesData.ts)
  Contains `SERVICES_PILLARS` with 4 pillars:
  1. **Content & Production** (`id: 'content-production'`)
     * Photography, Videography, Reels, Product Shoots, Promotional Videos, Video Editing, Motion Graphics, Event Coverage.
  2. **Brand & Creative** (`id: 'brand-creative'`)
     * Brand Identity, Logo Design, Graphic Design, Social Media Creatives, Packaging Design, UI/UX Design, Marketing Creatives.
  3. **Marketing & Growth** (`id: 'marketing-growth'`)
     * Social Media Marketing, SEO, Meta Ads, Google Ads, Content Marketing, Lead Generation, Influencer Marketing, Conversion Optimization.
  4. **Technology & Digital** (`id: 'technology-digital'`)
     * Website Development, E-commerce, Web Applications, Mobile Applications, Landing Pages, Dashboards, CRM, Business Automation.

To edit or add a service capability in any pillar, edit its object:
```typescript
{
  id: 'photography',                                             // Unique slug
  number: '01',                                                  // Display number
  name: 'Photography',                                           // Capability title
  description: 'High-end commercial, product, and editorial...'  // Capability description
}
```

### 2.2 Pillar Showcase Projects (The Marquee under each Pillar)
* **File:** [`src/data/content.ts`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/data/content.ts)
  * You **do not** need to edit `servicesData.ts` to attach projects!
  * Each pillar automatically pulls all projects from `PORTFOLIO_ITEMS` that match its `category`:
    * `category: 'production'` ➔ Appears automatically under **Content & Production**
    * `category: 'branding'` ➔ Appears automatically under **Brand & Creative**
    * `category: 'marketing'` ➔ Appears automatically under **Marketing & Growth**
    * `category: 'technology'` ➔ Appears automatically under **Technology & Digital**

---

# 3. 💼 Work / Portfolio Page (`/work`)

The Work page is your full portfolio showcase featuring category filters and interactive case study modals.

### 3.1 All Portfolio Projects & Real Video Reels
* **File:** [`src/data/content.ts`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/data/content.ts)
  Look for `export const PORTFOLIO_ITEMS: PortfolioItem[] = [...]` (starts at line ~84).

The Production section now features your **19 Real Video Reels** located in `src/assets/reels/` (and served via `public/reels/`):
1. **Royal Enfield** (`/reels/Royal-Enfeild.mp4`) — Cinematic Commercial Shoot
2. **Philips Healthcare** (`/reels/Phillips-Event.mp4`) — Global Summit & Event Highlights
3. **Kaya Kalp** (`/reels/Kaya-Kalp.mp4`) — Luxury Wellness & Brand Storytelling
4. **Autonomous Mobility** (`/reels/Self-Driving-Car-1.mp4`) — Self-Driving Car Tech
5. **Brand Elevation** (`/reels/Pramotion-reel.mp4`) — High-Velocity Commercial Reel
6. **Shree Ram Production** (`/reels/Intro.mp4`) — Agency Showreel & Manifesto
7. **The Royal Heritage Wedding** (`/reels/Wedding-Reels.mp4`) — Grand Wedding Film
8. **Celestial Romance** (`/reels/Wedding-Reel-2.mp4`) — Luxury Destination Wedding
9. **Eternal Elegance** (`/reels/Wedding-Reel-3.mp4`) — Sangeet & Celebration Highlights
10. **Titan World Store** (`/reels/Titan-Watch-World-Store.mp4`) — Luxury Timepieces & Retail Experience
11. **Jockey Store** (`/reels/Jockey-Store.mp4`) — Premium Retail Store & Lifestyle Reel
12. **Fastrack Store** (`/reels/FastTrack-Store.mp4`) — Youth Fashion & Accessories Retail Reel
13. **Tunwal E-Bike Morbi** (`/reels/Tunwal-Ebike-Showroom-Morbi.mp4`) — Smart Electric Mobility Reel
14. **Big Bite Fast Food** (`/reels/Big-Bite-Fast-Food.mp4`) — Culinary & Dine-In Commercial
15. **Chamunda Lassi** (`/reels/Chamunda-Lassi.mp4`) — Authentic Refreshment & Brand Story
16. **Modern Lassi** (`/reels/Modern-Lassi.mp4`) — Handcrafted Flavor & Refreshment
17. **Har Bhole Plywood** (`/reels/Har-Bhole-Plywood.mp4`) — Architectural Materials & Craft
18. **Maruti Communication** (`/reels/Maruti-Communication-Mobile- Accesories-Shop.mp4`) — Mobile & Accessories Flagship
19. **Autonomous Mobility Future** (`/reels/Self-Driving-Car.mp4`) — Future of Self-Driving Tech

### How Video Reels Play on the Website:
- **Work Page & Homepage Marquee Cards:** Videos play continuously muted and looped (`autoPlay muted loop playsInline`).
- **Case Study Modal:** Clicking any project opens the interactive modal where visitors can watch the full video with sound, scrub controls, and full detail.
- **Services Showcase:** Under the *Content & Production* pillar on `/services`, all 19 video reels loop smoothly in the horizontal marquee.

### How to Add a New Project:

#### A. Adding a New Video Reel:
1. **Drop your video file into `public/reels/`**:
   Example: `public/reels/My-New-Reel.mp4`
2. **Run the automatic optimizer command**:
   ```bash
   npm run optimize:videos
   ```
   *This automatically creates:*
   - `public/reels/webm/My-New-Reel.webm` (lightweight WebM for mobile)
   - `public/reels/posters/My-New-Reel.webp` (instant poster image)
   - `public/reels/My-New-Reel.mp4` (compressed fast-streaming MP4 fallback)
3. **Add the entry to `src/data/content.ts`** under `PORTFOLIO_ITEMS`:
   ```typescript
   {
     id: 'my-new-reel',
     title: 'Brand Campaign — Cinematic Commercial',
     category: 'production',
     thumbnail: '/reels/posters/My-New-Reel.webp',
     posterUrl: '/reels/posters/My-New-Reel.webp',
     webmUrl: '/reels/webm/My-New-Reel.webm',
     videoUrl: '/reels/My-New-Reel.mp4',
   },
   ```

#### B. Adding Graphic Designing Photos (Cinematic Single-Photo Slideshows):
1. **Drop your photos into `public/images/graphic_designing/`**:
   Example: `public/images/graphic_designing/My-Brand-Design.jpeg`
2. **Run the automatic image optimizer command**:
   ```bash
   npm run optimize:images
   ```
   *This automatically creates:*
   - `public/images/graphic_designing/webp/My-Brand-Design.webp` (ultra-compressed, crisp WebP)
   - `public/images/graphic_designing/original_backup/My-Brand-Design.jpeg` (safe original backup)
3. **Add the entry to `src/data/content.ts`** under `PORTFOLIO_ITEMS` using the `images: [...]` array:
   ```typescript
   {
     id: 'graphic-design-my-suite',
     title: 'Brand Suite — Visual Identity Systems',
     client: 'Client Name',
     category: 'graphic-design',
     categoryLabel: 'Graphic Design',
     year: '2026',
     thumbnail: '/images/graphic_designing/webp/My-Brand-Design-1.webp',
     images: [
       '/images/graphic_designing/webp/My-Brand-Design-1.webp',
       '/images/graphic_designing/webp/My-Brand-Design-2.webp',
       '/images/graphic_designing/webp/My-Brand-Design-3.webp',
       '/images/graphic_designing/webp/My-Brand-Design-4.webp',
     ],
     metrics: { label: 'Brand Lift', value: '+200%' },
     summary: 'Complete graphic design and visual communication suite.',
     deliverables: ['Logo Mark', 'Packaging', 'Social Kit', 'Print Collateral'],
   },
   ```
   *Cards with multiple images automatically display as a single photo that smoothly cycles through its photos in a cinematic slideshow in Row 2 of the homepage and in the Work page gallery!*

#### C. Adding a Single Photo / Image Project (Branding, Marketing, Technology):
1. Place your image in `public/images/projects/` (or use an Unsplash / hosted CDN image URL).
2. Add the entry to `src/data/content.ts` under `PORTFOLIO_ITEMS`:
   ```typescript
   {
     id: 'luxury-brand-identity',
     title: 'Aura Living — Global Brand Architecture',
     client: 'Aura Lifestyle Co.',
     category: 'branding',             // 'branding' | 'marketing' | 'technology'
     categoryLabel: 'Brand & Creative',
     year: '2025',
     thumbnail: '/images/projects/aura-living.webp', // or https://images.unsplash.com/...
     summary: 'Complete brand overhaul and packaging design.',
   },
   ```
For non-reel case studies that include metrics, challenges, and deliverables:
```typescript
{
  id: 'my-project-slug',                                              // Unique identifier
  title: 'Project Title — Subtitle',                                  // Card headline
  client: 'Client / Brand Name',                                      // Client name
  category: 'branding',                                               // 'branding' | 'marketing' | 'technology'
  categoryLabel: 'Brand Architecture',                                // Tag badge on top of card
  year: '2026',                                                       // Completion year
  thumbnail: 'https://images.unsplash.com/...',                       // Image URL
  metrics: { label: 'Revenue Lift', value: '+340%' },                 // Highlight result stat
  summary: 'Short overview of what was created for this client.',     // Modal summary
  deliverables: ['Visual Identity', 'Brand Guidelines', 'Packaging'], // Deliverable list
  challenge: 'The specific problem or goal the client faced.',        // Modal challenge section
  solution: 'How Shree Ram Production executed the project.'          // Modal solution section
}
```

> 🎬 **Adding New Video Reels:**
> Put your new `.mp4` video files in [`src/assets/reels/`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/assets/reels) or [`public/reels/`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/public/reels) and set `videoUrl: '/reels/your-video.mp4'` with only the `title`!

---

# 4. 👥 About Page (`/about`)

The About page tells the agency story and introduces your team. Each section has its own component in [`src/components/about/`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/components/about/):

### Section 4.1: Who We Are & Founding Mission
* **File:** [`src/components/about/WhoWeAre.tsx`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/components/about/WhoWeAre.tsx#L124-L145)
  * Headline: *"MORE THAN A PRODUCTION AGENCY"*
  * Founding story paragraph
  * Three core brand mantras: `CREATE` · `CAPTIVATE` · `SCALE`

### Section 4.2: Team Members & Photos
* **File:** [`src/components/about/AboutTeam.tsx`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/components/about/AboutTeam.tsx#L19-L56)
  * Look for `const TEAM_MEMBERS: TeamMember[] = [...]` (line ~19).
  * Edit:
    * `firstName` & `surname`
    * `pillar` (e.g. `'CONTENT & PRODUCTION'`)
    * `role` (e.g. `'Cinematography & Field Execution'`)
    * `image` (import local photo or link)

### Section 4.3: Agency Philosophy & Core Tenets
* **File:** [`src/components/about/AboutPhilosophy.tsx`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/components/about/AboutPhilosophy.tsx)
  * Edit the 4 philosophical pillars (Creative Boldness, Commercial Rigor, Modern Velocity, Human Craft).

### Section 4.4: 4-Step Approach Details
* **File:** [`src/components/about/AboutApproach.tsx`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/components/about/AboutApproach.tsx)
  * Edit the deep dive into your workflow phases.

### Section 4.5: What Makes Us Different
* **File:** [`src/components/about/AboutDifferentiation.tsx`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/components/about/AboutDifferentiation.tsx)
  * Competitive differentiators and agency advantages.

### Section 4.6: Personal Note / Founder Statement
* **File:** [`src/components/about/AboutHumanStatement.tsx`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/components/about/AboutHumanStatement.tsx)
  * Personal message and closing commitment to clients.

---

# 5. 📞 Contact Page (`/contact`)

### Section 5.1: Contact Form Options & Copy
* **File:** [`src/components/contact/ContactEnquiry.tsx`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/components/contact/ContactEnquiry.tsx)
  * Contains the interactive form options, budget tiers, and service check boxes.

### Section 5.2: Where Inquiries Get Delivered (Email & WhatsApp)
* **File:** [`src/utils/notify.ts`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/utils/notify.ts#L11-L13)
  When a visitor submits the contact form, it notifies you via email and WhatsApp:
  ```typescript
  export const TEAM_EMAIL = 'shreeramproduction7@gmail.com'; // Change to your agency email
  export const TEAM_WHATSAPP_NUMBER = '919876543210';        // Change to your WhatsApp phone (country code + number, no '+')
  export const TEAM_WHATSAPP_DISPLAY = '+91 98765 43210';    // Display format shown to visitors
  ```

---

# 6. 🌐 Global Settings & Brand Info

These apply across the entire website on every page:

### 6.1 Studio Location & Footer Links
* **File:** [`src/components/Footer.tsx`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/components/Footer.tsx#L135-L150)
  * Office location: `Ahmedabad, Gujarat, India`
  * Social links, copyright text, and legal links.

### 6.2 SEO, Google Search Titles & Descriptions
* **File:** [`src/data/seo.ts`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/data/seo.ts)
  * `SITE_NAME`, `SITE_URL`, `SITE_IMAGE`
  * `HOME_SEO`: Meta title & description for Google on Homepage
  * `SERVICES_SEO`: Meta title & description for Services Page
  * `WORK_SEO`: Meta title & description for Work Page
  * `ABOUT_SEO`: Meta title & description for About Page
  * `CONTACT_SEO`: Meta title & description for Contact Page
  * `createHomepageJsonLd()`: Google local business address and schema.

### 6.3 Main Agency Logo
* **File:** [`src/assets/logo/shreeramproduction-logo.png`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/assets/logo/shreeramproduction-logo.png)
  * Replace this image with your high-resolution transparent logo PNG to update it across the navbar, footer, and schema.
