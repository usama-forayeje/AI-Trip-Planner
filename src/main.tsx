import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip'
import Header from './components/ui/custom/Header'
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/[tripId]'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: '/create-trip',
    element: <CreateTrip/>
  },
  {
    path: "/view-trip/:tripId",
    element: <ViewTrip/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLINT_ID}>
    <Header/>
    <Toaster />
    <RouterProvider router={router}></RouterProvider>
      
    </GoogleOAuthProvider>
  </StrictMode>,
)
