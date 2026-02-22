// ============================================================================
// Formatting Utilities
// ============================================================================

export interface FormatNumberOptions {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  notation?: "standard" | "scientific" | "engineering" | "compact";
}

/**
 * Format a number with locale-aware formatting.
 */
export function formatNumber(
  value: number,
  options: FormatNumberOptions = {}
): string {
  const {
    locale = "en-US",
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    notation = "standard",
  } = options;

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
    notation,
  }).format(value);
}

/**
 * Format emissions value in CO2 equivalent.
 * Automatically selects appropriate unit (tCO2e, ktCO2e, MtCO2e, GtCO2e).
 */
export function formatEmissions(
  valueTonnes: number,
  options: { locale?: string; precision?: number } = {}
): string {
  const { locale = "en-US", precision = 2 } = options;

  const abs = Math.abs(valueTonnes);
  let displayValue: number;
  let unit: string;

  if (abs >= 1_000_000_000) {
    displayValue = valueTonnes / 1_000_000_000;
    unit = "GtCO2e";
  } else if (abs >= 1_000_000) {
    displayValue = valueTonnes / 1_000_000;
    unit = "MtCO2e";
  } else if (abs >= 1_000) {
    displayValue = valueTonnes / 1_000;
    unit = "ktCO2e";
  } else {
    displayValue = valueTonnes;
    unit = "tCO2e";
  }

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: precision,
  }).format(displayValue);

  return `${formatted} ${unit}`;
}

/**
 * Format a percentage value.
 */
export function formatPercentage(
  value: number,
  options: { locale?: string; precision?: number; includeSign?: boolean } = {}
): string {
  const { locale = "en-US", precision = 1, includeSign = false } = options;

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: precision,
    signDisplay: includeSign ? "exceptZero" : "auto",
  }).format(value);

  return `${formatted}%`;
}

/**
 * Format a currency value.
 */
export function formatCurrency(
  value: number,
  currency = "USD",
  locale = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format a large number in compact form (e.g., 1.2M, 3.5K).
 */
export function formatCompact(value: number, locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

/**
 * Format a serial number for credits (e.g., "DCACI-KE-2024-000001").
 */
export function formatCreditSerial(
  countryCode: string,
  year: number,
  sequence: number
): string {
  return `DCACI-${countryCode.toUpperCase()}-${year}-${String(sequence).padStart(6, "0")}`;
}
