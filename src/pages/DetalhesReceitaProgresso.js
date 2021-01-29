import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { RecipeAppContext } from '../context/Provider';
import CarouselRecipes from './components/Carousel';
import HeaderReceitas from './components/HeaderReceitas';
import IngredientesText from './components/IngredientesText';
import IngredientesCheckbox from './components/IngredientesCheckbox';
import {
  ChecaSeFoiFeita,
  ChecaSeEstaEmAndamento,
  irParaTeladeProgresso,
  fetchReceitas,
  fetchRecomendacoes,
} from '../Auxiliares/FuncoesAuxiliares';

function DetalhesReceitaBebidaComida(props) {
  const {
    receita,
    ingredientes,
    setReceita,
    setIngredientes,
  } = useContext(RecipeAppContext);

  const [youTubeCode, setYouTubeCode] = useState('');
  const [recomendations, setRecomendations] = useState([]);

  const { match: { url, params: { id } }, history, recipeType, progresso } = props;

  const {
    strInstructions,
    idMeal,
    idDrink,
  } = receita;

  useEffect(() => {
    let endpoint = '';
    let recomendationEndpoint = '';
    if (recipeType === 'Comidas') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      recomendationEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    } else if (recipeType === 'Bebidas') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      recomendationEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    }

    fetchReceitas(endpoint, setReceita, setYouTubeCode, setIngredientes);

    fetchRecomendacoes(recomendationEndpoint, setRecomendations);
  }, [recipeType, id, idDrink, idMeal, setReceita, setIngredientes]);
  const emptyArray = 0;

  return (
    <div className="detalhes">
      <HeaderReceitas url={ url } />

      {progresso && ingredientes.length !== emptyArray
        ? <IngredientesCheckbox ingredientes={ ingredientes } />
        : <IngredientesText ingredientes={ ingredientes } />}

      <div
        data-testid="instructions"
        className="instructions"
      >
        {strInstructions}
      </div>

      {recipeType === 'Comidas' ? (
        <iframe
          src={ `https://www.youtube.com/embed/${youTubeCode}` }
          data-testid="video"
          className="video"
          title="video da receita"
        />
      ) : null}

      <CarouselRecipes recomendations={ recomendations } />

      { progresso
        ? (
          <button
            type="button"
            data-testid="finish-recipe-btn"
          >
            Finalizar Receita
          </button>
        )
        : (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="iniciar-receita"
            hidden={ ChecaSeFoiFeita(idDrink || idMeal) }
            onClick={ () => { irParaTeladeProgresso(history, idDrink, idMeal); } }
          >
            {
              ChecaSeEstaEmAndamento(idDrink || idMeal)
                ? 'Continuar Receita'
                : 'Iniciar receita'
            }
          </button>
        )}
    </div>
  );
}

export default DetalhesReceitaBebidaComida;

DetalhesReceitaBebidaComida.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  recipeType: PropTypes.string.isRequired,
  progresso: PropTypes.bool.isRequired,
};
