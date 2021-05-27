import Fire from '../../Database/Fire';

const initialState = {



}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case "GET_USER":
            return state;
        case "LOG_IN":

            const newState = {
                user: action.user,
                isLoginSuccess: action.isLoginSuccess
            }
            return newState;

        case "LOG_OUT":

            // const newState = {...state,
            //     user: action.user,
            //     isLoginSuccess: false;
            // }
            // return newState;
            return state;
        case "SIGN_UP":

            return {...state, signUpData: action.signUpData };

        case "CREATE_USER":

            Fire.createUser(action.uid, '', action.email, '');
            return state;

        case "UPDATE_USER":
            Fire.updateUser(action.userName, action.avatar);
            return state;

        default:
            return state;
    }
}
export default authReducer;