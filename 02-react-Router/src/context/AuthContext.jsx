import { createContext, useState } from "react";

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false)

    const login = () => {
        setIsLogin(true)
    }

    const logout = () => {
        setIsLogin(false)
    }

    const value = {
        isLogin,
        login,
        logout
    }

    return <AuthContext value={value}>
        {children}
    </AuthContext>
}