import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';

function ExplorarBebidasComidas(props) {
  const { recipeType } = props;
  return (
    <div>
      <Header headerText={ `Explorar ${recipeType}` } showSearchButton="false" />
    </div>
  );
}

export default ExplorarBebidasComidas;

ExplorarBebidasComidas.propTypes = {
  recipeType: PropTypes.string.isRequired,
};
