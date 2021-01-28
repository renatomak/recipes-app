import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from '.';

const RecipeAppProvider = ({ children }) => {
  const [receita, setReceita] = useState({});
  const [ingredientes, setIngredientes] = useState([]);
  const [favorita, setFavorita] = useState(false);

  const context = {
    receita,
    ingredientes,
    favorita,
    setReceita,
    setIngredientes,
    setFavorita,
  };

  return (
    <RecipeAppContext.Provider value={ context }>
      { children }
    </RecipeAppContext.Provider>
  );
};

export { RecipeAppContext, RecipeAppProvider as Provider };

RecipeAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
