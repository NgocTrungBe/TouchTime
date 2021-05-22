import React, {Component} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  const [isLoader, setIsLoader] = useState(true);
 
  useEffect(() => {
    getFirstRunApp().then(result =>{
         if(result === "true"){
            setTimeout(() => {
                setIsLoader(false);
                navigation.navigate('Start');
                updateFirstRunApp("false")
             }, 800);
         }
         if(result === "false"){
            setTimeout(() => {
              setIsLoader(false);
              navigation.navigate("Routes");
           }, 800);
       }
    
   }) 
  },[]);
  const setFirstRunApp = async (IS_FIRST_RUN_APP) =>{
      try{
         if(IS_FIRST_RUN_APP != ""){
            await AsyncStorage.setItem('IS_FIRST_RUN_APP',IS_FIRST_RUN_APP)
         }    
      }
      catch(err){
        return err;
      }
  }
  const updateFirstRunApp = async (IS_FIRST_RUN_APP) =>{
    try{
       if(IS_FIRST_RUN_APP != ""){
          await AsyncStorage.setItem('IS_FIRST_RUN_APP',IS_FIRST_RUN_APP)
       }
      
    }
    catch(err){
      return err;
    }
}
  const getFirstRunApp = async () =>{

    try{
      const data = await AsyncStorage.getItem('IS_FIRST_RUN_APP');
      if(data == null){
        setFirstRunApp("true");
         //await AsyncStorage.setItem('IS_FIRST_RUN_APP',"true");
         const IS_FIRST_RUN_APP = await AsyncStorage.getItem('IS_FIRST_RUN_APP');
         return IS_FIRST_RUN_APP;

      }
      else{
         return data;
      }
      
   }
   catch(err){
     return err;
   }
  }
  return (
    <View style={styles.wrapper}>
      {isLoader ? (
        <ActivityIndicator
          style={styles.indicator}
          size="large"
          color="white"></ActivityIndicator>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ad69d4',
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
