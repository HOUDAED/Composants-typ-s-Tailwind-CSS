import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contextes/AuthContext'
import { FavorisProvider } from './contextes/FavorisContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <FavorisProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FavorisProvider>
    </AuthProvider>
  </StrictMode>,
)
