import React, {Component} from 'react';
import {useState} from 'react';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '../screen/Main';
import Chat from '../screen/chat';
import Home from '../screen/Home';
const appStack = createStackNavigator();

const AppStack = () => {
  return (
    <appStack.Navigator screenOptions={{
        headerShown:false
    }}>
     <appStack.Screen name="Main" component={Main}></appStack.Screen>
    <appStack.Screen name="Home" component={Home}></appStack.Screen>
  
    </appStack.Navigator>
  

    
  );
};


export default AppStack;
