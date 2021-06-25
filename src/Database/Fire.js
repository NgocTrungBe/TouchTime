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
        if (auth().currentUser != null) {
            let uid = auth().currentUser.uid;
            return uid;
        }
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