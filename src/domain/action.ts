export type Area = 
  | "corpo"
  | "aprendizado"
  | "financas"
  | "espiritualidade"
  | "relacoes";

export interface AreaInfo {
  id: Area;
  name: string;
  tagline: string;
  examples: string[];
}

export const AREAS: Record<Area, AreaInfo> = {
  corpo: {
    id: "corpo",
    name: "Corpo & Saúde",
    tagline: "Cuidar do veículo que sustenta a sua jornada",
    examples: [
      "Caminhar 20 minutos respirando com calma",
      "Tomar 500ml de água e alongar lombar e ombros",
      "Fazer 15 minutos de treino funcional",
      "Dormir 30 minutos mais cedo sem telas na cama"
    ]
  },
  aprendizado: {
    id: "aprendizado",
    name: "Aprendizado Técnico",
    tagline: "Avançar um centímetro no domínio do seu ofício",
    examples: [
      "Ler e fichar 1 capítulo técnico do livro",
      "Escrever e rodar 1 função ou algoritmo isolado",
      "Dissecar 1 arquitetura ou código do repositório",
      "Praticar 20 minutos de refatoração limpa"
    ]
  },
  financas: {
    id: "financas",
    name: "Finanças & Soberania",
    tagline: "Fortalecer a independência e a blindagem material",
    examples: [
      "Revisar o extrato e registrar a queima do dia",
      "Aportar qualquer valor na reserva de paz",
      "Organizar 1 planilha ou conferir custos fixos",
      "Eliminar 1 gasto invisível ou desnecessário"
    ]
  },
  espiritualidade: {
    id: "espiritualidade",
    name: "Espiritualidade & Mente",
    tagline: "Cultivar a serenidade e a presença no agora",
    examples: [
      "10 minutos de silêncio e presença sem telefone",
      "Escrever 3 linhas de gratidão no diário",
      "Fazer uma oração sincera de entrega e clareza",
      "Praticar 5 minutos de respiração diafragmática"
    ]
  },
  relacoes: {
    id: "relacoes",
    name: "Relações & Família",
    tagline: "Nutrir laços reais de afeto, escuta e honra",
    examples: [
      "Enviar uma mensagem de voz com carinho para minha mãe",
      "Mandar uma palavra de amor e presença para a Tawan",
      "Ouvir alguém querido sem interromper nem julgar",
      "Dedicar 15 minutos de atenção genuína e exclusiva"
    ]
  }
};

export type DailyActionStatus = "planned" | "in_progress" | "completed" | "missed";

export interface DailyAction {
  id: string;
  dayKey: string; // YYYY-MM-DD em America/Sao_Paulo
  area: Area;
  action: string;
  originalAction?: string;
  status: DailyActionStatus;
  startedAt?: string;
  completedAt?: string;
  evidence?: string;
  reflection?: string;
}
