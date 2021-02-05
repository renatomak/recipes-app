import React from 'react';
import userEvent from '@testing-library/user-event';
import waitForExpect from 'wait-for-expect';
import App from '../App';
import fetchMock from '../../cypress/mocks/fetch';
import renderWithRouter from './renderWithRouter';

const spicyArrabiata = 'Spicy Arrabiata Penne';
const receitasFavoritas = '/receitas-favoritas';
const horizontaZeroName = '0-horizontal-name';

describe('Tela de Receitas favoritas', () => {
  beforeEach(() => {
    global.navigator.clipboard = {
      writeText: jest.fn(),
    };
    global.fetch = jest.fn((url) => fetchMock(url));
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      [
        {
          id: '52771',
          type: 'comida',
          area: 'Italian',
          category: 'Vegetarian',
          alcoholicOrNot: '',
          name: spicyArrabiata,
          image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        },
        {
          id: '178319',
          type: 'bebida',
          area: '',
          category: 'Cocktail',
          alcoholicOrNot: 'Alcoholic',
          name: 'Aquamarine',
          image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        },
      ],
    ));
  });

  test(' verifica se os componetes estão na tela', async () => {
    const { findByTestId } = renderWithRouter(<App />, receitasFavoritas);
    const tituloPagina = await findByTestId('page-title');
    const allButton = await findByTestId('filter-by-all-btn');
    const foodButton = await findByTestId('filter-by-food-btn');
    const drinkButton = await findByTestId('filter-by-drink-btn');
    const nomeReceita0 = await findByTestId(horizontaZeroName);
    const nomeReceita1 = await findByTestId('1-horizontal-name');

    expect(tituloPagina).toContainHTML('Receitas Favoritas');
    expect(allButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();

    expect(nomeReceita0).toContainHTML(spicyArrabiata);
    expect(nomeReceita1).toContainHTML('Aquamarine');
  });

  test('defavoritar receita', async () => {
    const { findByTestId } = renderWithRouter(<App />, receitasFavoritas);
    const nomeReceita0 = await findByTestId(horizontaZeroName);
    const favoriteBtn0 = await findByTestId('0-horizontal-favorite-btn');

    expect(nomeReceita0).toContainHTML(spicyArrabiata);
    userEvent.click(favoriteBtn0);
    expect(nomeReceita0).toContainHTML('Aquamarine');
  });

  test('os filtros e o botão de compartilhar', async () => {
    const { findByTestId, findByText } = renderWithRouter(<App />, receitasFavoritas);
    const allButton = await findByTestId('filter-by-all-btn');
    const foodButton = await findByTestId('filter-by-food-btn');
    const drinkButton = await findByTestId('filter-by-drink-btn');
    const nomeReceita0 = await findByTestId(horizontaZeroName);
    const nomeReceita1 = await findByTestId('1-horizontal-name');
    const shareBtn0 = await findByTestId('0-horizontal-share-btn');

    userEvent.click(foodButton);
    expect(nomeReceita0).toContainHTML(spicyArrabiata);

    userEvent.click(drinkButton);
    expect(nomeReceita0).toContainHTML('Aquamarine');

    userEvent.click(allButton);
    expect(nomeReceita0).toContainHTML(spicyArrabiata);
    expect(nomeReceita1).toContainHTML('Aquamarine');

    userEvent.click(shareBtn0);
    const linkCopiado = await findByText('Link copiado!');
    expect(linkCopiado).toContainHTML('Link copiado!');

    userEvent.click(nomeReceita0);
    const receitaTitulo = await findByTestId('recipe-title');
    waitForExpect(() => {
      expect(receitaTitulo).toContainHTML(spicyArrabiata);
    });
  });
});
