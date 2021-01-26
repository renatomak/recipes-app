import React from 'react';
import { Provider } from './context/Provider';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import TelaPrincipalComidas from "./pages/TelaPrincipal/index";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route to="/comidas" component={TelaPrincipalComidas} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
