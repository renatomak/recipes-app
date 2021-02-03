import React from 'react';
import userEvent from '@testing-library/user-event';
import TelaPrincipal from '../pages/TelaPrincipal';
import renderWithRouter from './renderWithRouter';

describe('Tela princiapal',() => {
  test('Testa a tela de comidas', () => {
    const { getByTestId } = renderWithRouter(<TelaPrincipal recipeType="Comidas" />);
  })
});