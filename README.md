## Project Structure
contractor-quote-builder/
├── app/ # Next.js app directory
│ ├── api/ # API routes
│ │ └── contracts/ # Contract-related endpoints
│ ├── components/ # Reusable React components
│ │ ├── ui/ # UI components (buttons, inputs, etc.)
│ │ └── layout/ # Layout components
│ └── pages/ # Application pages
├── lib/ # Utility functions and shared logic
├── types/ # All Typescript Defind (Data Models)
├── tmp/ # temporary files like data.json

## Tech Stack

- **Frontend**: Next.js, React,
- **Styling**: TailwindCSS
- **State Management**: None, since no need for this small app
- **Data Storage**: /tmp/data.json

## Features

- Create and manage contractor quotes
- Add line items with quantities and prices
- Calculate totals automatically

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/cristian081496/contractor-builder.git

## How to Set Up

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

** no need to set up environment

## API Routes
** Contracts
GET /api/contracts - Get all contracts
GET /api/contracts/[id] - Get specific contract
POST /api/contracts - Create new contract
PUT /api/contracts/[id] - Update contract
DELETE /api/contracts/[id] - Delete contract

## Component Structure
** Layout Components
** Header - Main navigation and branding
** Footer - Site footer with links
** Other layout components
** UI Components
** Button - Reusable button component
** Input - Form input fields