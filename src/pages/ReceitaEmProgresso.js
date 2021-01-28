import React, { useContext } from 'react';
import { RecipeAppContext } from '../context/Provider';
import HeaderReceitas from './components/HeaderReceitas';

function ReceitaEmProgresso() {
  const {
    receita,
    ingredientes,
  } = useContext(RecipeAppContext);
  const {
    strInstructions,
    idMeal,
    idDrink,
  } = receita;
  return (
    <div className="receita-progresso">
      <HeaderReceitas />

      <div className="ingredientes">
        <p>Ingrdientes</p>
        {ingredientes.map((ingrediente, index) => (
          <div 
            className="ingrediente"
            key={ index }
            data-testid='ingredient-step'
          >
            <input
              type="checkbox"
            />
              {ingrediente}
          </div>
        ))}
      </div>

      <div
        data-testid="instructions"
        className="instructions"
      >
        {strInstructions}
      </div>

      <button 
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default ReceitaEmProgresso;
