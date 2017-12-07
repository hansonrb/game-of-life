import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.css';

ReactDOM.render(
  <App rows={40} cols={100} speed={150} />,
  document.getElementById('root')
);
