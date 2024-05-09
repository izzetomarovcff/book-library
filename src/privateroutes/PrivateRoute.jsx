import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () =>{
    const {GeneralResponse} = useSelector(state=>state)
    let auth = GeneralResponse.is_login
    return(
        auth ? (<Navigate to="/"/>):(<Outlet/>)
    )
}
export default PrivateRoute