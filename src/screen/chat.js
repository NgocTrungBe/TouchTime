import React, {Component, useState, useEffect, useCallback} from 'react';
import { View } from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import ChatHeader from '../components/ChatHeader';

import Fire from '../Database/Fire';
const Chat = ({route,navigation}) => {
  const {userName, userPhoto, userID} = route.params;


  const [messages, setMessages] = useState([]);
  getUser = () =>{
     return{
       _id:Fire.getUid(),
        name:userName,
        avatar:userPhoto
     }
  } 

  useEffect(() => {
    Fire.getMess((messages =>
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      ))
    ,userID,Fire.getUid());
    
   
  }, []);

  // const onSend = useCallback((messages = []) => {
  //   setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  // }, [])

  return (
    <>
    <ChatHeader userName={userName} photoURL={userPhoto} navigation={navigation}></ChatHeader> 
    
    <GiftedChat
      messages={messages}
      onSend={messages => Fire.send(messages,userID)}
      user={
        getUser()
      }
    />
  
  </>
   
  );
};
export default Chat;
