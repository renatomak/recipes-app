import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';

function Button(props) {
  const { history, recipeType, value, dataTestid } = props;
  return (
    <button
      type="button"
      data-testid={ dataTestid }
      onClick={ () => history.push(`/explorar/${recipeType}/ingredientes`) }
    >
      {value}
    </button>
  );
}

export default Button;

Button.propTypes = {
  recipeType: PropTypes.string.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  value: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
};
