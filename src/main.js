import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './create-trip';
import Header from './components/ui/custom/Header';
import { Toaster } from './components/ui/sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './view-trip/[tripId]';
import MyTrips from './my-trips';
const router = createBrowserRouter([
    {
        path: "/",
        element: _jsx(App, {})
    },
    {
        path: '/create-trip',
        element: _jsx(CreateTrip, {})
    },
    {
        path: "/view-trip/:id",
        element: _jsx(ViewTrip, {})
    },
    {
        path: "/my-trips",
        element: _jsx(MyTrips, {})
    }
]);
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsxs(GoogleOAuthProvider, { clientId: import.meta.env.VITE_GOOGLE_AUTH_CLINT_ID, children: [_jsx(Header, {}), _jsx(Toaster, {}), _jsx(RouterProvider, { router: router })] }) }));
