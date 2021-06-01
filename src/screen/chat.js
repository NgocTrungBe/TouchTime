import React, {
  Component,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import database from '@react-native-firebase/database';
import ChatHeader from '../components/ChatHeader';
import {
  GiftedChat,
  Actions,
  ActionsProps,
  Send,
  SendProps,
  Composer,
  ComposerProps,
  Bubble,
  MessageImage,
  MessageText,
} from 'react-native-gifted-chat';
import {launchImageLibrary} from 'react-native-image-picker';
import {Avatar} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import Fire from '../Database/Fire';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {guidGenerator} from '../Asset/Ultils';
import ChatImageView from '../components/ChatImageView';
const {width, height} = Dimensions.get('window');

const Chat = ({route, navigation}) => {
  const {friendUserName, friendAvatar, friendID} = route.params;
  const [messages, setMessages] = useState([]);
  const [userID, setUserID] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPhotoURL, setUserPhotoURL] = useState();
  const [imageUri, setImageUri] = useState();
  const [base64Code, setBase64Code] = useState();
  const [isShowActions, setIsShowActions] = useState(false);
  const [text, setText] = useState('');

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

  // useEffect(() => {
  //   Fire.getUserInfo().then(userData => {
  //     if (userData != 'null') {
  //       setUserID(userData.userID);
  //       setUserName(userData.userName);
  //       setUserEmail(userData.email);
  //       setUserPhotoURL(userData.photoURL);
  //     }
  //   });

  //   const unsubscribe = Fire.getMess(message => {
  //     console.log(messages.imageBase64);
  //     setMessages(previousMessages =>
  //       GiftedChat.append(previousMessages, message),
  //     );
  //   }, friendID);

  //   return () => {
  //     // const chatRef = database().ref('messages');
  //     // chatRef.off();
  //     unsubscribe;
  //   };
  // }, []);

  const renderActions = props => {
    return (
      <Actions
        {...props}
        icon={() => (
          <View>
            <MaterialCommunity
              style={styles.imagePicker}
              name="image-plus"
              size={35}></MaterialCommunity>
          </View>
        )}
        optionTintColor="red"
        onSend={message => Fire.send(message, friendID)}
        onPressActionButton={() => handlePickImage()}
      />
    );
  };
  const renderSend = props => {
    return (
      <Send {...props}>
        <View style={{marginBottom: 10, marginLeft: 13}}>
          <MaterialCommunity
            style={styles.sendButton}
            name="send-circle"
            size={35}></MaterialCommunity>
        </View>
      </Send>
    );
  };
  const renderComposer = props => {
    return <Composer {...props} textInputStyle={styles.composer}></Composer>;
  };

  const renderBubble = props => {
    const {currentMessage} = props;
    if (currentMessage.image) {
      return (
        <ChatImageView
          text={currentMessage.text}
          imageUri={currentMessage?.image}></ChatImageView>
      );
    }
    return <Bubble {...props} />;
  };
  const closeImage =() => {
     setImageUri('');
     setText('');
  };
  const handlePickImage = () => {
    launchImageLibrary(
      {
        maxWidth: width - 130,
        height: 120,
        mediaType: 'photo',
        includeBase64: true,
      },
      response => {
        
        if (response.didCancel != true) {
          setImageUri(response.uri);
          setBase64Code(response.base64);
          setText('Hình ảnh');
        }
      },
    );
  };
  const onSend = messages => {
    messages.forEach(item => {
      const message = [
        {
          _id: item._id,
          createdAt: item.createdAt,
          text: item.text,
          user: item.user ? item.user :
          {
            _id: userID,
            name: userName,
            avatar: 'data:image/png;base64,' + userPhotoURL,
          } ,
          image: base64Code ? 'data:image/png;base64,' + base64Code : '',
        },
      ];
      Fire.send(message, friendID);
      setImageUri('');
      setText('');
    });
  };

  return (
    <>
      {imageUri ? (
        <Animatable.View duration={800} animation="bounceIn" style={styles.imageView}>
          <Image style={styles.image} source={{uri: imageUri}}></Image>
          <TouchableOpacity onPress={closeImage} ><Feather size={30}  style={styles.closeImage} name='x'></Feather></TouchableOpacity>
        </Animatable.View>
      ) : null}

      <GiftedChat
        showAvatarForEveryMessage={true}
        renderBubble={renderBubble}
        text = {text}
        placeholder="....."
        onInputTextChanged={text => setText(text)}
        messages={messages}
        alwaysShowSend
        disableComposer={imageUri ? true : false}
        onSend={messages => onSend(messages)}
        renderActions={renderActions}
        renderSend={renderSend}
        renderComposer={renderComposer}
        user={{
          _id: userID,
          name: userName,
          avatar: 'data:image/png;base64,' + userPhotoURL,
        }}
      />
    </>
  );
};
const styles = StyleSheet.create({
  composer: {
    position: 'relative',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 40,
    paddingLeft: 15,
    backgroundColor: '#d0e6fc',
    borderRadius: 20,
  },
  sendButton: {
    color: '#C576F6',
  },
  imagePicker: {
    width: 50,
    color: '#C576F6',
    position: 'absolute',
    bottom: -27,
    left: 10,
  },
  image: {
    borderRadius: 10,
    width: 60,
    height: 60,
  },
  closeImage:{
  marginLeft:10,      
   color:'red'      
        
  },
  imageView: {
    position: 'relative',
    top: height / 1.4,
    alignItems:'center',
    flexDirection:'row',
    left: 20,
    width: 60,
    height: 60,
    borderColor: '#ffffff',
    marginBottom: 10,

    elevation: 20,
  },
});
export default Chat;
