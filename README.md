# Relay

Relay is a lightweight client operations platform designed to centralize post-sale work, internal handoffs, and ongoing client context without the overhead of a traditional CRM.

## Purpose

Relay is designed to simplify operational follow-through for enterprise clients. It enables users to:
- **Quickly reorder** from past purchase orders
- **Track shipments** in real-time with visual timelines
- **Get instant help** through the Relay Assistant
- **Manage orders** from a centralized dashboard

This app supports client operations workflows like order tracking, status visibility, and repeat requests in a single, calm interface.

## Features

### Core Functionality
- **🔐 Secure Authentication** - Clean login interface with form validation
- **📊 Dashboard** - Centralized view with quick access to all features and recent orders
- **📦 Order Management** - View past orders with detailed information (PO numbers, dates, status, totals)
- **🔄 Quick Reorder** - Select items from past orders and adjust quantities with intuitive controls
- **📮 Order Tracking** - Real-time shipment tracking with visual timeline and status updates
- **🤖 Relay Assistant** - Interactive chat interface for instant answers about orders, products, and compatibility

### User Experience
- **🌓 Dark/Light Theme** - Toggle between themes with system preference detection
- **📱 Responsive Design** - Fully responsive layout that works on desktop, tablet, and mobile
- **⚡ Fast Performance** - Built with Next.js 16 for optimal performance
- **♿ Accessible** - Semantic HTML and ARIA labels for better accessibility
- **🎨 Modern UI** - Clean, professional interface with smooth animations

## 🛠️ Tech Stack

- **Next.js 16** - React framework with App Router for server-side rendering and routing
- **React 19** - Latest React features with improved performance
- **TypeScript** - Type-safe development for better code quality
- **Tailwind CSS v4** - Utility-first CSS framework with CSS-first configuration
- **PostCSS** - CSS processing and optimization

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** or **yarn** package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/relay.git
cd relay
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Login

The app currently uses mock authentication for demonstration purposes. You can use **any email and password** to log in. The authentication state is stored in localStorage.

## 📁 Project Structure

```
relay/
├── app/                          # Next.js app directory (App Router)
│   ├── login/                    # Login page with authentication
│   ├── dashboard/                # Main dashboard with quick actions
│   ├── orders/                   # Orders list and detail pages
│   │   ├── [id]/                 # Dynamic order detail page
│   │   └── page.tsx              # Orders list page
│   ├── tracking/                 # Order tracking pages
│   │   └── [orderId]/           # Dynamic tracking page
│   ├── layout.tsx                # Root layout with theme provider
│   ├── page.tsx                  # Home page (redirects to login)
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   │   ├── Button.tsx           # Button component with variants
│   │   ├── Card.tsx             # Card container component
│   │   ├── Input.tsx            # Form input component
│   │   ├── EmptyState.tsx       # Empty state placeholder
│   │   └── LoadingSpinner.tsx   # Loading indicator
│   ├── Header.tsx                # Navigation header
│   ├── BetterBotPanel.tsx        # AI assistant chat panel
│   ├── OrderItem.tsx            # Order item with quantity controls
│   ├── OrderInfoCard.tsx        # Reusable order information card
│   ├── StatusBadge.tsx         # Order status badge component
│   ├── Timeline.tsx             # Tracking timeline visualization
│   ├── ChatMessage.tsx         # Chat message component
│   ├── ThemeProvider.tsx        # Theme context provider
│   └── ThemeToggle.tsx         # Theme switcher button
├── hooks/                       # Custom React hooks
│   └── useAuthGuard.ts          # Authentication guard hook
├── lib/                         # Utilities and data
│   ├── utils.ts                 # Utility functions (formatting, status badges)
│   └── mockData.ts              # Mock data for orders, products, tracking
├── types/                       # TypeScript type definitions
│   ├── order.ts                 # Order and order item types
│   ├── product.ts               # Product types
│   ├── tracking.ts              # Tracking information types
│   └── chat.ts                   # Chat message types
└── public/                      # Static assets
    └── logo.svg                 # Relay logo
```

## 🖥️ Key Screens

