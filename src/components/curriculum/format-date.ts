const localeDate = "es-es";

export function formatDate({
  startDate,
  endDate,
  optionDate = {
    year: "numeric",
    month: "long",
    day: undefined,
  },
}: {
  startDate: string | Date | undefined;
  endDate?: string | Date | undefined;
  optionDate?: Intl.DateTimeFormatOptions;
}): string {
  const dateTimeFormat = new Intl.DateTimeFormat(localeDate, optionDate);
  const start = startDate ? new Date(startDate) : undefined;
  const end = endDate ? new Date(endDate) : undefined;

  if (start && end) {
    return dateTimeFormat.formatRange(new Date(start), new Date(end));
  }

  if (start && !end) {
    return start.toLocaleDateString(localeDate, optionDate) + " – presente";
  }

  if (end) {
    return end.toLocaleDateString(localeDate, optionDate);
  }
  return "";
}
