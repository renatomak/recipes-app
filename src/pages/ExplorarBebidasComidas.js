import React from 'react';
import PropTypes from 'prop-types';
import './Explorar.css';
import Header from './components/Header';
import Button from './components/Button';

function ExplorarBebidasComidas(props) {
  const { recipeType } = props;

  if (recipeType === 'Comidas') {
    return (
      <div>
        <Header headerText={ `Explorar ${recipeType}` } showSearchButton="false" />
        <Button value="Por Ingredientes" dataTestid="explore-by-ingredient" path="/explorar/comidas/ingredientes" />
        <Button value="Por Local de Origem" dataTestid="explore-by-area" path="/explorar/comidas/area" />
        <Button value="Me Surpreenda!" dataTestid="explore-surprise" path="" />
      </div>
    );
  }
  return (
    <div>
      <Header headerText={ `Explorar ${recipeType}` } showSearchButton="false" />
      <Button value="Por Ingredientes" dataTestid="explore-by-ingredient" path="/explorar/bebidas/ingredientes" />
      <Button value="Me Surpreenda!" dataTestid="explore-surprise" path="" />
    </div>
  );
}

export default ExplorarBebidasComidas;

ExplorarBebidasComidas.propTypes = {
  recipeType: PropTypes.string.isRequired,
};
