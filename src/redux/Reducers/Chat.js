import Fire from '../../Database/Fire';
import * as localDatabase from '../../Database/Local';

const initialState = {

    loading: true,
    roomKey: null,
    messages: [

    ],

}

const chatReducer = (state = initialState, action) => {

    switch (action.type) {
        case "FETCH_MESSAGE":
            return {...state,
                messages: action.messages,
                loading: false
            };

        case "CLEAR_DATA":
            return {
                ...initialState,
                loading: false
            }
        case "FETCH_ROOM_SUCCESS":
            return {
                ...initialState,
                loading: false,
                roomKey: action.roomKey
            }
        case "FETCH_ROOM_ERROR":
            return {
                ...initialState,
                loading: false,
            }
        case "REGISTER_ROOM":
            return {
                ...state,
                roomKey: action.roomKey
            }


        default:
            return state;
    }
}
export default chatReducer;