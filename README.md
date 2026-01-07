![Mind Cave Banner](./app/opengraph-image.png)

# Mind Cave

Mind Cave is a production-ready bookmark manager and digital resource organizer built with Next.js and Supabase. It solves the problem of disorganized browser bookmarks by providing a dedicated, high-performance interface for resource management, designed for scale, maintainability, and real-world use.

## Core Functionality

### Intelligent Resource Management

- **Automated Metadata Extraction**: Fetches title, description, and OpenGraph images from saved URLs without manual input
- **Browser Bookmarks Import**: Drag-and-drop import from browser exports with folder selection and automatic deduplication
- **Custom Media Override**: Replace auto-fetched favicons and OG images with custom uploads when needed
- **Category Organization**: Group resources into color-coded categories with 80+ icon options

### Dashboard Experience

- **View Modes**: Switch between card and list layouts based on workflow preference
- **Grid Density Controls**: Adjust card density for compact or spacious layouts
- **Context Menus**: Right-click actions for quick bookmark and category management
- **Bulk Operations**: Select and manage multiple bookmarks simultaneously
- **Real-time Filtering**: Instant search by category, tag, or content

### Performance and Quality

- **Viewport-based Lazy Loading**: Components render only when visible, reducing initial load
- **Responsive Design**: Tested across desktop, tablets, and mobile devices
- **Dark/Light Themes**: System-aware with manual override
- **Smooth Animations**: Micro-interactions that enhance usability without sacrificing performance
- **Row Level Security**: Supabase RLS ensures data isolation per user

---

## Technical Architecture

Mind Cave is architected as a modern Single Page Application within the Next.js App Router, prioritizing maintainability and scalability.

| Layer            | Technology                                 |
| ---------------- | ------------------------------------------ |
| Framework        | Next.js (App Router), React 19, TypeScript |
| Styling          | Tailwind CSS v4, Base UI, Shadcn/ui        |
| Animations       | Framer Motion                              |
| State Management | TanStack React Query (Server State)        |
| Backend          | Supabase (PostgreSQL, Auth, Storage, RLS)  |
| Icons            | Hugeicons                                  |

---

## Project Structure

```
mind-cave/
├── app/                  # Next.js App Router pages
│   ├── api/              # API routes (bookmarks, categories, metadata)
│   ├── dashboard/        # Main dashboard interface
│   ├── login/            # Authentication
│   ├── privacy/          # Privacy policy
│   ├── story/            # About page
│   └── terms/            # Terms of service
├── components/
│   ├── dashboard/        # Dashboard-specific components
│   ├── landing/          # Landing page sections and demos
│   └── ui/               # Reusable UI primitives
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and Supabase client
├── docs/                 # Documentation
└── supabase/             # Database migrations
```

---

## Local Development

### Prerequisites

- Node.js 18 or later
- pnpm package manager

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/mohamed-g-shoaib/mind-cave.git
   cd mind-cave
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure environment variables**

   Create `.env.local` with your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

   The application runs at `http://localhost:3000`.

---

## Design Principles

- **Production-ready**: Not a proof of concept. Built for real users and real load.
- **Maintainable**: Code is structured for future engineers to understand and extend.
- **Scalable**: Architecture handles growth without rewrites.
- **Performant**: Lazy loading, optimized rendering, minimal bundle size.

---

## License

Open sourced under [Devloop](https://www.devloop.software/).
