import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. Provider और Store को बुलाना जरूरी है
import { Provider } from 'react-redux';
import store from './store';

import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. पूरी App को Provider के अंदर लपेटना (Wrap) जरूरी है */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);