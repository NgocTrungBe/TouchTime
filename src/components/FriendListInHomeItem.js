import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
const {width, height} = Dimensions.get('window');

const FriendListInHomeItem = ({friend, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      key={friend.id}
      onPress={() =>
        navigation.navigate('Chat', {
          friendUserName: friend.userName,
          friendAvatar: 'data:image/png;base64,' + friend.photoURL,
          friendID: friend.id,
        })
      }>
      <View style={styles.friendView}>
        <Image
          resizeMode="cover"
          style={styles.avatar}
          source={{
            uri: 'data:image/png;base64,' + friend.photoURL,
          }}></Image>
        <View style={styles.dot}></View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position:"relative",
    marginTop: 7,
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    borderRadius:15,
   
  },
  friendView: {
    width: 100,
    alignItems: 'center',
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 15,
  },
  dot:{
    position:"absolute",
    borderWidth:1,
    borderColor:"#ffffff",
    top:45,
    left:67,
    width:10,
    height:10,
    backgroundColor:"green",
    borderRadius:10
  }
});

export default FriendListInHomeItem;
