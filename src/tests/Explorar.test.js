import React from 'react';
import userEvent from '@testing-library/user-event';
import waitForExpect from 'wait-for-expect';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import fetchMock from '../../cypress/mocks/fetch';

const pageTitle = 'page-title';
const explorarComidasString = 'Explorar Comidas';
const rotaExplorarComida = '/explorar/comidas';
const exploreSurpriseString = 'explore-surprise';

describe('Explorar', () => {
  test('checa se os itens estão na tela e vai para explorar comidas ', async () => {
    const { findByTestId } = renderWithRouter(
      <App />, '/explorar',
    );
    const explorarComidas = await findByTestId('explore-food');
    const explorarBebidas = await findByTestId('explore-drinks');

    expect(explorarComidas).toBeInTheDocument();
    expect(explorarBebidas).toBeInTheDocument();

    userEvent.click(explorarComidas);
    const titulo = await findByTestId(pageTitle);
    expect(titulo).toContainHTML(explorarComidasString);
  });

  test('vai para explorar bebidas ', async () => {
    const { findByTestId } = renderWithRouter(
      <App />, '/explorar',
    );
    const explorarBebidas = await findByTestId('explore-drinks');

    userEvent.click(explorarBebidas);
    const titulo = await findByTestId(pageTitle);
    expect(titulo).toContainHTML('Explorar Bebidas');
  });
});

describe(explorarComidasString, () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => fetchMock(url));
  });

  test('checa se os itens estão na tela e vai para explorar ingredientes ', async () => {
    const { findByTestId } = renderWithRouter(
      <App />, rotaExplorarComida,
    );
    const explorarIngredientes = await findByTestId('explore-by-ingredient');
    const explorarArea = await findByTestId('explore-by-area');
    const surpreendaBtn = await findByTestId(exploreSurpriseString);

    expect(explorarIngredientes).toBeInTheDocument();
    expect(explorarArea).toBeInTheDocument();
    expect(surpreendaBtn).toBeInTheDocument();

    userEvent.click(explorarIngredientes);
    const titulo = await findByTestId(pageTitle);
    expect(titulo).toContainHTML('Explorar Ingredientes');
  });

  test('vai para eplorar por area ', async () => {
    const { findByTestId } = renderWithRouter(
      <App />, rotaExplorarComida,
    );
    const explorarArea = await findByTestId('explore-by-area');

    userEvent.click(explorarArea);
    const titulo = await findByTestId(pageTitle);
    expect(titulo).toContainHTML('Explorar Origem');
    const dropdownArea = await findByTestId('explore-by-area-dropdown');
    userEvent.selectOptions(dropdownArea, ['American']);
    const americaValue = await findByTestId('American-option');
    await waitForExpect(() => {
      expect(americaValue.selected).toBe(true);
    });
    expect(dropdownArea.value).toBe('American');
  });

  test('me surpreeenda ', async () => {
    const { findByTestId } = renderWithRouter(
      <App />, rotaExplorarComida,
    );
    const surpreendaBtn = await findByTestId(exploreSurpriseString);

    userEvent.click(surpreendaBtn);
    const titulo = await findByTestId('recipe-title');
    expect(titulo).toBeInTheDocument();
  });
});

describe(explorarComidasString, () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => fetchMock(url));
  });

  test('checa se os itens estão na tela e vai para explorar ingredientes ', async () => {
    const { findByTestId } = renderWithRouter(
      <App />, '/explorar/bebidas',
    );
    const explorarIngredientes = await findByTestId('explore-by-ingredient');
    const surpreendaBtn = await findByTestId(exploreSurpriseString);

    expect(explorarIngredientes).toBeInTheDocument();
    expect(surpreendaBtn).toBeInTheDocument();

    userEvent.click(explorarIngredientes);
    const titulo = await findByTestId(pageTitle);
    expect(titulo).toContainHTML('Explorar Ingredientes');
  });

  test('me surpreeenda ', async () => {
    const { findByTestId } = renderWithRouter(
      <App />, '/explorar/bebidas',
    );
    const surpreendaBtn = await findByTestId(exploreSurpriseString);

    userEvent.click(surpreendaBtn);
    const titulo = await findByTestId('recipe-title');
    expect(titulo).toBeInTheDocument();
  });
});
