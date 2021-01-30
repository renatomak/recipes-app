import React from 'react';
import './Footer.css';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <img src={ drinkIcon } data-testid="drinks-bottom-btn" alt="drinks" />
      <img src={ exploreIcon } data-testid="explore-bottom-btn" alt="Explore" />
      <img src={ mealIcon } data-testid="food-bottom-btn" alt="Food" />
    </footer>
  );
}

export default Footer;
