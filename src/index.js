import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import GlobalStyle from './styles';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer autoClose={3000} />
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root')
);
