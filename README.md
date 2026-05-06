# Providocs — Waitlist landing page

Next.js 14 (App Router) + TypeScript + Tailwind. The landing page mirrors the Figma design, and the email-capture form posts to a Next.js API route that sends a notification email via Brevo.

## Run locally

```bash
npm install
cp .env.local.example .env.local   # fill in Brevo values
npm run dev
```

Open http://localhost:3000.

## Deploy to Netlify (CLI)

The project includes `netlify.toml` so Netlify auto-detects Next.js and applies the official Next.js runtime. From the project directory:

```bash
# 1. Install the CLI (only needed once, globally; or use npx everywhere).
npm install -g netlify-cli

# 2. Log in (opens your browser once; reuses the session afterwards).
netlify login

# 3. Link the directory to a Netlify site (or create a new one).
netlify init

# 4. Set your Brevo env vars on the Netlify site.
#    These will NOT be uploaded from .env.local — set them on Netlify directly.
netlify env:set BREVO_API_KEY     "xkeysib-..."
netlify env:set BREVO_FROM_EMAIL  "waitlist@yourdomain.com"
netlify env:set BREVO_TO_EMAIL    "vivek.singh@witarist.com"

# 5. Deploy.
netlify deploy --build --prod
```

Netlify gives you a URL like `https://providocs-waitlist.netlify.app`. Set up a custom domain from Site settings → Domain management when you're ready.

> **Tip:** if you'd rather skip `netlify init` and `netlify deploy` interactively, you can also do `netlify deploy --build --prod --site=YOUR_SITE_ID` once you've created the site in the Netlify dashboard.

## Brevo setup

1. Sign up at https://www.brevo.com (free tier covers 300 emails/day).
2. **Create an API key:** Account → SMTP & API → API keys → "Generate a new API key". Copy it into `BREVO_API_KEY`.
3. **Verify a sender email:** Senders, Domains & Dedicated IPs → Senders → "Add a sender". Use that address in `BREVO_FROM_EMAIL`. Brevo will reject sends from unverified addresses.
4. (Optional but recommended) Add SPF + DKIM records for your sending domain — same panel.
5. **Recipient:** the form notification will land in `BREVO_TO_EMAIL`. Default is `vivek.singh@witarist.com` per your project setup.

The notification email includes the submitter's name (if provided), email, and timestamp. The submitter's email is also set as the `Reply-To`, so you can reply directly to the lead from your inbox.

## Project structure

```
app/
  layout.tsx              — Root layout (Inter + Playfair fonts)
  page.tsx                — Landing page composition
  globals.css             — Tailwind + hero/CTA gradient backgrounds
  api/waitlist/route.ts   — POST endpoint → Brevo /v3/smtp/email
components/
  WaitlistContext.tsx     — React context for opening the modal
  WaitlistModal.tsx       — Email-capture modal with success/error states
  ui/Logo.tsx
  ui/Eyebrow.tsx
  ui/Buttons.tsx          — Primary (gradient) + secondary (outline)
  sections/               — One file per landing-page section
netlify.toml              — Netlify build config (uses @netlify/plugin-nextjs)
tailwind.config.ts        — Color tokens lifted from Figma variables
```

## Notes & next steps

- **Photos** — `Story.tsx` and `ComingSoon.tsx` reference Unsplash images as
  placeholders. Replace with the production photos from Figma when ready.
- **Trust marquee logos** — placeholder "Logoipsum" SVGs. Swap in real partner
  logos in `components/sections/TrustMarquee.tsx`.
- **Dashboard mockup** — `DashboardMockup.tsx` is a CSS replica of the Figma
  hero dashboard (the Figma frame was vector-only). To use a screenshot
  instead, replace the component body with `<Image src="/hero-dashboard.png" ... />`.
- **Waitlist CTAs** — every "Get Free Access" / "Join The Waitlist" button on
  the page opens the same modal, which posts to `/api/waitlist`.
