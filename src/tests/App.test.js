import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('APP - verificação das rotas', () => {
  test('se as rotas carregam os componentes corretos', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const path = history.location.pathname;
    expect(path).toBe('/')
    
    const inputLogin = getByTestId('email-input');
    expect(inputLogin).toBeInTheDocument();
  });
  test('receitas favoritas está na tela', async () => {
    const { getByTestId, getByText, history } = renderWithRouter(<App />);
    
    history.push('/perfil');
    console.log(history.location.pathname)
    const path = history.location.pathname;
    expect(path).toBe('/perfil');
    const receitas = await screen.findByTestId('page-title');

    // const header = getByTestId('tela-receitas-feitas-favoritas');
    // expect(header).toBeInTheDocument();
  })

})
