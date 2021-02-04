import React, { useState, useContext, useEffect, useCallback } from 'react';
import RecipeAppContext from '../context/index';
import Header from './components/Header';
import Footer from './components/Footer';
import RecipeCard from './components/RecipeCard';

function ExplorarComidasArea() {
  const [isLoading, setIsLoading] = useState(true);
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');

  const {
    recipes,
    recipesCards,
  } = useContext(RecipeAppContext);

  const showCards = useCallback(
    async (parameter) => {
      let data = {};
      setIsLoading(true);
      if (parameter === 'All' || parameter === undefined) {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const result = await response.json();
        data = result.meals;
      } else {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${parameter}`);
        const result = await response.json();
        data = result.meals;
      }
      recipesCards(data);
      setIsLoading(false);
    }, [recipesCards],
  );

  useEffect(() => {
    showCards();
  }, []);

  const areaDropdownAPIRequest = useCallback(
    async () => {
      setIsLoading(true);
      let data = [];
      const allAreas = [];
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      data = await response.json();
      data.meals.map((meal) => {
        allAreas.push(meal.strArea);
        return allAreas;
      });
      setAreas(allAreas);
      setIsLoading(false);
    }, [],
  );

  useEffect(() => {
    areaDropdownAPIRequest();
  }, [areaDropdownAPIRequest]);

  return (
    <div>
      <Header headerText="Explorar Origem" showSearchButton="true" />
      {isLoading && (
        <h2>Carregando...</h2>
      )}
      {!isLoading && (
        <select
          value={ selectedArea }
          data-testid="explore-by-area-dropdown"
          onChange={ ({ target }) => {
            showCards(target.value);
            setSelectedArea(target.value);
          } }
        >
          <option
            data-testid="All-option"
            value="All"
          >
            All
          </option>
          {areas.map((area) => (
            <option
              key={ area }
              data-testid={ `${area}-option` }
              value={ area }
            >
              {area}
            </option>
          ))}
        </select>)}
      {!isLoading && (
        recipes.map((item, index) => (
          <RecipeCard
            key={ index }
            recipes={ recipes }
            index={ index }
            recipeType="Comidas"
          />
        )))}
      <Footer />
    </div>
  );
}

export default ExplorarComidasArea;
