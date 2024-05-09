import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './components/OnlinePharmacy/CartContext';
import { TotalProvider } from './components/OnlinePharmacy/TotalContext';
import { AuthProvider } from './components/context/AuthProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <TotalProvider>
          <App />
        </TotalProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);


