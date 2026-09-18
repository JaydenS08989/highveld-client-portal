# Highveld Client Portal

A two-column South African client portal starter built with Next.js 16 Pages Router, Clerk, Redux Toolkit async thunks, Axios, Tailwind CSS v4, Lucide React, and TypeScript.

## Setup

1. Copy `.env.example` to `.env.local`.
2. Add your Clerk publishable and secret keys.
3. In Clerk, enable email sign-in with passwords.
4. Install dependencies with `npm install`.
5. Run `npm run dev`.

The custom sign-in flow supports password sign-in and Clerk's default email-code Device Trust path. If your Clerk instance enables MFA, extend the verification step for the factors enabled in your instance before allowing those accounts through this custom flow.

## Quality checks

Run `npm run typecheck`, `npm run lint`, and `npm run format:check` before shipping.
