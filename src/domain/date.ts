/**
 * Funções de data orientadas ao fuso horário America/Sao_Paulo
 */

export function getSaoPauloDayKey(date: Date = new Date()): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  return formatter.format(date); // Retorna formato YYYY-MM-DD
}

export function formatDayKeyDisplay(dayKey: string): string {
  try {
    const [year, month, day] = dayKey.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    
    return date.toLocaleDateString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      weekday: "long",
      day: "numeric",
      month: "long"
    });
  } catch {
    return dayKey;
  }
}

export function formatShortDate(dayKey: string): string {
  try {
    const [year, month, day] = dayKey.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    
    return date.toLocaleDateString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      weekday: "short",
      day: "2-digit",
      month: "2-digit"
    });
  } catch {
    return dayKey;
  }
}

export function getPast7DayKeys(currentDayKey: string): string[] {
  const [year, month, day] = currentDayKey.split("-").map(Number);
  const baseDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  
  const keys: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(baseDate);
    d.setUTCDate(baseDate.getUTCDate() - i);
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    const dayStr = String(d.getUTCDate()).padStart(2, "0");
    keys.push(`${y}-${m}-${dayStr}`);
  }
  return keys;
}
