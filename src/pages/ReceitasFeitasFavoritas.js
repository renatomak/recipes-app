import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import BotoesDeFiltros from './components/BotoesDeFiltros';
import CardFeitasFavoritas from './components/CardFeitasFavoritas';

function ReceitasFeitasFavoritas({ history: { push }, telaAtual }) {
  const [filter, setFilter] = useState('all');
  const [updateFavorites, setUpdateFavorites] = useState(false);
  const [loading, setLoading] = useState(true);
  const messageTelaAtual = telaAtual === 'feitas'
    ? 'Receitas Feitas'
    : 'Receitas Favoritas';

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const data = telaAtual === 'feitas' ? doneRecipes : favoriteRecipes;

  useEffect(() => {
    if (data) setLoading(false);
  }, [data]);

  return (
    <div data-testid="tela-receitas-feitas-favoritas">
      <Header headerText={ messageTelaAtual } showSearchButton="false" />
      <BotoesDeFiltros setFilter={ setFilter } />
      {!loading && data
        .filter(({ type }) => {
          if (filter === 'all') return true;
          if (filter === type) return true;
          return false;
        })
        .map((receita, index) => (
          <CardFeitasFavoritas
            updateFavorites={ updateFavorites }
            setUpdateFavorites={ setUpdateFavorites }
            telaAtual={ telaAtual }
            receita={ receita }
            index={ index }
            key={ index }
            push={ push }
          />
        ))}
    </div>
  );
}

export default ReceitasFeitasFavoritas;

ReceitasFeitasFavoritas.propTypes = {
  telaAtual: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
