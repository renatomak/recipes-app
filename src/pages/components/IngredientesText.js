import React from 'react';
import PropTypes from 'prop-types';

function IngredientesText({ ingredientes }) {
  return (
    <div className="ingredientes">
      <p className="recipe-title">Ingrdientes</p>
      {ingredientes.map((ingrediente, index) => (
        <p
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${ingrediente}`}
        </p>
      ))}
    </div>
  );
}

export default IngredientesText;

IngredientesText.propTypes = {
  ingredientes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
