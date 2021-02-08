import React from 'react';
import PropTypes from 'prop-types';

function BotoesDeFiltros({ setFilter }) {
  return (
    <div className="botoes-filtros">
      <button
        type="button"
        className="btn-category "
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('all') }
      >
        All
      </button>

      <button
        type="button"
        className="btn-category "
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('comida') }
      >
        Food
      </button>

      <button
        type="button"
        className="btn-category"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('bebida') }
      >
        Drinks
      </button>
    </div>
  );
}

export default BotoesDeFiltros;

BotoesDeFiltros.propTypes = {
  setFilter: PropTypes.func.isRequired,
};
