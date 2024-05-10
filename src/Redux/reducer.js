const INITIAL_STATE = {
    is_login: false,
    user: null
}
export default (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case "IS_LOG_IN":
            return{...state,is_login:action.payload}
        case "SET_USER":
            return{...state,user:action.payload}
        default:
            return state
    }
}