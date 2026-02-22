// ============================================================================
// Date Utilities
// ============================================================================

/**
 * Format a date string or Date object into a human-readable format.
 */
export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
  locale = "en-US"
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) {
    return "Invalid date";
  }
  return d.toLocaleDateString(locale, options);
}

/**
 * Format a date to ISO date string (YYYY-MM-DD).
 */
export function toISODateString(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) {
    return "";
  }
  return d.toISOString().split("T")[0];
}

/**
 * Parse a date string into a Date object. Returns null if invalid.
 */
export function parseDate(dateString: string): Date | null {
  const d = new Date(dateString);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Get an array of years between start and end (inclusive).
 */
export function getYearRange(startYear: number, endYear: number): number[] {
  const years: number[] = [];
  const start = Math.min(startYear, endYear);
  const end = Math.max(startYear, endYear);
  for (let year = start; year <= end; year++) {
    years.push(year);
  }
  return years;
}

/**
 * Get the current year.
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/**
 * Calculate the number of years between two dates.
 */
export function yearsBetween(start: string | Date, end: string | Date): number {
  const startDate = typeof start === "string" ? new Date(start) : start;
  const endDate = typeof end === "string" ? new Date(end) : end;
  return endDate.getFullYear() - startDate.getFullYear();
}

/**
 * Check if a date falls within a given range.
 */
export function isDateInRange(
  date: string | Date,
  rangeStart: string | Date,
  rangeEnd: string | Date
): boolean {
  const d = typeof date === "string" ? new Date(date) : date;
  const start = typeof rangeStart === "string" ? new Date(rangeStart) : rangeStart;
  const end = typeof rangeEnd === "string" ? new Date(rangeEnd) : rangeEnd;
  return d >= start && d <= end;
}

/**
 * Get the reporting period label (e.g., "2020-2025").
 */
export function getReportingPeriodLabel(startYear: number, endYear: number): string {
  return `${startYear}-${endYear}`;
}
