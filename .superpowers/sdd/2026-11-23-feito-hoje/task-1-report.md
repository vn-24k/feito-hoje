# Relatório — Tarefa 1: Preparar o projeto e registrar a direção visual

## Status

Concluída com uma pendência de ambiente de teste registrada abaixo. O projeto
Vite + React + TypeScript, a configuração do Vitest/Testing Library, o teste de
renderização, o contexto visual e a página-base em português brasileiro foram
criados. A estrutura de interface permanece propositalmente pequena para que
as tarefas 2 a 4 possam acrescentar os módulos de domínio e fluxo sem
retrabalho.

## Direção visual documentada

- Caderno editorial claro: papel `#FFFDF8`, fundo quente `#F5F0E7`, tinta escura
  e detalhes discretos em champanhe/dourado.
- Títulos em serifada de sistema com tom humano e corpo em sans-serif legível.
- Composição mobile-first, de coluna única, com espaço em branco e sem painéis,
  métricas ou metáforas de sistema.
- Textos, interface e instruções do produto em português brasileiro.
- Foco visível e suporte a redução de movimento já presentes na base CSS.

As escolhas completas estão em `.21st/design.json` e `.21st/DESIGN.md`.

## Pesquisa e compatibilidade

- `21st init --design-context` foi executado antes da pesquisa e criou os
  arquivos de contexto.
- A busca no catálogo retornou padrões editoriais, de formulário e mobile
  coerentes. Nenhuma dependência visual foi instalada nesta etapa para não
  introduzir CSS de terceiros no esqueleto.
- Foram consultados os componentes locais de botão e entrada que poderiam servir
  ao produto. Efeitos de papel, shaders, mesas de objetos e referências de
  viagem foram descartados: não pertencem ao fluxo íntimo do Feito Hoje.
- A roleta não foi executada novamente. A referência já registrada de turismo em
  Tóquio foi deliberadamente considerada incompatível e não foi reutilizada.

## Validação

- `npm run build`: passou. O Vite compilou os 16 módulos e gerou `dist/`.
- `21st review src/App.tsx src/styles.css`: executado. Restaram apenas avisos
  informativos sobre os valores dos tokens de cor declarados no início do CSS e
  a cor alfa da sombra; não há correções automáticas ou problema funcional.
- `git diff --check`: passou, sem erros de espaço em branco.
- `npm run test -- --run`: não concluiu. O Vitest iniciou, mas ficou em
  `Test Files 0 passed (1)` durante a coleta. O problema foi isolado antes do
  teste: o simples `import('jsdom')` com a versão instalada (`jsdom@31`, trazida
  por `latest`) também bloqueia neste ambiente. Portanto o smoke test está
  presente, mas não foi possível confirmar sua execução até fixar uma versão de
  jsdom compatível e reinstalar as dependências.

## Nota operacional

A primeira instalação do npm foi encerrada por `SIGTERM` após o download de
`jsdom`, sem lockfile. A instalação foi repetida em sessão interativa e
concluiu (`added 96 packages in 4m`), gerando `package-lock.json`. O bloqueio de
teste ocorreu somente depois, durante a inicialização do jsdom.

## Arquivos entregues

- Base Vite/React/TypeScript e configurações de teste.
- `src/App.tsx`, `src/styles.css` e `src/App.test.tsx` com a página-base e smoke
  test em português brasileiro.
- `.21st/design.json` e `.21st/DESIGN.md` com tokens, restrições e decisões.
- Plano atualizado: etapas 1–3 concluídas; etapa 4 fica aberta por causa da
  pendência objetiva do jsdom.
