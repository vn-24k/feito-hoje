# Feito Hoje — Especificação

## Intenção

Criar uma ferramenta pessoal, adaptada primeiro para celular, que ajude Vinícius a transformar um valor importante em uma ação possível para hoje, registrar o que aconteceu e levar esse registro ao Obsidian. A página inicial deve permitir o uso imediato do fluxo principal: o valor está em agir e registrar, não em ler uma apresentação longa.

O cofre já contém princípios, metas, rastreadores de hábitos e notas diárias. Nas notas consultadas, algumas prioridades diárias estavam em branco e certos percentuais de progresso divergiam entre notas. Isso pode indicar registros inconsistentes; não prova que as ações deixaram de ser feitas. O produto deve facilitar a captura da ação e do que ocorreu, sem culpa nem pressão por sequências perfeitas.

## Objetivos

- Escolher uma área da vida e definir uma ação concreta e pequena para hoje.
- Tornar simples, no celular, começar a ação e registrar seu resultado.
- Permitir uma nota breve quando o dia não sair como planejado e facilitar a retomada.
- Mostrar um registro simples dos últimos sete dias, sem dar notas à pessoa.
- Manter os registros no dispositivo e exportar uma nota Markdown datada para o Obsidian.

## Fora do escopo

- Substituir o Obsidian ou editar o cofre diretamente a partir de um site público.
- Criar contas, sincronização na nuvem, compartilhamento social, lembretes ou análises de uso na primeira versão.
- Dar orientações médicas, financeiras ou espirituais.
- Criar outro painel genérico de metas.

## O que evitar

- Vergonha, perda de sequência, estados visuais de fracasso ou linguagem que trate uma ação não realizada como falha pessoal.
- Metáforas de cockpit ou sala de controle, métricas densas ou paredes de cartões de recursos.
- Enviar reflexões pessoais para fora do dispositivo.

## Abordagens consideradas

1. **Página editorial apenas.** É a opção mais simples, mas deixa a pessoa com inspiração e sem utilidade diária.
2. **Ferramenta local com apresentação integrada** *(escolhida).* A página abre no fluxo diário, explica o propósito e a privacidade no contexto e exporta o registro em Markdown. Ela já tem utilidade sem servidor ou credenciais do cofre.
3. **Integração direta com o Obsidian.** Poderia reduzir a transferência manual, mas uma página pública não acessa um cofre local com segurança sem um complemento local ou plugin. Isso adicionaria configuração e manutenção antes de validar o fluxo principal.

## Fluxo do produto

1. Ao abrir a página, a pessoa escolhe uma área: corpo, aprendizado técnico, finanças, espiritualidade ou relações.
2. Descreve uma ação pequena, com duração opcional. A ferramenta pode oferecer exemplos; a pessoa escolhe e edita a ação.
3. Ao começar, registra a ação. Ao concluir, ficam salvos a data, a área, a ação e uma evidência ou reflexão opcional.
4. Se a ação não acontecer, a pessoa pode salvar uma nota e escolher um passo menor. Nenhuma pontuação é descontada.
5. A pessoa consulta um resumo dos últimos sete dias e copia ou baixa uma nota Markdown para o Obsidian.

## Direção visual

Criar a sensação de um caderno editorial acolhedor, com bastante espaço em branco, texto escuro como tinta, detalhes discretos em champanhe ou dourado e tipografia sem serifa legível, combinada com uma serifada de traço humano em alguns títulos. A interação principal deve parecer uma página aberta para firmar um compromisso possível, sem aparência de máquina. O celular é a composição prioritária; no desktop há mais respiro, sem acrescentar painéis. Movimento sutil e respeito à preferência por movimento reduzido.

## Dados e limites técnicos

- Começar como aplicação web estática executada no navegador; guardar os registros no armazenamento local do navegador.
- Não criar contas, análises de uso ou transmissão de registros pela rede.
- Oferecer cópia e download de Markdown para transferência ao Obsidian, com confirmação visível após copiar ou salvar.
- Incluir exportação e importação de dados JSON como forma simples de backup e recuperação local.
- Ter interface responsiva e acessível por teclado, com foco visível e rótulos semânticos nos campos.
- A primeira versão não promete sincronização entre dispositivos; o navegador pode apagar o armazenamento local.

## Critérios de sucesso

- Uma pessoa consegue registrar sua primeira ação em menos de um minuto no celular.
- Após atualizar a página, a ação salva e o registro de sete dias continuam disponíveis.
- O Markdown exportado contém data, área, ação e reflexão opcional em formato legível.
- Um dia sem ação não gera linguagem punitiva nem impede a retomada.
- A página explica que os registros ficam no navegador e oferece uma forma prática de backup ou exportação.

## Decisões para a implementação

- O nome do app é **Feito Hoje**.
- A primeira versão tem uma rota responsiva, sem site de marketing separado nem login.
- O armazenamento do navegador é a fonte principal; Markdown é o formato de transferência para o Obsidian.
- Os textos, pequenas ilustrações e detalhes de interação ficam a cargo da implementação, respeitando a direção visual acima.
