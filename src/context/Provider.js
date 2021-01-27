import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from '.';

const RecipeAppProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChangeUser = ({ target: { name, value } }) => setUser({
    ...user,
    [name]: value,
  });

  const context = {
    user,
    handleChangeUser,
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
