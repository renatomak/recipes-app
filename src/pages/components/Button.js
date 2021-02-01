import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Button(props) {
  const { path, value, dataTestid } = props;
console.log('path', path)
  return (
    <Link
      to={ path }
      data-testid={ dataTestid }
    >
      {value}
    </Link>
  );
}

export default Button;

Button.propTypes = {
  value: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
