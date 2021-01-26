import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from './context/Provider';
import Detalhes from './pages/Detalhes';
import './App.css';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/comidas/:id" component={ Detalhes } />
          <Route exact path="/bebidas/:id" component={ Detalhes } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
