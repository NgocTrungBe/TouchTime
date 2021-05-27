import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import * as ActionTypes from '../Contants/ActionTypes';

import Fire from '../../Database/Fire';


// export const getUser = (user) => {
//     return {
//         type: ActionTypes.
//     }
// }

export const searchUserRequest = (email) => {
    return (dispatch) => {
        return Fire.SearchUser(email).then(result => {
            if (result != null) {
                dispatch(searchUser(result));
            } else {
                dispatch(searchUser([]));
            }
        });
    }
}
export const searchUser = (user) => {
    return {
        type: ActionTypes.SEARCH_USER,
        user
    }
}
export const addFriend = (userID) => {
    return {
        type: ActionTypes.ADD_FRIEND,
        userID
    }
}