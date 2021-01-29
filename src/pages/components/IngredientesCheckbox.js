import React, { useState, useEffect, useContext } from 'react';
import { RecipeAppContext } from '../../context/Provider';

import './IngredientesCheckbox.css';

function checkboxSet(
  receita,
  setCheckIngrediente,
  checkIngrediente,
  index,
) {
  const copyCheckIngrediente = [...checkIngrediente];
  copyCheckIngrediente[index] = !copyCheckIngrediente[index];
  setCheckIngrediente(copyCheckIngrediente);

  // logica para atualizar o localStorage
  const {
    idMeal,
    idDrink,
  } = receita;

  const id = idMeal || idDrink;
  const tipo = idMeal ? 'meals' : 'cocktails';
  const localStorageInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const updateLocalStorage = {
    ...localStorageInProgress[tipo],
    [id]: copyCheckIngrediente,
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify({
    ...localStorageInProgress,
    [tipo]: updateLocalStorage,
  }));
}

function createInProgessRecipesStorage() {
  const localStorageInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (localStorageInProgress) return true;

  localStorage.setItem('inProgressRecipes', JSON.stringify({
    cocktails: {},
    meals: {},
  }));

  return false;
}

function IngredientesCheckbox() {
  const { ingredientes, receita } = useContext(RecipeAppContext);
  const [checkIngrediente, setCheckIngrediente] = useState([]);
  useEffect(() => {
    // array vazio para controle dos checkboxs
    const checkList = [];
    ingredientes.forEach(() => checkList.push(false));

    const {
      idMeal,
      idDrink,
    } = receita;

    const id = idMeal || idDrink;
    const tipo = idMeal ? 'meals' : 'cocktails';

    createInProgessRecipesStorage();
    const localStorageInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const isIdExist = localStorageInProgress[tipo][id];
    if (isIdExist) {
      setCheckIngrediente(localStorageInProgress[tipo][id]);
    } else {
      // logica para criar os checkboxs no localStorage
      setCheckIngrediente(checkList);
      const newItem = {
        ...localStorageInProgress[tipo],
        [id]: checkList,
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...localStorageInProgress,
        [tipo]: newItem,
      }));
    }
  }, [receita, ingredientes]);

  return (
    <div className="ingredientes">
      <p>Ingrdientes</p>
      {ingredientes.map((ingrediente, index) => (
        <label
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ `${index}-ingrediente` }
          className="ingrediente"
          key={ index }
        >
          <input
            type="checkbox"
            id={ `${index}-ingrediente` }
            // data-testid={`${index}-ingredient-step`}
            checked={ checkIngrediente[index] }
            onClick={ () => checkboxSet(
              receita,
              setCheckIngrediente,
              checkIngrediente,
              index,
            ) }
          />
          <span
            className={ checkIngrediente[index] ? 'checked' : '' }
          >
            {ingrediente}
          </span>
        </label>
      ))}
    </div>
  );
}

export default IngredientesCheckbox;