### 1. Login Screen (`/login`)
- Clean, minimal authentication interface
- Email and password validation
- Theme toggle available
- Redirects to dashboard on successful login

### 2. Dashboard (`/dashboard`)
- Overview of recent orders (last 3)
- Quick action cards for common tasks
- Direct access to Relay Assistant
- Status badges for order states
- Links to track latest order

### 3. Past Orders (`/orders`)
- Complete list of all past orders
- Order details: PO number, date, status, total
- Click to view order details
- Status indicators with color coding

### 4. Order Detail (`/orders/[id]`)
- Full order information
- Item selection with checkboxes
- Quantity adjustment controls
- Real-time total calculation
- Reorder functionality

### 5. Order Tracking (`/tracking/[orderId]`)
- Visual timeline of order progress
- Shipping details and carrier information
- Estimated delivery date
- Order summary sidebar
- Status progression visualization

### 6. Relay Assistant Panel
- Slide-out chat interface
- Example questions for quick access
- Chat history with timestamps
- Accessible from dashboard or via custom event

## 📊 Mock Data

The app uses mock data for demonstration purposes:

- **4 Sample Orders** - Various statuses (delivered, out-for-delivery, shipped, processing)
- **Product Catalog** - Hardware items including desktops, laptops, monitors, RAM, and accessories
- **Tracking Information** - Detailed tracking data for shipped orders with events and locations
- **Relay Assistant Responses** - Predefined responses for common questions about orders, stock, and compatibility

## 🎨 UI Components

The app includes a comprehensive set of reusable UI components:

- **StatusBadge** - Color-coded status indicators for orders
- **EmptyState** - Placeholder for empty states
- **LoadingSpinner** - Loading indicators
- **OrderInfoCard** - Reusable card for displaying order information
- **Button** - Multiple variants (primary, secondary, outline) and sizes
- **Card** - Container component with hover effects
- **Input** - Form input with error handling

## 🔧 Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

### Code Structure

The codebase follows best practices:
- **TypeScript** for type safety
- **Component-based architecture** with reusable components
- **Utility functions** centralized in `lib/utils.ts`
- **Custom hooks** for shared logic
- **Consistent styling** with Tailwind CSS
- **Dark mode support** throughout the application

## 📋 Features in Detail

### Quick Reorder
- Browse past purchase orders
- Select items to reorder with checkboxes
- Adjust quantities with increment/decrement buttons
- Toggle items on/off individually
- Real-time subtotal and total calculation
- Success feedback on reorder

### Order Tracking
- Visual timeline showing order progression
- Status indicators: Ordered → Processing → Shipped → Out for Delivery → Delivered
- Event descriptions and locations
- Timestamp information for each status change
- Shipping carrier and tracking number display
- Estimated delivery date

### Relay Assistant
- Slide-out chat panel (accessible from anywhere)
- Example questions for quick access
- Keyword-based response matching
- Chat history with message timestamps
- User and assistant message differentiation
- Smooth animations and transitions

### Theme System
- Light and dark mode support
- System preference detection
- Persistent theme selection
- Smooth theme transitions
- Consistent theming across all components

## 🚧 Future Enhancements

- **Backend Integration** - Real API endpoints for orders and tracking
- **AI Service Integration** - Connect Relay Assistant to an actual AI service (OpenAI, Anthropic, etc.)
- **Authentication System** - Implement proper authentication with JWT or OAuth
- **Real-time Updates** - WebSocket integration for live order status updates
- **Email Notifications** - Order confirmations and shipping notifications
- **Advanced Search** - Search orders by PO number, date range, status
- **Filtering & Sorting** - Filter orders by status, date, or amount
- **Product Catalog** - Browse and search full product catalog
- **Support Tickets** - Integrated support ticket system
- **User Profiles** - User account management and preferences
- **Order History Export** - Export order history to CSV/PDF
- **Bulk Operations** - Bulk reorder and bulk actions

## 📝 License

This is a demonstration project for Relay.

## 🤝 Contributing

This is a private project. For questions or suggestions, please contact the Relay team.

---

**Built with care for Relay**
