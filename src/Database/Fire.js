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

  getUserByID = callback => {
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

  getKeyWaitingFriend = ( friendID) => {
   const userID = this.getUid();
    const userRef = database().ref('users/' + userID + '/listFriend');
    return new Promise((resolve, reject) => {
      userRef.on('value', snapshot => {
        snapshot.forEach(friend => {
          if (friend.val().friendID === friendID) {
            return resolve(friend.key)
          }
        });
      });
    });
  };

  acceptWaitingFriend = (friendID) => {
    const userID = this.getUid();
    const userRef = database().ref(
      'users/' + userID + '/listFriend/' + friendID,
    );

    userRef.update({
      isActive: 'true',
    }).then(()=>{
      this.addAcceptedFriendToUser(userID,friendID)
    });
  };
  send = (messages, friendID) => {
    const userID = this.getUid();
    this.checkNullRoom(friendID).then(isChecked => {
      if (isChecked === 'true') {
        this.createRooms(userID, friendID);
        this.getRoomID(userID, friendID, roomID => {
          this.sendMessages(messages, roomID);
        });
      }
      if (isChecked === 'false') {
        this.checkExistedRoom(userID, friendID).then(data => {
          if (data.isChecked === 'false') {
            this.createRooms(userID, friendID);
            this.getRoomID(userID, friendID, roomID => {
              this.sendMessages(messages, roomID);
            });
          }
          if (data.isChecked === 'true') {
            this.sendMessages(messages, data.roomID);
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
      };
      chatRef.push(message);
      //chatRef.off();
    });
  };

  parse = message => {
    const {user, text, timestamp} = message.val();
    const {key: _id} = message;
    const createdAt = new Date(timestamp);
    return {
      _id,
      createdAt,
      text,
      user,
    };
  };

  getMess = (callback, friendID, userID) => {
    const roomsRef = database().ref('rooms');
    roomsRef.on('value', snapshot => {
      this.getRoomID(userID, friendID, roomID => {
        const chatRef = database().ref('messages/' + roomID);
        chatRef.on('child_added', snapshot => callback(this.parse(snapshot)));
      });
    });
  };

  getLastMess = (roomIDList, callback) => {
    const roomsRef = database().ref('messages/');
    roomsRef.on('value', snapshot => {
      const messages = snapshot.val();
      const lastMessID = Object.keys(messages)[0];
      for (let id in messages) {
         roomIDList.forEach((roomID) =>{
            for(let item in messages[id]){
              callback(messages[id][item].text)
            }
         })
      }
    });
  };
  
  signIn = (email, passWord) => {
    auth().signInWithEmailAndPassword(email, passWord);
  };
  signUp = (email, passWord) => {
    auth()
      .createUserWithEmailAndPassword(email, passWord)
      .then(() => {
        this.createUser(
          this.getUid(),
          'Ngoc Trung',
          email,
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT30xbUecoLTy0M3y13vT5cOOTCFPQlA5MZRA&usqp=CAU',
        );
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
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
        firstLogin:"true"
      });
  };

  // rooms
  createRooms = (userId, friendID) => {
    const isSuccess = 'true';
    const room = {
      userID: userId,
      friendID: friendID,
    };
    const roomsRef = database().ref('rooms');
    roomsRef.push(room);
    roomsRef.off();
    return isSuccess;
  };
  checkNullRoom = friendID => {
    const roomsRef = database().ref('rooms');
    return new Promise((resolve, reject) => {
      roomsRef.on('value', snapshot => {
        let userID = this.getUid();
        let idFriend = friendID;
        if (snapshot.val() == null) {
          return resolve('true');
        } else return resolve('false');
      });
    });
  };
  checkExistedRoom = (userID, friendID) => {
    const roomsRef = database().ref('rooms');
    return new Promise((resolve, reject) => {
      roomsRef.on('value', snapshot => {
        const rooms = snapshot.val();
        for (let id in rooms) {
          if (rooms[id].userID === userID && rooms[id].friendID === friendID) {
            return resolve({isChecked: 'true', roomID: id});
          }
          return resolve({isChecked: 'false', snapshot: id});
        }
      });
    });
  };

  FindRoom = (userID,listID, callback) => {
    const roomsRef = database().ref('rooms');
    roomsRef.on('value', snapshot => {
      const friendIDList = [];
      const roomIDList = [];
      const rooms = snapshot.val();
        for (let id in rooms) {
          listID.forEach(item => {
            if (rooms[id].userID === userID && rooms[id].friendID === item) {
                  friendIDList.push(item)
                  roomIDList.push(id);
            }
          });
        }
         
        callback({friendIDList:friendIDList,roomIDList:roomIDList})
        
    });
  };
  getRoomID = (userID, friendID, callback) => {
    const roomsRef = database().ref('rooms');
    roomsRef.on('value', snapshot => {
        const rooms = snapshot.val();
        for (let id in rooms) {
            if (rooms[id].userID === userID && rooms[id].friendID === friendID) {
                return callback(id);
            }
        }
    });
};

  getFriendInRoom = (snapshot,userID,friendID)=> {
     const friendIDList =[];
     const data =snapshot.val();
     for (let id in data) {
       let list = []
      if (data[id].userID === userID && data[id].friendID === friendID) {
          list = data[id].friendID;
          friendIDList.push(list)
      }
     }
    console.log(friendIDList)
    return friendIDList;
  }

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
 
  addAcceptedFriendToUser =(userID, friendID) => {
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
    const userRef = database().ref('users');
    return new Promise((resolve, reject) => {
      userRef.on('value', snapshot => {
        snapshot.forEach(item => {
          if (item.val().Email === email) {
            return resolve(item.val());
          }
        });
      });
    });
  };
}

export default new Fire();
