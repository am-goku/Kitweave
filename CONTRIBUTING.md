# Contributing to KitWeaver

First off, thanks for taking the time to contribute! 🎉

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How to Contribute

### Reporting Bugs

- Uses GitHub Issues.
- Check if the issue already exists.
- Include a reproduction reproduction steps/repository.

### Pull Requests

1.  Fork the repo and create your branch from `main`.
2.  If you've added code that should be tested, add tests.
3.  Ensure the test suite passes (`pnpm test`).
4.  Make sure your code lints (`pnpm lint`).
5.  Format your code (`pnpm format`).

## Development Setup

1.  **Prerequisites**: Node.js 22+, pnpm.
2.  **Install**: `pnpm install`.
3.  **Env**: usage `.env.example` to create `.env`.
4.  **Run**: `pnpm dev`.

## Style Guide

- **Framework**: Next.js 15 (App Router).
- **Styling**: Tailwind CSS v4.
- **Components**: Shadcn/UI (Radix Primitives).
- **Language**: TypeScript (Strict).

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
