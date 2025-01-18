import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { SocketContextProvider } from './context/SocketContext'
import App from './App'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <SocketContextProvider>
                <ChakraProvider>
                    <App />
                </ChakraProvider>
            </SocketContextProvider>
        </BrowserRouter>
    </StrictMode>
)
