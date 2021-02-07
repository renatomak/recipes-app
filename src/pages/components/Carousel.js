import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import './Carousel.css';
import { HiArrowRight, HiArrowNarrowLeft, HiArrowLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';

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
      indicators={ false }
      interval={ null }
      nextLabel={ null }
      nextIcon={ <HiArrowRight className="icone" /> }
      prevIcon={ <HiArrowLeft className="icone" /> }
      prevLabel={ null }
    >
      {recomendations.map(({
        strDrinkThumb,
        strDrink,
        idDrink,
        strAlcoholic,
        idMeal,
        strCategory,
        strMeal,
        strMealThumb,
      }, recomendationIndex) => (
        <Carousel.Item
          hidden={ recomendationIndex !== index && recomendationIndex !== index + 1 }
          data-testid={ `${recomendationIndex}-recomendation-card` }
          key={ recomendationIndex }
        >
          <Link to={ idMeal ? `/comidas/${idMeal}` : `/bebidas/${idDrink}`}>
            <img
              className="carousel-image"
              src={ strDrinkThumb || strMealThumb }
              alt="recomendation"
            />
          </Link>
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
