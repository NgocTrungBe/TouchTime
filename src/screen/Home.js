import React, {Component, useEffect, useState} from 'react';
import {View, FlatList, Dimensions,Alert,BackHandler} from 'react-native';
import Fire from '../Database/Fire';
import database from '@react-native-firebase/database';
import AppHeader from '../components/AppHeader';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import ChatList from '../components/ChatList';
import Chat from './chat';
import Friend from './Friend';


const chatStack = createStackNavigator();
const tab = createBottomTabNavigator();

const {width, height} = Dimensions.get('window');

const Home = ({navigation}) => {

 const onBackPress = () => {
   BackHandler.exitApp(); 
   return true;
}

  // useEffect(()=>{
  //   BackHandler.addEventListener('hardwareBackPress',onBackPress);

  //   return ()=>{
  //   BackHandler.removeEventListener('hardwareBackPress',onBackPress);
  //   }


  // },[])
  return (
    <View>
       <AppHeader></AppHeader>
       <ChatList navigation={navigation}></ChatList>
    </View>

  );
};

const HomeTabs = () =>{
    return(
      <tab.Navigator
      tabBarOptions={{
        labelStyle: {fontSize: 14, fontWeight: '800'},
        style: {backgroundColor: '#ad69d4'},
        activeTintColor: '#fff',
      }}>
      <tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({color, size}) => (
            <Feather name="message-circle" color={color} size={size}></Feather>
          ),
        }}></tab.Screen>
      <tab.Screen
        name="Friends"
        component={Friend}
        options={{
          tabBarLabel: 'Friends',
          tabBarIcon: ({color, size}) => (
            <Feather name="users" color={color} size={size}></Feather>
          ),
        }}></tab.Screen>
    </tab.Navigator>
    );
}
export default HomeTabs;
