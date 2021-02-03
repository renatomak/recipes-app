import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from './context/Provider';
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

function criarLocalStorage() {
  const localStorageDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (localStorageDoneRecipes) return true;

  localStorage.setItem('doneRecipes', JSON.stringify([]));

  return false;
}

function App() {
  criarLocalStorage();
  return (
    <Provider>
      <BrowserRouter>
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
              />
            ) }
          />
          <Route exact path="/" component={ Login } />
          <Route
            exact
            path="/comidas"
            render={ (props) => <TelaPrincipal recipeType="Comidas" /> }
          />
          <Route
            exact
            path="/bebidas"
            render={ (props) => <TelaPrincipal recipeType="Bebidas" /> }
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
          <Route render={()=> <p>Falsa</p>} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
