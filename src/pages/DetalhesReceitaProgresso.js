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
import '../css/recipeCard.css';
import '../css/detalhesProgresso.css';

function redirecionarParaFeitas(history, receita) {
  const {
    strMealThumb,
    strDrinkThumb,
    strMeal,
    strDrink,
    strCategory,
    strAlcoholic,
    idMeal,
    idDrink,
    strArea,
    strTags,
  } = receita;
  const tags = strTags || '';
  const id = idMeal || idDrink;
  const tipo = idMeal ? 'meals' : 'cocktails';
  const date = new Date();

  const localStorageInProgress = {
    ...JSON.parse(localStorage.getItem('inProgressRecipes')),
  };
  const localStorageDoneRecipes = [...JSON.parse(localStorage.getItem('doneRecipes'))];

  localStorageDoneRecipes.push({
    id: idMeal || idDrink,
    type: idMeal ? 'comida' : 'bebida',
    area: strArea || '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic || '',
    name: strMeal || strDrink,
    image: strMealThumb || strDrinkThumb,
    doneDate: date.toLocaleDateString(),
    tags: tags.split(','),
  });
  localStorage.setItem('doneRecipes', JSON.stringify(localStorageDoneRecipes));
  delete localStorageInProgress[tipo][id];
  localStorage.setItem('inProgressRecipes', JSON.stringify(localStorageInProgress));
  history.push('/receitas-feitas');
}

function returnEndpoint(recipeType, id) {
  if (recipeType === 'Comidas') {
    return `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  }
  return `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
}
function retunrRecomendationEndPoint(recipeType) {
  if (recipeType === 'Comidas') {
    return 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  }
  return 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
}

function DetalhesReceitaBebidaComida(props) {
  const {
    receita,
    ingredientes,
    setReceita,
    setIngredientes,
  } = useContext(RecipeAppContext);

  const [youTubeCode, setYouTubeCode] = useState('');
  const [recomendations, setRecomendations] = useState([]);
  const [finalizada, setFinalizada] = useState(false);
  const [loading, setLoading] = useState(true);
  const { match: { url, params: { id } }, history, recipeType, progresso } = props;

  const {
    strInstructions,
    idMeal,
    idDrink,
  } = receita;

  useEffect(() => {
    const endpoint = returnEndpoint(recipeType, id);
    const recomendationEndpoint = retunrRecomendationEndPoint(recipeType);

    fetchReceitas(endpoint, setReceita, setYouTubeCode, setIngredientes);

    fetchRecomendacoes(recomendationEndpoint, setRecomendations);
  }, [recipeType, id, idDrink, idMeal, setReceita, setIngredientes]);
  const emptyArray = 0;

  useEffect(() => {
    if (recomendations.length !== emptyArray && (idMeal || idDrink)) setLoading(false);
  }, [recomendations, receita]);

  if (loading) return '...Carregando';

  return (
    <div className="detalhes">
      <div className="content-main overBackground">
        <div className="image-video">
          <HeaderReceitas url={ url } />
          {recipeType === 'Comidas' && !progresso
            ? (
              <iframe
                width="560"
                height="315"
                src={ `https://www.youtube.com/embed/${youTubeCode}` }
                data-testid="video"
                className="video"
                title="video da receita"
              />
            ) : null}
        </div>
        <div className="ingredientes-instrucoes">
          {progresso && ingredientes.length !== emptyArray
            ? <IngredientesCheckbox setFinalizada={ setFinalizada } />
            : <IngredientesText ingredientes={ ingredientes } />}
          <div
            data-testid="instructions"
            className="instructions"
          >
            <p className="recipe-title">Instruções</p>
            {strInstructions}
          </div>
        </div>
        {
          progresso
            ? ''
            : <CarouselRecipes recomendations={ recomendations } />
        }
        { progresso
          ? (
            <button
              type="button"
              className="iniciar-finalizar-receita"
              data-testid="finish-recipe-btn"
              disabled={ !finalizada }
              onClick={ () => redirecionarParaFeitas(history, receita) }
            >
              Finalizar Receita
            </button>
          )
          : (
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="iniciar-finalizar-receita"
              hidden={ ChecaSeFoiFeita(idDrink || idMeal) }
              onClick={ () => { irParaTeladeProgresso(history, idDrink, idMeal); } }
            >
              {
                ChecaSeEstaEmAndamento(idDrink, idMeal)
                  ? 'Continuar Receita'
                  : 'Iniciar receita'
              }
            </button>
          )}
      </div>
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
