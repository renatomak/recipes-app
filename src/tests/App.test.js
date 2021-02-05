import React from 'react';
import App from '../App';
import fetchMock from '../../cypress/mocks/fetch';
import renderWithRouter from './renderWithRouter';

global.fetch = jest.fn((url) => fetchMock(url));
const pageTitle = 'page-title';
const recipeTitle = 'recipe-title';
describe('APP - verificação das rotas', () => {
  test('se as rotas carregam os componentes corretos', () => {
    const { getByTestId } = renderWithRouter(<App />, '/');

    const inputLogin = getByTestId('email-input');
    expect(inputLogin).toBeInTheDocument();
  });

  test('bebidas está na tela', () => {
    const { getByTestId } = renderWithRouter(<App />, '/comidas');
    const bebidas = getByTestId(pageTitle);
    expect(bebidas).toBeInTheDocument();
  });

  test('comidas está na tela', () => {
    const { getByTestId } = renderWithRouter(<App />, '/comidas');
    const comidas = getByTestId(pageTitle);
    expect(comidas).toBeInTheDocument();
  });

  test('bebida/:id está na tela', () => {
    const { getByTestId } = renderWithRouter(<App />, '/bebidas/178319');
    const bebidaTitulo = getByTestId(recipeTitle);
    expect(bebidaTitulo).toBeInTheDocument();
  });

  test('comida/:id está na tela', () => {
    const { getByTestId } = renderWithRouter(<App />, '/comidas/52771');
    const comidaTitulo = getByTestId(recipeTitle);
    expect(comidaTitulo).toBeInTheDocument();
  });

  test('bebida/:id/in-progress está na tela', () => {
    const { getByTestId } = renderWithRouter(<App />, '/bebidas/178319/in-progress');
    const bebidaTituloProgresso = getByTestId(recipeTitle);
    expect(bebidaTituloProgresso).toBeInTheDocument();
  });

  test('comida/:id/in-progress está na tela', () => {
    const { getByTestId } = renderWithRouter(<App />, '/comidas/52771/in-progress');
    const comidaTituloProgresso = getByTestId(recipeTitle);
    expect(comidaTituloProgresso).toBeInTheDocument();
  });

  test('explorar bebidas está na tela', () => {
    const { getByTestId } = renderWithRouter(<App />, '/explorar/bebidas');
    const explorarBebidas = getByTestId(pageTitle);
    expect(explorarBebidas).toBeInTheDocument();
  });

  test('explorar comidas está na tela', () => {
    const { getByTestId } = renderWithRouter(<App />, '/explorar/comidas');
    const explorarComidas = getByTestId(pageTitle);
    expect(explorarComidas).toBeInTheDocument();
  });

  test('explorar bebidas por ingredientes está na tela', () => {
    const { getByTestId } = renderWithRouter(<App />, '/explorar/bebidas');
    const explorarBebidasIngredientes = getByTestId(pageTitle);
    expect(explorarBebidasIngredientes).toBeInTheDocument();
  });

  test('explorar comidas por ingredientes está na tela', () => {
    const { getByTestId } = renderWithRouter(<App />, '/explorar/comidas');
    const explorarComidasIngredientes = getByTestId(pageTitle);
    expect(explorarComidasIngredientes).toBeInTheDocument();
  });

  test('perfil está na tela', () => {
    const { getByTestId } = renderWithRouter(<App />, '/perfil');
    const perfil = getByTestId(pageTitle);
    expect(perfil).toBeInTheDocument();
  });

  test('receitas feitas está na tela', () => {
    const { getByTestId } = renderWithRouter(<App />, '/receitas-feitas');
    const feitas = getByTestId(pageTitle);
    expect(feitas).toBeInTheDocument();
  });

  test('receitas favoritas está na tela', () => {
    const { getByTestId } = renderWithRouter(<App />, '/receitas-favoritas');
    const favoritas = getByTestId(pageTitle);
    expect(favoritas).toBeInTheDocument();
  });

  test('não encontrada está na tela', () => {
    const { getByTestId } = renderWithRouter(<App />, '/xablau');
    const notFound = getByTestId('not-found');
    expect(notFound).toBeInTheDocument();
  });
});
