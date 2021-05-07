import React, {Component} from 'react';
import {useState} from 'react';
import {FlatList, View, StyleSheet, Dimensions} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';

import ChatList from '../components/ChatList';

import Friend from './Friend';
import Home from './Home';
import Chat from './chat';
import HomeTabs from './Home';
import AppHeader from '../components/AppHeader';
import SearchFriend from './SearchFriend';
import DrawerContent from '../components/DrawerContent';

const main = createStackNavigator();
const Drawer = createDrawerNavigator();
const Main = ({navigation}) => {
  return (
    <Drawer.Navigator drawerContent= {props => <DrawerContent {...props}/>} >
      <Drawer.Screen name="Home" component={HomeTabs}
            options={{
              headerShown:false
            }}
       />
      <Drawer.Screen
       options={{
         headerShown:false
       }}
       name="Chat" component={Chat} />
      <Drawer.Screen  name = "ChatList" component={ChatList}/>
      <Drawer.Screen
       options={{
         title:"Thêm bạn bè"
       }}
       name="SearchFriend" component={SearchFriend} />
    </Drawer.Navigator>
  );
};

export default Main;
