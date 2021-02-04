import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Provider } from '../context/Provider';

const renderWithRouter = (component, rota) => ({
  ...render(
    <Provider>
      <MemoryRouter initialEntries={ [rota] }>{component}</MemoryRouter>
    </Provider>,
  ),
});

export default renderWithRouter;
