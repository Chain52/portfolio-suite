import React from 'react';
import {
  type RenderToPipeableStreamOptions,
  renderToPipeableStream
} from 'react-dom/server';
import { Provider } from 'react-redux';

import { store } from './store';
import Root from './root';
import App from './App';

export function render(_url: string, options?: RenderToPipeableStreamOptions) {
  return renderToPipeableStream(
    <Root>
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    </Root>,
    options
  );
}
