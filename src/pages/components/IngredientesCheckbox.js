import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
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

function IngredientesCheckbox({ setFinalizada }) {
  const { ingredientes, receita } = useContext(RecipeAppContext);
  const [checkIngrediente, setCheckIngrediente] = useState([]);
  const [carregando, setCarregando] = useState(true);
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
    setCarregando(false);
  }, [receita, ingredientes]);

  useEffect(() => {
    const estaFinalizada = checkIngrediente.every((check) => check === true);
    if (estaFinalizada && checkIngrediente.length) {
      setFinalizada(estaFinalizada);
    } else {
      setFinalizada(false);
    }
  }, [checkIngrediente, setFinalizada]);

  if (carregando) {
    return <p>Carregando</p>;
  }

  return (
    <div className="ingredientes">
      <p>Ingrdientes</p>
      {ingredientes.map((ingrediente, index) => (
        <div
          data-testid={ `${index}-ingredient-step` }
          className="ingrediente"
          key={ index }
        >
          <input
            type="checkbox"
            id={ `${index}-ingrediente` }
            checked={ checkIngrediente[index] }
            onChange={ () => checkboxSet(
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
        </div>
      ))}
    </div>
  );
}

export default IngredientesCheckbox;

IngredientesCheckbox.propTypes = {
  setFinalizada: PropTypes.func.isRequired,
};
