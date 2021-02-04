import React from 'react';
import userEvent from '@testing-library/user-event';
import waitForExpect from 'wait-for-expect';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import fetchMock from '../../cypress/mocks/fetch';

global.fetch = jest.fn((url) => fetchMock(url));
const two = 2;
const cardImg = '0-card-img';
const searchTopBtn = 'search-top-btn';
const firstRecipeImageComida = 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg';
const firstRecipeImageBebida = 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg';
describe('Tela principal', () => {
  test('a tela de comidas e os botões de filtro', async () => {
    const { getByTestId, findByTestId } = renderWithRouter(
      <App />, '/comidas',
    );
    const headerTitle = getByTestId('page-title');
    const profileTopBtn = getByTestId('profile-top-btn');
    const serachButton = getByTestId(searchTopBtn);

    expect(headerTitle).toContainHTML('Comidas');
    expect(profileTopBtn).toBeInTheDocument();
    expect(serachButton).toBeInTheDocument();

    const beefCategory = await findByTestId('Beef-category-filter');
    const breakfastCategory = await findByTestId('Breakfast-category-filter');
    const chickenCategory = await findByTestId('Chicken-category-filter');
    const dessertCategory = await findByTestId('Dessert-category-filter');
    const goatCategory = await findByTestId('Goat-category-filter');
    const allCategory = await findByTestId('All-category-filter');

    const firstRecipe = await findByTestId(cardImg);

    expect(beefCategory).toBeInTheDocument();
    expect(breakfastCategory).toBeInTheDocument();
    expect(chickenCategory).toBeInTheDocument();
    expect(dessertCategory).toBeInTheDocument();
    expect(goatCategory).toBeInTheDocument();
    expect(allCategory).toBeInTheDocument();
    expect(firstRecipe.src).toBe(firstRecipeImageComida);

    expect(global.fetch).toHaveBeenCalledTimes(two);

    userEvent.click(beefCategory);
    await waitForExpect(() => {
      expect(firstRecipe.src).toBe('https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg');
    });
    userEvent.click(breakfastCategory);
    await waitForExpect(() => {
      expect(firstRecipe.src).toBe('https://www.themealdb.com/images/media/meals/1550441882.jpg');
    });
    userEvent.click(breakfastCategory);
    await waitForExpect(() => {
      expect(firstRecipe.src).toBe(firstRecipeImageComida);
    });
    userEvent.click(chickenCategory);
    await waitForExpect(() => {
      expect(firstRecipe.src).toBe('https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg');
    });
    userEvent.click(dessertCategory);
    await waitForExpect(() => {
      expect(firstRecipe.src).toBe('https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg');
    });
    userEvent.click(goatCategory);
    await waitForExpect(() => {
      expect(firstRecipe.src).toBe('https://www.themealdb.com/images/media/meals/cuio7s1555492979.jpg');
    });
    userEvent.click(allCategory);
    await waitForExpect(() => {
      expect(firstRecipe.src).toBe(firstRecipeImageComida);
    });
  });

  test('o botão de pesquisa renderiza a searchBar e pesquisa por comidas', async () => {
    const { getByTestId, findByTestId } = renderWithRouter(
      <App />, '/comidas',
    );
    const showSearchBar = getByTestId(searchTopBtn);
    userEvent.click(showSearchBar);

    const searchInput = await findByTestId('search-input');
    const searchRadioIngredient = await findByTestId('ingredient-search-radio');
    const searchRadioName = await findByTestId('name-search-radio');
    const searchRadioFirstLetter = await findByTestId('first-letter-search-radio');
    const searchButton = await findByTestId('exec-search-btn');

    expect(searchInput).toBeInTheDocument();
    expect(searchRadioIngredient).toBeInTheDocument();
    expect(searchRadioName).toBeInTheDocument();
    expect(searchRadioFirstLetter).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    userEvent.type(searchInput, 'Chicken');
    userEvent.click(searchRadioIngredient);
    userEvent.click(searchButton);

    const mealsByIngredient = await findByTestId(cardImg);
    expect(mealsByIngredient.src).toBe('https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg');

    userEvent.type(searchInput, 'soup');
    userEvent.click(searchRadioName);
    userEvent.click(searchButton);

    const mealsByName = await findByTestId(cardImg);
    expect(mealsByName.src).toBe('https://www.themealdb.com/images/media/meals/x2fw9e1560460636.jpg');

    userEvent.type(searchInput, 'a');
    userEvent.click(searchRadioFirstLetter);
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
  });

  test('a tela de bebidas e os botões de filtros', async () => {
    const { getByTestId, findByTestId } = renderWithRouter(
      <App />, '/bebidas',
    );

    const headerTitle = getByTestId('page-title');
    const profileTopBtn = getByTestId('profile-top-btn');
    const serachButton = getByTestId(searchTopBtn);

    expect(headerTitle).toContainHTML('Bebidas');
    expect(profileTopBtn).toBeInTheDocument();
    expect(serachButton).toBeInTheDocument();

    const ordinaryDrinkCategory = await findByTestId('Ordinary Drink-category-filter');
    const cocktailCategory = await findByTestId('Cocktail-category-filter');
    const milkFloatShakeCategory = await findByTestId(
      'Milk / Float / Shake-category-filter',
    );
    const otherUknownCategory = await findByTestId('Other/Unknown-category-filter');
    const cocoaCategory = await findByTestId('Cocoa-category-filter');
    const allCategory = await findByTestId('All-category-filter');

    expect(ordinaryDrinkCategory).toBeInTheDocument();
    expect(cocktailCategory).toBeInTheDocument();
    expect(milkFloatShakeCategory).toBeInTheDocument();
    expect(otherUknownCategory).toBeInTheDocument();
    expect(cocoaCategory).toBeInTheDocument();
    expect(allCategory).toBeInTheDocument();

    const firstRecipe = await findByTestId(cardImg);

    expect(firstRecipe.src).toBe(firstRecipeImageBebida);

    userEvent.click(ordinaryDrinkCategory);
    await waitForExpect(() => {
      expect(firstRecipe.src).toBe('https://www.thecocktaildb.com/images/media/drink/rrtssw1472668972.jpg');
    });
    userEvent.click(cocktailCategory);
    await waitForExpect(() => {
      expect(firstRecipe.src).toBe('https://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg');
    });
    userEvent.click(cocktailCategory);
    await waitForExpect(() => {
      expect(firstRecipe.src).toBe(firstRecipeImageBebida);
    });
    userEvent.click(milkFloatShakeCategory);
    await waitForExpect(() => {
      expect(firstRecipe.src).toBe('https://www.thecocktaildb.com/images/media/drink/rvwrvv1468877323.jpg');
    });
    userEvent.click(otherUknownCategory);
    await waitForExpect(() => {
      expect(firstRecipe.src).toBe('https://www.thecocktaildb.com/images/media/drink/tqxyxx1472719737.jpg');
    });
    userEvent.click(cocoaCategory);
    await waitForExpect(() => {
      expect(firstRecipe.src).toBe('https://www.thecocktaildb.com/images/media/drink/3nbu4a1487603196.jpg');
    });
    userEvent.click(allCategory);
    await waitForExpect(() => {
      expect(firstRecipe.src).toBe(firstRecipeImageBebida);
    });
  });

  test('o botão de pesquisa renderiza a searchBar e pesquisa por bebidas', async () => {
    const { getByTestId, findByTestId } = renderWithRouter(
      <App />, '/comidas',
    );
    const showSearchBar = getByTestId(searchTopBtn);
    userEvent.click(showSearchBar);

    const searchInput = await findByTestId('search-input');
    const searchRadioIngredient = await findByTestId('ingredient-search-radio');
    const searchRadioName = await findByTestId('name-search-radio');
    const searchRadioFirstLetter = await findByTestId('first-letter-search-radio');
    const searchButton = await findByTestId('exec-search-btn');

    expect(searchInput).toBeInTheDocument();
    expect(searchRadioIngredient).toBeInTheDocument();
    expect(searchRadioName).toBeInTheDocument();
    expect(searchRadioFirstLetter).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    userEvent.type(searchInput, 'lemon');
    userEvent.click(searchRadioIngredient);
    userEvent.click(searchButton);
    userEvent.type(searchInput, 'gin');
    userEvent.click(searchRadioName);
    userEvent.click(searchButton);
    userEvent.type(searchInput, 'a');
    userEvent.click(searchRadioFirstLetter);
    userEvent.click(searchButton);
  });
});
