import React, {Component, useEffect, useState} from 'react';
import {View, FlatList, Dimensions,Alert,BackHandler,StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import Friend from './Friend';
import Fire from '../Database/Fire';
import database from '@react-native-firebase/database';
import AppHeader from '../components/AppHeader';
import ChatListContainer from '../redux/Containers/AppContainer/ChatListContainer';



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
        <StatusBar backgroundColor="#ad69d4" barStyle="light-content"></StatusBar>
       <AppHeader></AppHeader>
       <ChatListContainer navigation={navigation} ></ChatListContainer>
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
          tabBarLabel: 'Danh Bạ',
          tabBarIcon: ({color, size}) => (
            <Feather name="users" color={color} size={size}></Feather>
          ),
        }}></tab.Screen>
    </tab.Navigator>
    );
}
export default HomeTabs;
