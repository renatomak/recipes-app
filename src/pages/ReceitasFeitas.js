import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import BotoesDeFiltros from './components/BotoesDeFiltros';
import CardFeitasFavoritas from './components/CardFeitasFavoritas';

function ReceitasFeitas({ history: { push } }) {
  const [filter, setFilter] = useState('all');
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  return (
    <div>
      <Header headerText="Receitas Feitas" showSearchButton="false" />
      <BotoesDeFiltros setFilter={ setFilter } />
      {doneRecipes
        .filter(({ type }) => {
          if (filter === 'all') return true;
          if (filter === type) return true;
          return false;
        })
        .map((receita, index) => (
          <CardFeitasFavoritas
            telaAtual="feitas"
            receita={ receita }
            index={ index }
            key={ index }
            push={ push }
          />
        ))}
    </div>
  );
}

export default ReceitasFeitas;

ReceitasFeitas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
