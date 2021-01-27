import React from 'react';
import PropTypes from 'prop-types';

function DetalhesReceitaBebidaComida(props) {
  const { recipeType } = props;
  return (
    <div>
      { recipeType }
      ;
    </div>
  );
}

export default DetalhesReceitaBebidaComida;

DetalhesReceitaBebidaComida.propTypes = {
  recipeType: PropTypes.string.isRequired,
};
