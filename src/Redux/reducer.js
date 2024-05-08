const INITIAL_STATE = {
    is_login: false
}
export default (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case "IS_LOG_IN":
            return{...state,is_login:action.payload}
        default:
            return state
    }
}