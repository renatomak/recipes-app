import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import Header from './components/Header';
import Footer from './components/Footer';

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
      <Footer />
      <div>
        <span data-testid="profile-email">{ email }</span>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ exitPage }
        >
          Sair
        </button>
      </div>
    </div>
  );
}

export default Perfil;

Perfil.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};
