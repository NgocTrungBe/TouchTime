import React, {Component, useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import database from '@react-native-firebase/database';

import AppHeader from '../components/AppHeader';
import FriendListItem from '../components/FriendListItem';
import Fire from '../Database/Fire';
import Feather from 'react-native-vector-icons/Feather';
import {FlatList} from 'react-native';
import FriendHeader from '../components/FriendHeader';

const {width, height} = Dimensions.get('window');

const FriendList = ({navigation}) => {
  const [friends, setFriends] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isActive, setIsActive] = useState();

  useEffect(() => {
    getFriendData();
  }, []);

  const getFriendData = () => {
    Fire.getFriendListID(Fire.getFriendId).then(userID => {
        console.log(userID)
      if (userID) {
        Fire.getFriend(userID).then(userList => {
            console.log(userList)
          setFriends(userList);
          setRefreshing(false);
        });
      }
    });
  };
  const handleRefresh = () => {
    setRefreshing(true);
    getFriendData();
  };
  return (
    <View>
    
      <View>
        <FlatList
          style={{padding: 20, backgroundColor: '#ffffff'}}
          showsVerticalScrollIndicator={false}
          data={friends}
          keyExtractor={item => item.id}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          renderItem={({item}) => {
            return (
              <FriendListItem
                key={item.key}
                friend={item}
                navigation={navigation}></FriendListItem>
            );
          }}></FlatList>
      </View>
      
    </View>
  );
};
const styles = StyleSheet.create({
 
});
export default FriendList;
