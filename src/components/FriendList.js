import React, {Component, useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import database from '@react-native-firebase/database';

import AppHeader from '../components/AppHeader';
import FriendListItem from '../components/FriendListItem';
import Fire from '../Database/Fire';
import Feather from 'react-native-vector-icons/Feather';
import {FlatList} from 'react-native';


const {width, height} = Dimensions.get('window');

const FriendList = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isActive, setIsActive] = useState();
  useEffect(() => {
   props.GetFriend();
  }, []);

  const handleRefresh = () => {
     setRefreshing(true);
     setTimeout(() => {
      props.GetFriend(userID);
      setRefreshing(false);
    }, 1000);
  };
  return (
    <View style={styles.wrapper}>
    
    
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={props.appData.friendList}
          keyExtractor={(item ,index)=> item.data.friendID}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          renderItem={({item}) => {
            return (
              <FriendListItem
                key={item.data.friendID}
                friend={item}
                navigation={props.navigation}></FriendListItem>
            );
          }}></FlatList>
      
      
    </View>
  );
};
const styles = StyleSheet.create({

  wrapper:{
    width:width,
    height: height / 1.25,
  }
 
});
export default FriendList;
