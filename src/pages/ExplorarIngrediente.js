import React from 'react';
import Header from './Header';

function ExplorarIndrediente(props) {
  const { recipeType } = props;
  return (
    <div>
      <Header headerText="Explorar Ingredientes" />
    </div>
  );
}

export default ExplorarIndrediente;
