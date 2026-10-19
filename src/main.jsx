import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.jsx'
import { AlertProvider } from './contextApi/AlertContext.jsx'
import { AuthProvider } from './contextApi/AuthContext.jsx'
import { UserProvider } from './contextApi/UserContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>,
)
