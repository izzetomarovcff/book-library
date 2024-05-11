const INITIAL_STATE = {
    is_login: false,
    cart:[],
    favorite:[],
    user: null
}
export default (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case "IS_LOG_IN":
            return{...state,is_login:action.payload}
        case "SET_USER":
            return{...state,user:action.payload}
        case "ADD_TO_CART":
            return {...state, cart:[...state.cart, action.payload]}
        case "REMOVE_TO_CART":
            let removebook = state.cart.find(item=>item.id == action.payload.id)
            let removeindex = state.cart.indexOf(removebook)
            let newcart = state.cart
            newcart.splice(removeindex,1)
            return{...state, cart: newcart}
        case "ADD_TO_FAVORITE":
            return {...state,favorite:[...state.favorite, action.payload] }

        case "REMOVE_TO_FAVORITE":
            let removefav = state.favorite.find(item=>item.id == action.payload.id)
            let removefavindex = state.favorite.indexOf(removefav)
            let newfav = state.favorite
            newfav.splice(removefavindex,1)
            return{...state,favorite:newfav}
        default:
            return state
    }
}