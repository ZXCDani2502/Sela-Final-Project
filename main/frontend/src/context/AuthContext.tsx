// import axios from 'axios'
// import { createContext, useContext, useEffect, useState } from 'react'

// type AuthUserType = {
//     _id: string
//     username: string
//     elo: number
//     games: number
//     wins: number
//     losses: number
//     draws: number
//     createdAt: Date
// }

// type AuthContextType = {
//     authUser: AuthUserType | null
//     setAuthUser: (user: any) => void
// }

// export const AuthContext = createContext<AuthContextType | null>(null)

// export const useAuthContext = () => {
//     const context = useContext(AuthContext)
//     if (!context) throw new Error('useAuthContext must be used within AuthContextProvider')

//     return context
// }

// export const AuthContextProvider = ({ children }: { children: React.ReactElement }) => {
//     const [authUser, setAuthUser] = useState<AuthUserType | null>(null) //TODO change to work with our auth system

//     useEffect(() => {
//         axios
//             .get('http://localhost:8080/api/auth/check', { withCredentials: true })
//             .then((res) => {
//                 if (res.data.user) {
//                     setAuthUser(res.data.user)
//                 }
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     }, [authUser])

//     console.log('authUser', authUser)

//     return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>
// }
