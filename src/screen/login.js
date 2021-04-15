import { useNavigation } from '@react-navigation/core';
import React, { Component } from 'react';
import { useState } from 'react';
import { View,StyleSheet,Text, TextInput, Dimensions, TouchableOpacity } from 'react-native';

import Main from './Main';
import AppStack from '../navigation/AppStack';
const {width,height} = Dimensions.get("window");


const Login = ({navigation}) => {
 
    
    const login =() =>{
           navigation.navigate("Main");
    }
  
   return(
      <View> 
          <View style={styles.logo}>
              <Text style={styles.logoText}>Welcome!
              </Text>
          </View>
          <View style={styles.loginForm}>
              <TextInput style={styles.input} placeholder="Tài Khoản..."></TextInput>
              <TextInput style={styles.input} secureTextEntry={true} placeholder="Mật Khẩu..."></TextInput>
          </View>
          <View style={styles.buttonView}>
              <TouchableOpacity style={styles.loginButton}  onPress={()=> login()}>
                  <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
          </View>
      </View>
   );
    
}
const styles = StyleSheet.create({
    wrapper:{
         flex:1,
         backgroundColor:"#ffffff"
    },
    logo:{
        marginTop:height-700,
        height:height/7,
        alignItems:"center"
    },
    logoText:{
        fontSize:28,
        fontWeight:"600",
    },
    loginForm:{
        padding:20,
        width: width,
        height:height/3,
        flexDirection:"column",
        alignItems:"center"
        
      
    }
     , 
    input:{
        margin:10,
        padding:10,
        width:width-20,
        borderWidth:0.8,
        borderColor:"blue",
        borderRadius:5
    },
    buttonView:{
        alignItems:"center"
    },
    loginButton:{
        width:width-20,
        height:50,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#ad69d4",
        borderRadius:5
    },
    loginButtonText:{
        color:"#fff",
        fontSize:18,
        fontWeight:"700"
    }
    

});
export default Login;