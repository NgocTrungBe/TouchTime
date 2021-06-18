import React, {Component} from 'react';
import {useState,useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';





import Chat from './Chat';

import SearchUserContainer from '../redux/Containers/AppContainer/SearchUserContainer';

import HomeTabs from './HomeTab';
import AppHeader from '../components/AppHeader';
import Profile from './Profile';
import FriendProfile from './FriendProfile';
import ChatContainer from '../redux/Containers/AppContainer/ChatContainer';
import ChatImageCarousel from '../components/ChatImageCarousel';


const main = createStackNavigator();



const Main = ({navigation}) => {



  return (
    <main.Navigator  screenOptions={{animationEnabled:false}}>
      <main.Screen name="Home" component={HomeTabs} options={{
      headerShown:false  ,
      }}/>
     
      <main.Screen  name = "ChatContainer"  component={ChatContainer} />
      <main.Screen name ="ChatImageCarousel" component={ChatImageCarousel} options={{headerShown:false}}></main.Screen>
    
      <main.Screen
       options={{
         title:"Thêm bạn bè"
       }}
       name="SearchUserContainer" component={SearchUserContainer} options={{headerShown:false}} />

       <main.Screen name="Profile" component={Profile}></main.Screen>
       <main.Screen name="FriendProfile" component={FriendProfile} options={{headerShown:false}}></main.Screen>
    </main.Navigator>
  );
};

export default Main;
