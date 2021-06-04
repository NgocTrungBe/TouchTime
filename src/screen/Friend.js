import React, {Component, useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import FriendHeader from '../components/FriendHeader';
import FriendListContainer from '../redux/Containers/AppContainer/FriendListContainer';
import WaitingFriendListContainer from '../redux/Containers/AppContainer/WaitingFriendListContainer';
import {DrawerActions} from '@react-navigation/routers';

const friendTab = createMaterialTopTabNavigator();
const Friend = props => {
  useLayoutEffect(() => {
    if (props.route.name == 'Friends') {
      props.navigation.dispatch(DrawerActions.closeDrawer());
    }
  }, [props.route.name]);

  return (
    <>
      <FriendHeader navigation={props.navigation}></FriendHeader>
      <friendTab.Navigator
        tabBarOptions={{
          inactiveTintColor:"red",
          indicatorStyle:{borderColor:"#fff"},
          tabStyle:{borderColor:'red',backgroundColor:'#ffffff',borderWidth:1,marginRight:10,borderRadius:10},
          style: {
            position: 'absolute',
            top: 20,
            left: 10,
            right: 10,
            marginLeft: 10,
            height: 50,
            backgroundColor: '#F8F8FF',
            elevation: 5,
            borderRadius: 20,
            
            
          },
        }}>
        <friendTab.Screen
           options={{
            title: 'Bạn bè',
           }}
           
          name="FriendListContainer"
          component={FriendListContainer}></friendTab.Screen>
        <friendTab.Screen
          options={{title: 'Chờ xác nhận'}}
          name="WaitingFriendListContainer"
          component={WaitingFriendListContainer}></friendTab.Screen>
      </friendTab.Navigator>
    </>
  );
};

export default Friend;
