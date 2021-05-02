import React, {Component, useEffect, useState} from 'react';
import {View, Text, Dimensions,StyleSheet} from 'react-native';
import database from '@react-native-firebase/database';

import AppHeader from '../components/AppHeader';
import ListFriend from '../components/ListFriend';
import Fire from '../Database/Fire';
import Feather from 'react-native-vector-icons/Feather';
import {FlatList} from 'react-native';
import FriendHeader from '../components/FriendHeader';


const {width, height} = Dimensions.get('window');

const Friend = ({navigation}) => {
  const [friends, setFriends] = useState([]);
  const [waitingFriends, setWaitingFriends] = useState([]);
  //const [listID, setListID] = useState([]);
  const [isActive, setIsActive] = useState();

  useEffect(() => {
    Fire.getUserByID(Fire.getFriendId).then(userID => {
      if (userID) {
        Fire.getFriend(userID).then(userList => {
          setFriends(userList);
        });
      }
    });
    Fire.getUserByID(Fire.getWaitingFriendId).then(userID => {
      if (userID) {
        Fire.getFriend(userID).then(userList => {
          setWaitingFriends(userList);
        });
      }
    });
  }, []);

  return (
    <View>
      <FriendHeader navigation={navigation}></FriendHeader>
      {
        waitingFriends ? (
          <View>
        <View style={styles.waitingFriendView}>
          <Feather size={23} name="user-check"></Feather>
          <Text style={styles.title}>Chờ Xác Nhận</Text>
        </View>
        <FlatList
          style={{padding:20}}
          showsVerticalScrollIndicator={false}
          data={waitingFriends}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <ListFriend
                key={item.key}
                friend={item}
                navigation={navigation}></ListFriend>
            );
          }}></FlatList>
        </View>
        ) : null
      }
      {friends ? (
        <View>
        <View style={styles.friendView}>
          <Feather size={23} name="users"></Feather>
          <Text style={styles.title}>Bạn bè</Text>
        </View>
        <FlatList
          style={{padding:20}}
          showsVerticalScrollIndicator={false}
          data={friends}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <ListFriend
                key={item.key}
                friend={item}
                navigation={navigation}></ListFriend>
            );
          }}></FlatList>
        </View>
 
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  friendView: {
    width: width-270,
    flexDirection: 'row',
    justifyContent:"space-between",
    alignItems: 'center',
    marginLeft:width-380,
    marginTop: height / 10,
    padding:10,
    borderRadius:10,
    backgroundColor:"#ededf1"
  },
  waitingFriendView: {
    width: width-200,
    flexDirection: 'row',
    justifyContent:"space-between",
    alignItems: 'center',
    marginLeft:width-380,
    marginTop: height / 10,
    padding:10,
    borderRadius:10,
    backgroundColor:"#ededf1"
  },
  title:{
    fontSize:22,
    fontWeight:"500"
  }
});
export default Friend;
