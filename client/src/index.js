import React from 'react';
import ReactDOM from 'react-dom';

import './styles/global.css';
import './styles/reset.css';
import './styles/app.css';


import { Provider } from './Context';
import App from './App';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'));
