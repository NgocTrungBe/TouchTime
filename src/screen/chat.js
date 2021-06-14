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
  Platform,
  KeyboardAvoidingView,
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
  Time,


} from 'react-native-gifted-chat';
import {launchImageLibrary} from 'react-native-image-picker';
import {Avatar} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
import Fire from '../Database/Fire';
import {TextInput} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {guidGenerator} from '../Asset/Ultils';
import ChatImageView from '../components/ChatImageView';
import MessageItem from '../components/MessageItem';
import { Keyboard } from 'react-native';

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
    const unGetUser = Fire.getUserInfo().then(userData => {
      if (userData != 'null') {
        setUserID(userData.userID);
        setUserName(userData.userName);
        setUserEmail(userData.email);
        setUserPhotoURL(userData.photoURL);
      }
    });
    return ()=>{
      unGetUser
    }
  }, [navigation]);

  useEffect(() => {
  

    // const unsubscribe = Fire.getMess(message => {

    //   setMessages(previousMessages =>
    //     GiftedChat.append(previousMessages, message),
    //   );
    // }, friendID);

    const unsubscribe = Fire.getMess(message => {
      setMessages(message);
    }, friendID);

  

    return () => {
      Fire.getMess(unsubscribe);
     
    };
  }, []);

  const renderActions = props => {
    return (
      <Actions
        {...props}
        icon={() => (
          <View>
            <MaterialCommunity
              style={styles.imagePicker}
              name="image"
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
        <View style={{marginBottom: 10, marginRight: 8}}>
          <MaterialCommunity
            style={styles.sendButton}
            name="send-circle"
            size={35}></MaterialCommunity>
        </View>
      </Send>
    );
  };
  const renderComposer = () => {
    return (
      <View style={styles.composerView}>
        <View>
          <MaterialCommunity
            style={styles.imagePicker}
            name="image"
            size={35}></MaterialCommunity>
        </View>
        <View>
          <TextInput style={styles.composer}></TextInput>
        </View>

        <View style={{marginBottom: 10, marginRight: 8}}>
          <MaterialCommunity
            style={styles.sendButton}
            name="send-circle"
            size={35}></MaterialCommunity>
        </View>
      </View>
    );
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
    return (
      <View>
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              backgroundColor: '#ebecec',
            },
          }}></Bubble>
      </View>
    );
  };
  const closeImage = () => {
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
  const onSend = () => {
   
      const message = [
        {
          
          text: text,
          user: {
                _id: userID,
                name: userName,
                avatar: 'data:image/png;base64,' + userPhotoURL,
              },
          image: base64Code ? 'data:image/png;base64,' + base64Code : '',
        },
      ];
       Fire.send(message,friendID);
      setImageUri('');
      setText('');

  
  };
  
  

  return (
    <View style={{flex: 1}}>
      {imageUri ? (
        <Animatable.View
          duration={800}
          animation="bounceIn"
          style={styles.imageView}>
          <Image style={styles.image} source={{uri: imageUri}}></Image>
          <TouchableOpacity onPress={closeImage}>
            <Feather size={30} style={styles.closeImage} name="x"></Feather>
          </TouchableOpacity>
        </Animatable.View>
      ) : null}
      <FlatList
        data={messages.sort((mess1, mess2) => {
          if (new Date(mess1.createdAt) > new Date(mess2.createdAt)) {
            return -1;
          }
          if (new Date(mess1.createdAt) < new Date(mess2.createdAt)) {
            return 1;
          }
          return 0;
        })}
        inverted
        showsVerticalScrollIndicator={false}
        bounces
        keyExtractor={(item, index) => item._id}
        renderItem={({item}) => {
          return <MessageItem userID={userID} item={item}></MessageItem>;
        }}></FlatList>
      <View style={styles.composerView}>
        <View>
          <MaterialCommunity onPress={handlePickImage}
            style={styles.imagePicker}
            name="image"
            size={30}></MaterialCommunity>
        </View>
        <View>
          <TextInput value={text} onEndEditing={()=>setText('')} onChangeText = {(text) =>setText(text)} style={styles.composer}></TextInput>
        </View>

        <View style={{ marginRight: 12}}>
          <MaterialCommunity onPress={onSend}
            style={styles.sendButton}
            name="send-circle"
            size={35}></MaterialCommunity>
        </View>
      </View>
      
      
      {/* <GiftedChat
          showAvatarForEveryMessage={true}
          renderBubble={renderBubble}
          isKeyboardInternallyHandled={false}
          text={text}
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
          }}></GiftedChat> */}
    </View>
  );
};
const styles = StyleSheet.create({
  composerView: {
    width: width,
    height: height / 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    elevation: 12,
  },
  composer: {
    width: width / 2,
    position: 'relative',
    marginTop: 7,
    marginBottom: 7,
    marginLeft: 40,
    paddingLeft: 15,
    backgroundColor: '#d0e6fc',
    borderRadius: 20,
    marginRight: 15,
  },
  sendButton: {
    color: '#C576F6',
  },
  imagePicker: {
    width: 50,
    color: '#C576F6',
    left: 30,
  },
  image: {
    borderRadius: 10,
    width: 60,
    height: 60,
  },
  closeImage: {
    marginLeft: 10,
    color: 'red',
  },
  imageView: {
    position: 'relative',
    top: height - height / 3.2,
    alignItems: 'center',
    flexDirection: 'row',
    left: 20,
    width: 60,
    height: 60,
    borderColor: '#ffffff',
    marginBottom: 10,

    elevation: 20,
  },
});
export default Chat;
