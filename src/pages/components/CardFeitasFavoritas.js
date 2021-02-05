import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { copyToClipboard, desfavoritarReceita } from '../../Auxiliares/FuncoesAuxiliares';
import shareIcon from '../../images/shareIcon.svg';

import blackHeart from '../../images/blackHeartIcon.svg';

import './CardFeitasFavoritas.css';

function redirecionarParaDetalhes(url, push) {
  push(url);
}

function CardFeitasFavoritas({
  receita,
  index,
  push,
  telaAtual,
  updateFavorites,
  setUpdateFavorites,
}) {
  const [copySuccess, setCopySuccess] = useState(false);

  const {
    id,
    type,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
    doneDate,
    tags,
  } = receita;

  const URL = `/${type}s/${id}`;

  return (
    <div className="card-receita-feitas-favoritas">
      <input
        type="image"
        src={ image }
        alt="receita feita"
        data-testid={ `${index}-horizontal-image` }
        onClick={ () => redirecionarParaDetalhes(URL, push) }
        className="imagem-receita"
      />

      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {type === 'comida' ? `${area} - ${category}` : alcoholicOrNot}
      </p>

      <button
        type="button"
        data-testid={ `${index}-horizontal-name` }
        onClick={ () => redirecionarParaDetalhes(URL, push) }
      >
        {name}
      </button>
      {telaAtual === 'feitas' ? (
        <p
          data-testid={ `${index}-horizontal-done-date` }
        >
          {doneDate}
        </p>

      ) : ''}
      {telaAtual === 'feitas' ? (
        <div className="tags">
          {tags.map((tag) => (
            <p
              data-testid={ `${index}-${tag}-horizontal-tag` }
              key={ tag }
            >
              { tag}
            </p>
          ))}
        </div>
      ) : ''}
      <input
        type="image"
        src={ shareIcon }
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => copyToClipboard(URL, setCopySuccess) }
        alt="compartilhar"
      />

      {telaAtual === 'favoritas' ? (
        <input
          type="image"
          data-testid={ `${index}-horizontal-favorite-btn` }
          alt="favorite button"
          onClick={ () => desfavoritarReceita(id, setUpdateFavorites) }
          src={ blackHeart }
        />
      ) : ''}

      <span>
        {updateFavorites ? 'Favoritos Atualizado' : ''}
      </span>

      <span>
        {copySuccess ? 'Link copiado!' : ''}
      </span>
    </div>
  );
}

export default CardFeitasFavoritas;

CardFeitasFavoritas.propTypes = {
  telaAtual: PropTypes.string.isRequired,
  updateFavorites: PropTypes.bool.isRequired,
  setUpdateFavorites: PropTypes.func.isRequired,
  receita: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  push: PropTypes.func.isRequired,
};
