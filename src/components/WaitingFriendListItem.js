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
import Fire from '../Database/Fire';
const {width, height} = Dimensions.get('window');

const WaitingFriendListItem = ({friend, navigation}) => {

   function AcceptWaitingFriend(){
      Fire.getKeyWaitingFriend(friend.id).then((waitingFriendKey) =>{
        Fire.acceptWaitingFriend(waitingFriendKey,friend.id);
     })
  }

  return (
   
    <View key={friend.id} style={styles.friendView}>
      <Avatar rounded size={60} source={{uri:'data:image/png;base64,'+ friend.photoURL}}></Avatar>
      <View style={styles.content}>
        <View style={styles.titleView}>
          <Text style={styles.userName}>{friend.userName}</Text>
          <Text style={styles.title}> đã gửi yêu cầu kết bạn</Text>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() =>{
              AcceptWaitingFriend();
            }}
          >
            <Text style={styles.acceptBtnTitle}>Xác Nhận</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
         >
          
            <Text style={styles.deleteBtnTitle}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // waiting friend
  friendView: {
    width: width - 50,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  content: {
    marginLeft: 5,
    height: 50,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
  },
  userName: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  acceptButton: {
    width: 100,
    marginLeft: 20,
    marginTop: 5,
    padding: 8,
    borderRadius:5,
    alignItems:"center",
    backgroundColor: '#ad69d4',
  },
  deleteButton: {
    width: 100,
    alignItems:"center",
    marginLeft: 20,
    marginTop: 5,
    borderRadius:5,
    padding: 8,
    backgroundColor: '#ededf1',
  },
  acceptBtnTitle: {
    marginLeft: 1,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  deleteBtnTitle: {
    marginLeft: 1,
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },

});

export default WaitingFriendListItem;
