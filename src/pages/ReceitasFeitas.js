import React from 'react';
import Header from './components/Header';
import BotoesDeFiltros from './components/BotoesDeFiltros';
import CardFeitasFavoritas from './components/CardFeitasFavoritas';

function ReceitasFeitas() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  console.log(doneRecipes);
  return (
    <div>
      <Header headerText="Receitas Feitas" showSearchButton="false" />
      <BotoesDeFiltros />
      {doneRecipes.map((receita, index) => (
        <CardFeitasFavoritas
          telaAtual="feitas"
          receita={ receita }
          index={ index }
          key={ index }
        />
      ))}
    </div>
  );
}

export default ReceitasFeitas;
