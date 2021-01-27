import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';

function TelaPrincipal(props) {
  const { recipeType } = props;
  return (
    <div>
      <Header headerText={ recipeType } showSearchButton="true" />
    </div>
  );
}

export default TelaPrincipal;

TelaPrincipal.propTypes = {
  recipeType: PropTypes.string.isRequired,
};
