import React from 'react';
import { Provider } from './context/Provider';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
