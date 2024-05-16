import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

const MainLayout = () => {
    const user = window.localStorage.getItem("userData")
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate("/")
        } else {
            navigate("/auth/dashboard")
        }
    }, [])
    return (
        <>
            <Outlet />
        </>
    )
}

export default MainLayout
