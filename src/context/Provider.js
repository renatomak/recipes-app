import React, { useState, useEffect } from 'react';
import RecipeAppContext from '.';
import PropTypes from 'prop-types';

const RecipeAppProvider = ({ children }) => {
  const context = {}

  return (
    <RecipeAppContext.Provider value={ context }>
      { children }
    </RecipeAppContext.Provider>
  );
};

export { RecipeAppContext, RecipeAppProvider as Provider};

RecipeAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};