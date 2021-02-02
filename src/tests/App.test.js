import React from 'react';
import { render, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import ReceitasFeitasFavoritas from '../pages/ReceitasFeitasFavoritas';
import { createMemoryHistory } from 'history';

describe('APP - verificação das rotas', () => {
  test('se as rotas carregam os componentes corretos', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const path = history.location.pathname;
    expect(path).toBe('/')
    
    const inputLogin = getByTestId('email-input');
    expect(inputLogin).toBeInTheDocument();
  });
  test('receitas favoritas está na tela',  () => {
    // const history = createMemoryHistory();
    // const { getByTestId, getByText } = render(<ReceitasFeitasFavoritas telaAtual="favoritas" history={history} />)
    // const { getByTestId, getByText, history } = renderWithRouter(<ReceitasFeitasFavoritas telaAtual="favoritas" />);
    // const { getByTestId, history } = renderWithRouter(<App />);
    
    // history.push('/teste');
    // console.log(history.location.pathname)
    // const path = history.location.pathname;
    // expect(path).toBe('/teste');
    // const receitas = getByTestId('page-title');

    // const header = getByTestId('tela-receitas-feitas-favoritas');
    // expect(header).toBeInTheDocument();
  })

})
