# Plano de implementação — Feito Hoje

> **Para quem for executar:** use a skill `superpowers:subagent-driven-development` (recomendada) ou `superpowers:executing-plans` para concluir este plano tarefa por tarefa. Marque cada etapa com as caixas de seleção.

**Objetivo:** criar e publicar uma ferramenta diária, adaptada primeiro para celular e com dados locais, que transforme um valor escolhido em uma ação pequena e exporte o registro para o Obsidian.

**Arquitetura:** aplicação estática de rota única, feita em React e TypeScript. Funções de domínio isolam o agrupamento de datas no horário de São Paulo, o armazenamento do navegador, a formatação Markdown e o backup JSON dos componentes da interface.

**Tecnologias:** Vite, React, TypeScript, Vitest, Testing Library, CSS, `localStorage` do navegador, GitHub CLI e Vercel CLI.

**Especificação:** `docs/superpowers/specs/2026-11-23-feito-hoje-design.md`

## Restrições gerais

- Uma rota responsiva; sem login, sincronização na nuvem, lembretes, análises de uso ou envio de registros pessoais pela rede.
- O armazenamento do navegador é a fonte principal; incluir backup/restauração JSON e exportação Markdown para o Obsidian.
- Usar a data local, com `America/Sao_Paulo` como fuso horário padrão para agrupar os dias.
- Uma ação não realizada não pode gerar linguagem punitiva nem impedir a retomada.
- Manter a direção visual de caderno editorial acolhedor e respeitar a preferência por movimento reduzido.
- Não usar seletores CSS globais para componentes de terceiros; isolar seus estilos.
- Acionar o script persistente de sorteio de design antes de escolher um modelo visual.
- Pesquisar componentes atuais e tematicamente adequados no 21st.dev e no arsenal local antes de implementar; usar somente os que combinarem com o produto e registrar as escolhas visuais.
- Publicar o projeto no GitHub em `vn-24k`, branch `main`, e depois na Vercel; confirmar os dois endereços públicos.

## Pontos de revisão

- O fuso do navegador ou a virada da data muda o dia do calendário: testar as chaves de data de São Paulo antes e depois da meia-noite local.
- Há dados antigos ou JSON inválido no navegador: testar recuperação segura para o estado vazio sem apagar o valor original que pode ser exportado.
- Um arquivo JSON importado conflita com registros salvos: testar que cancelar mantém os dados e confirmar só substitui após confirmação explícita.
- O Markdown contém aspas, acentos e quebras de linha: testar uma saída legível sem corromper o conteúdo.
- A área de transferência não está disponível ou nega acesso: testar a alternativa visível de baixar um arquivo.

---

### Tarefa 1: Preparar o projeto e registrar a direção visual

**Arquivos:**
- Criar: `package.json`, `index.html`, `tsconfig.json`, `vite.config.ts`, `src/main.tsx`, `src/App.tsx`, `src/App.test.tsx`, `src/styles.css`, `.gitignore`
- Criar: `.21st/design.json`, `.21st/DESIGN.md`
- Atualizar: `docs/superpowers/plans/2026-11-23-feito-hoje.md`

**Interfaces:**
- Entrega: aplicação Vite, React e TypeScript executável e direção visual documentada para as tarefas seguintes.

- [ ] **Etapa 1:** consultar as instruções específicas do projeto, executar o sorteio persistente para `feito-hoje` e pesquisar somente componentes adequados ao tema no arsenal local e no 21st.dev.
- [ ] **Etapa 2:** criar a estrutura React com TypeScript e configurar Vitest, jsdom e Testing Library.
- [ ] **Etapa 3:** registrar as escolhas de cores e estilo em `.21st/design.json` e `.21st/DESIGN.md`; isolar estilos de qualquer componente externo sob uma classe exclusiva.
- [ ] **Etapa 4:** criar um teste de renderização em `src/App.test.tsx` e executar `npm run build` e `npm run test -- --run`; resultado esperado: compilação de produção limpa e teste passando.

### Tarefa 2: Criar o modelo da ação diária, o armazenamento e a formatação de exportação

**Arquivos:**
- Criar: `src/domain/action.ts`, `src/domain/date.ts`, `src/domain/storage.ts`, `src/domain/markdown.ts`
- Criar: `src/domain/action.test.ts`, `src/domain/date.test.ts`, `src/domain/storage.test.ts`, `src/domain/markdown.test.ts`

**Interfaces:**
- Entrega: tipo `DailyAction` com `id`, `dayKey`, `area`, `action`, `originalAction`, `status: "planned" | "in_progress" | "completed" | "missed"`, `startedAt`, `completedAt` e `evidence`/`reflection` opcionais; funções `getSaoPauloDayKey(date)`, `loadActions(storage)`, `saveActions(actions, storage)` e `toObsidianMarkdown(action)`.

