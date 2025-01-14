import SignupPage from './pages/SignupPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore.ts'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage.tsx'
import LogoutPage from './pages/LogoutPage.tsx'
import BackgammonPage from './pages/BackgammonPage.tsx'
import ChessPage from './pages/ChessPage.tsx'

const App = () => {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

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
        <div>
            <Routes>
                <Route path='/' element={<HomePage/>}/> 
                {/* <Route path='/Account' element={}/> */}
                <Route path='/Chess' element={authUser ? <BackgammonPage /> : <Navigate to='/Login'/> }/>
                <Route path='/Backgammon' element={authUser ? <ChessPage /> : <Navigate to='/Login'/> } />
                <Route path='/Signup' element={!authUser ? <SignupPage /> : <Navigate to='/' />} />
                <Route path='/Login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
                <Route path='/Logout' element={authUser ? <LogoutPage /> : <Navigate to='/' />} />
            </Routes>

            <Toaster />
        </div>
    )
}
export default App
