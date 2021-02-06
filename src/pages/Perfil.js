import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Button } from '@material-ui/core';
import Header from './components/Header';
import Footer from './components/Footer';
import backgroundVideo from '../video/overcooked1.mp4';

function recuperarEmail() {
  const user = localStorage.getItem('user');
  const { email } = JSON.parse(user);
  return email;
}

function Perfil(props) {
  const email = localStorage.getItem('user') ? recuperarEmail() : '';
  const { history } = props;
  console.log(email);

  const exitPage = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <p>Perfil</p>
      <Header headerText="Perfil" showSearchButton="false" />
      <video autoPlay muted loop className="backgroun-video">
        <source src={ backgroundVideo } type="video/webm" />
      </video>
      <span data-testid="profile-email" className="span-email">{ email }</span>
      <div className="content-main">
        <div className="contant-main-buttons">
          <Button
            type="button"
            color="secondary"
            variant="contained"
            className="btn-category"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/receitas-feitas') }
          >
            Receitas Feitas
          </Button>
          <Button
            type="button"
            color="secondary"
            variant="contained"
            className="btn-category"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/receitas-favoritas') }
          >
            Receitas Favoritas
          </Button>
          <Button
            type="button"
            color="secondary"
            variant="contained"
            className="btn-category"
            data-testid="profile-logout-btn"
            onClick={ exitPage }
          >
            Sair
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Perfil;

Perfil.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};
