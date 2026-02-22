// ============================================================================
// Validation Utilities
// ============================================================================

/**
 * ISO 3166-1 alpha-2 country codes for African Union member states
 * (subset used for validation in NCTP context).
 */
const AU_COUNTRY_CODES = new Set([
  "DZ", "AO", "BJ", "BW", "BF", "BI", "CV", "CM", "CF", "TD",
  "KM", "CG", "CD", "CI", "DJ", "EG", "GQ", "ER", "SZ", "ET",
  "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY", "MG",
  "MW", "ML", "MR", "MU", "MA", "MZ", "NA", "NE", "NG", "RW",
  "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "TZ", "TG",
  "TN", "UG", "ZM", "ZW",
]);

/**
 * Validate an ISO 3166-1 alpha-2 country code.
 * If strict is true, only African Union member states are accepted.
 */
export function isValidCountryCode(code: string, strict = false): boolean {
  if (typeof code !== "string" || code.length !== 2) {
    return false;
  }
  const upper = code.toUpperCase();
  if (strict) {
    return AU_COUNTRY_CODES.has(upper);
  }
  // Basic check: two uppercase letters
  return /^[A-Z]{2}$/.test(upper);
}

/**
 * Validate an email address.
 */
export function isValidEmail(email: string): boolean {
  if (typeof email !== "string") {
    return false;
  }
  // RFC 5322 simplified pattern
  const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return pattern.test(email);
}

/**
 * Validate a year is within a reasonable range for climate data.
 */
export function isValidYear(year: number, minYear = 1990, maxYear = 2100): boolean {
  return Number.isInteger(year) && year >= minYear && year <= maxYear;
}

/**
 * Validate a GHG inventory year (must be a past year or current year).
 */
export function isValidInventoryYear(year: number): boolean {
  const currentYear = new Date().getFullYear();
  return isValidYear(year, 1990, currentYear);
}

/**
 * Validate a percentage value (0-100).
 */
export function isValidPercentage(value: number): boolean {
  return typeof value === "number" && !isNaN(value) && value >= 0 && value <= 100;
}

/**
 * Validate that emissions value is a finite number.
 */
export function isValidEmissionsValue(value: number): boolean {
  return typeof value === "number" && isFinite(value);
}

/**
 * Validate a credit serial number format (NCTP-XX-YYYY-NNNNNN).
 */
export function isValidCreditSerial(serial: string): boolean {
  return /^NCTP-[A-Z]{2}-\d{4}-\d{6}$/.test(serial);
}

/**
 * Validate a non-empty trimmed string with optional max length.
 */
export function isNonEmptyString(value: unknown, maxLength = 1000): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

/**
 * Validate an array has at least one element.
 */
export function isNonEmptyArray<T>(value: unknown): value is T[] {
  return Array.isArray(value) && value.length > 0;
}
