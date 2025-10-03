# Security Operations Dashboard

## Overview

This is a modern Power BI-style analytics dashboard application for security operations, featuring three distinct sections: SIEM (Security Information and Event Management), SOAR (Security Orchestration, Automation and Response), and Bizzy (Business Operations Analytics). The application is built as a full-stack TypeScript application with a React frontend and Express backend, designed to visualize security and operational metrics through interactive charts and KPI cards.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing (single-page application)
- React Query (@tanstack/react-query) for server state management and data fetching

**UI Component System**
- Shadcn/ui component library built on Radix UI primitives for accessibility
- Tailwind CSS for utility-first styling with custom design tokens
- Custom theme system supporting both light and dark modes
- Power BI-inspired design system with professional color palette and typography (Inter font family for UI, JetBrains Mono for metrics)

**Data Visualization**
- Recharts library for rendering bar charts, line charts, pie charts, and area charts
- Modular chart components (BarChart, LineChart, PieChart) with responsive containers
- KPICard component for displaying key performance indicators with trend indicators

**State Management Approach**
- React Query handles all server state (API data fetching, caching, and synchronization)
- Local component state (useState) for UI interactions like theme toggle and tab selection
- No global state management library needed due to simple data flow requirements

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server framework
- TypeScript for type safety across the entire stack
- Middleware for JSON parsing, URL encoding, and request logging

**API Design Pattern**
- RESTful API endpoints with `/api` prefix
- Proxy pattern for SOAR widget data - backend acts as intermediary to external SOAR API
- Environment-based configuration for API URLs and authentication tokens
- Zod schemas for request/response validation

**Development vs Production**
- Development mode uses Vite middleware for HMR and asset serving
- Production mode serves pre-built static assets from dist/public
- Build process bundles both client (Vite) and server (esbuild) separately

### Data Storage Solutions

**Database Infrastructure**
- Drizzle ORM configured for PostgreSQL (Neon serverless)
- Schema-first approach with TypeScript types generated from Drizzle schemas
- Migration support through drizzle-kit for schema evolution
- Currently implements basic user authentication schema (users table with username/password)

**In-Memory Storage**
- MemStorage class implements IStorage interface for development/testing
- Map-based storage for user data without database dependency
- Provides CRUD operations: getUser, getUserByUsername, createUser

**Data Models**
- User model with id, username, and password fields
- SOAR widget request/response schemas for API integration
- Extensible schema design allows easy addition of new data models

### Authentication and Authorization

**Current Implementation**
- Basic user schema with username and password fields
- In-memory storage for user sessions during development
- Session management setup through connect-pg-simple (PostgreSQL session store)

**Security Considerations**
- SOAR API credentials stored in environment variables (SOAR_API_URL, SOAR_API_AUTH)
- No hardcoded secrets in codebase
- Ready for production authentication implementation (session-based or JWT)

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives (@radix-ui/react-*)
- **Recharts**: Composable charting library built on D3.js
- **Lucide React**: Icon library for consistent iconography
- **cmdk**: Command menu component for keyboard navigation
- **vaul**: Drawer component for mobile-friendly modals

### External APIs
- **SOAR API Integration**: 
  - External security orchestration platform accessed via proxy endpoints
  - Configured through environment variables (SOAR_API_URL, SOAR_API_AUTH)
  - Supports widget-based queries for incidents (active/closed by severity, type, role)
  - Date range filtering and grouping capabilities
  - Example queries in attached_assets directory show incident tracking patterns

### Database Services
- **Neon Serverless PostgreSQL**: 
  - Cloud-native PostgreSQL database (@neondatabase/serverless)
  - Configured via DATABASE_URL environment variable
  - Supports edge runtime and serverless functions

### Development Tools
- **Replit Plugins**: Development environment integration (@replit/vite-plugin-*)
  - Runtime error modal overlay
  - Cartographer for code navigation
  - Dev banner for development mode indication

### Build & Development Dependencies
- **TypeScript**: Static type checking across client and server
- **ESBuild**: Fast JavaScript bundler for server code
- **PostCSS & Autoprefixer**: CSS processing and vendor prefixing
- **Tailwind CSS**: Utility-first CSS framework with JIT compiler