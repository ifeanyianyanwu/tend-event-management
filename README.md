# Tend - Event Management Platform

A comprehensive event management web application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Landing Page** - Hero section, featured events, testimonials
- **Authentication** - Login/signup with form validation
- **Dashboard** - Overview stats, event management tabs
- **Event Discovery** - Browse/search events with filters
- **Event Details** - Full event information with registration
- **Event Creation** - Multi-step form for creating events
- **Ticket Management** - QR code tickets with download/share

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **Theme**: Modern dark theme with consistent design
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable components
│   ├── ui/             # shadcn/ui components
│   └── theme-*         # Theme components
└── lib/                # Utility functions
\`\`\`

## Design System

- **Colors**: Primary gradient theme with proper contrast
- **Typography**: Consistent font weights and sizes
- **Spacing**: Uniform padding/margins using Tailwind
- **Components**: shadcn/ui with proper variants
- **Responsive**: Mobile-first design

## Mock Data

The application includes realistic mock data for:
- Sample events with various categories
- User profiles and registration states
- Event statuses and attendance numbers

## License

MIT License
