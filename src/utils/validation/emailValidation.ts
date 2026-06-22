/**
 * utils/validation/emailValidation.ts
 * -----------------------------------
 * Reusable utility for strict email validation and common domain typo detection.
 */

export interface EmailValidationResult {
  isValid: boolean;
  error?: string;
  suggestion?: string;
  trimmedEmail: string;
}

/**
 * Validates an email address against strict constraints.
 * 
 * Rules:
 * 1. Must not be empty.
 * 2. Leading/trailing whitespace is trimmed.
 * 3. Spaces inside the email are rejected.
 * 4. Exactly one '@' symbol must be present.
 * 5. Username and domain parts must be non-empty.
 * 6. Cannot contain consecutive dots (e.g., '..').
 * 7. Domain part must have a dot followed by a top-level domain (TLD) of at least 2 characters.
 * 8. Domain parts cannot start or end with a dot or hyphen.
 * 
 * @param email Raw email address from input
 * @returns EmailValidationResult indicating status and optional typo suggestion
 */
export function validateEmail(email: string): EmailValidationResult {
  const trimmed = (email || "").trim();

  if (!trimmed) {
    return {
      isValid: false,
      error: "Please enter a valid email address.",
      trimmedEmail: trimmed,
    };
  }

  // Reject spaces inside the email
  if (/\s/.test(trimmed)) {
    return {
      isValid: false,
      error: "Please enter a valid email address.",
      trimmedEmail: trimmed,
    };
  }

  // Reject multiple '@' or missing '@'
  const atCount = (trimmed.match(/@/g) || []).length;
  if (atCount !== 1) {
    return {
      isValid: false,
      error: "Please enter a valid email address.",
      trimmedEmail: trimmed,
    };
  }

  // Reject consecutive dots anywhere (e.g. user..name@domain.com, user@domain..com)
  if (trimmed.includes("..")) {
    return {
      isValid: false,
      error: "Please enter a valid email address.",
      trimmedEmail: trimmed,
    };
  }

  // Split into username and domain parts
  const parts = trimmed.split("@");
  const username = parts[0];
  const domain = parts[1];

  if (!username || !domain) {
    return {
      isValid: false,
      error: "Please enter a valid email address.",
      trimmedEmail: trimmed,
    };
  }

  // Reject domain starting/ending with dot or hyphen
  if (
    domain.startsWith(".") ||
    domain.endsWith(".") ||
    domain.startsWith("-") ||
    domain.endsWith("-")
  ) {
    return {
      isValid: false,
      error: "Please enter a valid email address.",
      trimmedEmail: trimmed,
    };
  }

  // Robust email pattern check
  // - Username: alphanumeric and standard special characters
  // - Domain: alphanumeric, dots, and hyphens. Top level domain (TLD) of at least 2 alphabetic characters.
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return {
      isValid: false,
      error: "Please enter a valid email address.",
      trimmedEmail: trimmed,
    };
  }

  // Check for common typo suggestions
  const suggestion = getTypoSuggestion(trimmed);

  return {
    isValid: true,
    suggestion,
    trimmedEmail: trimmed,
  };
}

/**
 * Detects common typos in email domains and returns a suggestion.
 * Does not auto-modify user input.
 * 
 * Examples:
 * - gmail.con -> gmail.com
 * - gamil.com -> gmail.com
 * - yahoo.co -> yahoo.com
 */
export function getTypoSuggestion(email: string): string | undefined {
  const parts = email.split("@");
  if (parts.length !== 2) return undefined;

  const username = parts[0];
  const domain = parts[1].toLowerCase();

  const domainReplacements: Record<string, string> = {
    "gmail.con": "gmail.com",
    "gamil.com": "gmail.com",
    "gmal.com": "gmail.com",
    "gmile.com": "gmail.com",
    "yahoo.co": "yahoo.com",
    "yaho.com": "yahoo.com",
    "hotmail.co": "hotmail.com",
    "hotmial.com": "hotmail.com",
  };

  if (domainReplacements[domain]) {
    return `${username}@${domainReplacements[domain]}`;
  }

  return undefined;
}
