import { DailyAction } from "./action";

export function exportBackupJson(actions: DailyAction[]): string {
  const payload = {
    app: "feito-hoje",
    exportedAt: new Date().toISOString(),
    version: 1,
    totalRecords: actions.length,
    data: actions
  };
  return JSON.stringify(payload, null, 2);
}

export interface ValidationResult {
  valid: boolean;
  actions?: DailyAction[];
  error?: string;
}

export function validateBackupJson(jsonString: string): ValidationResult {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed) {
      return { valid: false, error: "Arquivo vazio ou inválido." };
    }

    let records: any[] = [];
    if (Array.isArray(parsed)) {
      records = parsed;
    } else if (parsed.data && Array.isArray(parsed.data)) {
      records = parsed.data;
    } else {
      return { valid: false, error: "Formato de backup não reconhecido." };
    }

    const validated: DailyAction[] = [];
    for (const item of records) {
      if (item && typeof item.id === "string" && typeof item.dayKey === "string" && item.area && item.action) {
        validated.push({
          id: item.id,
          dayKey: item.dayKey,
          area: item.area,
          action: item.action,
          originalAction: item.originalAction,
          status: item.status || "planned",
          startedAt: item.startedAt,
          completedAt: item.completedAt,
          evidence: item.evidence,
          reflection: item.reflection
        });
      }
    }

    if (validated.length === 0 && records.length > 0) {
      return { valid: false, error: "Nenhum registro válido encontrado no backup." };
    }

    return { valid: true, actions: validated };
  } catch (err: any) {
    return { valid: false, error: "Erro de sintaxe JSON: " + (err?.message || "inválido") };
  }
}
