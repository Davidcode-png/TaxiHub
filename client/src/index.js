import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import 'bootswatch/dist/lumen/bootstrap.css'; 
import './index.css';
import App from './App';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken'; 


ReactDOM.render(
  
  <HashRouter >
    <App />
  </HashRouter>,
  document.getElementById('root')
);
