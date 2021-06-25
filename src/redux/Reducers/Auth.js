import Fire from '../../Database/Fire';

const initialState = {



}

const authReducer = (state = initialState, action) => {

    switch (action.type) {


        case "LOG_OUT":
            return {
                ...initialState
            };


        case "UPDATE_USER":
            Fire.updateUser(action.userName, action.avatar);
            return state;

        default:
            return state;
    }
}
export default authReducer;