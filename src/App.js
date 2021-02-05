import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import TelaPrincipal from './pages/TelaPrincipal';
import DetalhesReceitaProgresso from './pages/DetalhesReceitaProgresso';
import Explorar from './pages/Explorar';
import ExplorarBebidasComidas from './pages/ExplorarBebidasComidas';
import ExplorarIngrediente from './pages/ExplorarIngrediente';
import ExplorarComidasArea from './pages/ExplorarComidasArea';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import ReceitasFeitasFavoritas from './pages/ReceitasFeitasFavoritas';
import NotFound from './pages/NotFound';

function criarLocalStorage() {
  const localStorageDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (localStorageDoneRecipes) return true;

  localStorage.setItem('doneRecipes', JSON.stringify([]));

  return false;
}

function App() {
  criarLocalStorage();
  return (
    <Switch>
      <Route
        exact
        path="/comidas/:id"
        render={ (props) => (
          <DetalhesReceitaProgresso
            { ...props }
            progresso={ false }
            recipeType="Comidas"
          />
        ) }
      />
      <Route
        exact
        path="/bebidas/:id"
        render={ (props) => (
          <DetalhesReceitaProgresso
            { ...props }
            progresso={ false }
            recipeType="Bebidas"
          />) }
      />
      <Route exact path="/" component={ Login } />
      <Route
        exact
        path="/comidas"
        render={ () => <TelaPrincipal recipeType="Comidas" /> }
      />
      <Route
        exact
        path="/bebidas"
        render={ () => <TelaPrincipal recipeType="Bebidas" /> }
      />
      <Route
        path="/comidas/:id/in-progress"
        render={ (props) => (<DetalhesReceitaProgresso
          { ...props }
          progresso
          recipeType="Comidas"
        />) }
      />
      <Route
        path="/bebidas/:id/in-progress"
        render={ (props) => (<DetalhesReceitaProgresso
          { ...props }
          progresso
          recipeType="Bebidas"
        />) }
      />
      <Route
        exact
        path="/explorar/comidas"
        render={ () => (<ExplorarBebidasComidas
          recipeType="Comidas"
        />) }
      />
      <Route
        exact
        path="/explorar/bebidas"
        render={ () => (<ExplorarBebidasComidas
          recipeType="Bebidas"
        />) }
      />
      <Route exact path="/explorar" component={ Explorar } />
      <Route
        path="/explorar/comidas/ingredientes"
        component={ ExplorarIngrediente }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ ExplorarIngrediente }
      />
      <Route path="/explorar/comidas/area" component={ ExplorarComidasArea } />
      <Route path="/perfil" component={ Perfil } />
      <Route
        path="/receitas-feitas"
        render={ (props) => (
          <ReceitasFeitasFavoritas { ...props } telaAtual="feitas" />
        ) }
      />
      <Route
        path="/receitas-favoritas"
        render={ (props) => (
          <ReceitasFeitasFavoritas { ...props } telaAtual="favoritas" />
        ) }
      />
      <Route
        path="/explorar/bebidas/area"
        component={ NotFound }
      />
      <Route render={ () => <p data-testid="not-found">Pagina não encontrada</p> } />
    </Switch>
  );
}

export default App;
