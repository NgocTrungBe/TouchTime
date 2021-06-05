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
            console.log(result)
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

export const getWaitingFriendRequest = () => {
    return (dispatch) => {
        return Fire.getFriendListID(Fire.getWaitingFriendId).then(userID => {
            if (userID) {
                Fire.getFriend(userID).then(userList => {
                    dispatch(getWaitingFriend(userList));
                });
            }
        });
    }
}
export const getWaitingFriend = (waitingFriendList) => {
    return {
        type: ActionTypes.GET_WAITING_FRIEND,
        waitingFriendList
    }
}


export const getFriendRequest = () => {
    return (dispatch) => {
        return Fire.getFriendListID(Fire.getFriendId).then(userID => {
            if (userID) {
                Fire.getFriend(userID).then(userList => {
                    if (userList.length != null) {
                        dispatch(getFriend(userList))
                    }
                });
            }
        });
    }
}
export const getFriend = (friendList) => {
    return {
        type: ActionTypes.GET_FRIEND,
        friendList
    }
}


export const acceptFriendRequest = (friendID) => {
    return (dispatch) => {
        return Fire.getKeyWaitingFriend(friendID).then((waitingFriendKey) => {
            Fire.acceptWaitingFriend(waitingFriendKey, friendID).then((result) => {
                if (result == true) {
                    dispatch(getWaitingFriendRequest());
                    dispatch(getFriendRequest());
                }
            });
        });
    }
}
export const acceptFriend = () => {
    return {
        type: ActionTypes.ACCEPT_FRIEND,
    }
}

export const deleteWaitingFriendRequest = (friendID) => {
    return (dispatch) => {
        return Fire.getKeyWaitingFriend(friendID).then((waitingFriendKey) => {
            Fire.deleteWaitingFriend(waitingFriendKey, friendID).then((result) => {
                if (result == true) {
                    dispatch(getWaitingFriendRequest());
                }
            });
        });
    }
}
export const deleteWaitingFriend = () => {
    return {
        type: ActionTypes.DELETE_WAITING_FRIEND,
    }
}

// export const getChatListRequest = (userID) => {
//     return (dispatch) => {


//         Fire.getLastMess(userID, lastMessData => {
//             dispatch(getChatList(lastMessData))
//         })


//     }

// }

// export const getChatList = (chatList) => {
//     return {
//         type: ActionTypes.GET_CHAT_LIST,
//         chatList
//     }
// }

export const setTabsVisible = (isOpenDrawer) => {
    return {
        type: ActionTypes.GET_CHAT_LIST,
        isOpenDrawer
    }
}