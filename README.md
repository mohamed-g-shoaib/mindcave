![Mind Cave Banner](./app/opengraph-image.png)

# Mind Cave

Mind Cave is a bookmark manager and digital resource organizer built with Next.js and Supabase. It allows users to save, categorize, and retrieve web content with automated metadata fetching and a high-performance dashboard interface.

## Functionality

Mind Cave solves the issue of disorganized browser bookmarks by providing a dedicated interface for resource management.

### Core Features

- **Metadata Extraction**: Automatically fetches title, description, and OpenGraph images for saved URLs.
- **Organization**: Group resources into custom categories with color-coded identifiers.
- **Search and Filtering**: Real-time filtering by category, tag, or content type.
- **Authentication**: Secure Google OAuth login via Supabase Auth.
- **Responsive Dashboard**: Optimized layout for both desktop and mobile viewports using a sidebar navigation pattern.

## Application Architecture

The application is built as a highly interactive Single Page Application (SPA) feel within the Next.js App Router.

- **Frontend**: Next.js (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Base UI, Shadcn/ui
- **State**: React Query (Server State), Local State
- **Backend**: Supabase (PostgreSQL Database, Auth, Row Level Security)

## Local Development

### Prerequisites

- Node.js 18 or later
- pnpm package manager

### Setup Instructions

1. **Clone repository**

   ```bash
   git clone https://github.com/your-org/mind-cave.git
   cd mind-cave
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure Environment**

   Create a `.env.local` file with your Supabase credentials.

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Start Application**

   ```bash
   pnpm dev
   ```

The application runs at `http://localhost:3000`.

## License

Open sourced under [Devloop](https://www.devloop.software/).
