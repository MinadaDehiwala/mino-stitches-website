import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Import the global styles
import App from './App.jsx';

// Find the root element
const container = document.getElementById('root');

// Create a root
const root = createRoot(container);

// Initial render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
