/**
 * Security utilities for THE PAINKILLER MD platform.
 * Protects against:
 * 1. SSTI & JSON-LD XSS injection
 * 2. ReDoS (Catastrophic Backtracking)
 * 3. Long payload / Input DoS
 * 4. Param / Route injection
 * 5. Clipboard pastejacking / terminal command injection
 */

/**
 * Safely serializes JSON-LD structured data for embedding in <script type="application/ld+json">.
 * Replaces '<', '>', and '&' with unicode escapes to prevent HTML/script tag breakouts.
 */
export function sanitizeJsonLd(data: unknown): string {
  const jsonString = JSON.stringify(data);
  if (!jsonString) return "{}";
  return jsonString
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

/**
 * Validates and sanitizes a dynamic route slug.
 * Enforces strict alphanumeric + hyphen format and a length cap (max 100 characters).
 * Returns the sanitized slug or null if invalid.
 */
export function validateSlug(slug: unknown): string | null {
  if (typeof slug !== "string") return null;
  const trimmed = slug.trim().toLowerCase();
  if (trimmed.length === 0 || trimmed.length > 100) return null;
  // Strictly alphanumeric and hyphens only
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(trimmed)) return null;
  return trimmed;
}

/**
 * Sanitizes generic user text input.
 * Truncates to max length and removes dangerous control characters.
 */
export function sanitizeInput(text: unknown, maxLength = 255): string {
  if (typeof text !== "string") return "";
  // Strip null bytes and non-printable control characters (except newline/tab)
  const cleaned = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  return cleaned.trim().slice(0, maxLength);
}

/**
 * ReDoS-safe email validator.
 * Enforces strict RFC 5321 length limits (max 254 chars) before running a linear non-backtracking regex.
 */
export function isValidEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;
  const trimmed = email.trim();
  if (trimmed.length < 3 || trimmed.length > 254) return false;
  // Linear-time email format check
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed);
}

/**
 * Safe clipboard writing utility that prevents clipboard hijacking / pastejacking attacks.
 * Strips ANSI terminal escape sequences, shell formatting, and control characters before writing to clipboard.
 */
export async function safeCopyToClipboard(text: string): Promise<boolean> {
  if (typeof window === "undefined" || !text) return false;

  // Strip ANSI escape codes
  const strippedAnsi = text.replace(/(?:\x1B[@-Z\\-_]|[\x80-\x9A\x9C-\x9F]|(?:\x1B\[|\x9B)[0-?]*[ -/]*[@-~])/g, "");
  // Strip dangerous control chars (excluding normal spaces, tabs, and newlines)
  const safeText = strippedAnsi.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(safeText);
      return true;
    }
    // Fallback for non-standard environments
    const textarea = document.createElement("textarea");
    textarea.value = safeText;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textarea);
    return successful;
  } catch (err) {
    console.error("Clipboard write failed safely:", err);
    return false;
  }
}

