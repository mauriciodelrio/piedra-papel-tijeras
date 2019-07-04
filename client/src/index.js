import React from 'react';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// import initReactFastclick from 'react-fastclick';

import './index.css';
import './App.css';
import 'semantic-ui-css/semantic.min.css'

import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// Enables fast-click for mobile devices
// initReactFastclick();

render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root'));
  
// registerServiceWorker();