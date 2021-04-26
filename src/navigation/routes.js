import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import Login from '../screen/login';
import Main from '../screen/Main';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

import Fire from '../Database/Fire';

const Routes = () => {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    
    function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    }

    useEffect(() => {
       Fire.checkAuth(onAuthStateChanged);
  }, []);

  if (initializing) return null;


    return ( 
      <NavigationContainer independent ={true}> 

           { user ? <AppStack/> : <AuthStack/> } 
      </NavigationContainer>
    );
};
export default Routes;