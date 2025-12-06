# KitWeaver 🧙‍♂️✨

> **The AI-Powered React Component Library for Next.js Developers.**
> Instantly generate, fix, and manage premium Shadcn/UI components with the power of Llama 3.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-MVP-orange.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)

## 🚀 Overview

KitWeaver is an open-source platform that combines a curated registry of high-quality React components with an intelligent AI generator. Built for speed and aesthetics, it allows developers to:

- **Copy-Paste** production-ready code (Tailwind v4 + Framer Motion).
- **Generate** custom components from text prompts (e.g., "A dark-mode pricing table with glassmorphism").
- **Fix & Iterate** on code using an integrated AI assistant.
- **Manage** private component libraries.

## 🛠 Tech Stack

- **Frontend**: React 19, Next.js 15 (App Router), Tailwind CSS v4, Framer Motion, Shadcn/UI.
- **Backend**: Next.js API Routes (Serverless), Node.js 22 Compatible.
- **Database**: PostgreSQL (Supabase/Vercel Postgres).
- **AI Engine**: Groq (Llama 3.1 70B) for speed, OpenAI GPT-4o-mini fallback.
- **Auth**: Supabase Auth / Clerk (OAuth, JWT).
- **Payments**: Stripe integration.
- **Monitoring**: Sentry.

## 🏗 Architecture

Designed as a **Modular Monolith** for MVP validity, ready to split into microservices for scale.

- **Core**: Next.js App Router (handles UI, Docs, and Proxy API).
- **Data Layer**: Prisma ORM connecting to PostgreSQL.
- **Services** (Planned Split):
  - `auth-service`: User identity & RBAC.
  - `ai-service`: LLM context management & generation pipeline.
  - `core-service`: Component registry & docs engine.

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/kitweaver.git

# Install dependencies (pnpm recommended)
pnpm install

# Set up environment variables
cp .env.example .env.local
# (Fill in SUPABASE_URL, GROQ_API_KEY, STRIPE_SECRET_KEY)

# Initialize Database
pnpm prisma generate
pnpm prisma db push

# Run the development server
pnpm dev
```

## 🗺 Roadmap

### Phase 1: MVP (Current)

- [x] curated component library.
- [x] Basic implementation of Llama 3.1 generator.
- [x] User Auth (Free/Pro tiers).
- [x] Interactive Documentation.

### Phase 2: Growth

- [ ] Team Organizations & Shared Libraries.
- [ ] "Fix this Component" VS Code Extension.
- [ ] Public Component Marketplace.

### Phase 3: Scale (Post-MVP)

- [ ] Migration to Microservices (Kubernetes).
- [ ] Mobile App (React Native) for browsing docs.
- [ ] Fine-tuned Model for highly specific design systems.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

1.  Fork the repo.
2.  Create your feature branch (`git checkout -b feature/amazing-component`).
3.  Commit your changes.
4.  Push to the branch.
5.  Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
