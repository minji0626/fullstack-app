import React from 'react';
import App from './App.jsx';

import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
<Provider store = {store}>
  <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PersistGate>
</Provider>
)
