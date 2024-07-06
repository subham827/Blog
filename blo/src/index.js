import React from 'react';
import './index.css';
import App from './App';
import * as ReactDOM from "react-dom/client";
import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { store ,persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProvider from './components/ThemeProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PersistGate persistor={persistor}>
  <Provider store={store}>
    <ThemeProvider>
    <App />
    </ThemeProvider>
  </Provider>
  
  </PersistGate>
);
