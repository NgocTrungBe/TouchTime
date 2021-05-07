import React, {Component,useState,useEffect} from 'react';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '../screen/Main';
import Chat from '../screen/chat';
import Home from '../screen/Home';
import Fire from '../Database/Fire';
import SetAvatar from '../screen/SetAvatar';
import SetUserName from '../screen/setUserName';

const appStack = createStackNavigator();

const AppStack = () => {
   
  const [isFirstLogin,setIsFirstLogin] = useState();
  useEffect(() => {
  
      Fire.checkFirstLogin().then(response=>{
        setIsFirstLogin(response)
         
      })

    // setTimeout(() => {
    //   setIsLoader(false);
    //   if()
    // }, 700);
  },[]);
  return (
    <appStack.Navigator screenOptions={{
        headerShown:false
    }} initialRouteName={isFirstLogin ==="false" ? "SetUserName" :"Main"} >
     <appStack.Screen name="Main" component={Main}></appStack.Screen>
     <appStack.Screen name="SetAvatar" component={SetAvatar}></appStack.Screen>
     <appStack.Screen name="SetUserName" component={SetUserName}></appStack.Screen>
    <appStack.Screen name="Home" component={Home}></appStack.Screen>
  
    </appStack.Navigator>
  

    
  );
};


export default AppStack;
