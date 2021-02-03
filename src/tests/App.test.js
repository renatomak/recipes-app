import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import renderWithRouter from './renderWithRouter';

describe('APP - verificação das rotas', () => {
  test('se as rotas carregam os componentes corretos', () => {
    const { getByTestId } = renderWithRouter(<App />, '/');

    const inputLogin = getByTestId('email-input');
    expect(inputLogin).toBeInTheDocument();
  });
  test('receitas favoritas está na tela', () => {
    const { getByTestId, findByTestId } = renderWithRouter(<App />, '/');

    const inputLogin = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const submitBtn = getByTestId('login-submit-btn');

    expect(submitBtn).toBeDisabled();

    userEvent.type(inputLogin, 'email@email.com');
    expect(inputLogin.value).toBe('email@email.com');

    expect(submitBtn).toBeDisabled();

    userEvent.type(passwordInput, '1234567');
    expect(passwordInput.value).toBe('1234567');

    expect(submitBtn).toBeEnabled();

    userEvent.click(submitBtn);
    const tituloTelas = getByTestId('page-title');
    expect(tituloTelas).toContainHTML('Comidas');

    const drinkBtn = getByTestId('drinks-bottom-btn');
    userEvent.click(drinkBtn);
    expect(tituloTelas).toContainHTML('Bebidas');

    const foodBtn = getByTestId('food-bottom-btn');
    userEvent.click(foodBtn);
    expect(tituloTelas).toContainHTML('Comidas');

    const profileBtn = getByTestId('profile-top-btn');
    // userEvent.click(profileBtn);
    // expect(tituloTelas).toContainHTML('Perfil');

    // const profileFavoriteBtn = getByTestId('profile-favorite-btn');
    // userEvent.click(profileFavoriteBtn);
    // expect(tituloTelas).toContainHTML('Receitas Favoritas');

  });
});
