# Better Direct - Client Ordering App

A modern client ordering application built with Next.js, React, and Tailwind CSS. This app streamlines hardware ordering and tracking for IT managers and procurement coordinators.

## Features

- **Quick Reorder**: Reorder items from past purchases with just a few clicks
- **Order Tracking**: Real-time shipment tracking with timeline visualization
- **BetterBot AI Assistant**: Chat interface for instant answers about orders and products
- **Dashboard**: Centralized view of all key features and recent orders
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework with CSS-first configuration
- **React 19** - Modern React with latest features

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Login

The app uses mock authentication. You can use any email and password to log in.

## Project Structure

```
better-direct/
├── app/                    # Next.js app directory
│   ├── login/              # Login page
│   ├── dashboard/          # Dashboard page
│   ├── orders/             # Orders list and detail pages
│   ├── tracking/           # Order tracking pages
│   └── layout.tsx          # Root layout
├── components/             # React components
│   ├── ui/                 # Reusable UI components
│   ├── Header.tsx           # Navigation header
│   ├── BetterBotPanel.tsx  # AI assistant panel
│   ├── OrderItem.tsx       # Order item component
│   ├── Timeline.tsx        # Tracking timeline
│   └── ChatMessage.tsx    # Chat message component
├── lib/                    # Utilities and mock data
│   └── mockData.ts         # Mock data for orders, products, tracking
├── types/                  # TypeScript type definitions
└── tailwind.config.ts      # Tailwind configuration
```

## Key Screens

1. **Login Screen** (`/login`) - Clean, minimal authentication
2. **Dashboard** (`/dashboard`) - Quick access to all features
3. **Past Orders** (`/orders`) - List of all past orders
4. **Order Detail** (`/orders/[id]`) - Reorder interface with quantity selectors
5. **Order Tracking** (`/tracking/[orderId]`) - Timeline visualization of shipment status
6. **BetterBot Panel** - Slide-out AI assistant (accessible from dashboard)

## Mock Data

The app uses mock data for demonstration purposes:
- 4 sample orders with various statuses
- Product catalog with hardware items
- Tracking information for shipped orders
- Predefined BetterBot responses

## Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Features in Detail

### Quick Reorder
- View past purchase orders
- Select items to reorder
- Adjust quantities with increment/decrement controls
- Toggle items on/off with checkboxes
- See real-time total calculation

### Order Tracking
- Visual timeline showing order progress
- Status indicators (Ordered → Processing → Shipped → Out for Delivery → Delivered)
- Shipping details and estimated delivery
- Tracking number and carrier information

### BetterBot AI Assistant
- Slide-out chat panel
- Example questions for quick access
- Mock AI responses based on keyword matching
- Chat history with timestamps

## Future Enhancements

- Real backend API integration
- Actual AI service integration for BetterBot
- User authentication with proper auth system
- Real-time order updates
- Email notifications
- Advanced search and filtering
- Product catalog browsing
- Support ticket system implementation

## License

This is a demonstration project for Better Direct.

