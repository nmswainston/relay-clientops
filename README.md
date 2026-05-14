# Relay — Client Operations

A client operations dashboard for managing accounts, communications, and workflows.

## Overview

Relay is a client-ops tool designed to centralize the operational side of client management. Built with Next.js for a fast, full-stack experience — the app layer handles routing and API routes, with a component library for common UI patterns.

## Tech Stack

- TypeScript
- Next.js
- Tailwind CSS
- Netlify (deployment)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

## Project Structure

```
app/          # Next.js App Router pages and API routes
components/   # Reusable UI components
hooks/        # Custom React hooks
lib/          # Utilities and helpers
types/        # TypeScript type definitions
public/       # Static assets
styles/       # Global styles
```

## Deployment

Configured for Netlify — see `netlify.toml`. Deploy by pushing to `main`.

---

*Built by [nmswainston](https://github.com/nmswainston)*
