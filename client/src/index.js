import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ColorModeContextProvider } from './context/ColorModeContext';
import { Provider } from 'react-redux';
import store from './store';
import { LanguageContextProvider } from './context/LanguageContext';

ReactDOM.createRoot(document.getElementById('root'))
    .render(
        <Provider store={store}>
            <ColorModeContextProvider>
              <LanguageContextProvider>
                    <App />
              </LanguageContextProvider>
            </ColorModeContextProvider>
        </Provider>
    );