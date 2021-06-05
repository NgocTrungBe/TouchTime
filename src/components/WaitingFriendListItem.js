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

const WaitingFriendListItem = ({AcceptFriend,DeleteFriend,friend}) => {
 
 

  return (
   
    <View key={friend.id} style={styles.friendView}>
      <Avatar rounded size={65} source={{uri:'data:image/png;base64,'+ friend.photoURL}}></Avatar>
      <View style={styles.content}>
        <View style={styles.titleView}>
          <Text style={styles.userName}>{friend.userName}</Text>
          <Text style={styles.title}> đã gửi yêu cầu kết bạn</Text>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={()=>{AcceptFriend(friend.id)}}
          >
            <Text style={styles.acceptBtnTitle}>Xác Nhận</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={()=>{DeleteFriend(friend.id)}}
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
    marginTop:10,
    width: width/0.8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius:20,
  
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
    marginLeft:4
  },
  userName: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonView: {
    marginTop:4,
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
    backgroundColor: '#bed8f2',
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
