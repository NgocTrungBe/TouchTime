import React, {Component} from 'react';
import {useState} from 'react';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '../screen/Main';
import Chat from '../screen/chat';
const appStack = createStackNavigator();

const AppStack = () => {
  return (
    <appStack.Navigator screenOptions={{
        headerShown:false
    }}>
      <appStack.Screen name="Main" component={Main}></appStack.Screen>
      <appStack.Screen name="Chat" component={Chat}></appStack.Screen>
    </appStack.Navigator>
  );
};
export default AppStack;
