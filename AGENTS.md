<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Persistent Memory & Privacy Rules (agentmemory)

This repository uses **agentmemory** (https://github.com/rohitg00/agentmemory) for persistent context retention across sessions.

## 🚨 MANDATORY SENSITIVE DATA BAN
- **ZERO SENSITIVE DATA**: Never save, record, or share passwords, API keys, tokens (Supabase, Vercel, GoDaddy, Hostinger, GitHub), private keys, or `.env` files.
- **ZERO PATIENT PHI/PII**: Never record confidential patient health information, private clinical histories, phone numbers, or email addresses.
- All stored knowledge must be technical architectural decisions, bug solutions, and UI/code patterns only.
