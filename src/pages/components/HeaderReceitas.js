import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RecipeAppContext } from '../../context/Provider';
import {
  copyToClipboard,
  favoritarReceita,
  ChecaSeFavorita,
} from '../../Auxiliares/FuncoesAuxiliares';

import whiteHeart from "../../images/whiteHeartIcon.svg";
import blackHeart from "../../images/blackHeartIcon.svg";
import shareIcon from '../../images/shareIcon.svg';

function HeaderReceitas({ url }) {
  const [copySuccess, setCopySuccess] = useState(false);

  const { receita, favorita, setFavorita } = useContext(RecipeAppContext);

  const {
    strMealThumb,
    strDrinkThumb,
    strMeal,
    strDrink,
    strCategory,
    strAlcoholic,
    idMeal,
    idDrink,
  } = receita;

  useEffect(() => {
    setFavorita(ChecaSeFavorita(idDrink || idMeal));
  });

  return (
    <div className="header-receita">
      <div className="card">
        <img
          src={ strMealThumb || strDrinkThumb }
          alt="detalhes da receita"
          data-testid="recipe-photo"
        />
      </div>

      <h2 data-testid="recipe-title">{strMeal || strDrink}</h2>
      <p data-testid="recipe-category"> Categoria: {strAlcoholic || strCategory}</p>

      <div className='botões-interacoes'>
        <input
          type="image"
          src={ shareIcon }
          data-testid="share-btn"
          onClick={ () => copyToClipboard(url, setCopySuccess) }
          alt="compartilhar"
          className="botao-compartilhar"
        />
        <span>{copySuccess ? "Link copiado!" : ""}</span>
      <input
        type="image"
        data-testid="favorite-btn"
        alt="favorite button"
        onClick={() => favoritarReceita(receita, favorita, setFavorita)}
        src={favorita ? blackHeart : whiteHeart}
        className="botao-favoritar"
      />
      </div>

    </div>
  );
}

export default HeaderReceitas;

HeaderReceitas.propTypes = {
  url: PropTypes.string.isRequired,
};
