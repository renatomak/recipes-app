import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Button(props) {
  const { path, value, dataTestid } = props;
  return (
    <Link
      to={ path }
      data-testid={ dataTestid }
      className="btn"
    >
      <div className="btn-link">
        {value}
      </div>
    </Link>
  );
}

export default Button;

Button.propTypes = {
  value: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
