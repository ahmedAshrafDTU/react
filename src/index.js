import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserTokenProvider } from './Context/UserToken';
import { QueryClient, QueryClientProvider } from 'react-query';
import CartContextProvider from './Context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient()

root.render(
    <UserTokenProvider>
        <CartContextProvider>
                <QueryClientProvider client={queryClient}>

                    <App />
                </QueryClientProvider>
        </CartContextProvider>
    </UserTokenProvider>



);

reportWebVitals();
