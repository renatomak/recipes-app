import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetchMock from '../../cypress/mocks/fetch';
import renderWithRouter from './renderWithRouter';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

global.fetch = jest.fn((url) => fetchMock(url));

global.navigator.clipboard = {
  writeText: jest.fn(),
};
const comecarReceita = 'start-recipe-btn';
const bebidasID = '/bebidas/178319';
describe('Tela de detalhes e progresso', () => {
  test('se a tela de detalhes de comida contem os elementos corretos', async () => {
    const { findByTestId } = renderWithRouter(<App />, bebidasID);
    const recipePhoto = await findByTestId('recipe-photo');
    const recipeTitle = await findByTestId('recipe-title');
    const shareBtn = await findByTestId('share-btn');
    const favoriteBtn = await findByTestId('favorite-btn');
    const recipeCategory = await findByTestId('recipe-category');
    const ingredients = await findByTestId('0-ingredient-name-and-measure');
    const instructions = await findByTestId('instructions');
    const recomendation = await findByTestId('0-recomendation-card');
    const startRecipeBtn = await findByTestId(comecarReceita);

    expect(recipePhoto).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(ingredients).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(recomendation).toBeInTheDocument();
    expect(startRecipeBtn).toBeInTheDocument();

    expect(recipePhoto.src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(recipeTitle).toContainHTML('Aquamarine');
    expect(recipeCategory).toContainHTML('Alcoholic');
    expect(ingredients).toContainHTML('Hpnotiq 2 oz');
  });

  test('o botão de compartilhar', async () => {
    const { findByTestId, findByText } = renderWithRouter(<App />, bebidasID);
    const shareBtn = await findByTestId('share-btn');
    userEvent.click(shareBtn);
    const linkCopiado = await findByText('Link copiado!');
    expect(linkCopiado).toContainHTML('Link copiado!');
  });
  test('o botão de favoritar e aperta o next do carousel', async () => {
    const { findByTestId, findByText } = renderWithRouter(<App />, bebidasID);
    const favoriteBtn = await findByTestId('favorite-btn');
    const next = await (await findByText('Next')).parentElement;
    expect(favoriteBtn.src).toBe(whiteHeart);

    userEvent.click(favoriteBtn);
    expect(favoriteBtn.src).toBe(blackHeart);
    userEvent.click(favoriteBtn);
    expect(favoriteBtn.src).toBe(whiteHeart);

    userEvent.click(next);
  });
  test('vai para a tela de receita em progresso e finaliza a receita', async () => {
    const { findByTestId } = renderWithRouter(<App />, bebidasID);
    const startRecipeBtn = await findByTestId(comecarReceita);
    userEvent.click(startRecipeBtn);
    const step0 = (await findByTestId('0-ingredient-step')).children[0];
    const step1 = (await findByTestId('1-ingredient-step')).children[0];
    const step2 = (await findByTestId('2-ingredient-step')).children[0];

    expect(step1).toBeInTheDocument();
    const finalizarBtn = await findByTestId('finish-recipe-btn');
    expect(finalizarBtn).toBeDisabled();
    userEvent.click(step0);
    userEvent.click(step1);
    userEvent.click(step2);

    expect(finalizarBtn).toBeEnabled();
    userEvent.click(finalizarBtn);

    const receitaFinalizadaCategoria = await findByTestId('0-horizontal-top-text');
    const receitaFinalizadaNome = await findByTestId('0-horizontal-name');
    expect(receitaFinalizadaCategoria).toContainHTML('Alcoholic');
    expect(receitaFinalizadaNome).toContainHTML('Aquamarine');
  });
  test('se está em andamento', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(
      {
        cocktails: { 178319: [false, false, false] },
        meals: {
          52771: [true, true, true, true, false, false, false, false],
          52772: [true, true, true, false, false, false, false, false, false],
        },
      },
    ));
    const { findByTestId } = renderWithRouter(<App />, bebidasID);
    const startRecipeBtn = await findByTestId(comecarReceita);
    expect(startRecipeBtn).toContainHTML('Continuar Receita');
  });
});
