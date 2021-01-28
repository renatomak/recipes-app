import React from 'react';

function IngredientesCheckbox({ingredientes}) {
  return (
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
  );
}

export default IngredientesCheckbox;