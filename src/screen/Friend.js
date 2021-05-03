import React, {Component, useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import database from '@react-native-firebase/database';

import AppHeader from '../components/AppHeader';
import ListFriend from '../components/ListFriend';
import Fire from '../Database/Fire';
import Feather from 'react-native-vector-icons/Feather';
import {FlatList} from 'react-native';
import FriendHeader from '../components/FriendHeader';
import ListWaitingFriend from '../components/ListWaitingFriend';

const {width, height} = Dimensions.get('window');

const Friend = ({navigation}) => {
  const [friends, setFriends] = useState([]);
  const [waitingFriends, setWaitingFriends] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isActive, setIsActive] = useState();

  useEffect(() => {
    getFriendData();
    getWaitingFriendData();
  }, []);

  const getFriendData = () => {
    Fire.getUserByID(Fire.getFriendId).then(userID => {
      if (userID) {
        Fire.getFriend(userID).then(userList => {
          setFriends(userList);
          setRefreshing(false);
        });
      }
    });
  };
  const getWaitingFriendData = () => {
    Fire.getUserByID(Fire.getWaitingFriendId).then(userID => {
      if (userID) {
        Fire.getFriend(userID).then(userList => {
          setWaitingFriends(userList);
          setRefreshing(false);
        });
      }
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getFriendData();
    getWaitingFriendData();
  };
  return (
    <View>
      <FriendHeader navigation={navigation}></FriendHeader>
      {waitingFriends.length > 0 ? (
        <View>
          <View style={styles.waitingFriendView}>
            <Feather size={23} name="user-check"></Feather>
            <Text style={styles.title}>Chờ Xác Nhận</Text>
          </View>
          <FlatList
            style={{padding: 20}}
            showsVerticalScrollIndicator={false}
            data={waitingFriends}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <ListWaitingFriend
                  key={item.key}
                  friend={item}
                  navigation={navigation}></ListWaitingFriend>
              );
            }}></FlatList>
        </View>
      ) : (
        <View></View>
      )}
      {friends.length>0 ? (
        <View>
          <View style={styles.friendView}>
            <Feather size={23} name="users"></Feather>
            <Text style={styles.title}>Bạn bè</Text>
          </View>
          <FlatList
            style={{padding: 20, backgroundColor: '#fff5ee'}}
            showsVerticalScrollIndicator={false}
            data={friends}
            keyExtractor={item => item.id}
            refreshing={refreshing}
            onRefresh={handleRefresh}
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
    width: width - 270,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: width - 380,
    marginTop: height / 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ededf1',
  },
  waitingFriendView: {
    width: width - 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: width - 380,
    marginTop: height / 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ededf1',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
  },
});
export default Friend;
