# Agent Memory & Privacy Guidelines (rohitg00/agentmemory)

This repository uses **agentmemory** (https://github.com/rohitg00/agentmemory) as the persistent memory layer for AI agents.

---

## 🔒 ZERO-TOLERANCE PRIVACY & SENSITIVE DATA POLICY

**CRITICAL RULE: No sensitive information or confidential data must EVER be saved into memory or shared externally.**

Before saving any observation, insight, pattern, or lesson to memory, you MUST verify that it contains NO:
1. **API Keys & Secrets**:
   - Supabase keys (anon key, service role key, project URLs containing tokens)
   - Vercel tokens / Team IDs
   - GoDaddy API Key / Secret
   - Hostinger API tokens
   - GitHub Personal Access Tokens (`ghp_`, `github_pat_`)
   - JWT tokens or bearer tokens
2. **Credentials & Auth**:
   - Passwords, connection strings (`postgres://`, `mysql://`), private keys (`-----BEGIN PRIVATE KEY-----`)
   - Any raw content from `.env`, `.env.local`, or configuration secrets
3. **Patient Health Information (PHI) & Personal Identifying Information (PII)**:
   - Patient real names, private medical diagnoses, personal consultations, or clinical history
   - Patient phone numbers, email addresses, physical addresses
   - Note: Only public educational video IDs and published YouTube titles from the public clinic channel are permitted.

If an insight or lesson references a secret or sensitive asset, **ANONYMIZE and ABSTRACT** the pattern (e.g., "Configured Supabase SSR client with environment variable fallback" instead of saving actual key values).

---

## 🧠 Memory Architecture (4-Tier Lifecycle)

Follow the `rohitg00/agentmemory` discipline:

1. **Working Memory (Scratchpad)**:
   - Active task objectives, hypotheses, temporary steps.
2. **Episodic Memory (Session Observations)**:
   - What was attempted, commands run, build outcomes.
3. **Semantic Memory (Patterns & Decisions)**:
   - Types: `pattern`, `preference`, `architecture`, `bug`, `workflow`, `fact`.
   - Settled architectural decisions and the *reasons* behind them.
4. **Procedural Memory (Playbooks & Lessons)**:
   - Corrections, verified procedures, deployment steps.

---

## 🔄 Memory Workflow

### 1. Before Work Begins (Task Start)
Run a memory query for relevant context before exploring code or re-solving problems:
- `memory_recall` or `memory_smart_search` with the topic (e.g., `"nextjs image"`, `"video section"`, `"deployment"`).
- Project identifier: `thepainkillermd`.

### 2. At Decision Points (Mid-Task)
Save decisions as they settle with their rationale using `memory_save`:
- Include: `content` (decision + reason), `type`, `concepts` (comma-separated), `files` (relative paths), and `project: "thepainkillermd"`.
- Do NOT wait until end of session to batch-save; reasons are lost.

### 3. On User Correction
- Translate corrections into structured lessons (`type: "bug"` or `"preference"`).
- Ensure the correction notes what was incorrect and what the approved behavior is.

---

## 🛠️ MCP Tools Reference
- `memory_recall`: Search memories by query string with optional token budget.
- `memory_smart_search`: Hybrid search for fast concept retrieval.
- `memory_save`: Record persistent memory (validated against privacy filters).
- `memory_audit`: Inspect memory audit trail.
- `memory_governance_delete`: Remove deprecated or erroneous memories.
