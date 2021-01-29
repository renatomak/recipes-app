import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from '.';

const RecipeAppProvider = ({ children }) => {
  const [receita, setReceita] = useState({});
  const [ingredientes, setIngredientes] = useState([]);
  const [favorita, setFavorita] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (value) => setEmail(value);
  const handleChangePassword = (value) => setPassword(value);

  const context = {
    receita,
    ingredientes,
    favorita,
    setReceita,
    setIngredientes,
    setFavorita,
    email,
    handleChangeEmail,
    password,
    handleChangePassword,
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
