import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.ts'
import toast from 'react-hot-toast'

export type UserData = {
    _id: string
    username: string
    email: string
    password: string
} | null

type AuthStore = {
    authUser: UserData
    isSigningUp: boolean
    isLoggingIn: boolean
    isUpdatingProfile: boolean
    isCheckingAuth: boolean
    onlineUsers: Array<UserData>

    checkAuth: () => void
    logout: () => void
    signup: (data: UserData) => void
    login: (data: UserData) => void
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            if(!get().authUser) return
            const res = await axiosInstance.get('/auth/check')

            set({ authUser: res.data })
        } catch (error: any) {
            console.log('Error in checkAuth:', error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post('/auth/signup', data)
            set({ authUser: res.data })
            toast.success('Account created successfully')
        } catch (error: any) {
            toast.error(error.response.data.message)
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post('/auth/login', data)
            set({ authUser: res.data })
            toast.success('Logged in successfully')
        } catch (error: any) {
            toast.error(error.response.data.message)
        } finally {
            set({ isLoggingIn: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout')
            set({ authUser: null })
            toast.success('Logged out successfully')
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    },
}))
