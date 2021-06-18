import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import * as ActionTypes from '../Contants/ActionTypes';
import database from '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';
import Fire from '../../Database/Fire';
import { flatMap } from 'lodash';





export const clearData = () => {
    return (dispatch) => {
        dispatch({
            type: ActionTypes.CLEAR_DATA,
        })
    }
}
export const findRoomByUser = (friendID) => {
    const userID = Fire.getUid();
    return (dispatch) => {
        const roomsRef = database().ref('rooms');
        roomsRef.on('value', snapshot => {
            const rooms = snapshot.val();
            let roomKey = null;
            if (snapshot.val() === null) {
                dispatch({
                    type: ActionTypes.FETCH_ROOM_ERROR,
                })
                return;

            } else {
                for (let id in rooms) {
                    if (
                        (rooms[id].userID.includes(userID) &&
                            rooms[id].friendID.includes(friendID)) ||
                        (rooms[id].userID.includes(friendID) &&
                            rooms[id].friendID.includes(userID))
                    ) {
                        roomKey = id;

                    }
                    if (roomKey != null) {
                        break;
                    }
                }
                if (roomKey != null) {
                    dispatch({
                        type: ActionTypes.FETCH_ROOM_SUCCESS,
                        roomKey
                    })
                    getMessages(dispatch, roomKey)

                } else {
                    dispatch({
                        type: ActionTypes.FETCH_ROOM_ERROR,
                    })
                }


            }

        });

    }
}
export const getMessages = (dispatch, roomKey) => {

    const chatRef = database().ref('messages/' + roomKey);
    chatRef.on('value', snapshot => {

        const messages = [];
        snapshot.forEach(message => {
            const msg = message.val();
            messages.push({
                _id: message.key,
                createdAt: new Date(msg.timestamp),
                text: msg.text,
                user: msg.user,
                image: msg.image

            })
        });
        messages.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        dispatch({
            type: ActionTypes.FETCH_MESSAGE,
            messages
        });
    });

}

export const sendMessage = (message, friendID, userData, friendData, roomKey) => {

    const userID = Fire.getUid();

    return (dispatch) => {

        if (roomKey === null) {
            roomKey = registerRoom(dispatch, userID, friendID, message, userData, friendData);
        }

        const chatRef = database().ref('messages/' + roomKey);
        const messageData = {
            text: message.text,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: message.user,
            image: message.image,
        };
        chatRef.push(messageData);
        updateRoomsDetail(roomKey, message.text, message.user.name);


    }

}

const updateRoomsDetail = (roomKey, text, sender) => {

    const roomDetailRef = database().ref('roomsDetail/' + roomKey);
    roomDetailRef.update({
        text: text,
        sender: sender,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
    })
    roomDetailRef.off();
}

const registerRoom = (dispatch, userID, friendID, message, userData, friendData) => {

    const db = database().ref('rooms');
    const roomKey = db.push().key;
    const update = {};
    const room = {
        userID: userID,
        friendID: friendID,
    };
    update[`${roomKey}`] = room;
    db.update(update);
    registerRoomDetail(roomKey, message.text, message.user.name, userData, friendData)
    dispatch({
        type: ActionTypes.REGISTER_ROOM,
        roomKey
    })
    return roomKey;


}

const registerRoomDetail = (roomKey, text, sender, userData, friendData) => {
    const roomDetailRef = database().ref('roomsDetail/' + roomKey);
    if (roomKey) {
        roomDetailRef.set({
            text: text,
            sender: sender,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            userData: userData,
            friendData: friendData
        });
    }
    roomDetailRef.off();
}