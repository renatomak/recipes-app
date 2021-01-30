import React from 'react';
import Header from './components/Header';

function recuperarEmail() {
  const user = localStorage.getItem('user');
  const email = JSON.parse(user);
  return email;
}

function Perfil() {
  const { email } = recuperarEmail();
  console.log(email);

  return (
    <div>
      <Header headerText="Perfil" showSearchButton="false" />
      <div>
        <span data-testid="profile-email"> {email} </span>
        <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
        <button type="button" data-testid="profile-logout-btn">Sair</button>
      </div>
    </div>
  );
}

export default Perfil;
