import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Alert,
  Modal
} from 'react-native';
import Fire from '../Database/Fire';
import * as LocalDatabase from '../Database/Local';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {checkInvalidEmail} from '../Asset/Contants';
import {checkInvalidPassword} from '../Asset/Contants';

import Main from './Main';
import { set } from 'react-native-reanimated';
import { ActivityIndicator } from 'react-native';
const {width, height} = Dimensions.get('window');

const Login = (props) => {

  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    invalidEmail: false,
    invalidPassword: false,
    isLogin:false,


  });
  const [error,setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 1200);
  };
  const handleLogin = () => {
    if (data.email != '' && data.password != '') {
      setData({...data,isLogin:true})
      Fire.signIn(data.email.toLowerCase(),data.password).then(result =>{
           if(result !=null){
            setData({...data,isLogin:false})
            if(result.code === "auth/user-not-found"){
              setError("Tài khoản không tồn tại!");
              showModal();
            } 
             if(result.code === "auth/wrong-password"){
              setError("Mật khẩu không đúng");
              showModal();
            }
            if(result.code === "auth/too-many-requests"){
              setError("Tài khoản đã bị khóa do nhập sai nhiều lần!");
              showModal();
            }
            if(result.user != undefined){
              LocalDatabase.getUid().then(uid =>{
                if(uid == undefined){
                  LocalDatabase.saveUid(result.user.uid);
                 }else{
                  LocalDatabase.updateUid(result.user.uid);
                 }
            });
              

              
            }
           }

      })
    }
  };
  

  const handleEmailChange = val => {
    const isChecked = checkInvalidEmail(val);
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        invalidEmail:isChecked
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        invalidEmail: false,
      });
    }
  };
  const handlePasswordChange = val => {
    const isChecked = checkInvalidPassword(val);
    if (val.length !== 0) {
      setData({
        ...data,
        password: val,
        secureTextEntry: true,
        invalidPassword: isChecked,
      });

    } else {
      setData({
        ...data,
        password: val,
        secureTextEntry: false,
        invalidPassword: false,
      });
    }
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const navigateRegister = () => {
    props.navigation.navigate('Register');
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#C576F6" barStyle="light-content"></StatusBar>
      <Animatable.View animation="fadeInDownBig" style={styles.header}>
        <Text style={styles.logo}>Welcome!</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.email}>Email</Text>
        <View style={styles.loginView}>
          <Feather size={20} name="users"></Feather>
          <TextInput
            onChangeText={val => handleEmailChange(val)}
            onEndEditing ={(e) => checkInvalidEmail(e.nativeEvent.text)}
            style={styles.input}
            placeholder="Tài Khoản"
            autoCapitalize="none"></TextInput>
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather size={20} name="check-circle"></Feather>
            </Animatable.View>
          ) : null}
        </View>
        {data.invalidEmail? (
          <Animatable.View animation="fadeInLeft" duration={200}>
            <Text style={styles.errMessage}>Email không hợp lệ!</Text>
          </Animatable.View>
        ) : null}
        <Text style={styles.password}>Mật Khẩu</Text>
        <View style={styles.loginView}>
          <Feather size={20} name="lock"></Feather>
          <TextInput
            onChangeText={val => handlePasswordChange(val)}
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.input}
            autoCapitalize="none"></TextInput>
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather size={20} name="eye-off"></Feather>
            ) : (
              <Feather size={20} name="eye"></Feather>
            )}
          </TouchableOpacity>
        </View>
        {data.invalidPassword ? (
          <Animatable.View animation="fadeInLeft" duration={200}>
            <Text style={styles.errMessage}>Mật khẩu không hợp lệ! (vd: Abc12345678)</Text>
          </Animatable.View>
        ) : null}
        
          {
             data.isLogin ?  <ActivityIndicator size={23} style={{padding:10}} color="green"></ActivityIndicator>: null
          }

        <View style={styles.buttonView}>
       
          <TouchableOpacity disabled={(data.invalidEmail == false || data.invalidPassword) == false ? true : false }   onPress={handleLogin}>
            <LinearGradient
              style={styles.signInButton}
              colors={['#C576F6', '#C576F6', '#C576F6']}>
              <Text style={styles.signInButtonText}>Đăng Nhập</Text>
            </LinearGradient>
          </TouchableOpacity>
        
         
          <View style={styles.signUpAction}>
            <Text style={styles.signUpTitle}>Bạn chưa có tài khoản?</Text>
            <TouchableOpacity onPress={navigateRegister}>
              <Text style={styles.signUpButtonText}>Đăng Ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      
      </Animatable.View>
      <Modal
        animationType="fadeInUpBig"
        transparent
        visible={modalVisible}>
        <View style={styles.modal} >
        <Text style={styles.modalTitle}>
            Ooops!
          </Text>
          <Text style={styles.modalMessage}>
            {error}
          </Text>
        </View>
      </Modal>
   
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
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  footer: {
    height: height / 1.5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    elevation: 20,
  },
  logo: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 18,
    color: '#05375a',
    fontWeight: '900',
  },
  password: {
    marginTop: 20,
    fontSize: 18,
    color: '#05375a',
    fontWeight: '900',
  },

  loginView: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginLeft: 15,
    width: width / 1.3,
    color: '#05375a',
    fontSize: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ad69d4',
    //borderColor: 'blue',
    // /borderRadius: 5,
  },
  buttonView: {
    marginTop: 50,
    alignItems: 'center',
    flexDirection: 'column',
  },
  signInButton: {
    width: width / 1.11,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  signUpButtonText: {
    color: '#C576F6',
    fontSize: 18,
    fontWeight: '700',
  },
  signUpAction: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpTitle: {
    marginRight: 7,
    color: 'grey',
    fontSize: 18,
    fontWeight: '500',
  },
  errMessage: {
    marginTop: 5,
    color: 'red',
  },
  modal:{
    marginTop:height/3,
    marginLeft:width/8,
    width:width/1.3,
    height:200,
    alignItems:"center",
    borderRadius:10,
    backgroundColor:"#ffffff",
    elevation:10
    
  },
  modalTitle:{
    marginTop:20,
     color:"#ad69d4",
     fontSize:28,
     fontWeight:"bold"
  },
  modalMessage:{
    marginTop:50,
    fontSize:16,
    color:"#ad69d4",
  }

});
export default Login;
