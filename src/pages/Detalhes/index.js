import React from 'react';
import PropTypes from 'prop-types';

function Detalhes(props) {
  // const [receita, setReceita] = useState({});
  const { location: { pathname } } = props;
  const comidaOuBebida = pathname.split('/');
  return (
    <div className="detalhes">
      <div className="header-receita">
        <img
          src=""
          alt="detalhes da receita"
          data-testid="recipe-photo"
        />

        <h2 data-testid="recipe-title">Titulo</h2>

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
          Categoria
        </p>
      </div>

      <div
        className="ingredientes"
      >
        <p>Ingrdientes</p>
        <p
          data-testid="0-ingredient-name-and-measure"
        >
          Primeiro Ingrediente
        </p>
      </div>

      <div
        data-testid="instructions"
        className="instructions"
      >
        instruções
      </div>

      {comidaOuBebida[1] === 'comidas' ? (
        <iframe
          src=""
          data-testid="video"
          className="video"
          title="video da receita"
        />
      ) : null}

      <div className="recomendações">
        <div
          data-testid="0-recomendation-card"
        >
          Recomendação
        </div>
      </div>

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
  location: {
    pathname: PropTypes.string.isRequired,
  }.isRequired,
};
