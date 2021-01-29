import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { copyToClipboard } from '../../Auxiliares/FuncoesAuxiliares';
import shareIcon from '../../images/shareIcon.svg';

function CardFeitasFavoritas({ telaAtual, receita, index }) {
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
  return (
    <div className="card-receita-feita">
      <img
        src={ image }
        alt="receita feita"
        data-testid={ `${index}-horizontal-image` }
      />

      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {type === 'comida' ? `${area} - ${category}` : alcoholicOrNot}
      </p>

      <p
        data-testid={ `${index}-horizontal-name` }
      >
        {name}
      </p>

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
        onClick={ () => copyToClipboard(`/${type}s/${id}`, setCopySuccess) }
        alt="compartilhar"
      />
      {telaAtual ? '' : ''}
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
};
