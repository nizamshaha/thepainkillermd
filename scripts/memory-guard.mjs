#!/usr/bin/env node
/**
 * Safe Memory Guard for agentmemory (https://github.com/rohitg00/agentmemory)
 * Enforces strict zero-tolerance privacy for thepainkillermd workspace.
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

const MEMORY_FILE = join(homedir(), '.agentmemory', 'standalone.json');
const PROJECT_ID = 'thepainkillermd';

// Comprehensive sensitive patterns that MUST NEVER be committed to memory
const SENSITIVE_PATTERNS = [
  { name: 'Private Key', regex: /-----BEGIN [A-Z ]*PRIVATE KEY-----/i },
  { name: 'API Key or Secret Token Keyword', regex: /(?:key|token|secret|password|passwd|pwd|auth|bearer|credential)[\s:=_-]+['"]?[a-zA-Z0-9_\-.]{6,}['"]?/i },
  { name: 'JWT Structure', regex: /[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{4,}/ },
  { name: 'Known Key Prefix (Supabase, OpenAI, GitHub, Vercel, Google)', regex: /(?:sbp_[a-zA-Z0-9_-]{10,}|sk-[a-zA-Z0-9_-]{20,}|ghp_[a-zA-Z0-9]{30,}|github_pat_[a-zA-Z0-9_]{30,}|vercel_[a-zA-Z0-9_-]{16,}|AIza[0-9A-Za-z-_]{35})/i },
  { name: 'Database Connection String', regex: /(?:postgres|postgresql|mysql|mongodb(?:\+srv)?|redis):\/\/[^\s]+/i },
  { name: 'Phone Number', regex: /(?:\+?91[\-\s]?)?[6789]\d{9}\b/ },
  { name: 'Email Address', regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/ },
  { name: 'Patient PHI / Medical Identifier', regex: /(?:mrn|medical\s*record|patient\s*name|ssn|aadhaar|date\s*of\s*birth|dob)[\s:=]+/i }
];

export function sanitizeCheck(text) {
  if (!text || typeof text !== 'string') return;
  for (const { name, regex } of SENSITIVE_PATTERNS) {
    if (regex.test(text)) {
      throw new Error(`[PRIVACY VIOLATION] Content contains sensitive pattern: "${name}". Storing sensitive data is strictly forbidden!`);
    }
  }
}

function loadStore() {
  if (!existsSync(MEMORY_FILE)) return { 'mem:memories': {} };
  try {
    return JSON.parse(readFileSync(MEMORY_FILE, 'utf-8'));
  } catch {
    return { 'mem:memories': {} };
  }
}

function saveStore(data) {
  const dir = join(homedir(), '.agentmemory');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(MEMORY_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export function saveMemory({ content, type = 'pattern', concepts = [], files = [] }) {
  sanitizeCheck(content);
  for (const c of concepts) sanitizeCheck(c);
  for (const f of files) sanitizeCheck(f);

  const store = loadStore();
  const memories = store['mem:memories'] || {};
  const id = `mem_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  
  const entry = {
    id,
    type,
    title: content.slice(0, 80),
    content,
    concepts: Array.isArray(concepts) ? concepts : String(concepts).split(',').map(s => s.trim()).filter(Boolean),
    files: Array.isArray(files) ? files : String(files).split(',').map(s => s.trim()).filter(Boolean),
    project: PROJECT_ID,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    strength: 7,
    version: 1,
    isLatest: true,
    sessionIds: []
  };

  memories[id] = entry;
  store['mem:memories'] = memories;
  saveStore(store);
  return entry;
}

export function recallMemory(query) {
  const store = loadStore();
  const memories = Object.values(store['mem:memories'] || {});
  const q = (query || '').toLowerCase();

  const results = memories.filter(m => {
    if (m.project && m.project !== PROJECT_ID) return false;
    if (!q) return true;
    const matchContent = m.content && m.content.toLowerCase().includes(q);
    const matchTitle = m.title && m.title.toLowerCase().includes(q);
    const matchConcepts = m.concepts && m.concepts.some(c => c.toLowerCase().includes(q));
    const matchFiles = m.files && m.files.some(f => f.toLowerCase().includes(q));
    return matchContent || matchTitle || matchConcepts || matchFiles;
  });

  return results;
}

// CLI Interface
const [cmd, ...args] = process.argv.slice(2);
if (cmd === 'save') {
  const content = args[0];
  const type = args[1] || 'pattern';
  if (!content) {
    console.error('Usage: node scripts/memory-guard.mjs save "<content>" [type]');
    process.exit(1);
  }
  try {
    const mem = saveMemory({ content, type });
    console.log('[agentmemory] Saved successfully:', mem.id, '|', mem.title);
  } catch (err) {
    console.error('[agentmemory BLOCKED]:', err.message);
    process.exit(1);
  }
} else if (cmd === 'recall') {
  const query = args[0] || '';
  const results = recallMemory(query);
  console.log(`[agentmemory] Found ${results.length} memories matching "${query}":`);
  console.log(JSON.stringify(results, null, 2));
} else if (cmd === 'list') {
  const store = loadStore();
  const memories = Object.values(store['mem:memories'] || {}).filter(m => !m.project || m.project === PROJECT_ID);
  console.log(`[agentmemory] Total ${memories.length} entries for ${PROJECT_ID}:`);
  console.log(JSON.stringify(memories, null, 2));
}
