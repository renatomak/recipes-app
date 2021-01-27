import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import './Carousel.css';

function CarouselRecipes({ recomendations }) {
  const initialState = 0;
  const [index, setIndex] = useState(initialState);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel
      className="recomendações"
      activeIndex={ index }
      onSelect={ handleSelect }
    >
      {recomendations.map(({
        strDrinkThumb,
        strDrink,
        // idDrink,
        strAlcoholic,
        // idMeal,
        strCategory,
        strMeal,
        strMealThumb,
      }, recomendationIndex) => (
        <Carousel.Item
          hidden={ recomendationIndex !== index && recomendationIndex !== index + 1 }
          data-testid={ `${recomendationIndex}-recomendation-card` }
          key={ recomendationIndex }
        >
          <img
            className="d-block w-100"
            src={ strDrinkThumb || strMealThumb }
            alt="recomendation"
          />
          <Carousel.Caption>
            <p>{ strAlcoholic || strCategory }</p>
            <h3
              data-testid={ `${recomendationIndex}-recomendation-title` }
            >
              { strDrink || strMeal }
            </h3>
          </Carousel.Caption>
        </Carousel.Item>

      ))}
    </Carousel>
  );
}

export default CarouselRecipes;

CarouselRecipes.propTypes = {
  recomendations: PropTypes.arrayOf(PropTypes.object).isRequired,
};
