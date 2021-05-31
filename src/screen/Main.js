import React, {Component} from 'react';
import {useState} from 'react';
import {FlatList, View, StyleSheet, Dimensions} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';




import Chat from './Chat';
import DrawerContent from '../components/DrawerContent';
import SearchUserContainer from '../redux/Containers/AppContainer/SearchUserContainer';

import HomeTabs from './Home';

const main = createStackNavigator();



const Main = ({navigation}) => {
  return (
    <main.Navigator  screenOptions={{animationEnabled:false} }>
      <main.Screen name="Home" component={HomeTabs} options={{
        headerShown:false
      }}/>
     
      <main.Screen  name = "Chat" component={Chat}/>
      <main.Screen
       options={{
         title:"Thêm bạn bè"
       }}
       name="SearchUserContainer" component={SearchUserContainer} options={{headerShown:false}} />
    </main.Navigator>
  );
};

export default Main;
