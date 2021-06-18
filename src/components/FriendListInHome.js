import React, {Component, useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import database from '@react-native-firebase/database';

import FriendListItem from './FriendListItem';
import Fire from '../Database/Fire';
import * as LocalDatabase from '../Database/Local';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import {FlatList} from 'react-native';
import FriendListInHomeItem from './FriendListInHomeItem';
import {SectionList} from 'react-native';

const {width, height} = Dimensions.get('window');

const FriendListInHome = props => {
  const [refreshing, setRefreshing] = useState(false);
  const [isActive, setIsActive] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
  
    const unsubscribe =  props.getOnlineFriend();
    // const userID = Fire.getUid();

    // const unsubscribe = Fire.getAllFriend(userID).then(data => {
    //   console.log(data.length)
    //   setData(data);
    // });

    return () => {
      unsubscribe;
    };
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      props.getOnlineFriend();
      setRefreshing(false);
    }, 1000);
  };
  return (
    <View style={styles.wrapper}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={props.onlineFriendList.sort(item=>{
          if(item.isOnline == true){
            return -1;
          }
          if(item.isOnline == false){
            return 1;
          }
          
        })}
        keyExtractor={(item,index) => item + index}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={({item}) => {
          return (
            <FriendListInHomeItem
              key={item.data.key}
              friend={item}
              navigation={props.navigation}></FriendListInHomeItem>
          );
        }}></FlatList>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    //   flex:1,
    width: width,
    height: 90,
    marginTop: 20,
  },
});
export default FriendListInHome;
