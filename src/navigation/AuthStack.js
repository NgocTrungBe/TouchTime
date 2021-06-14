import React, {Component} from 'react';
import {useState} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screen/Login';
import Register from '../screen/Register';


const authStack = createStackNavigator();
const AuthStack = () => {

  
  return (
      <authStack.Navigator screenOptions={{
          headerShown:false
      }}>
          <authStack.Screen name="Login" component={Login}></authStack.Screen>
          <authStack.Screen name="Register" component={Register}></authStack.Screen>

      </authStack.Navigator>
  );
};
export default AuthStack;
