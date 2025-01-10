import Home from './pages/HomePage'
import Game from './pages/GamePage'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'
import redirectToLogin from './utils/redirectToLogin'

function App() {
    const { authUser } = useAuthContext()
    return (
        <div className='p-4 h-screen flex items-center justify-center'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/game' element={authUser ? <Game /> : redirectToLogin(window.location.href)} />
            </Routes>
            <Toaster />
        </div>
    )
}

export default App
