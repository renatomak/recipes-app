import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from './context/Provider';
import './App.css';
import TelaPrincipal from './pages/TelaPrincipal';
import DetalhesReceitaBebidaComida from './pages/DetalhesReceitaBebidaComida';
import Explorar from './pages/Explorar/Explorar';
import ExplorarBebidasComidas from './pages/ExplorarBebidasComidas';
import ExplorarIngrediente from
  './pages/ExplorarIngrediente';
import ExplorarComidasArea from
  './pages/ExplorarComidasArea';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import ReceitaEmProgresso from
  './pages/ReceitaEmProgresso';
import ReceitasFavoritas from
  './pages/ReceitasFavoritas';
import ReceitasFeitas from
  './pages/ReceitasFeitas';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={ Login } />
          <Route path="/comidas" component={ TelaPrincipal } recipeType="Comida" />
          <Route path="/bebidas" component={ TelaPrincipal } recipeType="Bebida" />
          <Route path="/comidas/{id-da-receita}" component={ DetalhesReceitaBebidaComida } recipeType="Comida" />
          <Route path="/bebidas/{id-da-receita}" component={ DetalhesReceitaBebidaComida } recipeType="Bebida" />
          <Route
            path="/comidas/{id-da-receita}/in-progress"
            component={ ReceitaEmProgresso }
            recipeType="Comida"
          />
          <Route
            path="/bebidas/{id-da-receita}/in-progress"
            component={ ReceitaEmProgresso }
            recipeType="Bebida"
          />
          <Route path="/explorar/comidas" component={ ExplorarBebidasComidas } recipeType="Comida" />
          <Route path="/explorar/bebidas" component={ ExplorarBebidasComidas } recipeType="Bebida" />
          <Route path="/explorar" component={ Explorar } />
          <Route
            path="/explorar/comidas/ingredientes"
            component={ ExplorarIngrediente }
            recipeType="Comida"
          />
          <Route
            path="/explorar/bebidas/ingredientes"
            component={ ExplorarIngrediente }
            recipeType="Bebida"
          />
          <Route path="/explorar/comidas/area" component={ ExplorarComidasArea } />
          <Route path="/perfil" component={ Perfil } />
          <Route path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
