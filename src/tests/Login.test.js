import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Login', () => {
  test('se os inputs o botão existem', () => {
    const { getByTestId } = renderWithRouter(<App />, '/');

    const inputLogin = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const submitBtn = getByTestId('login-submit-btn');
    expect(inputLogin).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  test('testa se os inputs habilitam o botão e vai para a rota /comidas', async () => {
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
    const receitas = getByTestId('page-title');
    expect(receitas).toContainHTML('Comidas');
  });
});
