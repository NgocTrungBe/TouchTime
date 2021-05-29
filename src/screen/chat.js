import React, {
  Component,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import {View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import ChatHeader from '../components/ChatHeader';

import Fire from '../Database/Fire';
const Chat = ({route, navigation}) => {
  const {friendUserName, friendAvatar, friendID} = route.params;


  const [messages, setMessages] = useState([]);
  const [userID,setUserID] = useState();
  const [userName,setUserName] = useState();
  const [userEmail,setUserEmail] = useState();
  const [userPhotoURL,setUserPhotoURL] = useState();
  // const getUser = () => {

 
  //
  // }
  // const getMessages = () => {
  //     Fire.getMess((messages =>
  //         setMessages(previousMessages =>
  //             GiftedChat.append(previousMessages, messages),
  //         )), userID, Fire.getUid());
  // }

  useLayoutEffect(() => {
    Fire.getUserInfo().then(userData=>{
        if(userData != 'null'){
          setUserID(userData.userID)
          setUserName(userData.userName);
          setUserEmail(userData.email);
          setUserPhotoURL(userData.photoURL);
         
        }
   })

   Fire.getMess(
    (messages) =>{
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages)
      )
    },  friendID
  );
   
  }, []);
    
  const onSend = useCallback((messages = []) => {
    //setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

  }, []) 
  return (
    <>
      <ChatHeader
        userName={friendUserName}
        photoURL={friendAvatar}
        navigation={navigation}></ChatHeader>

      <GiftedChat
        showAvatarForEveryMessage={true}
        messages={messages}
        onSend={messages =>  Fire.send(messages, friendID)}
        user={{
            _id:userID,
            name:userName,
            avatar:'data:image/png;base64,'+userPhotoURL
        }
        }
      />
    </>
  );
};
export default Chat;
