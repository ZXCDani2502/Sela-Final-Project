import Home from './pages/HomePage'
import Game from './pages/GamePage'
import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'

function App() {
    // const { authUser } = useAuthContext()

    const { authUser, checkAuth, isCheckingAuth } = useAuthStore()
    // const { player } = useChessPlayer()

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    if (isCheckingAuth && !authUser)
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loader className='size-10 animate-spin' />
            </div>
        )
    return (
        <div className='p-4 h-screen flex items-center justify-center'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/game' element={authUser ? <Game /> : <Navigate to='/' />} />
                <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/' />} />
                <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
            </Routes>
            <Toaster />
        </div>
    )
}

export default App
