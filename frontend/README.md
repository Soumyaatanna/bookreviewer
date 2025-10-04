// <CHANGE> Frontend README
# Frontend - Book Review Platform

Tech: React + Vite, React Router, Axios, TailwindCSS, Recharts.

## Setup

1. Copy `.env.example` to `.env` and set `VITE_API_URL` (default http://localhost:5000).
2. Install and run:
\`\`\`
npm install
npm run dev
\`\`\`

Open http://localhost:5173

## Structure

- src/pages: Login, Signup, BookList, BookDetails, AddEditBook, Profile
- src/components: Navbar, Pagination, RatingStars, ReviewItem, SortFilterBar, ThemeToggle
- src/context: AuthContext for auth state and actions
- src/api: axios instance with interceptors

The app uses bearer tokens stored in localStorage and protects routes via ProtectedRoute.
