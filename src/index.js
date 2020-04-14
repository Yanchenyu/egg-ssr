import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import App from './pages';

loadableReady(() => {
    ReactDOM.hydrate(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        document.getElementById('root')
    );
});

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/sw.js').then(reg => {
//       // registration worked
//       console.log('Registration succeeded. Scope is ' + reg.scope);
//     }).catch(error => {
//       // registration failed
//       console.log('Registration failed with ' + error);
//     });
//   }
