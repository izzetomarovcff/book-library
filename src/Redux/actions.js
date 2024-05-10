export const  IsLogIn = islogin =>{
    return{
        type: "IS_LOG_IN",
        payload: islogin
    }
}
export const SetUser = user =>{
    return{
        type:"SET_USER",
        payload:user
    }
}