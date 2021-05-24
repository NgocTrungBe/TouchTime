import Fire from '../../Database/Fire';

const initialState = {

}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case "GET_USER":
            return state;
        case "LOG_IN":
            Fire.signIn(action.email, action.password);
            return state;
        case "SIGN_UP":
            Fire.signUp(action.email, action.password);
            return state;
        default:
            return state;
    }
}
export default authReducer;