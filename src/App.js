import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from './context/Provider';
import './App.css';
import TelaPrincipalComidas from './pages/TelaPrincipal/TelaPrincipalComidas';
import TelaPrincipalBebidas from './pages/TelaPrincipal/TelaPrincipalBebidas';
import DetalhesReceitaBebida from './pages/DetalhesReceita/DetalhesReceitaBebida';
import DetalhesReceitaComida from './pages/DetalhesReceita/DetalhesReceitaComida';
import Explorar from './pages/Explorar/Explorar';
import ExplorarBebidas from './pages/ExplorarBebidas/ExplorarBebidas';
import ExplorarComidas from './pages/ExplorarComidas/ExplorarComidas';
import ExplorarBebidasIngrediente from
  './pages/ExplorarBebidasIngrediente/ExplorarBebidasIngrediente';
import ExplorarComidasIngrediente from
  './pages/ExplorarComidasIngrediente/ExplorarComidasIngrediente';
import ExplorarComidasArea from
  './pages/ExplorarComidasArea/ExplorarComidasArea';
import Login from './pages/Login/Login';
import Perfil from './pages/Perfil/Perfil';
import ReceitaEmProgressoBebida from
  './pages/ReceitaEmProgresso/ReceitaEmProgressoBebida';
import ReceitaEmProgressoComida from
  './pages/ReceitaEmProgresso/ReceitaEmProgressoComida';
import ReceitasFavoritas from
  './pages/ReceitasFavoritas/ReceitasFavoritas';
import ReceitasFeitas from
  './pages/ReceitasFeitas/ReceitasFeitas';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={ Login } />
          <Route path="/comidas" component={ TelaPrincipalComidas } />
          <Route path="/bebidas" component={ TelaPrincipalBebidas } />
          <Route path="/comidas/{id-da-receita}" component={ DetalhesReceitaComida } />
          <Route path="/bebidas/{id-da-receita}" component={ DetalhesReceitaBebida } />
          <Route
            path="/comidas/{id-da-receita}/in-progress"
            component={ ReceitaEmProgressoComida }
          />
          <Route
            path="/bebidas/{id-da-receita}/in-progress"
            component={ ReceitaEmProgressoBebida }
          />
          <Route path="/explorar/comidas" component={ ExplorarComidas } />
          <Route path="/explorar/bebidas" component={ ExplorarBebidas } />
          <Route path="/explorar" component={ Explorar } />
          <Route
            path="/explorar/comidas/ingredientes"
            component={ ExplorarComidasIngrediente }
          />
          <Route
            path="/explorar/bebidas/ingredientes"
            component={ ExplorarBebidasIngrediente }
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
