import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CarouselRecipes from './Carousel';
import {
  ChecahSeFoiFeita,
  ChecaSeFavorita,
  ChecaSeEstaEmAndamento,
  irParaTeladeProgresso,
  copyToClipboard,
  fetchReceitas,
  fetchRecomendacoes,
  favoritarReceita,
} from './FuncoesAuxiliares';

import whiteHeart from '../../images/whiteHeartIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';

function Detalhes(props) {
  const [receita, setReceita] = useState({});
  const [ingredientes, setIngredientes] = useState([]);
  const [youTubeCode, setYouTubeCode] = useState('');
  const [recomendations, setRecomendations] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [favorita, setFavorita] = useState(false);

  const { match: { url, params: { id } }, history } = props;
  const comidaOuBebida = url.split('/')[1];

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
    setFavorita(ChecaSeFavorita(idDrink || idMeal));

    fetchRecomendacoes(recomendationEndpoint, setRecomendations);
  }, [comidaOuBebida, id, idDrink, idMeal]);

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
          onClick={ () => favoritarReceita(receita, favorita, setFavorita) }
          src={ favorita ? blackHeart : whiteHeart }
        />

        <p data-testid="recipe-category">
          {' '}
          {strAlcoholic || strCategory}
          {' '}
        </p>
      </div>

      <div className="ingredientes">
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
