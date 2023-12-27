export function formatDate(
  date: Date | string,
  opt: Intl.DateTimeFormatOptions,
): string {
  return new Date(date).toLocaleDateString("es-es", opt);
}
