import React, {
  Component,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import database from '@react-native-firebase/database';
import ChatHeader from '../components/ChatHeader';
import {GiftedChat} from 'react-native-gifted-chat';
import {Avatar} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import Fire from '../Database/Fire';
const {width, height} = Dimensions.get('window');

const Chat = ({route, navigation}) => {
  const {friendUserName, friendAvatar, friendID} = route.params;
  const [messages, setMessages] = useState([]);
  const [userID, setUserID] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPhotoURL, setUserPhotoURL] = useState();
  const [isLoadMess, setIsLoadMess] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <ChatHeader
          userName={friendUserName}
          photoURL={friendAvatar}
          navigation={navigation}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {

    Fire.getUserInfo().then(userData=>{
      if(userData != 'null'){
        setUserID(userData.userID)
        setUserName(userData.userName);
        setUserEmail(userData.email);
        setUserPhotoURL(userData.photoURL);
       
      }
    });

    const unsubscribe =  Fire.getMess(message => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, message),
      );
    }, friendID);
  
    return () => {
      // const chatRef = database().ref('messages');
      // chatRef.off();
      unsubscribe;
    };
  }, []);

  return (
    <>
      <GiftedChat
        showAvatarForEveryMessage={true}
        messages={messages}
        onSend={messages => Fire.send(messages, friendID)}
        user={{
          _id: userID,
          name: userName,
          avatar: 'data:image/png;base64,' + userPhotoURL,
        }}
      />
    </>
  );
};
export default Chat;
