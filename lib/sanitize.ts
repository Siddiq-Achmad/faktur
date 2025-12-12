/**
 * Sanitizes search input to prevent SQL injection and pattern injection attacks
 * Specifically designed for use with PostgreSQL ILIKE queries
 *
 * @param input - The raw user input string
 * @returns The sanitized string, or null if input is invalid/empty
 *
 * Security measures:
 * 1. Type checking - ensures input is a string
 * 2. Whitespace trimming - removes leading/trailing spaces
 * 3. Length validation - enforces maximum length to prevent DoS
 * 4. ILIKE wildcard escaping - prevents pattern injection via % and _ characters
 */
export function sanitizeSearchInput(input: unknown): string | null {
  // Type guard - ensure input is a string
  if (!input || typeof input !== "string") {
    return null;
  }

  // Trim whitespace
  let sanitized = input.trim();

  // Reject empty strings after trimming
  if (sanitized.length === 0) {
    return null;
  }

  // Maximum length to prevent DoS attacks
  const MAX_LENGTH = 100;
  if (sanitized.length > MAX_LENGTH) {
    sanitized = sanitized.slice(0, MAX_LENGTH);
  }

  // Escape ILIKE special characters to prevent pattern injection
  // % matches any sequence of characters
  // _ matches any single character
  // We escape them so they're treated as literal characters
  sanitized = sanitized.replace(/[%_]/g, "\\$&");

  return sanitized;
}

/**
 * Creates a safe ILIKE pattern from sanitized input
 * Wraps the sanitized input in % wildcards for substring matching
 *
 * @param sanitizedInput - The already sanitized input string
 * @returns The ILIKE pattern string (e.g., "%searchterm%")
 */
export function createILikePattern(sanitizedInput: string): string {
  return `%${sanitizedInput}%`;
}
