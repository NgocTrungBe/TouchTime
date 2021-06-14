import auth from '@react-native-firebase/auth';
import React, { useState, useEffect } from 'react';
import database from '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';
import {get, reject, result } from 'lodash';

class Fire {
    // Set an initializing state whilst Firebase connects

    checkAuth = onAuthStateChanged => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    };



    getUserInfo = () => {
        const userID = this.getUid();
        const userRef = database().ref('users/' + userID);
        return new Promise((resolve, reject) => {
            userRef.on('value', snapshot => {
                if (snapshot != 'null') {
                    const photoURL = snapshot.val().photoURL;
                    const userName = snapshot.val().userName;
                    const email = snapshot.val().Email;
                    const friendList = this.getFriendId(snapshot.val()).length;
                    const waitingAcceptFriend = this.getWaitingFriendId(snapshot.val())
                        .length;
                    return resolve({
                        userName,
                        email,
                        photoURL,
                        friendList,
                        waitingAcceptFriend,
                        userID,
                    });
                }
            });
        });
    };

    send = (messages, friendID) => {
        console.log(friendID)
        const userID = this.getUid();
        this.checkNullRoom().then(isChecked => {
            if (isChecked == true) {
                this.createRooms(userID, friendID, roomID => {
                    if (roomID != undefined) {
                        this.sendMessages(messages, roomID);
                        this.createRoomDetail(roomID, userID, friendID, messages[0].text, messages[0].user.name);
                    }
                });
            }
            if (isChecked == false) {
                this.checkExistedRoom(userID, friendID).then(data => {
                    if (data.isChecked == true) {
                        this.sendMessages(messages, data.roomID);
                        this.updateRoomsDetail(data.roomID, messages[0].text, messages[0].user.name);
                    }
                    if (data.isChecked == false) {
                        this.createRooms(userID, friendID, roomID => {
                            if (roomID != undefined) {
                                this.sendMessages(messages, roomID);
                                this.createRoomDetail(roomID, userID, friendID, messages[0].text, messages[0].user.name);
                                // this.updateRoomsDetail(roomID);
                            }
                        });
                    }
                });
            }
        });
    };


    sendMessages = (messages, roomID) => {
        const chatRef = database().ref('messages/' + roomID);
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user,
                image: item.image,
            };
            chatRef.push(message).then(() => {
                chatRef.off();
            });
        });
    };

    parse = messSnapshot => {
        const messages = [];
        messSnapshot.forEach(message => {
            const msg = message.val();
            messages.push({
                _id: message.key,
                createdAt: new Date(msg.timestamp),
                text: msg.text,
                user: msg.user,
                image: msg.image

            })
        });
        return messages;

        // const { user, text, timestamp, image } = message.val();
        // const { key: _id } = message;
        // const createdAt = new Date(timestamp);

        // return {
        //     _id,
        //     createdAt,
        //     text,
        //     user,
        //     image,
        // };

    };

    // parse = message => {
    //     // const messages = [];
    //     // messSnapshot.forEach(message => {
    //     //     const msg = message.val();
    //     //     messages.push({
    //     //         _id: message.key,
    //     //         createdAt: new Date(msg.timestamp),
    //     //         text: msg.text,
    //     //         user: msg.user,
    //     //         image: msg.image

    //     //     })
    //     // });



    //     const { user, text, timestamp, image } = message.val();
    //     const { key: _id } = message;
    //     const createdAt = new Date(timestamp);

    //     console.log(user)

    //     return {
    //         _id,
    //         createdAt,
    //         text,
    //         user,
    //         image,
    //     };
    //     //return messages;
    // };


    getMess = (callback, friendID) => {
        const userID = this.getUid();
        this.getRoomID(userID, friendID, roomID => {
            const chatRef = database().ref('messages/' + roomID);

            chatRef.on('value', snapshot => {
                callback(this.parse(snapshot));
            });
        });
    };




    getChatList = (userID, callback) => {

        const roomsDetailRef = database().ref('roomsDetail');
        roomsDetailRef.on('value', snapshot => {
            const data = [];
            const list = snapshot.val();

            for (let id in list) {
                if (
                    list[id].userData.id == userID ||
                    list[id].friendData.id == userID
                ) {
                    if (list[id].friendData.id == userID) {

                        data.push({
                            id: id,
                            user: {
                                id: list[id].userData.id,
                                userName: list[id].userData.userName,
                                avatar: list[id].userData.photoURL,
                            },
                            text: list[id].text,
                            sender: list[id].sender,
                            timestamp: list[id].timestamp,
                        });

                    }
                    if (list[id].userData.id == userID) {

                        data.push({
                            id: id,
                            user: {
                                id: list[id].friendData.id,
                                userName: list[id].friendData.userName,
                                avatar: list[id].friendData.photoURL,
                            },
                            text: list[id].text,
                            sender: list[id].sender,
                            timestamp: list[id].timestamp,
                        });
                    }
                }

            }
            callback(data)
        });
    };


    /**
     * 
     * roomChatDetail
     * 
     */

    updateRoomsDetail = (roomID, text, sender) => {

        const roomDetailRef = database().ref('roomsDetail/' + roomID);
        roomDetailRef.update({
            text: text,
            sender: sender,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
        })
        roomDetailRef.off();
    }

    getDataForRoomDetail = (userID, friendID) => {


        const userRef = database().ref('users');
        return new Promise((resolve, reject) => {
            userRef.on('value', snapshot => {
                const userData = [];
                const friendData = [];
                // const users = snapshot.val();
                snapshot.forEach(item => {

                    if (item.val().id === friendID) {
                        userData.push(item.val());
                    }
                    if (item.val().id === userID) {
                        friendData.push(item.val());
                    }
                });
                return resolve({ userData: userData, friendData: friendData });
            });
        });


    }


    createRoomDetail = (roomID, userID, friendID, text, sender) => {
        const roomDetailRef = database().ref('roomsDetail/' + roomID);
        this.getDataForRoomDetail(userID, friendID).then(result => {
            if (result != null) {
                roomDetailRef.set({
                    text: text,
                    sender: sender,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    userData: { id: result.userData[0].id, userName: result.userData[0].userName, photoURL: result.userData[0].photoURL },
                    friendData: { id: result.friendData[0].id, userName: result.friendData[0].userName, photoURL: result.friendData[0].photoURL }
                });
            }
        })
        roomDetailRef.off();
    }


    /**
     * 
     *   auth
     */

    signIn = async(email, password) => {
        try {
            const loginData = await auth().signInWithEmailAndPassword(email, password);
            return loginData;
        } catch (err) {
            return err;
        }
    };
    signUp = async(email, passWord) => {
        try {
            const signUpData = await auth().createUserWithEmailAndPassword(
                email,
                passWord,
            );
            return signUpData;
        } catch (error) {
            return error;
        }
    };
    signOut = () => {

        const unsubscribe = auth().signOut();

        return unsubscribe;

    };
    getUid = () => {
        let uid = auth().currentUser.uid;
        return uid;
    };

    createUser = (id, userName, email, photoURL) => {
        database()
            .ref('users/' + id)
            .push({
                userName: userName,
                Email: email,
                photoURL: photoURL,
                id: id,
                firstLogin: 'true',
            });
    };
    updateUser = (userName, photoURL) => {
        const uid = this.getUid();
        database()
            .ref('users/' + uid)
            .update({
                userName: userName,
                photoURL: photoURL,
                firstLogin: 'false',
            })
            .then(() => {
                return true;
            })
            .catch(error => {
                return error;
            });
    };

    /**
     * 
     * rooms
     */

    createRooms = (userId, friendID, callback) => {
        const isSuccess = 'true';
        const room = {
            userID: userId,
            friendID: friendID,
        };
        const roomsRef = database().ref('rooms');
        roomsRef.push(room).then(data => {
            callback(data.key);
        });
        roomsRef.off();
    };
    checkNullRoom = () => {
        const roomsRef = database().ref('rooms');
        return new Promise((resolve, reject) => {
            roomsRef.on('value', snapshot => {
                if (snapshot.val() == null) {
                    return resolve(true);
                } else return resolve(false);
            });
        });
    };
    checkExistedRoom = (userID, friendID) => {
        const roomsRef = database().ref('rooms');
        return new Promise((resolve, reject) => {
            roomsRef.on('value', snapshot => {
                const rooms = snapshot.val();
                let isChecked;
                let roomID;
                for (let id in rooms) {
                    if (
                        (rooms[id].userID.includes(userID) &&
                            rooms[id].friendID.includes(friendID)) ||
                        (rooms[id].userID.includes(friendID) &&
                            rooms[id].friendID.includes(userID))
                    ) {
                        isChecked = true;
                        roomID = id;
                        break;
                    } else {
                        continue;
                    }
                }
                if (isChecked == true) {
                    return resolve({ isChecked: isChecked, roomID: roomID });
                }
                if (isChecked == undefined) {
                    return resolve({ isChecked: false });
                }
            });
        });
    };

    FindRoom = (userID, listID, callback) => {
        const roomsRef = database().ref('rooms');
        roomsRef.on('value', snapshot => {
            const friendIDList = [];
            const roomIDList = [];
            const rooms = snapshot.val();
            for (let id in rooms) {
                listID.forEach(item => {
                    if (
                        (rooms[id].userID === userID && rooms[id].friendID === item) ||
                        (rooms[id].userID === item && rooms[id].friendID === userID)
                    ) {
                        friendIDList.push(item);
                        roomIDList.push(id);
                    }
                });
            }

            callback({ friendIDList: friendIDList, roomIDList: roomIDList });
        });
    };

    // friendIdRoom = (roomIDList, callback) => {
    //     const roomsRef = database().ref('rooms').orderByChild(userID);
    //     roomsRef.on('value', snapshot => {
    //         const friendIDList = [];
    //         const rooms = snapshot.val();
    //         for (let id in rooms) {
    //             if (rooms[id].friendID != userID || rooms[id].userID != userID) {
    //                 friendIDList.push(rooms[id].friendID);

    //                 // th1
    //                 (friendID = '1'), (userID = '2');

    //                 // th2
    //                 (friendID = '2'), (userID = '1');
    //             }
    //         }

    //         callback({ friendIDList: friendIDList, roomIDList: roomIDList });
    //     });
    // };

    getRoomID = (userID, friendID, callback) => {
        const roomsRef = database().ref('rooms');
        roomsRef.on('value', snapshot => {
            const rooms = snapshot.val();
            for (let id in rooms) {
                if (
                    (rooms[id].userID === userID && rooms[id].friendID === friendID) ||
                    (rooms[id].userID === friendID && rooms[id].friendID === userID)
                ) {
                    return callback(id);
                    break;
                }
            }
        });
    };

    getFriendInRoom = (snapshot, userID, friendID) => {
        const friendIDList = [];
        const data = snapshot.val();
        for (let id in data) {
            let list = [];
            if (data[id].userID === userID && data[id].friendID === friendID) {
                list = data[id].friendID;
                friendIDList.push(list);
            }
        }
        return friendIDList;
    };

    /**
     * 
     * friends
     */

    addFriend = (friendID, userName, email, avatar) => {

        const isActive = 'false';
        const userID = this.getUid();
        const friendRef = database().ref('users/' + friendID + '/listFriend');
        const friend = {
            friendID: userID,
            userName: userName,
            email: email,
            avatar: avatar,
            isActive: isActive,
        };
        friendRef.push(friend);
    };

    addAcceptedFriendToUser = (userID, friendID, userName, email, avatar) => {
        const isActive = 'true';
        const friendRef = database().ref('users/' + friendID + '/listFriend');
        const friend = {
            friendID: userID,
            userName: userName,
            email: email,
            avatar: avatar,
            isActive: isActive,
        };
        friendRef.push(friend);
    };


    SearchUser = email => {
        const userID = this.getUid();
        const userRef = database().ref('users');
        return new Promise((resolve, reject) => {
            userRef.on('value', snapshot => {
                const users = [];
                snapshot.forEach(item => {
                    if (item.val().Email === email) {
                        const listFriend = item.val().listFriend;
                        if (listFriend != undefined) {

                            for (let user in listFriend) {
                                if (
                                    listFriend[user].friendID == userID &&
                                    listFriend[user].isActive == 'false'
                                ) {

                                    users.push({ user: item.val(), isActive: 'false' });
                                    break;
                                }

                                if (
                                    listFriend[user].friendID == userID &&
                                    listFriend[user].isActive == 'true'
                                ) {

                                    users.push({ user: item.val(), isActive: 'true' });
                                    break;
                                }
                            }
                            if (users.length == 0) {
                                users.push({ user: item.val(), isActive: undefined });
                            }
                        } else {

                            users.push({ user: item.val(), isActive: undefined });
                        }
                    }
                });
                return resolve(users);
            });
        });
    };

    // getFriend = listID => {
    //     if (listID) {
    //         const userRef = database().ref('users');
    //         return new Promise((resolve, reject) => {
    //             userRef.on('value', snapshot => {
    //                 const userList = [];
    //                 const users = snapshot.val();
    //                 for (let id in users) {
    //                     listID.forEach(friendID => {
    //                         if (friendID === id) {
    //                             userList.push(users[id]);
    //                         }
    //                     });
    //                 }
    //                 return resolve(userList);
    //             });
    //         });
    //     }
    // };



    getFriendQuality = (friendID) => {
        const userRef = database().ref('users/' + friendID);
        return new Promise((resolve, reject) => {
            userRef.on('value', snapshot => {

                let friendQuality = 0;
                let waitingQuality = 0;
                const users = snapshot.val().listFriend;
                for (let id in users) {
                    if (users[id].isActive === "true") {
                        friendQuality++;
                    }
                    if (users[id].isActive === "false") {
                        waitingQuality++;
                    }
                }
                return resolve({ friendQuality: friendQuality, waitingQuality: waitingQuality });
            });
        });

    };

    getAllFriend = () => {
        const userID = this.getUid();
        const userRef = database().ref('users/' + userID);
        return new Promise((resolve, reject) => {
            userRef.on('value', snapshot => {
                const data = [];
                const friendList = snapshot.val().listFriend;
                for (let id in friendList) {

                    if (friendList[id].isActive == "true") {
                        data.push({ data: friendList[id] });
                    }
                }
                return resolve(data);
            });
        });

    };

    getWaitingFriend = () => {

        const userID = this.getUid();
        const userRef = database().ref('users/' + userID);
        return new Promise((resolve, reject) => {
            userRef.on('value', snapshot => {
                const friendList = [];
                const data = snapshot.val().listFriend;
                for (let id in data) {
                    if (data[id].isActive === "false") {
                        friendList.push(data[id]);
                    }
                }
                return resolve(friendList);
            });
        });

    };




    getFriendListID = callback => {
        const userID = this.getUid();
        const userRef = database().ref('users/' + userID);
        return new Promise((resolve, reject) => {
            userRef.on('value', snapshot => {
                const userData = snapshot.val();
                let listID = callback(userData);
                return resolve(listID);
            });
        });
    };

    getFriendId = userList => {
        if (userList) {
            const listID = [];
            const data = userList.listFriend;
            for (let id in data) {
                if (data[id].isActive === 'true') {
                    listID.push(data[id].friendID);
                }
            }
            return listID;
        }
    };
    checkFirstLogin = () => {
        const userID = this.getUid();
        const userRef = database().ref('users/' + userID);
        return new Promise((resolve, reject) => {
            userRef.on('value', snapshot => {
                if (snapshot) {
                    const isFirstLogin = snapshot.val().firstLogin;
                    return resolve({ isFirstLogin, userID });
                }
            });
        });
    };


    getWaitingFriendId = userList => {
        if (userList) {
            const listID = [];
            const data = userList.listFriend;
            for (let id in data) {
                if (data[id].isActive === 'false') {
                    listID.push(data[id].friendID);
                }
            }
            return listID;
        }
    };

    getKeyWaitingFriend = friendID => {
        const userID = this.getUid();
        const userRef = database().ref('users/' + userID + '/listFriend');
        return new Promise((resolve, reject) => {
            userRef.on('value', snapshot => {
                snapshot.forEach(friend => {
                    if (friend.val().friendID === friendID) {
                        return resolve(friend.key);
                    }
                });
            });
        });
    };
    getUserKeyInFriend = (userID, friendID) => {

        const userRef = database().ref('users/' + friendID + '/listFriend');
        return new Promise((resolve, reject) => {
            userRef.on('value', snapshot => {
                snapshot.forEach(friend => {
                    if (friend.val().friendID === userID) {
                        return resolve(friend.key);
                    }
                });
            });
        });
    };

    acceptWaitingFriend = (waitingFriendKey, friendID, userName, email, avatar) => {
        const userID = this.getUid();
        const userRef = database().ref(
            'users/' + userID + '/listFriend/' + waitingFriendKey,
        );
        return new Promise((resolve, reject) => {
            userRef
                .update({
                    isActive: 'true',
                })
                .then(() => {
                    this.addAcceptedFriendToUser(userID, friendID, userName, email, avatar);
                    return resolve(true);
                });
        });
    };

    deleteWaitingFriend = (waitingFriendKey) => {
        const userID = this.getUid();
        const userRef = database().ref(
            'users/' + userID + '/listFriend/' + waitingFriendKey,
        );
        return new Promise((resolve, reject) => {
            userRef.remove();
            return resolve(true);
        });
    };


    deleteFriendInUser = (friendKey, userID) => {
        const userRef = database().ref(
            'users/' + userID + '/listFriend/' + friendKey);
        return new Promise((resolve, reject) => {
            userRef.remove();
            return resolve(true);
        });
    };
    deleteUserInFriend = (userKey, friendID) => {
        const friendRef = database().ref('users/' + friendID + '/listFriend/' + userKey);
        friendRef.remove();

    };

}

export default new Fire();