/**
 * Parses a Date object from a URL path containing a specific date format.
 * @param text - The URL or string to parse.
 * @returns A Date object if the pattern is found, otherwise null.
 * @example
 * // returns new Date(2025, 6, 25, 21, 55)
 * parseDateFromPath('/path/to/2025/7/25/21-55/720/video.mp4')
 */

function parseDateFromPath(text: string): Date | null {
  // Regex to find a date in yyyy/m/d/hh-mm format.
  const regex = /(\d{4})\/(\d{1,2})\/(\d{1,2})\/(\d{1,2})-(\d{1,2})/;
  const match = text.match(regex);

  if (!match) return null;

  const [_, year, month, day, hour, minute] = match.map(Number);

  // Note: The month in the Date constructor is 0-indexed (0-11).
  return new Date(year, month - 1, day, hour, minute);
}

export { parseDateFromPath };
