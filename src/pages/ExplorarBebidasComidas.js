import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import './Explorar.css';
import Header from './components/Header';

function ExplorarBebidasComidas(props) {
  const { recipeType, history } = props;
  return (
    <div>
      <Header headerText={ `Explorar ${recipeType}` } showSearchButton="false" />

      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </button>

      <button
        type="button"
        className={ `button-${recipeType}` }
        data-testid="explore-by-area"
        onClick={ () => history.push('/explorar/comidas/area') }
      >
        Por Local de Origem
      </button>

      <button
        type="button"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>
    </div>
  );
}

export default ExplorarBebidasComidas;

ExplorarBebidasComidas.propTypes = {
  recipeType: PropTypes.string.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};
