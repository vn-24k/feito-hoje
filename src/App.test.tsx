import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Feito Hoje - Aplicação Principal', () => {
  it('renderiza o cabeçalho editorial em português', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: /feito hoje/i })).toBeDefined();
  });

  it('apresenta o seletor com as 5 dimensões da vida', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /corpo & saúde/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /aprendizado técnico/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /finanças & soberania/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /espiritualidade & mente/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /relações & família/i })).toBeDefined();
  });

  it('exibe o campo para firmar o compromisso do dia', () => {
    render(<App />);
    expect(screen.getByLabelText(/defina uma ação concreta/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /firmar este compromisso/i })).toBeDefined();
  });

  it('apresenta a seção dos últimos 7 dias sem linguagem punitiva', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 3, name: /os últimos 7 dias/i })).toBeDefined();
  });
});
