import { createContext, useContext, useState } from "react";

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

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    
    return context
}