import React, {Component} from 'react';
import {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Main from './Main';
import AppStack from '../navigation/AppStack';
const {width, height} = Dimensions.get('window');

import Fire from '../Database/Fire';

const Login = ({navigation}) => {
  const [data, setData] = useState({
      email:"",
      password:"",
      check_textInputChange:false,
      secureTextEntry:true
  });
  const [password, setPassword] = useState();
  const [isLogin, setIsLogin] = useState(false);

  const login = () => {
    if (email != '' && password != '') {
      Fire.signIn(email, password);
      setIsLogin(true);
      if (isLogin) {
        navigation.navigate('Main');
        setIsLogin(false);
      }
    }
  };
  
  const handleEmailChange = (val) =>{
      if(val.length !== 0){
         setData({
             ...data,
             email:val,
             check_textInputChange:true
         })
      }
      else{
        setData({
            ...data,
            email:val,
            check_textInputChange:false
        })
      }
  }
  const handlePasswordChange = (val) =>{
    if(val.length !== 0){
       setData({
           ...data,
           password:val,
           secureTextEntry:true
       })
    }
    else{
      setData({
          ...data,
          email:val,
          secureTextEntry:false
      })
    }
  }
  const updateSecureTextEntry = () =>{
       setData({
           ...data,
           secureTextEntry: !data.secureTextEntry
       })

  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.logo}>Welcome!</Text>
      </View>
     
      <View style={styles.footer}>
            <Text style={styles.email}>Email</Text>
            <View style={styles.loginView}>
              <Feather size={20} name="users"></Feather>
              <TextInput onChangeText={(val)=> handleEmailChange(val) } style={styles.input} placeholder="Tài Khoản" autoCapitalize="none"></TextInput>
              { data.check_textInputChange ?<Feather size={20} name="check-circle"></Feather> : null}
          </View>
          <Text style={styles.password}>Password</Text>
          <View style={styles.loginView}>
              <Feather size={20} name="lock"></Feather>
              <TextInput onChangeText={(val)=> handlePasswordChange(val)} secureTextEntry={data.secureTextEntry ? true : false} style={styles.input} placeholder="Mật khẩu" autoCapitalize="none"></TextInput>
              <TouchableOpacity onPress={updateSecureTextEntry}>
              {
                  data.secureTextEntry ?  <Feather size={20}  name="eye"></Feather> : <Feather size={20}  name="eye-off"></Feather>
              }
               

              </TouchableOpacity> 
          </View>
      </View>
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C576F6',
  },
  header: {
    flex: 2,
    justifyContent:"flex-end",
    paddingHorizontal:30,
    paddingBottom:30,
  },
  footer:{
    flex:5,
    backgroundColor:"#fff",
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    paddingHorizontal:20,
    paddingVertical:30,

  },
  logo: {
    color:"#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  email:{
    fontSize:18,
    color:"#05375a",
    fontWeight:"900"
  },
  password:{
    marginTop:20,
    fontSize:18,
    color:"#05375a",
    fontWeight:"900"
  },
  loginView: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginLeft: 15,
    width:width/1.3,
    color:"#05375a",
    fontSize:18,
    borderBottomWidth:0.5,
    borderBottomColor:"#ad69d4"
    //borderColor: 'blue',
    // /borderRadius: 5,
  },
  buttonView: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  loginButton: {
    width: width - 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ad69d4',
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
export default Login;
