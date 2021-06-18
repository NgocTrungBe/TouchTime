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
  ActivityIndicator,
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
import {Keyboard} from 'react-native';

const {width, height} = Dimensions.get('window');

const Chat = props => {
  const {friendUserName, friendAvatar, friendID} = props.route.params;
  const [messages, setMessages] = useState([]);
  const [userID, setUserID] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPhotoURL, setUserPhotoURL] = useState();
  const [imageUri, setImageUri] = useState();
  const [base64Code, setBase64Code] = useState();
  const [imageWidth, setImageWidth] = useState();
  const [imageHeight, setImageHeight] = useState();
  const [isShowActions, setIsShowActions] = useState(false);
  const [text, setText] = useState('');
  

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: '',
      headerLeft: () => (
        <ChatHeader
          userName={friendUserName}
          photoURL={friendAvatar}
          navigation={props.navigation}
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

    return () => {
      unGetUser;
    };
  }, [props.navigation]);

  useEffect(() => {
    const unsubscribe = props.findRoomByUser(friendID);
    return ()=>{
      unsubscribe;
      props.clearData();
    }
  }, []);
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
          setBase64Code('data:image/png;base64,'+response.base64);
          setImageWidth(response.width);
          setImageHeight(response.height);
          setText('Hình ảnh');
        }
      },
    );
  };
  const onSend = () => {
    const userData = {
      id: userID,
      userName: userName,
      photoURL: 'data:image/png;base64,'+  userPhotoURL,
    };

    const friendData = {
      id: friendID,
      userName: friendUserName,
      photoURL: friendAvatar,
    };

    const message = {
      text: text,
      user: {
        _id: userID,
        name: userName,
        avatar: 'data:image/png;base64,' + userPhotoURL,
      },
      image: base64Code && imageWidth && imageHeight  ? {uri:base64Code,width:imageWidth ,height:imageHeight}: '',
    };

    props.sendMessage(message, friendID, userData, friendData, props.roomKey);
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
          <TouchableOpacity style={styles.closeImage} onPress={closeImage}>
            <Feather size={30} style={{color: "red"}} name="x"></Feather>
          </TouchableOpacity>
        </Animatable.View>
      ) : null}

      {props.loading ? (
        <View style={styles.containerIndicator}>
          <ActivityIndicator size={23} color="green"></ActivityIndicator>
        </View>
      ) : (
        <FlatList
          data={props.messages}
          inverted
          showsVerticalScrollIndicator={false}
          bounces
          keyExtractor={(item, index) => item._id}
          renderItem={({item,index}) => {
            return <MessageItem navigation={props.navigation} messageData={props.messages} friendUserName={friendUserName} userID={userID} item={item} index={index}></MessageItem>;
          }}></FlatList>
      )}

      <View style={styles.composerView}>
        <View>
          <MaterialCommunity
            onPress={handlePickImage}
            style={styles.imagePicker}
            name="image"
            size={30}></MaterialCommunity>
        </View>
        <View>
          <TextInput
            value={text}
            onEndEditing={() => setText('')}
            onChangeText={text => setText(text)}
            style={styles.composer}></TextInput>
        </View>

        <View style={{marginRight: 12}}>
          <MaterialCommunity
            onPress={onSend}
            style={styles.sendButton}
            name="send-circle"
            size={35}></MaterialCommunity>
        </View>
      </View>

     
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
    borderWidth:0.2,
    borderColor: 'brown',
  },
  closeImage: {
    width:30,
    marginLeft: 10,
  
    color: 'red',
    zIndex:20,
 
  },
  imageView: {
    position: 'relative',
    zIndex:20,
    top: height - height / 3.2,
    alignItems: 'center',
    flexDirection: 'row',
    left: 20,
    width: 100,
    height: 60,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor:"#ffffff",
      elevation: 20,
  },
  containerIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Chat;
