# DreamFlyAir

A full-stack flight booking web application. Users can search for flights, select seats, add baggage and services, enter passenger details, make a payment, and receive a digital boarding pass in a guided multi-step booking flow.

**Live Demo:** VERCEL ADD HERE
---

## Features

- **Flight Search** — Search one-way or round-trip flights by location, destination, and date
- **Flight Selection** — Browse available flights with pricing and schedule details
- **Interactive Seat Map** — Visual aircraft layout with First Class, Business, and Economy tiers
- **Baggage Selection** — Add baggage options per flight leg
- **In-flight Services** — Optional add-ons during booking
- **Passenger Details** — Collect contact info for adults, children, and infants
- **Payment Summary** — Full cost breakdown with tax and credit card form
- **Digital Boarding Pass** — Generated pass showing seat, gate, terminal, and flight details

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, Server Components, Server Actions) |
| UI | React 19, TypeScript, CSS Modules |
| State | Zustand 5 |
| Data Fetching | SWR |
| Database | Neon (serverless PostgreSQL) |
| Deployment | Vercel |

---

## Architecture

The app separates server and client concerns cleanly:

- **React Server Components & Server Actions** handle initial data fetching (flights, airports) with caching
- **Next.js API Routes** provide a REST interface for flight search and seat availability
- **Zustand stores** persist booking state across each step of the flow on the client
- **SWR** handles client-side flight search with a custom `flightReviver` to deserialise Date objects from JSON

### Booking Flow

```
Home (search)
  → Flight Selection
  → Seat Selection
  → Baggage
  → Services
  → Passenger Details
  → Payment
  → Boarding Pass
```
---

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech/) PostgreSQL database

### Installation

```bash
git clone https://github.com/SammmyJr/DreamFlyAir.git
cd DreamFlyAir
npm install
```
---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Home / search page
│   ├── actions.ts                # Server actions (getFlights, getAirports)
│   ├── api/
│   │   ├── route.ts              # GET /api — featured flights
│   │   ├── airport/route.ts      # GET /api/airport — airport list
│   │   └── booking/
│   │       ├── flight/route.ts   # GET /api/booking/flight — flight search
│   │       └── seat/route.ts     # GET /api/booking/seat — seat availability
│   └── booking/
│       ├── flight/               # Step 1: select flights
│       ├── seat/                 # Step 2: select seats
│       ├── baggage/              # Step 3: add baggage
│       ├── service/              # Step 4: in-flight services
│       ├── detail/               # Step 5: passenger info
│       ├── payment/              # Step 6: payment
│       └── pass/                 # Step 7: boarding pass
├── components/                   # Reusable UI and form components
├── stores/                       # Zustand state stores
├── types/                        # TypeScript type definitions
└── utils/                        # Helper utilities
```
