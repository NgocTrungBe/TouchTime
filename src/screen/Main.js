import React, {Component} from 'react';
import {useState} from 'react';
import {FlatList, View, StyleSheet, Dimensions} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';

import ChatList from '../components/ChatList';

import Friend from './Friend';
import Home from './Home';
import Chat from './chat';
import HomeTabs from './Home';
import AppHeader from '../components/AppHeader';

const main = createStackNavigator();
const Main = ({navigation}) => {
  return (
    <main.Navigator>
      <main.Screen name="Home" component={HomeTabs}
            options={{
              headerShown:false
            }}
       />
      <main.Screen
       options={{
         headerShown:false
       }}
       name="Chat" component={Chat} />
      <main.Screen  name = "ChatList" component={ChatList}/>
      
    </main.Navigator>
  );
};

export default Main;
