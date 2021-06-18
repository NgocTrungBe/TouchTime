import React, {Component} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fire from '../Database/Fire';

const Splash = ({navigation}) => {
  const [isLoader, setIsLoader] = useState(true);
 
  useEffect(() => {
    //Fire.signOut();
    getFirstRunApp().then(result =>{
         if(result === "true"){
            setTimeout(() => {
                navigation.navigate('Start');
                updateFirstRunApp("false")
             }, 800);
         }
         if(result === "false"){
            setTimeout(() => {
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
        <View style={styles.logoView}>
            <Text style={styles.logo}>t</Text>
          
        </View>
        <Text style={styles.title}>Touch time</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoView: {
    position:"relative",
    backgroundColor:"#ad69d4",
    width:60,
    height:60,
    borderRadius:30,
    alignItems:"center"
   
  },
  logo:{
     position:"absolute",
     top:-10,
     color:"#ffffff",
     fontSize:58,
     fontFamily:"Octicons",
     fontWeight:"bold"
  },
  title:{
    marginTop:20,
    fontFamily:"Octicons",
    fontSize:18,
    fontWeight:"bold",
    color:"#C576F6"
  }
});

export default Splash;
