import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from './context/Provider';
import './App.css';
import TelaPrincipal from './pages/TelaPrincipal';
import DetalhesReceitaBebidaComida from './pages/DetalhesReceitaBebidaComida';
import Explorar from './pages/Explorar';
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
          <Route exact path="/comidas/:id" component={ DetalhesReceitaBebidaComida } />
          <Route exact path="/bebidas/:id" component={ DetalhesReceitaBebidaComida } />
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
            render={ () => (<ReceitaEmProgresso
              recipeType="Comidas"
            />) }
          />
          <Route
            path="/bebidas/:id/in-progress"
            render={ () => (<ReceitaEmProgresso
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
          <Route path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
