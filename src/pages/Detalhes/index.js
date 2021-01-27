import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CarouselRecipes from './Carousel';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';

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

function ChecahSeFoiFeita(idReceita) {
  if (localStorage.getItem('doneRecipes')) {
    const receitasFeitas = JSON.parse(localStorage.getItem('doneRecipes'));
    return receitasFeitas.some(({ id }) => id === idReceita);
  }
  return false;
}

function ChecaSeFavorita(idReceita) {
  if (localStorage.getItem('favoriteRecipes')) {
    const receitasFavoritas = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return receitasFavoritas.some(({ id }) => id === idReceita);
  }
  return false;
}

function ChecaSeEstaEmAndamento(idReceita) {
  if (localStorage.getItem('inProgressRecipes')) {
    const receitasEmProgresso = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { cocktails, meals } = receitasEmProgresso;
    const inProgress = cocktails || meals;

    return Object.keys(inProgress)[0] === idReceita;
  }
  return false;
}

function irParaTeladeProgresso(history, idDrink, idMeal) {
  if (idDrink) {
    history.push(`/bebidas/${idDrink}/in-progress`);
  } else if (idMeal) {
    history.push(`/comidas/${idMeal}/in-progress`);
  }
}

function copyToClipboard(url, setMessage) {
  navigator.clipboard.writeText(`http://localhost:3000${url}`);
  setMessage(true);
  const delay = 5000;
  setTimeout(() => { setMessage(false); }, delay);
}

function fetchReceitas(endpoint, setReceita, setYouTubeCode, setIngredientes) {
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
}

function fetchRecomendacoes(recomendationEndpoint, setRecomendations) {
  fetch(recomendationEndpoint)
    .then((response) => response.json())
    .then((json) => {
      const { meals, drinks } = json;
      const data = meals || drinks;
      const minRecomendations = 6;
      setRecomendations(data.filter((item, index) => index < minRecomendations));
    });
}

function Detalhes(props) {
  const [receita, setReceita] = useState({});
  const [ingredientes, setIngredientes] = useState([]);
  const [youTubeCode, setYouTubeCode] = useState('');
  const [recomendations, setRecomendations] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const { match: { url, params: { id } }, history } = props;
  const comidaOuBebida = url.split('/')[1];

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
    fetchReceitas(endpoint, setReceita, setYouTubeCode, setIngredientes);

    fetchRecomendacoes(recomendationEndpoint, setRecomendations);
  }, [comidaOuBebida, id]);

  const {
    strMealThumb,
    strDrinkThumb,
    strMeal,
    strDrink,
    strCategory,
    strAlcoholic,
    strInstructions,
    idMeal,
    idDrink,
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
          onClick={ () => copyToClipboard(url, setCopySuccess) }
        >
          compartilhar
        </button>

        <span>
          {copySuccess ? 'Link copiado!' : ''}
        </span>

        <input
          type="image"
          data-testid="favorite-btn"
          alt="favorite button"
          src={
            ChecaSeFavorita(idDrink || idMeal)
              ? blackHeart
              : whiteHeart
          }
        />

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
        className="iniciar-receita"
        hidden={ ChecahSeFoiFeita(idDrink || idMeal) }
        onClick={ () => { irParaTeladeProgresso(history, idDrink, idMeal); } }
      >
        {
          ChecaSeEstaEmAndamento(idDrink || idMeal)
            ? 'Continuar Receita'
            : 'Iniciar receita'
        }
      </button>

    </div>
  );
}

export default Detalhes;

Detalhes.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
