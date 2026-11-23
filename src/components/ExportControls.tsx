import React, { useRef, useState } from "react";
import { DailyAction } from "../domain/action";
import { exportBackupJson, validateBackupJson } from "../domain/backup";
import { toObsidianMarkdown } from "../domain/markdown";

interface ExportControlsProps {
  actions: DailyAction[];
  onRestoreActions: (restored: DailyAction[]) => void;
  onShowMessage: (msg: string) => void;
}

export const ExportControls: React.FC<ExportControlsProps> = ({
  actions,
  onRestoreActions,
  onShowMessage
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [confirmRestoreOpen, setConfirmRestoreOpen] = useState(false);
  const [pendingActions, setPendingActions] = useState<DailyAction[] | null>(null);

  // Baixar JSON completo
  const handleDownloadBackup = () => {
    const jsonStr = exportBackupJson(actions);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `feito-hoje-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onShowMessage("Backup JSON baixado com sucesso!");
  };

  // Baixar todas as notas em Markdown
  const handleDownloadAllMarkdown = () => {
    if (actions.length === 0) {
      onShowMessage("Nenhum registro para exportar ainda.");
      return;
    }

    const fullContent = actions
      .map(act => toObsidianMarkdown(act))
      .join("\n\n---\n\n");

    const blob = new Blob([fullContent], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `feito-hoje-obsidian-${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onShowMessage("Arquivo Markdown do Obsidian gerado!");
  };

  // Upload JSON
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      const res = validateBackupJson(content);
      if (res.valid && res.actions) {
        setPendingActions(res.actions);
        setConfirmRestoreOpen(true);
      } else {
        onShowMessage("Erro no backup: " + (res.error || "formato inválido"));
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleConfirmRestore = () => {
    if (pendingActions) {
      onRestoreActions(pendingActions);
      onShowMessage(`Restauração concluída! ${pendingActions.length} dias carregados.`);
      setConfirmRestoreOpen(false);
      setPendingActions(null);
    }
  };

  return (
    <section className="export-controls" aria-labelledby="backup-heading">
      <header className="export-controls__header">
        <h3 id="backup-heading" className="export-controls__title">
          Soberania de Dados & Obsidian
        </h3>
        <p className="export-controls__desc">
          Seus dados não pertencem a servidores de terceiros. Você pode exportar tudo para o seu cofre do Obsidian ou salvar um backup a qualquer momento.
        </p>
      </header>

      <div className="export-buttons-row">
        <button
          type="button"
          className="button button--secondary"
          onClick={handleDownloadAllMarkdown}
        >
          📄 Baixar Todas as Notas (.md)
        </button>

        <button
          type="button"
          className="button button--secondary"
          onClick={handleDownloadBackup}
        >
          💾 Fazer Backup (JSON)
        </button>

        <button
          type="button"
          className="button button--ghost"
          onClick={() => fileInputRef.current?.click()}
        >
          📥 Restaurar Backup
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      {confirmRestoreOpen && pendingActions && (
        <div className="restore-modal" role="dialog" aria-modal="true">
          <div className="restore-modal__box">
            <h4 className="restore-modal__title">Confirmar Restauração?</h4>
            <p className="restore-modal__text">
              Foram encontrados <strong>{pendingActions.length} registros</strong> válidos neste arquivo.
              Deseja substituir os dados locais por este backup?
            </p>
            <div className="restore-modal__actions">
              <button
                type="button"
                className="button button--primary"
                onClick={handleConfirmRestore}
              >
                Sim, Restaurar
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => {
                  setConfirmRestoreOpen(false);
                  setPendingActions(null);
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
