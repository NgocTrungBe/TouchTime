import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import * as ActionTypes from '../Contants/ActionTypes';

import Fire from '../../Database/Fire';


// export const getUser = (user) => {
//     return {
//         type: ActionTypes.
//     }
// }

export const logInRequest = (email, password) => {
    return (dispatch) => {
        return Fire.signIn(email, password).then(result => {

            if (result.user != null) {
                dispatch(logIn(true));

            }
            if (result == false) {


                dispatch(logIn(false));

            }

        });
    }
}
export const logIn = (isLoginSuccess) => {


    return {
        type: ActionTypes.LOG_IN,
        isLoginSuccess
    }
}
export const logOut = () => {
    return {
        type: ActionTypes.LOG_OUT

    }
}

export const signUpRequest = (email, password) => {
    return (dispatch) => {
        return Fire.signUp(email, password).then(result => {

            if (result.user != null) {
                dispatch(signUp({ isSignUpSuccess: true, error: {} }));
                dispatch(createUser(result.user.uid, email));

            } else {

                dispatch(signUp({ isSignUpSuccess: false, error: result }));

            }

        });
    }
}
export const signUp = (signUpData) => {
    return {
        type: ActionTypes.SIGN_UP,
        signUpData,

    }
}

export const createUser = (uid, email) => {

    return {
        type: ActionTypes.CREATE_USER,
        uid,
        email
    }
}

export const updateUser = (userName, avatar) => {
    return {
        type: ActionTypes.UPDATE_USER,
        userName,
        avatar
    }
}