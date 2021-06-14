import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import { View } from 'react-native';
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
       const unSubscribe = Fire.checkAuth(onAuthStateChanged);
        
       return () =>{
         unSubscribe;
       }
  }, []);

  if (initializing) return null;


    return ( 
      <NavigationContainer independent ={true}> 

           { user ? <AppStack/> : <AuthStack/> } 
      </NavigationContainer>
    );
};
export default Routes;