import { formatDistanceToNowStrict, parseISO } from "date-fns";

/**
 * Converts a date string to a relative time string (e.g., '3 days ago').
 *
 * @param dateString - The date string to be converted.
 * @returns The relative time string.
 */
export function formatDateToRelativeTime(dateString: string): string {
  const date = parseISO(dateString);
  return formatDistanceToNowStrict(date, { addSuffix: true });
}
