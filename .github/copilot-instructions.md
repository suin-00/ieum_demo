# Tech Stack & Environment

- Frontend: Next.js (App Router), TypeScript, Tailwind CSS
- Backend / Database: Supabase (PostgreSQL)
- State Management: Zustand

# Core Rules & Conventions

- **Language**: Respond in Korean, but keep technical terms, variable names, and code comments in English.
- **Code Style**:
  - Use functional components with arrow function syntax.
  - Prioritize clean code and modular structure; avoid overly long files.
  - Implement strict TypeScript types (avoid `any` where possible).
- **Error Handling**: Use explicit `try-catch` blocks for asynchronous operations and provide clear user feedback mechanisms.
- **Git Commit Convention**: Use conventional commits (e.g., `feat:`, `fix:`, `refactor:`, `style:`).
- **Database Reference**: Always refer to the types defined in `types/database.types.ts` when writing Supabase queries or CRUD operations.
- **Next.js App Router**:
  - Default to Server Components for data fetching.
  - Use `'use client'` only when state management, event listeners, or browser APIs are strictly required.
