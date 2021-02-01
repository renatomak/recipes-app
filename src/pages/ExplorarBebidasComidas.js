import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { RecipeAppContext } from '../context/Provider';
import Header from './components/Header';
import Button from './components/Button';

function ExplorarBebidasComidas(props) {
  const { recipeType } = props;
  const [isRedirect, setIsRedirect] = useState(false);
  const [path, setPath] = useState();
  const { searchIDRandon, setSearchType } = useContext(RecipeAppContext);

  useEffect(() => {
    setSearchType(recipeType);
  }, [recipeType, setSearchType]);

  const handleSurprise = async () => {
    const id = await searchIDRandon();
    if (recipeType === 'Comidas') {
      setPath(`/comidas/${id}`);
    }
    if (recipeType === 'Bebidas') {
      setPath(`/bebidas/${id}`);
    }
    setIsRedirect(true);
  };

  if (isRedirect) {
    console.log('Path: ', path);
    return <Redirect to={ path } />;
  }
  if (recipeType === 'Comidas') {
    return (
      <div>
        <Header headerText={ `Explorar ${recipeType}` } showSearchButton="false" />
        <Button
          value="Por Ingredientes"
          dataTestid="explore-by-ingredient"
          path="/explorar/comidas/ingredientes"
        />
        <Button
          value="Por Local de Origem"
          dataTestid="explore-by-area"
          path="/explorar/comidas/area"
        />
        <button
          type="button"
          onClick={ handleSurprise }
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>

      </div>
    );
  }

  return (
    <div>
      <Header headerText={ `Explorar ${recipeType}` } showSearchButton="false" />
      <Button
        value="Por Ingredientes"
        dataTestid="explore-by-ingredient"
        path="/explorar/bebidas/ingredientes"
      />
      <button
        type="button"
        onClick={ handleSurprise }
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>
    </div>
  );
}

export default ExplorarBebidasComidas;

ExplorarBebidasComidas.propTypes = {
  recipeType: PropTypes.string.isRequired,
};
