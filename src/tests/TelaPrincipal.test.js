import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import fetchMock from './mocks/fetch';

global.fetch = jest.fn((url) => fetchMock(url) );

describe('Tela princiapal',() => {
  
  test('Testa a tela de comidas', () => {
    const { getByTestId, findByTestId } = renderWithRouter(
        <App />, '/comidas'
    );
    const headerTitle = getByTestId('page-title');
    const profileTopBtn = getByTestId('profile-top-btn');
    const serachButton = getByTestId('search-top-btn');

    expect(headerTitle).toContainHTML('Comidas');
    expect(profileTopBtn).toBeInTheDocument();
    expect(serachButton).toBeInTheDocument();
    
    const beefCategory = findByTestId('Beef-category-filter');
    const breakfastCategory = findByTestId('Breakfast-category-filter');
    const chickenCategory = findByTestId('Chicken-category-filter');
    const dessertCategory = findByTestId('Dessert-category-filter');
    const goatCategory = findByTestId('Goat-category-filter');
    const allCategory = findByTestId('All-category-filter');
  })
});