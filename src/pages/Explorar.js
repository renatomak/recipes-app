import React from 'react';
import Header from './components/Header';

function Explorar() {
  return (
    <div>
      <Header headerText="Explorar" showSearchButton="false" />
      <button
        type="button"
        data-testid="explore-food"
      >
        Explorar Comidas
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
      >
        Explorar Bebidas
      </button>
    </div>
  );
}

export default Explorar;
