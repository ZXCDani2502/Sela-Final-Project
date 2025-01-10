import Home from './pages/HomePage'
import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthContext } from './context/AuthContext'
import './App.css'

function App() {
    const { authUser } = useAuthContext()
    return (
        <div className='p-4 h-screen flex items-center justify-center'>
            <Routes>
                <Route path='/' element={authUser ? <Home /> : <Navigate to={'/login'} />} />
            </Routes>
            <Toaster />
        </div>
    )
}

export default App
