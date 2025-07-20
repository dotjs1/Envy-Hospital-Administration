import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // 👍 Registers the service worker
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: for performance measuring
reportWebVitals();

// ✅ Register the service worker (required for PWA features like offline support)
serviceWorkerRegistration.register();
