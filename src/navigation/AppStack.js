import React, {Component,useState,useEffect,useLayoutEffect} from 'react';
import {View} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '../screen/Main';
import Home from '../screen/HomeTab';
import Fire from '../Database/Fire';
import * as LocalDatabase from '../Database/Local';
import { ActivityIndicator } from 'react-native';
import UpdateUserContainer from '../redux/Containers/AuthContainer/UpdateUserContainer';
import ChatListContainer from '../redux/Containers/AppContainer/ChatListContainer';

const appStack = createStackNavigator();

const AppStack = () => {
  
  
  

  const [isLoading,setIsLoading] = useState(true);
  const [isFirstLogin,setIsFirstLogin] = useState();
  useEffect(() => {
  
     const unsubscribe = NetInfo.addEventListener(state =>{
        if(state.isConnected == true){
            const uid = Fire.getUid(); 
            LocalDatabase.getUid().then(localUid =>{
            if(uid === localUid){
              setIsFirstLogin("false");
              setIsLoading(false);
              
            }
            else{
              LocalDatabase.updateUid(uid);
              Fire.checkFirstLogin().then(response=>{
                setIsFirstLogin(response.isFirstLogin);
                setIsLoading(false);
              })
            }
          })
        }
        else{
          setIsFirstLogin("false");
          setIsLoading(false);
        }
     });
      return () =>{
         unsubscribe;
      }
      
  },[]);
  
  return (
  
      isLoading == false ?
      <appStack.Navigator screenOptions={{
        headerShown:false
    }} initialRouteName= {(isFirstLogin === "false") ? "Main" : "UpdateUserContainer" }>
     <appStack.Screen name="Main" component={Main}></appStack.Screen>
     <appStack.Screen name="UpdateUserContainer" component={UpdateUserContainer}></appStack.Screen>
    <appStack.Screen name="ChatContainer" component={ChatListContainer}></appStack.Screen>
    <appStack.Screen name="Home" component={Home}></appStack.Screen>
    </appStack.Navigator> : <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#edeeeb"}}><ActivityIndicator size="small"  color="red"></ActivityIndicator></View>
  );
};


export default AppStack;
