import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CarouselRecipes from './Carousel';

function filtraIngredientes(items) {
  const auxArray = [];
  Object.entries(items)
    .filter(([key, value]) => (
      (key.includes('strIngredient') || key.includes('strMeasure')) && value
    ))
    .forEach(([keyFiltrado]) => {
      if (keyFiltrado.includes('strIngredient')) {
        const lastChar = -1;
        const keyIndex = keyFiltrado.slice(lastChar);
        const item = items[`strIngredient${keyIndex}`];
        const measure = items[`strMeasure${keyIndex}`];
        auxArray.push(`${item} ${measure}`);
      }
    });
  return auxArray;
}

function Detalhes(props) {
  const [receita, setReceita] = useState({});
  const [ingredientes, setIngredientes] = useState([]);
  const [youTubeCode, setYouTubeCode] = useState('');
  const [recomendations, setRecomendations] = useState([]);

  const { match: { path, params: { id } } } = props;
  const comidaOuBebida = path.split('/')[1];

  useEffect(() => {
    let endpoint = '';
    let recomendationEndpoint = '';
    if (comidaOuBebida === 'comidas') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      recomendationEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    } else if (comidaOuBebida === 'bebidas') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      recomendationEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    }
    fetch(endpoint)
      .then((response) => response.json())
      .then((json) => {
        const { meals, drinks } = json;
        const data = meals || drinks;
        setReceita(data[0]);

        const ingredientesArray = filtraIngredientes(data[0]);

        if (meals) {
          const { strYoutube } = meals[0];
          setYouTubeCode(strYoutube.split('=')[1]);
        }
        setIngredientes(ingredientesArray);
      });

    fetch(recomendationEndpoint)
      .then((response) => response.json())
      .then((json) => {
        const { meals, drinks } = json;
        const data = meals || drinks;
        const minRecomendations = 6;
        setRecomendations(data.filter((item, index) => index < minRecomendations));
      });
  }, [comidaOuBebida, id]);
  const {
    strMealThumb,
    strDrinkThumb,
    strMeal,
    strDrink,
    strCategory,
    strAlcoholic,
    strInstructions,
  } = receita;
  return (
    <div className="detalhes">
      <div className="header-receita">
        <img
          src={ strMealThumb || strDrinkThumb }
          alt="detalhes da receita"
          data-testid="recipe-photo"
        />

        <h2 data-testid="recipe-title">
          {strMeal || strDrink}
        </h2>

        <button
          type="button"
          data-testid="share-btn"
        >
          compartilhar
        </button>

        <button
          type="button"
          data-testid="favorite-btn"
        >
          favoritar
        </button>

        <p data-testid="recipe-category">
          {strAlcoholic || strCategory}
        </p>
      </div>

      <div
        className="ingredientes"
      >
        <p>Ingrdientes</p>
        {ingredientes.map((ingrediente, index) => (
          <p
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingrediente}`}
          </p>
        ))}
      </div>

      <div
        data-testid="instructions"
        className="instructions"
      >
        {strInstructions}
      </div>

      {comidaOuBebida === 'comidas' ? (
        <iframe
          src={ `https://www.youtube.com/embed/${youTubeCode}` }
          data-testid="video"
          className="video"
          title="video da receita"
        />
      ) : null}

      <CarouselRecipes recomendations={ recomendations } />

      <button
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar receita
      </button>

    </div>
  );
}

export default Detalhes;

Detalhes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
