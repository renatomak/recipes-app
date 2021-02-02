import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import { fireEvent } from '@testing-library/react';


describe('Login', () => {
  test('se os inputs o botão existem', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const path = history.location.pathname;
    expect(path).toBe('/')
    
    const inputLogin = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const submitBtn = getByTestId('login-submit-btn');
    expect(inputLogin).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  test('testa se os inputs habilitam o botão e vai para a rota /comidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    
    const inputLogin = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const submitBtn = getByTestId('login-submit-btn');
    
    expect(submitBtn).toBeDisabled();
    
    fireEvent.change(inputLogin, {target: {value: 'email@email.com'}});
    expect(inputLogin.value).toBe('email@email.com');

    expect(submitBtn).toBeDisabled();

    fireEvent.change(passwordInput, {target: {value: '1234567'}});
    expect(passwordInput.value).toBe('1234567');
    
    expect(submitBtn).toBeEnabled();


    // fireEvent.click(submitBtn);

    // const actualPath = history.location.pathname;

    // expect(actualPath).toBe('/comidas')
    
  })

})

