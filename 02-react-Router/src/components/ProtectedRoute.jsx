import { Navigate } from "react-router";
import { useAuthStore } from "../store/AuthStore";

export function ProtectedRoute({ children }) {
    const { isLogin } = useAuthStore();

    if (!isLogin) {
        return <Navigate to="/login" replace />;
    }

    return children
}