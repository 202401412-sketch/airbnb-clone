import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { BusinessProvider } from './context/BusinessContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BusinessProvider>
      <App />
    </BusinessProvider>
  </React.StrictMode>,
)