import { DailyAction, AREAS } from "./action";
import { formatDayKeyDisplay } from "./date";

export function toObsidianMarkdown(action: DailyAction): string {
  const areaName = AREAS[action.area]?.name || action.area;
  const dataFormatada = formatDayKeyDisplay(action.dayKey);
  
  const statusLabels: Record<string, string> = {
    completed: "Feito com Presença (Concluído)",
    in_progress: "Em Andamento",
    planned: "Compromisso Firmado",
    missed: "Pausa Consciente / Reajuste"
  };

  const statusLabel = statusLabels[action.status] || action.status;
  
  let md = `---
tipo: registro-diario
data: ${action.dayKey}
area: "${areaName}"
status: ${action.status}
tags:
  - feito-hoje
  - acao-diaria
  - foco-soberano
---

# 🌿 Feito Hoje — ${dataFormatada}

> **"Escolha uma ação possível. O que importa é o próximo passo, com calma e do seu jeito."**

---

### 📌 Compromisso
- **Área:** [[${areaName}]]
- **Ação:** ${action.action}
${action.originalAction && action.originalAction !== action.action ? `- **Ação Original Reduzida:** ~${action.originalAction}~` : ""}
- **Estado:** \`${statusLabel}\`
${action.startedAt ? `- **Iniciado às:** ${new Date(action.startedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}` : ""}
${action.completedAt ? `- **Concluído às:** ${new Date(action.completedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}` : ""}

`;

  if (action.evidence || action.reflection) {
    md += `### 📝 Registro & Reflexão\n`;
    if (action.evidence) {
      md += `**Evidência / O que foi feito:**\n${action.evidence}\n\n`;
    }
    if (action.reflection) {
      md += `**Sentimento / Aprendizado:**\n${action.reflection}\n\n`;
    }
  }

  md += `---\n*Nota exportada automaticamente pelo Feito Hoje para o cofre do Obsidian.*\n`;

  return md;
}
