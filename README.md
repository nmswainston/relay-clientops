# Relay — Client Operations

A client operations dashboard for managing accounts, communications, and workflows.

## Problem

Freelancers and agencies juggle client info across emails, spreadsheets, and disconnected tools. There's no single view of what's happening across all client accounts at once.

## Solution

Relay centralizes client operations into one dashboard — accounts, active work, and communications in a single Next.js app with a clean, fast interface built for daily use.

## Screenshots

> *Add 2–4 screenshots here*

## Tech Stack

- TypeScript
- Next.js
- Tailwind CSS
- Netlify

## Features

- Centralized client account management
- Communication and task tracking per client
- Next.js App Router with fast server-side rendering
- Reusable component library for consistent UI
- Custom hooks for shared logic
- Netlify deployment

## Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Lessons Learned

- Next.js App Router changes how you think about data fetching — co-locating fetch with the component that needs it simplifies the architecture
- Building for operational efficiency means designing for repeated daily use, not just first impressions
- Extracting shared logic into custom hooks keeps components clean and testable

## Future Improvements

- CRM integrations (HubSpot, Pipedrive)
- Automated client status reports
- Time tracking per client

---

*Built by [nmswainston](https://github.com/nmswainston)*
