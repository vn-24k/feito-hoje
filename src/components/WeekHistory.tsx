import React from "react";
import { DailyAction, AREAS } from "../domain/action";
import { formatShortDate } from "../domain/date";

interface WeekHistoryProps {
  dayKeys: string[];
  actions: DailyAction[];
  currentDayKey: string;
  onSelectActionToExport?: (action: DailyAction) => void;
}

export const WeekHistory: React.FC<WeekHistoryProps> = ({
  dayKeys,
  actions,
  currentDayKey,
  onSelectActionToExport
}) => {
  const actionsMap = new Map<string, DailyAction>();
  actions.forEach(a => actionsMap.set(a.dayKey, a));

  return (
    <section className="week-history" aria-labelledby="history-heading">
      <header className="week-history__header">
        <h3 id="history-heading" className="week-history__title">
          Os últimos 7 dias
        </h3>
        <p className="week-history__subtitle">
          Um olhar sereno para trás. Cada dia conta por si mesmo.
        </p>
      </header>

      <div className="week-history__list">
        {dayKeys.map(day => {
          const act = actionsMap.get(day);
          const isToday = day === currentDayKey;
          const shortDate = formatShortDate(day);

          let statusIcon = "○";
          let statusLabel = "Sem registro";
          let statusClass = "history-item--empty";

          if (act) {
            if (act.status === "completed") {
              statusIcon = "🌿";
              statusLabel = "Feito com presença";
              statusClass = "history-item--completed";
            } else if (act.status === "missed") {
              statusIcon = "☕";
              statusLabel = "Pausa consciente";
              statusClass = "history-item--missed";
            } else {
              statusIcon = "⏳";
              statusLabel = "Em andamento";
              statusClass = "history-item--in-progress";
            }
          }

          return (
            <div
              key={day}
              className={`history-item ${statusClass} ${isToday ? "history-item--today" : ""}`}
            >
              <div className="history-item__date-col">
                <span className="history-item__icon" aria-hidden="true">{statusIcon}</span>
                <div>
                  <span className="history-item__date">{shortDate}</span>
                  {isToday && <span className="today-tag">Hoje</span>}
                </div>
              </div>

              <div className="history-item__content-col">
                {act ? (
                  <>
                    <p className="history-item__action">{act.action}</p>
                    <span className="history-item__area">{AREAS[act.area]?.name} · {statusLabel}</span>
                  </>
                ) : (
                  <p className="history-item__action history-item__action--empty">
                    Dia livre para viver e respirar
                  </p>
                )}
              </div>

              {act && onSelectActionToExport && (
                <button
                  type="button"
                  className="history-item__export-btn"
                  onClick={() => onSelectActionToExport(act)}
                  title="Copiar nota deste dia para o Obsidian"
                >
                  Exportar
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
