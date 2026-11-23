import { describe, it, expect } from 'vitest';
import { getSaoPauloDayKey, formatDayKeyDisplay, getPast7DayKeys } from './date';
import { loadActions, saveActions, upsertAction, getActionForDay, STORAGE_KEY } from './storage';
import { toObsidianMarkdown } from './markdown';
import { exportBackupJson, validateBackupJson } from './backup';
import { DailyAction } from './action';

describe('Domínio: Data e Fuso Horário de São Paulo', () => {
  it('gera chave no formato YYYY-MM-DD para São Paulo', () => {
    const key = getSaoPauloDayKey();
    expect(key).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('formata exibição amigável em português', () => {
    const formatted = formatDayKeyDisplay('2026-11-23');
    expect(formatted.toLowerCase()).toContain('novembro');
  });

  it('calcula os últimos 7 dias de forma contígua', () => {
    const days = getPast7DayKeys('2026-11-23');
    expect(days).toHaveLength(7);
    expect(days[6]).toBe('2026-11-23');
    expect(days[0]).toBe('2026-11-17');
  });
});

describe('Domínio: Armazenamento Seguro', () => {
  it('recupera graciosamente de JSON corrompido ou vazio', () => {
    const mockStorage = {
      getItem: () => 'invalido { [',
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      length: 0,
      key: () => null
    };
    const actions = loadActions(mockStorage);
    expect(actions).toEqual([]);
  });

  it('adiciona e atualiza ação do dia sem duplicar', () => {
    let actions: DailyAction[] = [];
    const action1: DailyAction = {
      id: '1',
      dayKey: '2026-11-23',
      area: 'corpo',
      action: 'Caminhar',
      status: 'planned'
    };
    actions = upsertAction(actions, action1);
    expect(actions).toHaveLength(1);

    const action2: DailyAction = {
      ...action1,
      status: 'completed'
    };
    actions = upsertAction(actions, action2);
    expect(actions).toHaveLength(1);
    expect(getActionForDay(actions, '2026-11-23')?.status).toBe('completed');
  });
});

describe('Domínio: Markdown para o Obsidian', () => {
  it('produz frontmatter e tags compatíveis com o cofre', () => {
    const action: DailyAction = {
      id: '1',
      dayKey: '2026-11-23',
      area: 'aprendizado',
      action: 'Escrever algoritmo',
      status: 'completed',
      evidence: 'Compilou de primeira'
    };
    const md = toObsidianMarkdown(action);
    expect(md).toContain('tags:');
    expect(md).toContain('feito-hoje');
    expect(md).toContain('[[Aprendizado Técnico]]');
    expect(md).toContain('Compilou de primeira');
  });
});

describe('Domínio: Backup e Restauração', () => {
  it('exporta e valida backup JSON corretamente', () => {
    const actions: DailyAction[] = [{
      id: '1',
      dayKey: '2026-11-23',
      area: 'financas',
      action: 'Aporte de paz',
      status: 'completed'
    }];
    const json = exportBackupJson(actions);
    const validation = validateBackupJson(json);
    expect(validation.valid).toBe(true);
    expect(validation.actions).toHaveLength(1);
    expect(validation.actions?.[0].action).toBe('Aporte de paz');
  });
});
