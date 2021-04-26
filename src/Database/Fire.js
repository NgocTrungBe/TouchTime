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

  getUser = uid => {
    // const [users, setUsers] = useState([]);
    const userRef = database().ref('users');
    userRef.on('value', snapshot => {
      const users = snapshot.val();
      const userList = [];
      for (let item in users) {
        userList.push(users[item]);
      }
      //setUsers(userList)
    });

    //return users;
  };

  send = (messages, friendID) => {
    const roomsRef = database().ref('rooms');
    roomsRef.on('value', snapshot => {
      let userID = this.getUid();
      let idFriend = friendID;
      if (snapshot == 'null') {
        this.createRooms(userID, idFriend);
        roomsRef.off();
      } else {
        let id = this.getRoomId(snapshot, userID, friendID);
        const chatRef = database().ref('messages/' + id);
        messages.forEach(item => {
          const message = {
            text: item.text,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: item.user,
          };
          chatRef.push(message);
        });
      }
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

  getMess = (callback,friendID,userID) => {
    const roomsRef = database().ref('rooms');
    roomsRef.on('value', snapshot => {
      let roomID = this.getRoomId(snapshot,userID,friendID);
        const chatRef = database().ref('messages/' + roomID);
        chatRef.on('child_added', snapshot => callback(this.parse(snapshot)));
      
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

  createUser = (id, userName, photoURL) => {
    database()
      .ref('users/' + id)
      .update({
        userName: userName,
        photoURL: photoURL,
        id: id,
      });
  };
 
  // rooms
  createRooms = (userId, friendID) => {
    const room = {
      userID: userId,
      friendID: friendID,
    };

    const onChange = database().ref('rooms').push(room);
    return () => {
      database.off(onChange);
    };
  };
  getRoomId = (room, userID, friendID) => {
    let _id;
    room.forEach(item => {
      if (item.val().userID == userID && item.val().friendID == friendID) {
        _id = item.key;
      }
    });
    return _id;
  };
}

export default new Fire();
