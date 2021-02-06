import React from 'react';
import userEvent from '@testing-library/user-event';
import waitForExpect from 'wait-for-expect';
import App from '../App';
import fetchMock from '../../cypress/mocks/fetch';
import renderWithRouter from './renderWithRouter';

const spicyArrabiata = 'Spicy Arrabiata Penne';

describe('Tela de Receitas Feitas', () => {
  beforeEach(() => {
    global.navigator.clipboard = {
      writeText: jest.fn(),
    };
    global.fetch = jest.fn((url) => fetchMock(url));
    localStorage.setItem('doneRecipes', JSON.stringify(
      [
        {
          id: '52771',
          type: 'comida',
          area: 'Italian',
          category: 'Vegetarian',
          alcoholicOrNot: '',
          name: spicyArrabiata,
          image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
          doneDate: '04/02/2021',
          tags: ['Pasta', 'Curry'],
        },
        {
          id: '178319',
          type: 'bebida',
          area: '',
          category: 'Cocktail',
          alcoholicOrNot: 'Alcoholic',
          name: 'Aquamarine',
          image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
          doneDate: '04/02/2021',
          tags: [''],
        },
      ],
    ));
  });

  test('verifica se os componetes estão na tela', async () => {
    const { findByTestId } = renderWithRouter(<App />, '/receitas-feitas');
    const tituloPagina = await findByTestId('page-title');
    const allButton = await findByTestId('filter-by-all-btn');
    const foodButton = await findByTestId('filter-by-food-btn');
    const drinkButton = await findByTestId('filter-by-drink-btn');
    const nomeReceita0 = await findByTestId('0-horizontal-name');
    const nomeReceita1 = await findByTestId('1-horizontal-name');
    const imageReceita0 = await findByTestId('0-horizontal-image');

    expect(tituloPagina).toContainHTML('Receitas Feitas');
    expect(allButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();

    expect(nomeReceita0).toContainHTML(spicyArrabiata);
    expect(nomeReceita1).toContainHTML('Aquamarine');

    userEvent.click(imageReceita0);
    const receitaTitile = await findByTestId('recipe-title');
    expect(receitaTitile).toContainHTML(spicyArrabiata);
  });

  test('os filtros e o botão de compartilhar', async () => {
    const { findByTestId, findByText } = renderWithRouter(<App />, '/receitas-feitas');
    const allButton = await findByTestId('filter-by-all-btn');
    const foodButton = await findByTestId('filter-by-food-btn');
    const drinkButton = await findByTestId('filter-by-drink-btn');
    const nomeReceita0 = await findByTestId('0-horizontal-name');
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
