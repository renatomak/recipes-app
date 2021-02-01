export function filtraIngredientes(items) {
  const auxArray = [];
  Object.entries(items)
    .filter(([key, value]) => (
      (key.includes('strIngredient') || key.includes('strMeasure')) && value
    ))
    .forEach(([keyFiltrado]) => {
      if (keyFiltrado.includes('strIngredient')) {
        const lastChar = -1;
        const keyIndex = keyFiltrado.slice(lastChar);
        const item = items[`strIngredient${keyIndex}`];
        const measure = items[`strMeasure${keyIndex}`];
        auxArray.push(`${item} ${measure}`);
      }
    });
  return auxArray;
}

export function ChecaSeFoiFeita(idReceita) {
  if (localStorage.getItem('doneRecipes')) {
    const receitasFeitas = JSON.parse(localStorage.getItem('doneRecipes'));
    return receitasFeitas.some(({ id }) => id === idReceita);
  }
  return false;
}

export function ChecaSeFavorita(idReceita) {
  if (localStorage.getItem('favoriteRecipes')) {
    const receitasFavoritas = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return receitasFavoritas.some(({ id }) => id === idReceita);
  }
  return false;
}

export function ChecaSeEstaEmAndamento(idReceita) {
  if (localStorage.getItem('inProgressRecipes')) {
    const receitasEmProgresso = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { cocktails, meals } = receitasEmProgresso;
    const inProgress = cocktails || meals;

    return Object.keys(inProgress)[0] === idReceita;
  }
  return false;
}

export function irParaTeladeProgresso(history, idDrink, idMeal) {
  if (idDrink) {
    history.push(`/bebidas/${idDrink}/in-progress`);
  } else if (idMeal) {
    history.push(`/comidas/${idMeal}/in-progress`);
  }
}

export function copyToClipboard(url, setMessage) {
  const urlSplited = url.split('/');
  navigator.clipboard.writeText(`http://localhost:3000/${urlSplited[1]}/${urlSplited[2]}`);
  setMessage(true);
  const delay = 5000;
  setTimeout(() => { setMessage(false); }, delay);
}

export function fetchReceitas(endpoint, setReceita, setYouTubeCode, setIngredientes) {
  fetch(endpoint)
    .then((response) => response.json())
    .then((json) => {
      const { meals, drinks } = json;
      const data = meals || drinks;
      setReceita(data[0]);

      const ingredientesArray = filtraIngredientes(data[0]);

      if (meals) {
        const { strYoutube } = meals[0];
        setYouTubeCode(strYoutube.split('=')[1]);
      }
      setIngredientes(ingredientesArray);
    });
}

export function fetchRecomendacoes(recomendationEndpoint, setRecomendations) {
  fetch(recomendationEndpoint)
    .then((response) => response.json())
    .then((json) => {
      const { meals, drinks } = json;
      const data = meals || drinks;
      const minRecomendations = 6;
      setRecomendations(data.filter((item, index) => index < minRecomendations));
    });
}

export function favoritarReceita(receita, favorita, setFavorita) {
  const {
    strMealThumb,
    strDrinkThumb,
    strMeal,
    strDrink,
    strCategory,
    strAlcoholic,
    idMeal,
    idDrink,
    strArea,
  } = receita;

  if (localStorage.getItem('favoriteRecipes') && favorita) {
    // desfavoritar
    const receitasFavoritas = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const idExist = idMeal || idDrink;
    const arrayDesfavoritado = receitasFavoritas.filter(({ id }) => id !== idExist);
    localStorage.setItem('favoriteRecipes', JSON.stringify(arrayDesfavoritado));
  } else if (!favorita) {
    // favoritar
    const receitasFavoritas = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const novaReceitaFavorita = {
      id: idMeal || idDrink,
      type: idMeal ? 'comida' : 'bebida',
      area: strArea || '',
      category: strCategory || '',
      alcoholicOrNot: strAlcoholic || '',
      name: strMeal || strDrink,
      image: strMealThumb || strDrinkThumb,
    };
    localStorage.setItem(
      'favoriteRecipes', JSON.stringify([...receitasFavoritas, novaReceitaFavorita]),
    );
  }
  setFavorita(!favorita);
}

export function desfavoritarReceita(id, setUpdateFavorites) {
  const receitasFavoritas = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const arrayDesfavoritado = receitasFavoritas
    .filter(({ id: idFavorite }) => idFavorite !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(arrayDesfavoritado));
  setUpdateFavorites(true);
  const delay = 5000;
  setTimeout(() => { setUpdateFavorites(false); }, delay);
}
