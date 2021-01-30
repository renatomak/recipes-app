import React from 'react';
import Header from './components/Header';

function Perfil() {
  return (
    <div>
      <Header headerText="Perfil" showSearchButton="false" />
      <div>
        <span data-testid="profile-email"> Email </span>
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
