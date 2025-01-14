import SignupPage from './pages/SignUpPage.tsx'
import LoginPage from './pages/LoginPage.tsx'

import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore.ts'
import { useEffect } from 'react'

import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'

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
                {/* <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} /> */}
                <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to='/' />} />
                <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
            </Routes>

            <Toaster />
        </div>
    )
}
export default App
