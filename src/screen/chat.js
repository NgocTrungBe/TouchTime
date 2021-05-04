import React, { Component, useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import ChatHeader from '../components/ChatHeader';

import Fire from '../Database/Fire';
const Chat = ({ route, navigation }) => {
    const { userName, userPhoto, userID } = route.params;


    const [messages, setMessages] = useState([]);
    const getUser = () => {
        return {
            _id: Fire.getUid(),
            name: userName,
            avatar: userPhoto
        }
    }
    const getMessages = () => {
        Fire.getMess((messages =>
            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, messages),
            )), userID, Fire.getUid());
    }

    useEffect(() => {
        getMessages();

    }, []);

    return ( 
        <>
        <ChatHeader userName = { userName }
        photoURL = { userPhoto }
        navigation = { navigation } > < /ChatHeader> 

        <GiftedChat showAvatarForEveryMessage = { true }
        messages = { messages }
        onSend = { messages => Fire.send(messages, userID) }
        user = {
            getUser()
        }/>

        </>

    );
};
export default Chat;