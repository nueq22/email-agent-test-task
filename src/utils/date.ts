function isToday(date: Date) {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

export function getLocalDateTime(date: Date) {
  return date.toLocaleString("en-UK", {
    day: "2-digit",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    year: "numeric",
  });
}

export function getLocalTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function getConsentedDate(date: Date) {
  if (isToday(date)) {
    return getLocalTime(date);
  }

  return getLocalDateTime(date);
}
