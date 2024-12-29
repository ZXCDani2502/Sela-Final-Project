import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router'
import HomePage from './pages/HomePage'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/Login' element={<HomePage/>}/>
        {/* <Route path='/Logout' element={}/>
        <Route path='/Signup' element={}/>
        <Route path='/Account' element={}/>
        <Route path='/Games' element={}/>
        <Route path='/Games/Chess' element={}/>
        <Route path='/Games/Backgammon' element={}/> */}
      </Routes>
    </Router>
  </StrictMode>,
)
