import React, {Component, useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import FriendHeader from '../components/FriendHeader';
import WaitingFriendList from '../components/WaitingFriendList';
import FriendList from '../components/FriendList';

const friendTab = createMaterialTopTabNavigator();
const Friend = ({navigation}) => {
 
  return (
      <>
       <FriendHeader navigation={navigation}></FriendHeader>
       <friendTab.Navigator>
          <friendTab.Screen options={{title:"Bạn Bè"}} name="FriendList" component={FriendList}></friendTab.Screen>
          <friendTab.Screen options={{title:"Chờ xác nhận"}} name="WaitingFriendList" component={WaitingFriendList}></friendTab.Screen>
       </friendTab.Navigator>
      </>
  );
};

export default Friend;
