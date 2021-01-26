import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from './context/Provider';
import './App.css';
import TelaPrincipalComidas from "./pages/TelaPrincipal/TelaPrincipalComidas";
import TelaPrincipalBebidas from "./pages/TelaPrincipal/TelaPrincipalComidas";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route to="/comidas" component={TelaPrincipalComidas} />
          <Route to="/bebidas" component={TelaPrincipalBebidas} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
