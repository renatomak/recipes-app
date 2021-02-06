import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import Footer from './components/Footer';
import Header from './components/Header';
import backgroundVideo from '../video/overcooked3.mp4';
import '../css/style-main.css';

function Explorar(props) {
  const { history } = props;
  return (
    <div className="main-explorar">
      <Header headerText="Explorar" showSearchButton="false" />
      <video autoPlay muted loop className="backgroun-video">
        <source src={ backgroundVideo } type="video/webm" />
      </video>
      <div className="contant-main-buttons">
        <button
          type="button"
          className="btn btn-explorar"
          data-testid="explore-food"
          onClick={ () => history.push('/explorar/comidas') }
        >
          Explorar Comidas
        </button>
        <button
          type="button"
          className="btn btn-explorar"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explorar/bebidas') }
        >
          Explorar Bebidas
        </button>
      </div>
      <Footer />
    </div>
  );
}

Explorar.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default Explorar;
