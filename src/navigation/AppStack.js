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
import { ActivityIndicator } from 'react-native';

const appStack = createStackNavigator();

const AppStack = () => {
   

  const [isLoading,setIsLoading] = useState(true);
  const [routeName,setRouteName] = useState();
  useEffect(() => {
      Fire.checkFirstLogin().then(response=>{
        console.log(response)
       setRouteName(response);
       setIsLoading(false);
      })
    
    // setTimeout(() => {
    //   setIsLoader(false);
    //   if()
    // }, 700);
  },[]);
  return (
  
      isLoading == false ?
      <appStack.Navigator screenOptions={{
        headerShown:false
    }} initialRouteName= {routeName === "false" ? "Main" : "SetUser" }>
     <appStack.Screen name="Main" component={Main}></appStack.Screen>
     <appStack.Screen name="SetUserName" component={SetUserName}></appStack.Screen>
     <appStack.Screen name="SetAvatar" component={SetAvatar}></appStack.Screen>
    <appStack.Screen name="Chat" component={Chat}></appStack.Screen>
    <appStack.Screen name="Home" component={Home}></appStack.Screen>
    </appStack.Navigator> : <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#edeeeb"}}><ActivityIndicator size="small"  color="red"></ActivityIndicator></View>
  );
};


export default AppStack;
