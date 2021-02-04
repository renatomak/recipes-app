import React from 'react';
import userEvent from '@testing-library/user-event';
import waitForExpect from 'wait-for-expect';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Perfil', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(
      {"email":"vitor_rc1@outlook.com"},
    ));
  });
  test('testa se os elementos estão na tela e vai para a tela de feitas', async () => {
    const { findByTestId } = renderWithRouter(
      <App />, '/perfil',
    );

    const receitasFeitasBtn = await findByTestId('profile-done-btn');
    const receitasfavoritasBtn = await findByTestId('profile-favorite-btn');
    const sairBtn = await findByTestId('profile-logout-btn');
    const userEmail = await findByTestId('profile-email');

    expect(receitasFeitasBtn).toBeInTheDocument();
    expect(receitasfavoritasBtn).toBeInTheDocument();
    expect(sairBtn).toBeInTheDocument();
    expect(userEmail).toContainHTML('vitor_rc1@outlook.com');

    userEvent.click(receitasFeitasBtn);
    const receitasFeitasTitle = await findByTestId('page-title')
    expect(receitasFeitasTitle).toContainHTML('Receitas Feitas');
  });

  test('vai para a tela de favoritos', async () => {
    const { findByTestId } = renderWithRouter(
      <App />, '/perfil',
    );

    const receitasfavoritasBtn = await findByTestId('profile-favorite-btn');

    userEvent.click(receitasfavoritasBtn);
    const receitasFavoritasTitle = await findByTestId('page-title')
    expect(receitasFavoritasTitle).toContainHTML('Receitas Favoritas');
  });

  test('faz logout', async () => {
    const { findByTestId } = renderWithRouter(
      <App />, '/perfil',
    );

    const sairBtn = await findByTestId('profile-logout-btn');

    userEvent.click(sairBtn);
    const emailInput = await findByTestId('email-input')
    expect(emailInput).toBeInTheDocument();
  });
})