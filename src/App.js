import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from './context/Provider';
import DetalhesReceitaBebidaComida from './pages/DetalhesReceitaBebidaComida';
import Login from './pages/Login';

import './App.css';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/comidas/:id" component={ DetalhesReceitaBebidaComida } />
          <Route exact path="/bebidas/:id" component={ DetalhesReceitaBebidaComida } />
          <Route exact path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
