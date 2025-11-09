import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';

/**
 * Entry point of the React application.
 * Renders the App component inside the root element.
 */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
