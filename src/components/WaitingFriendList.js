import React, {Component, useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import database from '@react-native-firebase/database';

import AppHeader from '../components/AppHeader';
import FriendListItem from '../components/FriendListItem';
import Fire from '../Database/Fire';
import Feather from 'react-native-vector-icons/Feather';
import {FlatList} from 'react-native';
import FriendHeader from '../components/FriendHeader';
import WaitingFriendListItem from '../components/WaitingFriendListItem';

const {width, height} = Dimensions.get('window');

const WaitingFriendList = ({navigation}) => {

  const [waitingFriends, setWaitingFriends] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isActive, setIsActive] = useState();

  useEffect(() => {
    getWaitingFriendData();
  }, []);

  const getWaitingFriendData = () => {
    Fire.getFriendListID(Fire.getWaitingFriendId).then(userID => {
      if (userID) {
        Fire.getFriend(userID).then(userList => {
         if(userList.length >0){
            setWaitingFriends(userList);
         }
          setRefreshing(false);
        });
      }
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getWaitingFriendData();
  };
  return (
    <View>
     
      
     
          <FlatList
            style={{padding: 20}}
            showsVerticalScrollIndicator={false}
            data={waitingFriends}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <WaitingFriendListItem
                  key={item.key}
                  friend={item}
                  navigation={navigation}></WaitingFriendListItem>
              );
            }}></FlatList>
    
      
    
    </View>
  );
};
const styles = StyleSheet.create({
  friendView: {
    width: width - 270,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: width/40,
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
export default WaitingFriendList;
