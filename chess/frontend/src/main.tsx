import './index.css'
import axios from 'axios'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { SocketContextProvider } from './context/SocketContext.tsx'
import App from './App.tsx'

axios.defaults.baseURL = 'http://localhost:6600/'
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <SocketContextProvider>
                    <App />
                </SocketContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </StrictMode>
)
