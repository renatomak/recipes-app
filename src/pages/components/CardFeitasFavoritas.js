import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { copyToClipboard } from '../../Auxiliares/FuncoesAuxiliares';
import shareIcon from '../../images/shareIcon.svg';

import './CardFeitasFavoritas.css';

function redirecionarParaDetalhes(url, push) {
  push(url);
}

function CardFeitasFavoritas({ receita, index, push, telaAtual }) {
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

  console.log(telaAtual);

  return (
    <div className="card-receita-feita">
      <input
        type="image"
        src={ image }
        alt="receita feita"
        data-testid={ `${index}-horizontal-image` }
        onClick={ () => redirecionarParaDetalhes(URL, push) }
        className="compartilhar-button"
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
        onKeyDown={ () => redirecionarParaDetalhes(URL, push) }
      >
        {name}
      </button>

      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        {doneDate}
      </p>

      <div className="tags">
        {tags.map((tag) => (
          <p
            data-testid={ `${index}-${tag}-horizontal-tag` }
            key={ tag }
          >
            { tag }
          </p>
        ))}
      </div>
      <input
        type="image"
        src={ shareIcon }
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => copyToClipboard(URL, setCopySuccess) }
        alt="compartilhar"
      />

      <span>
        {copySuccess ? 'Link copiado!' : ''}
      </span>
    </div>
  );
}

export default CardFeitasFavoritas;

CardFeitasFavoritas.propTypes = {
  telaAtual: PropTypes.string.isRequired,
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
