import React, {Component} from 'react';
import {useState} from 'react';
import {View} from 'react-native';

import Main from '../screen/Main';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginContainer from '../redux/Containers/AuthContainer/LoginContainer';
import RegisterContainer from '../redux/Containers/AuthContainer/RegisterContainer';


const authStack = createStackNavigator();
const AuthStack = () => {

  
  return (
      <authStack.Navigator screenOptions={{
          headerShown:false
      }}>
          <authStack.Screen name="LoginContainer" component={LoginContainer}></authStack.Screen>
          <authStack.Screen name="RegisterContainer" component={RegisterContainer}></authStack.Screen>

      </authStack.Navigator>
  );
};
export default AuthStack;
