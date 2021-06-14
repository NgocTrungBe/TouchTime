import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
const {width, height} = Dimensions.get('window');

const FriendListItem = ({friend, navigation}) => {

  const showProFile = () =>{
       navigation.navigate('FriendProfile',{friend:friend});
  }
  return (
    <View >
      <TouchableOpacity
        style={styles.item}
        key={friend.data.friendID}
        onPress={() =>
          navigation.navigate('Chat', {
            friendUserName: friend.data.userName,
            friendAvatar: 'data:image/png;base64,' + friend.data.avatar,
            friendID: friend.data.friendID,
          })
        }>
        <View style={styles.friendView}>
          <Avatar
            rounded
            size={55}
            source={{uri: 'data:image/png;base64,' + friend.data.avatar}}></Avatar>
          <View style={styles.content}>
            <Text
              numberOfLines={1}
              lineBreakMode="tail"
              style={styles.userName}>
              {friend.data.userName}
            </Text>
            <Text numberOfLines={1} lineBreakMode="tail" style={styles.email}>
              {friend.data.email}
            </Text>
          </View>
          <View style={styles.buttonView}>
            <Feather
              style={styles.moreButton}
              name="more-vertical"
              size={23}
              onPress={showProFile}></Feather>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
 
  item: {
    position:'relative',
    marginLeft: width / 18,
    width: width / 1.1,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    marginBottom: 5,
    borderRadius: 15,
    elevation: 4,
    borderLeftWidth: 3.5,
    borderLeftColor: 'green',
    borderRadius: 15,
    
  },
  friendView: {
    marginLeft: 25,
    height: height / 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  content: {
    flexDirection: 'column',
  },
  userName: {
    marginLeft: 15,
    marginBottom: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0b4770',
  },
  email: {
    marginLeft: 15,
    width:180,
    fontSize: 16,
    fontWeight: '500',
    color: 'grey',
  },
  buttonView:{
    position:'absolute',
    right:8,
    top:15
  },
  moreButton:{
    color:"#0b4770"
  }
});

export default FriendListItem;
