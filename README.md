# Highveld Advisory Client Portal

A mobile-first South African accounting, tax, payroll, compliance, and advisory client portal built with Next.js 16 Pages Router, Clerk, Redux Toolkit async thunks, Axios, Tailwind CSS v4, Lucide React, Resend, and TypeScript.

## Product scope

Highveld Advisory gives clients one secure workspace to:

- monitor accounting, tax, payroll, and compliance work
- review upcoming SARS and payroll obligations
- access shared documents
- create and track service requests
- review invoices and account standing
- message their advisory team
- manage their own profile, password, and authenticator-based two-factor authentication

## Setup

1. Copy `.env.example` to `.env.local`.
2. Add your Clerk development keys.
3. Add a Resend API key and verified sender.
4. Install dependencies with `npm install`.
5. Run `npm run dev`.

The development server listens on `0.0.0.0:3000` so it works with Google Cloud Shell Web Preview and other remote development environments.

## Clerk authentication

In Clerk:

1. Enable email sign-up and sign-in.
2. Require an email address.
3. Enable password sign-up.
4. Use email verification codes for sign-up verification.
5. Enable the Authenticator application MFA strategy.
6. Enable Backup codes alongside TOTP.
7. Leave the public auth routes outside middleware. The repository scopes Clerk middleware to protected portal pages and `/api/portal/*`.

The portal implements its own sign-in, registration, Device Trust, MFA, account, password, and TOTP user interfaces. It does not use Clerk's prebuilt account component.

## Resend email delivery

Clerk requires custom email delivery to be configured per template.

For every Clerk email template that Resend should deliver:

1. Open Clerk Dashboard → Emails.
2. Open the template.
3. Disable **Delivered by Clerk**.
4. Create a Clerk webhook endpoint for:
   `https://YOUR_DOMAIN/api/webhooks/clerk-email`
5. Subscribe the endpoint to `email.created`.
6. Copy the webhook signing secret to `CLERK_WEBHOOK_SIGNING_SECRET`.
7. Set `RESEND_API_KEY`.
8. Set `RESEND_FROM_EMAIL` to a sender on a Resend-verified domain.

The webhook verifies Clerk's signature before forwarding the rendered authentication email through Resend.

## Google Cloud Shell

Keep `npm run dev` running, then open Web Preview for port `3000`.

Verify the local process with:

```bash
curl -I http://localhost:3000
```

## Quality checks

Run:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
```
