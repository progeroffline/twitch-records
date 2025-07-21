function parseDateFromPath(text: string): Date | null {
  const regex = /(\d{2})-(\d{2})-(\d{4})-(\d{2})-(\d{2})/;
  const match = text.match(regex);

  if (!match) return null;

  const [_, day, month, year, hour, minute] = match.map(Number);

  // month - 1, потому что в JS/TS месяцы начинаются с 0
  return new Date(year, month - 1, day, hour, minute);
}

export { parseDateFromPath };
