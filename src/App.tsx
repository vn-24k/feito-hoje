import { useState, useEffect } from "react";
import { DailyAction } from "./domain/action";
import { getSaoPauloDayKey, formatDayKeyDisplay, getPast7DayKeys } from "./domain/date";
import { loadActions, saveActions, getActionForDay, upsertAction } from "./domain/storage";
import { toObsidianMarkdown } from "./domain/markdown";
import { TodayFlow } from "./components/TodayFlow";
import { WeekHistory } from "./components/WeekHistory";
import { ExportControls } from "./components/ExportControls";

function App() {
  const [actions, setActions] = useState<DailyAction[]>(() => loadActions());
  const [currentDayKey, setCurrentDayKey] = useState<string>(() => getSaoPauloDayKey());
  const [toastMessage, setToastMessage] = useState<string>("");

  useEffect(() => {
    // Atualiza a chave do dia se o navegador continuar aberto após a virada da meia-noite
    const interval = setInterval(() => {
      const today = getSaoPauloDayKey();
      if (today !== currentDayKey) {
        setCurrentDayKey(today);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [currentDayKey]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4500);
  };

  const handleSaveAction = (action: DailyAction) => {
    const updated = upsertAction(actions, action);
    setActions(updated);
    saveActions(updated);
  };

  const handleRestoreActions = (restored: DailyAction[]) => {
    setActions(restored);
    saveActions(restored);
  };

  const handleCopyObsidian = async (action: DailyAction) => {
    const md = toObsidianMarkdown(action);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(md);
        showToast("Nota copiada! Cole direto no seu Obsidian.");
        return;
      }
      throw new Error("Clipboard indisponível");
    } catch {
      // Fallback seguro: baixar o arquivo diretamente
      handleDownloadMarkdown(action);
      showToast("Área de transferência inacessível. O arquivo .md foi baixado!");
    }
  };

  const handleDownloadMarkdown = (action: DailyAction) => {
    const md = toObsidianMarkdown(action);
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${action.dayKey}-feito-hoje.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Nota de ${action.dayKey} baixada com sucesso!`);
  };

  const todayAction = getActionForDay(actions, currentDayKey);
  const dayDisplay = formatDayKeyDisplay(currentDayKey);
  const past7Days = getPast7DayKeys(currentDayKey);

  return (
    <div className="feito-hoje-root">
      <main className="feito-hoje" aria-labelledby="titulo-principal">
        <div className="feito-hoje__pagina">
          
          {/* CABEÇALHO EDITORIAL */}
          <header className="feito-hoje__cabecalho">
            <div className="cabecalho__insignia">
              <span className="ponto-dourado" aria-hidden="true" />
              <span>Espaço Editorial de Presença</span>
            </div>
            <h1 id="titulo-principal" className="cabecalho__titulo">Feito Hoje</h1>
            <p className="cabecalho__proposito">
              Escolha uma ação possível. O que importa é o próximo passo, com calma e do seu jeito.
            </p>
          </header>

          {/* MENSAGEM GLOBAL DE TOAST */}
          {toastMessage && (
            <div className="global-toast" role="alert">
              <span>🌿</span> {toastMessage}
            </div>
          )}

          {/* FLUXO DO DIA */}
          <TodayFlow
            dayKey={currentDayKey}
            dayDisplay={dayDisplay}
            action={todayAction}
            onSaveAction={handleSaveAction}
            onCopyObsidian={handleCopyObsidian}
            onDownloadMarkdown={handleDownloadMarkdown}
          />

          <hr className="divisor-editorial" />

          {/* RETROSPECTIVA DOS 7 DIAS */}
          <WeekHistory
            dayKeys={past7Days}
            actions={actions}
            currentDayKey={currentDayKey}
            onSelectActionToExport={handleCopyObsidian}
          />

          <hr className="divisor-editorial" />

          {/* SOBERANIA E EXPORTAÇÃO OBSIDIAN */}
          <ExportControls
            actions={actions}
            onRestoreActions={handleRestoreActions}
            onShowMessage={showToast}
          />

          {/* RODAPÉ LIMPO E PRIVACIDADE */}
          <footer className="feito-hoje__rodape">
            <p className="rodape__garantia">
              🔒 <strong>100% Privado & Soberano:</strong> Seus registros são guardados exclusivamente no navegador deste dispositivo. Nenhuma linha é enviada para servidores ou nuvens de terceiros.
            </p>
            <p className="rodape__credito">
              Feito Hoje · Arquitetura de Foco e Soberania Pessoal
            </p>
          </footer>

        </div>
      </main>
    </div>
  );
}

export default App;
