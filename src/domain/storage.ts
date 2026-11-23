import { DailyAction } from "./action";

export const STORAGE_KEY = "feito_hoje_actions_v1";

export function loadActions(storage: Storage = window.localStorage): DailyAction[] {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter(item => item && typeof item.id === "string" && typeof item.dayKey === "string");
    }
    return [];
  } catch (error) {
    console.warn("Falha ao carregar registros do localStorage, iniciando com lista vazia:", error);
    return [];
  }
}

export function saveActions(actions: DailyAction[], storage: Storage = window.localStorage): void {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(actions));
  } catch (error) {
    console.error("Falha ao salvar registros no localStorage:", error);
  }
}

export function getActionForDay(actions: DailyAction[], dayKey: string): DailyAction | undefined {
  return actions.find(a => a.dayKey === dayKey);
}

export function upsertAction(actions: DailyAction[], action: DailyAction): DailyAction[] {
  const index = actions.findIndex(a => a.id === action.id || a.dayKey === action.dayKey);
  if (index >= 0) {
    const updated = [...actions];
    updated[index] = action;
    return updated;
  }
  return [action, ...actions];
}
