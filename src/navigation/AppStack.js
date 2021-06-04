import React, {Component,useState,useEffect} from 'react';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '../screen/Main';
import Home from '../screen/HomeTab';
import Fire from '../Database/Fire';
import { ActivityIndicator } from 'react-native';
import UpdateUserContainer from '../redux/Containers/AuthContainer/UpdateUserContainer';
import ChatListContainer from '../redux/Containers/AppContainer/ChatListContainer';

const appStack = createStackNavigator();

const AppStack = () => {
   

  const [isLoading,setIsLoading] = useState(true);
  const [userID,setUserID] = useState();
  const [routeName,setRouteName] = useState();
  useEffect(() => {
      
      Fire.checkFirstLogin().then(response=>{
       setRouteName(response.isFirstLogin);
       setUserID(response.userID);
       setIsLoading(false);
      })
      
  },[]);
  return (
  
      isLoading == false ?
      <appStack.Navigator screenOptions={{
        headerShown:false
    }} initialRouteName= {(routeName === "false") ? "Main" : "UpdateUserContainer" }>
     <appStack.Screen name="Main" component={Main}></appStack.Screen>
     <appStack.Screen name="UpdateUserContainer" component={UpdateUserContainer}></appStack.Screen>
    <appStack.Screen name="ChatContainer" component={ChatListContainer}></appStack.Screen>
    <appStack.Screen name="Home" component={Home}></appStack.Screen>
    </appStack.Navigator> : <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#edeeeb"}}><ActivityIndicator size="small"  color="red"></ActivityIndicator></View>
  );
};


export default AppStack;
