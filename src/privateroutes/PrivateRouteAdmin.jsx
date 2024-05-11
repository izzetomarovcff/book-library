import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRouteAdmin = () =>{
    const {GeneralResponse} = useSelector(state=>state)
    let auth = null
    if(GeneralResponse.user == null){
        auth = null
    }else{
        auth = GeneralResponse.user.email == process.env.REACT_APP_FIREBASE_ADMIN_EMAIL
    }
     
    return(
        auth ? (<Outlet/>):(<Navigate to="/"/>)
    )
}
export default PrivateRouteAdmin