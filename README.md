# Packton

Last-mile delivery platform for Rwanda — marketing site, customer portal, rider app, and admin console.

## Stack

- **Backend**: Node.js, Express, TypeScript, Prisma, PostgreSQL
- **Frontend**: React 19, Vite, Tailwind CSS 4, react-i18next (English/Kinyarwanda/French)
- **Package manager**: [pnpm](https://pnpm.io) — both `backend/` and `frontend/` use it

## Prerequisites

- Node.js 22+
- pnpm (`npm install -g pnpm` if you don't have it)
- A PostgreSQL database (local or hosted)

## Getting started

### 1. Backend

```bash
cd backend
pnpm install
cp .env.example .env   # fill in DATABASE_URL and the two JWT_*_SECRET values at minimum
pnpm dev
```

`pnpm dev` (and `pnpm start` for production) automatically applies any pending database migrations before booting the server — you never need to run a migrate command yourself just to get up and running. If you're on a fresh database it'll apply every migration in `prisma/migrations/`; if you're already up to date it just says so and starts normally.

The API runs at `http://localhost:4000`. Interactive API docs are served at `http://localhost:4000/api-docs`.

Everything else in `.env` (SMS, mobile money, file storage, outbound email) is optional for local dev — each integration no-ops with a clear log message or error until you fill in its credentials, so the app runs fine without them.

### Changing the database schema

If you're the one editing `prisma/schema.prisma`, you still need to author the migration once:

```bash
cd backend
pnpm migrate   # wraps `prisma migrate dev` — prompts for a migration name, generates the SQL, applies it locally
```

Commit the generated `prisma/migrations/<timestamp>_<name>/` folder along with your schema change. Everyone else picks it up automatically the next time they run `pnpm dev` — no separate step on their end.

### 2. Frontend

```bash
cd frontend
pnpm install
cp .env.example .env
pnpm dev
```

The site runs at `http://localhost:5173`.

## User roles

Packton has three roles: `CUSTOMER`, `RIDER`, `ADMIN`.

- **CUSTOMER** — the default. Anyone can self-register at `/register`.
- **RIDER** — no self-serve signup. Only an existing admin can create a rider account, from the Admin → Riders page (`/admin/riders`) in the app.
- **ADMIN** — cannot be created through the app or the API at all, on purpose. The "Create User" form on `/admin/riders` explicitly only allows `CUSTOMER`/`RIDER`, and the underlying `POST /admin/users` endpoint rejects `ADMIN` even if called directly — otherwise any authenticated admin session would be a path to minting more admins. The only way to create or promote one is the bootstrap script below.

## Bootstrapping your first admin account

Since there's no in-app path to `ADMIN`, someone has to create the very first one directly against the database:

```bash
cd backend
pnpm admin:create someone@example.com "Full Name"
```

(Note: with pnpm, script arguments go directly after the script name — no `--` separator like you'd use with npm. Adding one here would pass a literal `--` as the email.)

What happens depends on whether that email is already registered:

- **Email already has an account** (e.g. they signed up normally at `/register` first) — it's promoted to `ADMIN` in place. You can drop the name argument in this case: `pnpm admin:create someone@example.com`.
- **Email doesn't exist yet** — a brand new `ADMIN` account is created with a generated password. If outbound email (`SMTP_*` in `.env`) is configured, the credentials are emailed to them automatically. If not, the script prints the generated password straight to your terminal — copy it and pass it along yourself.

Once one admin exists, everyone else can be created through the app: log in, go to **Admin → Riders**, and use the **Create User** form to add riders (or more customers) without touching the database again. That form also never sets a password — one is generated and emailed the same way, or shown once in the UI if email isn't configured.

## Provisioning a B2B organization (API access)

B2B clients authenticate with an API key (`X-API-Key` header) rather than logging in, for bulk order uploads via CSV. There's no in-app flow for this yet, so it's also a script:

```bash
cd backend
pnpm org:create "Organization Name"
```

This prints the new organization's API key once — save it, it isn't shown again. Hand it to the client for the `/manifests/upload` endpoint (documented at `/api-docs`).
