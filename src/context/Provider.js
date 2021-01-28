import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from '.';

const RecipeAppProvider = ({ children }) => {
<<<<<<< HEAD
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (value) => setEmail(value);
  const handleChangePassword = (value) => setPassword(value);

  const context = {
    email,
    handleChangeEmail,
    password,
    handleChangePassword,
  };
=======
  const context = {};
>>>>>>> 85afa3d0bb660e155fb998ffafab95cd62934800

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
