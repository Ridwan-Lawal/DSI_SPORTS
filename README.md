# DSI Football

Live site: **https://dsifootball.live**

DSI Football is a football media platform that delivers continuous coverage of the
global game — transfer news, match analysis, player features and tournament
reporting across European, African, Asian and Middle Eastern competitions.

The project is a full publishing product rather than a static site: a
server-rendered, SEO-optimised public front end backed by a private editorial
dashboard where the newsroom writes, schedules and manages every article,
category and tag on the site.

---

## Table of contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Routing reference](#routing-reference)
- [SEO](#seo)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Contact](#contact)
- [License](#license)

---

## Features

**Public site**

- **Latest news feed** — the homepage surfaces the newest published stories with
  a featured lead article, author attribution and relative publish times.
- **Category browsing** — 16 competition-based categories (Premier League, La Liga,
  Serie A, Bundesliga, Ligue 1, UEFA Champions League, UEFA Europa League,
  Conference League, World Cup, AFCON, CAF Champions League, CAF Confederations Cup,
  Saudi Pro League, AFC Champions League, Arab Football, Transfers), filterable
  from the news index via a shareable query parameter.
- **Article pages** — featured image, byline, precise UTC publish timestamp,
  rich-text body, tag list, native share action and a "Most Recent News" module
  for onward reading.
- **Tag pages** — every story is tagged by club, player and competition, giving
  each tag its own aggregated landing page.
- **Search** — instant article search with debounced querying as the reader types.
- **Company and contact pages** — an About page plus a contact form that routes
  submissions to the correct inbox (editorial or support) based on the reader's
  selection.
- **Responsive, accessible UI** — mobile-first layout, semantic landmarks and
  skeleton loading states so the feed never renders as a blank screen.
- **Optimised media delivery** — all imagery is served from a CDN with on-the-fly
  transformation and modern formats.

**Editorial dashboard (private)**

- Credential-based sign-in with password recovery and post-login redirect back to
  the originally requested page.
- Authoring and editing of articles with featured images, categories, tags and
  publish state.
- Media uploads pushed directly to the image CDN.
- All dashboard routes are excluded from search engine indexing.

---

## Architecture

The application is a single Next.js codebase using the App Router, split into two
route groups that share a design system but not a layout:

- `(public)` — statically and dynamically rendered marketing and editorial pages.
  Article, category and tag pages are server-rendered so crawlers and social
  scrapers receive complete HTML with per-page metadata.
- `admin` / `auth` — the authenticated editorial surface. Access is enforced in
  middleware, which redirects unauthenticated requests to
  `/auth/admin/login?callback=<original-path>`.

Content is stored in the application database and read through server components,
so the browser never needs to hold API credentials. Images are uploaded to
ImageKit and referenced by URL, keeping binary assets out of the database and the
repository.

---

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js (App Router, React Server Components) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS Modules, DM Sans and a custom display face |
| Data layer | `TODO` — e.g. PostgreSQL + Prisma / MongoDB + Mongoose |
| Auth | `TODO` — e.g. NextAuth.js / custom JWT sessions |
| Media | ImageKit (upload, storage, transformation, CDN) |
| Rich text | `TODO` — editor and renderer used in the dashboard |
| Email | `TODO` — transactional provider behind the contact form |
| Hosting | `TODO` — e.g. Vercel |

---

## Getting started

### Prerequisites

- Node.js 20 LTS or newer
- npm, pnpm or yarn
- Access to a database instance and an ImageKit account

### Installation

```bash
git clone https://github.com/<your-username>/dsi-football.git
cd dsi-football
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

The app will be available at `http://localhost:3000`.

### Database setup

```bash
# TODO: replace with the commands for your ORM, e.g.
npx prisma migrate dev
npx prisma db seed
```

---

## Environment variables

Create `.env.local` in the project root. Never commit real credentials.

```dotenv
# Application
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Database
DATABASE_URL=

# Authentication
AUTH_SECRET=
AUTH_URL=http://localhost:3000

# ImageKit
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=

# Transactional email (contact form)
EMAIL_SERVER=
EMAIL_FROM=
SUPPORT_INBOX=
EDITORIAL_INBOX=
```

---

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Create an optimised production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint across the codebase |
| `npm run typecheck` | Run the TypeScript compiler with no emit |

---

## Project structure
