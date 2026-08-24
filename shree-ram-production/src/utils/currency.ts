/**
 * Central INR currency formatter for Shree Ram Production
 * Use this for all user-facing price/budget/investment displays.
 * Keeps formatting consistent and avoids duplicating Intl logic.
 */

// Primary formatter — Indian Rupee, en-IN, no decimals by default
export const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export const inrFormatterWithDecimals = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});

// Helper: format a plain number as INR currency string (₹1,00,000)
export function formatINR(value: number): string {
  return inrFormatter.format(value);
}

// Helper: format with decimals if needed
export function formatINRPrecise(value: number): string {
  return inrFormatterWithDecimals.format(value);
}

// Indian-friendly short formats used in UI where space is tight
// These mirror the budget pills: Under ₹25K, ₹25K – ₹50K, ₹50K – ₹1L, ₹1L+
export function formatINRShort(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(value % 10000000 === 0 ? 0 : 1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(value % 100000 === 0 ? 0 : 1)}L`;
  if (value >= 1000) return `₹${Math.round(value / 1000)}K`;
  return `₹${value}`;
}

export const BUDGET_RANGES_INR = [
  'Under ₹25K',
  '₹25K – ₹50K',
  '₹50K – ₹1L',
  '₹1L+',
] as const;
