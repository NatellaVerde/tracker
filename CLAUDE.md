# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

Single-page React app with no routing, no backend, and no persistence — all state lives in `src/App.jsx` via `useState`.

**Data model:** Each transaction has `{ id, description, amount, type, category, date }` where `type` is `"income"` or `"expense"` and `amount` is stored as a string (not a number).

**Known issues (intentional for course purposes):**
- `amount` is stored as a string, so arithmetic on totals is broken (string concatenation instead of addition)
- `Freelance Work` is marked as `type: "expense"` in the seed data but its category is `"salary"`
- No delete functionality
- UI needs styling improvements

The app is a course starter project — bugs and rough edges are intentional teaching material.
