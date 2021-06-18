import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import * as ActionTypes from '../Contants/ActionTypes';
import database from '@react-native-firebase/database';
import Fire from '../../Database/Fire';



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
export const addFriend = (friendID, userName, email, avatar) => {

    return (dispatch) => {
        const userID = Fire.getUid();
        if (friendID && userID) {
            const friendRef = database().ref('users/' + friendID + '/listFriend');
            const friend = {
                friendID: userID,
                userName: userName,
                email: email,
                avatar: avatar,
                isActive: "false",
            };
            friendRef.push(friend);
            dispatch({
                type: ActionTypes.ADD_FRIEND
            })
        }
    }

}


export const getWaitingFriend = () => {
    return (dispatch) => {
        const userID = Fire.getUid();
        if (userID) {
            database().ref('users/' + userID).on('value', snapshot => {
                const friendList = [];
                const data = snapshot.val().listFriend;
                for (let id in data) {
                    if (data[id].isActive === "false") {
                        friendList.push({ key: id, data: data[id] })
                    }
                }
                dispatch({
                    type: ActionTypes.GET_WAITING_FRIEND,
                    waitingFriendList: friendList
                })
            });
        }

    }
}



const getFriendData = (snapshot, dispatch) => {
    const userID = Fire.getUid();

    if (userID != null) {
        database().ref('users/' + userID).on('value', childSnapshot => {
            const data = [];
            const friendList = childSnapshot.val().listFriend;
            for (let id in friendList) {
                if (friendList[id].isActive == "true") {
                    if (snapshot) {
                        snapshot.forEach((item) => {
                            if (friendList[id].friendID === item.key) {
                                data.push({ data: friendList[id], isOnline: item.val() });
                            }
                        })
                    } else {
                        data.push({ data: friendList[id], isOnline: false });
                    }
                    continue;
                } else {
                    break;
                }
            }
            dispatch({
                type: ActionTypes.GET_ONLINE_FRIEND,
                onlineFriendList: data
            })

        });
    }
}

export const getOnlineFriend = () => {
    return (dispatch) => {
        database().ref('Online').on('value', snapshot => {
            if (snapshot.val()) {
                getFriendData(snapshot, dispatch);
            }

        })

    }
}


export const getAllFriend = () => {
    return (dispatch) => {
        const userID = Fire.getUid();

        if (userID) {
            database().ref('users/' + userID).on('value', snapshot => {
                const data = [];
                const friendList = snapshot.val().listFriend;
                for (let id in friendList) {
                    if (friendList[id].isActive == "true") {

                        data.push({ key: id, data: friendList[id] });

                    } else {

                        break;
                    }
                }
                dispatch({
                    type: ActionTypes.GET_ALL_FRIEND,
                    friendList: data
                })

            });
        }

    }
}



export const acceptFriendRequest = (key, friendID, userName, email, avatar) => {

    return (dispatch) => {

        const userID = Fire.getUid();
        if (userID) {

            const userRef = database().ref(
                'users/' + userID + '/listFriend/' + key,
            );

            userRef.update({
                    isActive: 'true',
                })
                .then(() => {
                    const friendRef = database().ref('users/' + friendID + '/listFriend');
                    const friend = {
                        friendID: userID,
                        userName: userName,
                        email: email,
                        avatar: avatar,
                        isActive: "true",
                    };
                    friendRef.push(friend);
                });

        }

    }
}

export const deleteWaitingFriendRequest = (friendID) => {
    return (dispatch) => {
        return Fire.getKeyWaitingFriend(friendID).then((waitingFriendKey) => {
            Fire.deleteWaitingFriend(waitingFriendKey).then((result) => {
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