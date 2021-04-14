import React, {Component} from 'react';
import {useState} from 'react';
import {View} from 'react-native';
import Login from '../screen/login';
import Main from '../screen/Main';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes = () => {
  const [user, setUser] = useState();
  
  return (
      <NavigationContainer independent={true}>
          {user ? <AppStack /> : <AuthStack/>}
      </NavigationContainer>
  );
};
export default Routes;
