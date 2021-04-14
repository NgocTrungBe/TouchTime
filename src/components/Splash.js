import React, { Component } from 'react'; 
import { View,StyleSheet } from 'react-native';


const Splash = () =>{
  return(

    <View style={styles.wrapper}></View>

  );
} 

const styles = StyleSheet.create({
   wrapper:{
       flex:1,
       backgroundColor:"pink"
   }
});

export default Splash