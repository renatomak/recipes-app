import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import Footer from './components/Footer';
import Header from './components/Header';
import '../css/style-main.css';
import '../css/styleExplorar.css';

function Explorar(props) {
  const { history } = props;
  return (
    <div className="container-main">
      <Header headerText="Explorar" showSearchButton="false" />
      <div className="contant-search-buttons">
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
