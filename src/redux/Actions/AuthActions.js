import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import * as ActionTypes from '../Contants/ActionTypes';

import Fire from '../../Database/Fire';




export const logOut = () => {
    return {
        type: ActionTypes.LOG_OUT

    }
}

export const updateUser = (userName, avatar) => {
    return {
        type: ActionTypes.UPDATE_USER,
        userName,
        avatar
    }
}