import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { FavouritesProvider } from './context/FavouritesContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FavouritesProvider>
          <App />
        </FavouritesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
