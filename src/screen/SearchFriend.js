import React, {Component, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,

  BackHandler,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import SearchFriendHeader from '../components/SearchHeader';
import Fire from '../Database/Fire';
import Friend from './Friend';
const {width, height} = Dimensions.get('window');

const SearchFriend = props => {
  const [users, setUser] = useState([]);

  const [isSendRequest, setIsSendRequest] = useState(false);
  

  return (
    <View style={styles.wrapper}>
       <SearchFriendHeader {...props}></SearchFriendHeader>
    
      {props.appData.searchData.length > 0 ? (
        props.appData.searchData.map(user => {
          if (user) {
            return (
              <View key={user.user.id} style={styles.friendView}>
                <Avatar
                  rounded
                  size={70}
                  source={{
                    uri: 'data:image/png;base64,' + user.user.photoURL,
                  }}></Avatar>
                <View style={styles.content}>
                  <Text style={styles.userName}>{user.user.userName}</Text>
                  {user.isActive == undefined ? (
                    isSendRequest == false ? (
                      <TouchableOpacity
                        style={styles.addFriendButton}
                        onPress={() => {
                          props.AddFriend(user.user.id);
                          setIsSendRequest(true);
                        }}>
                        <Text style={styles.buttonTitle}>Kết bạn</Text>
                      </TouchableOpacity>
                    ) : (
                      <Text style={styles.sendRequest}>
                        Đã gửi lời kết bạn
                      </Text>
                    )
                  ) : (
                    <Text style={styles.sendRequest}>
                      {user.isActive == 'false'
                        ? 'Đã gửi lời kết bạn'
                        : 'Bạn bè'}
                    </Text>
                  )}
                </View>
              </View>
            );
          } else
            return (
              <View style={styles.notFoundView}>
                <Text style={styles.notFoundMess}>
                  Không tìm thấy người dùng!
                </Text>
              </View>
            );
        })
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
 
  friendView: {
    width: width - 90,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: width - 365,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: '#fff',
  },
  content: {
    marginLeft: 5,
    height: 70,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  userName: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  addFriendButton: {
    width: 80,
    marginLeft: 20,
    marginTop: 5,
    padding: 8,
    backgroundColor: '#ad69d4',
  },
  buttonTitle: {
    marginLeft: 1,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  sendRequest: {
    marginTop: 5,
    padding: 8,

    color: 'red',
  },
  notFoundView: {
    marginTop: 20,
    marginLeft: 28,
  },
  notFoundMess: {
    fontSize: 15,
    color: 'red',
  },
});

export default SearchFriend;
