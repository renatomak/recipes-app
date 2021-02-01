import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import BotoesDeFiltros from './components/BotoesDeFiltros';
import CardFeitasFavoritas from './components/CardFeitasFavoritas';

function ReceitasFeitasFavoritas({ history: { push }, telaAtual }) {
  const [filter, setFilter] = useState('all');
  const [updateFavorites, setUpdateFavorites] = useState(false);

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const data = telaAtual === 'feitas' ? doneRecipes : favoriteRecipes;
  console.log(telaAtual);

  return (
    <div>
      <Header headerText="Receitas Feitas" showSearchButton="false" />
      <BotoesDeFiltros setFilter={ setFilter } />
      {data
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
