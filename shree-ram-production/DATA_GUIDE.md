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

### 3.1 All Portfolio Projects
* **File:** [`src/data/content.ts`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/src/data/content.ts)
  Look for `export const PORTFOLIO_ITEMS: PortfolioItem[] = [...]` (starts at line ~84).

### How to Add or Edit a Project:
```typescript
{
  id: 'my-project-slug',                                              // Unique URL identifier
  title: 'Project Title — Subtitle',                                  // Card headline
  client: 'Client / Brand Name',                                      // Client name
  category: 'production',                                             // 'production' | 'branding' | 'marketing' | 'technology'
  categoryLabel: 'Cinematic Production',                              // Tag badge on top of card
  year: '2026',                                                       // Completion year
  thumbnail: 'https://... or /projects/my-image.jpg',                 // Card image
  videoUrl: 'https://...',                                            // (Optional) Video preview link
  metrics: { label: 'Video Views', value: '14.2M+' },                 // Highlight result stat
  summary: 'Short overview of what was created for this client.',     // Modal summary
  deliverables: ['Commercial Film', 'Color Grading', 'Social Cuts'],  // Deliverable list
  challenge: 'The specific problem or goal the client faced.',        // Modal challenge section
  solution: 'How Shree Ram Production executed the project.'          // Modal solution section
}
```

> 🖼️ **Storing Your Images Locally:**
> Put your project photos in [`public/projects/`](file:///Users/mayank/Shree-Ram-Production/shree-ram-production/public) (e.g. `public/projects/apex.jpg`) and write `thumbnail: '/projects/apex.jpg'`.

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
