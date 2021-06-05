import React, {Component, useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import database from '@react-native-firebase/database';

import FriendListItem from './FriendListItem';
import Fire from '../Database/Fire';
import Feather from 'react-native-vector-icons/Feather';
import {FlatList} from 'react-native';
import FriendListInHomeItem from './FriendListInHomeItem';
import { SectionList } from 'react-native';

const {width, height} = Dimensions.get('window');

const FriendListInHome = props => {
  const [refreshing, setRefreshing] = useState(false);
  const [isActive, setIsActive] = useState();

  useEffect(() => {
    props.GetFriend();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      props.GetFriend();
      setRefreshing(false);
    }, 1000);
  };
  return (
    <View style={styles.wrapper}>
    
      <FlatList 
        horizontal
        showsHorizontalScrollIndicator={false}
        data={props.appData.friendList}
        keyExtractor={item => item.id}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={({item}) => {
          return (
            <FriendListInHomeItem
              key={item.key}
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
     width:width,
    height: 90,
    marginTop:20
 
    
   
  },
});
export default FriendListInHome;
