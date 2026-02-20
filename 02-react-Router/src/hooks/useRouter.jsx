import { useNavigate, useLocation } from "react-router"

export function useRouter() {
    const location = useLocation()
    const navigate = useNavigate()

    function navigateTo(path) {
        navigate(path)
    }

    const currentPath = location.pathname

    return {
        currentPath,
        navigateTo
    }

}