import React, {Component, useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import database from '@react-native-firebase/database';

import AppHeader from '../components/AppHeader';
import ListFriend from '../components/ListFriend';
import Fire from '../Database/Fire';
import {FlatList} from 'react-native';
import FriendHeader from '../components/FriendHeader';

const {width, height} = Dimensions.get('window');

const Friend = ({navigation}) => {
  const [friends, setFriends] = useState([]);
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
  }, []);

  return (
    <View>
      <FriendHeader></FriendHeader>
      {friends ? (
        <FlatList
          style={{marginTop: height / 15,padding:20}}
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
      ) : null}
    </View>
  );
};

export default Friend;
