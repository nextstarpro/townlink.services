// Formatting helpers

/**
 * Format Ghana Cedi currency
 */
export function formatCurrency(amount: number, currency = "GHS"): string {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a date string to locale-friendly format
 */
export function formatDate(dateStr: string, locale = "en-GH"): string {
  return new Date(dateStr).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string, countryCode = "+233"): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 9) {
    return `${countryCode} ${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
  }
  return `${countryCode} ${cleaned}`;
}
