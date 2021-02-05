import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { RecipeAppContext } from "../../context/Provider";
import {
  copyToClipboard,
  favoritarReceita,
  ChecaSeFavorita,
} from "../../Auxiliares/FuncoesAuxiliares";

import whiteHeart from "../../images/whiteHeartIcon.svg";
import blackHeart from "../../images/blackHeartIcon.svg";

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

      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => copyToClipboard(url, setCopySuccess) }
      >
        compartilhar
      </button>

      <span>{copySuccess ? "Link copiado!" : ""}</span>

      <input
        type="image"
        data-testid="favorite-btn"
        alt="favorite button"
        onClick={() => favoritarReceita(receita, favorita, setFavorita)}
        src={favorita ? blackHeart : whiteHeart}
      />

      <p data-testid="recipe-category">{strAlcoholic || strCategory}</p>
    </div>
  );
}

export default HeaderReceitas;

HeaderReceitas.propTypes = {
  url: PropTypes.string.isRequired,
};
