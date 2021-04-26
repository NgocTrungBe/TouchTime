import React, {Component} from 'react';
import {useState} from 'react';
import {View} from 'react-native';

import Main from '../screen/Main';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screen/login';
import Register from '../screen/register';
const authStack = createStackNavigator();
const AuthStack = () => {
  const [user, setUser] = useState('');
  
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
