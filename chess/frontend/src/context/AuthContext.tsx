import { createContext, useContext, useState } from 'react'

type AuthUserType = { id: string } | null

type AuthContextType = {
    authUser: AuthUserType
    setAuthUser: (user: any) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuthContext must be used within AuthContextProvider')

    return context
}

export const AuthContextProvider = ({ children }: { children: React.ReactElement }) => {
    const [authUser, setAuthUser] = useState<AuthUserType>(JSON.parse(localStorage.getItem('chat-user')!) || null) //TODO change to work with our auth system

    return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>
}
