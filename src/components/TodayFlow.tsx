import React, { useState } from "react";
import { Area, AREAS, DailyAction } from "../domain/action";
import { AreaPicker } from "./AreaPicker";

interface TodayFlowProps {
  dayKey: string;
  dayDisplay: string;
  action?: DailyAction;
  onSaveAction: (action: DailyAction) => void;
  onCopyObsidian: (action: DailyAction) => void;
  onDownloadMarkdown: (action: DailyAction) => void;
}

export const TodayFlow: React.FC<TodayFlowProps> = ({
  dayKey,
  dayDisplay,
  action,
  onSaveAction,
  onCopyObsidian,
  onDownloadMarkdown
}) => {
  const [selectedArea, setSelectedArea] = useState<Area>(action?.area || "corpo");
  const [actionText, setActionText] = useState(action?.action || "");
  const [evidenceText, setEvidenceText] = useState(action?.evidence || "");
  const [reflectionText, setReflectionText] = useState(action?.reflection || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isReducing, setIsReducing] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const showTemporaryFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(""), 4000);
  };

  // 1. Criar novo compromisso
  const handleCreateCommitment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionText.trim()) return;

    const newAction: DailyAction = {
      id: action?.id || `action_${Date.now()}`,
      dayKey,
      area: selectedArea,
      action: actionText.trim(),
      status: "planned",
      startedAt: new Date().toISOString()
    };

    onSaveAction(newAction);
    showTemporaryFeedback("Compromisso firmado com serenidade.");
  };

  // 2. Concluir ação
  const handleCompleteAction = () => {
    if (!action) return;
    const updated: DailyAction = {
      ...action,
      status: "completed",
      completedAt: new Date().toISOString(),
      evidence: evidenceText.trim() || undefined,
      reflection: reflectionText.trim() || undefined
    };
    onSaveAction(updated);
    showTemporaryFeedback("Feito hoje! Ação concluída com presença.");
  };

  // 3. Reduzir ação (micro-passo sem culpa)
  const handleReduceAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!action || !actionText.trim()) return;

    const updated: DailyAction = {
      ...action,
      originalAction: action.originalAction || action.action,
      action: actionText.trim(),
      status: "in_progress"
    };
    onSaveAction(updated);
    setIsReducing(false);
    showTemporaryFeedback("Passo reajustado. O que vale é seguir em frente.");
  };

  // 4. Pausa consciente (sem culpa)
  const handleMissedWithoutGuilt = () => {
    if (!action) return;
    const updated: DailyAction = {
      ...action,
      status: "missed",
      completedAt: new Date().toISOString(),
      reflection: reflectionText.trim() || "Pausa consciente respeitada. O descanso também constrói."
    };
    onSaveAction(updated);
    showTemporaryFeedback("Pausa registrada. Sem cobrança.");
  };

  // 5. Reiniciar para editar
  const handleRestart = () => {
    if (!action) return;
    setActionText(action.action);
    setSelectedArea(action.area);
    setIsEditing(true);
  };

  return (
    <section className="today-flow" aria-labelledby="today-heading">
      <header className="today-flow__header">
        <p className="today-flow__subtitle">O compromisso do momento</p>
        <h2 id="today-heading" className="today-flow__title">{dayDisplay}</h2>
      </header>

      {feedbackMsg && (
        <div className="feedback-banner" role="status" aria-live="polite">
          <span className="feedback-banner__icon">✓</span> {feedbackMsg}
        </div>
      )}

      {/* CASO 1: NENHUMA AÇÃO DEFINIDA HOJE OU EDITANDO */}
      {(!action || isEditing) && (
        <form onSubmit={handleCreateCommitment} className="flow-form">
          <AreaPicker
            selectedArea={selectedArea}
            onSelect={setSelectedArea}
          />

          <div className="form-group">
            <label htmlFor="action-input" className="form-label">
              Defina uma ação concreta, simples e realizável:
            </label>
            <input
              id="action-input"
              type="text"
              className="text-input"
              placeholder="Ex: Ler 10 páginas, caminhar 20 minutos..."
              value={actionText}
              onChange={e => setActionText(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="examples-box">
            <p className="examples-box__title">Sugestões de micro-passos para esta área:</p>
            <div className="examples-chips">
              {AREAS[selectedArea]?.examples.map((ex, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="example-chip"
                  onClick={() => setActionText(ex)}
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="button button--primary">
              Firmar este compromisso
            </button>
            {isEditing && (
              <button
                type="button"
                className="button button--secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancelar edição
              </button>
            )}
          </div>
        </form>
      )}

      {/* CASO 2: AÇÃO PLANEJADA / EM ANDAMENTO */}
      {action && !isEditing && (action.status === "planned" || action.status === "in_progress") && (
        <div className="active-card">
          <div className="active-card__badge">
            <span className="badge-dot" /> {AREAS[action.area]?.name}
          </div>

          <h3 className="active-card__text">{action.action}</h3>
          
          {action.originalAction && action.originalAction !== action.action && (
            <p className="active-card__original">
              Reduzido de: <em>{action.originalAction}</em>
            </p>
          )}

          {!isReducing ? (
            <div className="active-card__interactions">
              <div className="form-group">
                <label htmlFor="reflection-input" className="form-label">
                  Reflexão ou evidência rápida (opcional):
                </label>
                <textarea
                  id="reflection-input"
                  className="textarea-input"
                  rows={2}
                  placeholder="Como você se sentiu? O que realizou de fato?"
                  value={evidenceText}
                  onChange={e => setEvidenceText(e.target.value)}
                />
              </div>

              <div className="action-buttons-grid">
                <button
                  type="button"
                  className="button button--primary button--large"
                  onClick={handleCompleteAction}
                >
                  Concluir ação (Feito Hoje)
                </button>

                <button
                  type="button"
                  className="button button--secondary"
                  onClick={() => {
                    setActionText(action.action);
                    setIsReducing(true);
                  }}
                >
                  O passo ficou pesado? Reduzir sem culpa
                </button>

                <button
                  type="button"
                  className="button button--ghost"
                  onClick={handleMissedWithoutGuilt}
                >
                  Hoje não foi possível (Pausa consciente)
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleReduceAction} className="reduce-form">
              <p className="reduce-form__hint">
                Reajuste para um passo tão simples que seja impossível não fazer:
              </p>
              <input
                type="text"
                className="text-input"
                value={actionText}
                onChange={e => setActionText(e.target.value)}
                required
                autoFocus
              />
              <div className="form-actions">
                <button type="submit" className="button button--primary">
                  Confirmar novo passo menor
                </button>
                <button
                  type="button"
                  className="button button--secondary"
                  onClick={() => setIsReducing(false)}
                >
                  Voltar
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* CASO 3: AÇÃO CONCLUÍDA */}
      {action && !isEditing && action.status === "completed" && (
        <div className="completed-card">
          <div className="completed-card__header">
            <span className="completed-badge">🌿 Feito Hoje com Presença</span>
            <span className="completed-area">{AREAS[action.area]?.name}</span>
          </div>

          <h3 className="completed-card__action">{action.action}</h3>

          {action.evidence && (
            <div className="completed-card__note">
              <strong>O que foi feito:</strong>
              <p>{action.evidence}</p>
            </div>
          )}

          <div className="completed-card__actions">
            <button
              type="button"
              className="button button--primary"
              onClick={() => onCopyObsidian(action)}
            >
              Copiar Nota para o Obsidian
            </button>

            <button
              type="button"
              className="button button--secondary"
              onClick={() => onDownloadMarkdown(action)}
            >
              Baixar .md do Dia
            </button>

            <button
              type="button"
              className="button button--ghost"
              onClick={handleRestart}
            >
              Editar registro
            </button>
          </div>
        </div>
      )}

      {/* CASO 4: PAUSA CONSCIENTE (MISSED) */}
      {action && !isEditing && action.status === "missed" && (
        <div className="missed-card">
          <div className="missed-card__header">
            <span className="missed-badge">☕ Pausa Consciente</span>
            <span className="completed-area">{AREAS[action.area]?.name}</span>
          </div>

          <h3 className="missed-card__title">O descanso também constrói o caminho.</h3>
          <p className="missed-card__desc">
            A vida tem seus ritmos. Não há punição, não há perda de sequência. Amanhã é uma nova oportunidade com a mente serena.
          </p>

          <div className="completed-card__actions">
            <button
              type="button"
              className="button button--primary"
              onClick={() => onCopyObsidian(action)}
            >
              Registrar Pausa no Obsidian
            </button>

            <button
              type="button"
              className="button button--secondary"
              onClick={handleRestart}
            >
              Reabrir para tentar um passo mínimo
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
