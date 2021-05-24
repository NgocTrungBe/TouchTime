import * as ActionTypes from '../Contants/ActionTypes';



export const getUser = (userName, eMail) => {
    return {
        type: ActionTypes.LOG_IN
    }
}
export const logIn = (email, password) => {
    return {
        type: ActionTypes.LOG_IN,
        email,
        password
    }
}
export const logOut = () => {
    return {
        type: ActionTypes.LOG_OUT

    }
}
export const signUp = (email, password) => {
    return {
        type: ActionTypes.SIGN_UP,
        email,
        password

    }
}