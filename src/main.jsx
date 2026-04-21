import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Global Error Handler for "Blank Page" Debugging
window.onerror = function(message, source, lineno, colno, error) {
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = 'position:fixed;top:0;left:0;width:100%;background:red;color:white;padding:20px;z-index:10000;font-family:monospace;';
  errorDiv.innerHTML = `<div><strong>[RUNTIME_ERROR]</strong>: ${message}</div><div style="font-size:10px">${source}:${lineno}</div>`;
  document.body.appendChild(errorDiv);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
