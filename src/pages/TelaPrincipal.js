import React from 'react';
import Header from '../Header/Header';

function TelaPrincipal(props) {
  const { recipeType } = props;
  return (
    <div>
      <Header headerText="Bebidas" />
    </div>
  );
}

export default TelaPrincipal;
