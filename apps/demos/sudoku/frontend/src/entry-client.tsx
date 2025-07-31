import React from 'react';
import { Provider } from 'react-redux';
import { hydrateRoot } from 'react-dom/client';

import { store } from './store';
import App from './App';

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
