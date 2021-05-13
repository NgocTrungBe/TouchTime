
import React, { Component } from 'react';
import { useState } from 'react';
import { View,StyleSheet,Text, TextInput, Dimensions, TouchableOpacity } from 'react-native';

import Main from './Main';
import AppStack from '../navigation/AppStack';
const {width,height} = Dimensions.get("window");

import Fire from '../Database/Fire';

const Login = ({navigation}) => {
   
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [isLogin,setIsLogin] = useState(false);

    const login =() =>{

           if(email!= "" && password != ""){
               Fire.signIn(email,password)
               setIsLogin(true);
               if(isLogin){
                 navigation.navigate("Main");
                 setIsLogin(false);
               }
           }
           
        
    }
  
   return(
      <View> 
          <View style={styles.logo}>
              <Text style={styles.logoText}>Welcome!
              </Text>
          </View>
          <View style={styles.loginForm}>
              <TextInput onChangeText={(email)=> setEmail(email)} style={styles.input} placeholder="Tài Khoản..." ></TextInput>
              <TextInput onChangeText={(password) => setPassword(password)} style={styles.input} secureTextEntry={true} placeholder="Mật Khẩu..."></TextInput>
          </View>
          <View style={styles.buttonView}>
              <TouchableOpacity style={styles.loginButton}  onPress={()=> login()}>
                  <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity  onPress={()=> {
                  navigation.navigate("Register");
              }}>
                  <Text >Register</Text>
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
        marginTop:height/10,
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
        alignItems:"center",
        flexDirection:"column"
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