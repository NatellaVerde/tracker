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

Single-page React app with no routing, no backend, and no persistence.

**Component tree:**
- `App` — holds `transactions` state (array), passes it down to children
  - `Summary` — receives `transactions`, computes `totalIncome`, `totalExpenses`, `balance` internally
  - `TransactionForm` — owns its own form state, calls `onAdd(transaction)` prop to add to parent state
  - `TransactionList` — receives `transactions`, owns filter state internally

**Data model:** Each transaction has `{ id, description, amount, type, category, date }` where `type` is `"income"` or `"expense"` and `amount` is a number.

**Shared constant:** `categories` array is duplicated in `TransactionForm` and `TransactionList` — not yet extracted to a shared module.
