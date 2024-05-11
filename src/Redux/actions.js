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

export const AddToCart = book =>{
    return {
        type: 'ADD_TO_CART',
        payload: book
    }
}
export const RemoveToCart = book =>{
    return{
        type:'REMOVE_TO_CART',
        payload:book
    }
}

export const AddToFavorite = book =>{
    return {
        type: 'ADD_TO_FAVORITE',
        payload: book
    }
}
export const RemoveToFavorite = book =>{
    return{
        type:'REMOVE_TO_FAVORITE',
        payload:book
    }
}