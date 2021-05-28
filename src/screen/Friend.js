import React, {Component, useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import FriendHeader from '../components/FriendHeader';
import FriendListContainer from '../redux/Containers/AppContainer/FriendListContainer';
import WaitingFriendListContainer from '../redux/Containers/AppContainer/WaitingFriendListContainer';

const friendTab = createMaterialTopTabNavigator();
const Friend = (props) => {
  return (
      <>
       <FriendHeader navigation={props.navigation}></FriendHeader>
       <friendTab.Navigator>
          <friendTab.Screen  options={{title:"Bạn Bè"}} name="FriendListContainer" component={FriendListContainer}></friendTab.Screen>
          <friendTab.Screen  options={{title:"Chờ xác nhận"}} name="WaitingFriendListContainer" component={WaitingFriendListContainer} ></friendTab.Screen>
       </friendTab.Navigator>
      </>
  );
};

export default Friend;
