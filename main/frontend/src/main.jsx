import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes} from 'react-router'
import HomePage from './pages/HomePage'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
