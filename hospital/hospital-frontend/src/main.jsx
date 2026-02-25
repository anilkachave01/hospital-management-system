import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

console.log('Main.jsx is executing');

try {
    const root = createRoot(document.getElementById('root'));
    root.render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
    console.log('React root rendered');
} catch (error) {
    console.error('Failed to render React app:', error);
    document.body.innerHTML = '<h1>Failed to start app</h1><pre>' + error.toString() + '</pre>';
}
