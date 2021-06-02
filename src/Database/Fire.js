import auth from '@react-native-firebase/auth';
import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';

class Fire {
  // Set an initializing state whilst Firebase connects

  checkAuth = onAuthStateChanged => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  };

  getFriend = listID => {
    if (listID) {
      const userRef = database().ref('users');
      return new Promise((resolve, reject) => {
        userRef.on('value', snapshot => {
          const userList = [];
          const users = snapshot.val();
          for (let id in users) {
            listID.forEach(friendID => {
              if (friendID === id) {
                userList.push(users[id]);
              }
            });
          }
          return resolve(userList);
        });
      });
    }
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

  checkFirstLogin = () => {
    const userID = this.getUid();
    const userRef = database().ref('users/' + userID);
    return new Promise((resolve, reject) => {
      userRef.on('value', snapshot => {
        if (snapshot) {
          const isFirstLogin = snapshot.val().firstLogin;
          return resolve({isFirstLogin, userID});
        }
      });
      return userRef;
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

  acceptWaitingFriend = (waitingFriendKey, friendID) => {
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
          this.addAcceptedFriendToUser(userID, friendID);
          return resolve(true);
        });
    });
  };

  deleteWaitingFriend = (waitingFriendKey, friendID) => {
    const userID = this.getUid();
    const userRef = database().ref(
      'users/' + userID + '/listFriend/' + waitingFriendKey,
    );
    return new Promise((resolve, reject) => {
      userRef.remove();
      return resolve(true);
    });
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
    const userID = this.getUid();
    //const friendID = 'aI66n3cQwNYWvjOCoPicWxJt6Yk1';
    this.checkNullRoom().then(isChecked => {
      if (isChecked == true) {
        this.createRooms(userID, friendID, roomID => {
          if (roomID != undefined) {
            this.sendMessages(messages, roomID);
          }
        });
      }
      if (isChecked == false) {
        this.checkExistedRoom(userID, friendID).then(data => {
          if (data.isChecked == true) {
            this.sendMessages(messages, data.roomID);
          }
          if (data.isChecked == false) {
            this.createRooms(userID, friendID, roomID => {
              if (roomID != undefined) {
                this.sendMessages(messages, roomID);
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
      chatRef.push(message);
    });
  };

  parse = message => {
    const {user, text, timestamp, image} = message.val();
    const {key: _id} = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
      user,
      image,
    };
  };

  getMess = (callback, friendID) => {
    const userID = this.getUid();
    this.getRoomID(userID, friendID, roomID => {
      const chatRef = database().ref('messages/' + roomID);
      chatRef.on('child_added', snapshot => {
        callback(this.parse(snapshot));
      });
    });
  };

  getRoomByUser = (userID, callback) => {
    const roomsRef = database().ref('rooms');
    roomsRef.on('value', snapshot => {
      const rooms = [];
      const roomData = snapshot.val();
      for (let id in roomData) {
        if (roomData[id].friendID.includes(userID)) {
          rooms.push({roomID: id, friendID: roomData[id].userID});
        }
        if (roomData[id].userID.includes(userID)) {
          rooms.push({roomID: id, friendID: roomData[id].friendID});
        }
      }

      return callback(rooms);
    });
  };
  getFriendInfoInRoom = callback => {
    const roomsRef = database().ref('users');
    roomsRef.on('value', snapshot => {
      const userList = [];
      const userData = snapshot.val();
      for (let id in userData) {
        userList.push(userData[id]);
      }

      return callback(userList);
    });
  };
  getLastMess = (userID, callback) => {
    const currentUserName = auth().currentUser.uid;
    const messRef = database().ref('messages/');
    messRef.on('value', snapshot => {
      const data = [];
      const messages = snapshot.val();
      this.getRoomByUser(userID, res => {
        const roomData = res;
        this.getFriendInfoInRoom(users => {
          const userList = users;
          for (let id in messages) {
            const messageList = Object.values(messages[id]);
            for (let room = 0; room < roomData.length; room++) {
              for (let user = 0; user < userList.length; user++) {
                if (
                  id.includes(roomData[room].roomID) &&
                  roomData[room].friendID.includes(userList[user].id)
                ) {
                  data.push({
                    user: userList[user],
                    text: messageList[0].text,
                    sender:messageList[0].user.name
                  });
                }
              }
            }
          }
          callback(data);
        });
      });
    });
  };

  signIn = async (email, password) => {
    try {
      const login = await auth().signInWithEmailAndPassword(email, password);
      return login;
    } catch (err) {
      return false;
    }
  };
  signUp = async (email, passWord) => {
    try {
      const signUpResult = await auth().createUserWithEmailAndPassword(
        email,
        passWord,
      );
      return signUpResult;
    } catch (error) {
      return error;
    }
  };
  signOut = () => {
    auth().signOut();
  };
  getUid = () => {
    let uid = auth().currentUser.uid;
    return uid;
  };

  createUser = (id, userName, email, photoURL) => {
    database()
      .ref('users/' + id)
      .update({
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

  // rooms
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
          return resolve({isChecked: isChecked, roomID: roomID});
        }
        if (isChecked == undefined) {
          return resolve({isChecked: false});
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

      callback({friendIDList: friendIDList, roomIDList: roomIDList});
    });
  };

  friendIdRoom = (roomIDList, callback) => {
    const roomsRef = database().ref('rooms').orderByChild(userID);
    roomsRef.on('value', snapshot => {
      const friendIDList = [];
      const rooms = snapshot.val();
      for (let id in rooms) {
        if (rooms[id].friendID != userID || rooms[id].userID != userID) {
          friendIDList.push(rooms[id].friendID);

          // th1
          (friendID = '1'), (userID = '2');

          // th2
          (friendID = '2'), (userID = '1');
        }
      }

      callback({friendIDList: friendIDList, roomIDList: roomIDList});
    });
  };

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

  // friends

  addFriend = friendID => {
    const isActive = 'false';
    const userID = this.getUid();
    const friendRef = database().ref('users/' + friendID + '/listFriend');
    const friend = {
      friendID: userID,
      isActive: isActive,
    };
    friendRef.push(friend);
  };

  addAcceptedFriendToUser = (userID, friendID) => {
    const isActive = 'true';
    const friendRef = database().ref('users/' + friendID + '/listFriend');
    const friend = {
      friendID: userID,
      isActive: isActive,
    };
    friendRef.push(friend);
  };

  //Search user

  SearchUser = email => {
    const userID = this.getUid();
    const userRef = database().ref('users');
    return new Promise((resolve, reject) => {
      userRef.on('value', snapshot => {
        snapshot.forEach(item => {
          if (item.val().Email == email) {
            const users = [];
            const listFriend = item.val().listFriend;
            if (listFriend != undefined) {
              for (let user in listFriend) {
                if (
                  listFriend[user].friendID == userID &&
                  listFriend[user].isActive == 'false'
                ) {
                  users.push({user: item.val(), isActive: 'false'});
                }
                if (
                  listFriend[user].friendID == userID &&
                  listFriend[user].isActive == 'true'
                ) {
                  users.push({user: item.val(), isActive: 'true'});
                }
                if (listFriend[user].friendID != userID) {
                  users.push({user: item.val(), isActive: undefined});
                }
              }
              if (users.length >= 2) {
                let newUser = users.filter(user => {
                  return user.isActive != undefined;
                });
                return resolve(newUser);
              } else {
                return resolve(users);
              }
            } else {
              users.push({user: item.val(), isActive: undefined});
              return resolve(users);
            }
          }
        });
      });
    });
  };
}

export default new Fire();
