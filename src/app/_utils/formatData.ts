export function formatDate(date: Date | null) {
  if (date) {
    return new Intl.DateTimeFormat("en-UK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  }
}