- [ ] **Etapa 1:** escrever testes para uma ação ativa por dia, edição/remoção, conclusão, redução preservando `originalAction` e chaves de data de São Paulo imediatamente antes e depois da meia-noite local.
- [ ] **Etapa 2:** executar `npm run test -- --run`; resultado esperado: os novos testes de domínio falham antes da implementação.
- [ ] **Etapa 3:** implementar as operações tipadas da ação e a formatação de data em `src/domain/action.ts` e `src/domain/date.ts`.
- [ ] **Etapa 4:** escrever testes para armazenamento válido, vazio e JSON inválido; confirmar que o valor bruto continua disponível para exportação.
- [ ] **Etapa 5:** implementar acesso seguro ao armazenamento do navegador em `src/domain/storage.ts`.
- [ ] **Etapa 6:** testar a formatação Markdown com acentos, aspas e reflexão em várias linhas; implementar `toObsidianMarkdown(action)` em `src/domain/markdown.ts`.
- [ ] **Etapa 7:** executar `npm run test -- --run`; resultado esperado: todos os testes de domínio passam.

### Tarefa 3: Criar o fluxo diário e o histórico de sete dias

**Arquivos:**
- Criar: `src/components/TodayFlow.tsx`, `src/components/WeekHistory.tsx`, `src/components/AreaPicker.tsx`
- Criar: `src/components/TodayFlow.test.tsx`, `src/components/WeekHistory.test.tsx`
- Atualizar: `src/App.tsx`, `src/styles.css`

**Interfaces:**
- Usa: `DailyAction`, as funções de ação e o armazenamento do navegador criados na Tarefa 2.
- Entrega: fluxo diário único que seleciona uma entre cinco áreas (corpo, aprendizado técnico, finanças, espiritualidade e relações), descreve uma ação, inicia, conclui com evidência opcional, registra um dia sem ação sem punição ou reduz a ação preservando o texto original.

- [ ] **Etapa 1:** escrever testes de interação para escolher uma área, editar uma ação, começar, concluir e reduzir a ação sem linguagem punitiva.
- [ ] **Etapa 2:** executar os testes específicos do componente; resultado esperado: falham antes da interface existir.
- [ ] **Etapa 3:** implementar o fluxo diário acessível, com exemplos escritos à mão e uma ação ativa por dia.
- [ ] **Etapa 4:** escrever testes para ordenação e estado vazio do histórico de sete dias; implementar `WeekHistory.tsx`.
- [ ] **Etapa 5:** adicionar estilos editoriais acolhedores e responsivos, foco de teclado visível, rótulos semânticos e suporte a movimento reduzido.
- [ ] **Etapa 6:** executar todos os testes e `npm run build`; resultado esperado: testes passando e pacote de produção compilado.

### Tarefa 4: Adicionar exportação para o Obsidian e backup/restauração local

**Arquivos:**
- Criar: `src/components/ExportControls.tsx`, `src/components/ExportControls.test.tsx`, `src/domain/backup.ts`, `src/domain/backup.test.ts`
- Atualizar: `src/App.tsx`, `src/styles.css`

**Interfaces:**
- Usa: lista de ações, `toObsidianMarkdown` e funções de armazenamento.
- Entrega: cópia/download Markdown e importação/exportação JSON validada; a importação exige confirmação antes de substituir os registros locais.

- [ ] **Etapa 1:** escrever testes para ida e volta do backup JSON, rejeição de JSON inválido e confirmação/cancelamento da importação.
- [ ] **Etapa 2:** executar os testes específicos; resultado esperado: falham antes dos controles de backup existirem.
- [ ] **Etapa 3:** implementar serialização JSON validada e confirmação de importação.
- [ ] **Etapa 4:** testar cópia bem-sucedida para a área de transferência e falha que aciona o download de um arquivo Markdown.
- [ ] **Etapa 5:** implementar os controles de exportação com mensagens claras de sucesso/erro e sem chamadas de rede.
- [ ] **Etapa 6:** executar todos os testes e `npm run build`; resultado esperado: testes passando e pacote de produção compilado.

### Tarefa 5: Revisar, publicar e confirmar o funcionamento

**Arquivos:**
- Atualizar: arquivos apontados por problemas determinísticos encontrados na revisão.
- Criar: histórico Git na branch `main` e publicação pública.

**Interfaces:**
- Usa: aplicação concluída e direção visual das Tarefas 1–4.
- Entrega: repositório público no GitHub e endereço ativo na Vercel.

- [ ] **Etapa 1:** executar `npm run test -- --run`, `npm run build` e `21st review` nos arquivos de interface alterados; corrigir problemas determinísticos.
- [ ] **Etapa 2:** conferir no navegador os estados de celular e desktop: vazio, ação ativa, concluída, não realizada, edição, exportação e confirmação de importação.
- [ ] **Etapa 3:** inicializar Git, definir a branch `main`, criar um commit descritivo, criar/enviar `vn-24k/feito-hoje` e confirmar o endereço do repositório.
- [ ] **Etapa 4:** publicar na Vercel, confirmar que o endereço de produção responde e testar nele o fluxo diário e a exportação.
