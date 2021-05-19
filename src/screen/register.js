import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Fire from '../Database/Fire';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
const {width, height} = Dimensions.get('window');

const Register = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword:'',
    check_textInputChange: false,
    secureTextEntry: true,
    confirmSecureTextEntry: true,

  });

  const [isSuccess, setIsSuccess] = useState(false);

  const register = () => {
    if (email != '' && password != '') {
      Fire.signUp(email, password);
      setIsSuccess(true);
      if (isSuccess) {
        navigation.navigate('Login');
        setIsSuccess(false);
      }
    }
  };

  const handleEmailChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };
  const handlePasswordChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        password: val,
        secureTextEntry: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        secureTextEntry: false,
      });
    }
  };
  const handleConfirmPasswordChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        confirmPassword: val,
        confirmSecureTextEntry: true,
      });
    } else {
      setData({
        ...data,
        confirmPassword: val,
        confirmSecureTextEntry: false,
      });
    }
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirmSecureTextEntry: !data.confirmSecureTextEntry,
    });
  };
  const backToLogin = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#C576F6" barStyle="light-content"></StatusBar>
      <View style={styles.header}>
        <Text style={styles.logo}>Đăng ký</Text>
        <Text style={styles.logo}>Tài khoản của bạn!</Text>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.email}>Email</Text>
        <View style={styles.registerView}>
          <Feather size={20} name="users"></Feather>
          <TextInput
            onChangeText={val => handleEmailChange(val)}
            style={styles.input}
            placeholder="Tài Khoản"
            autoCapitalize="none"></TextInput>
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather size={20} name="check-circle"></Feather>
            </Animatable.View>
          ) : null}
        </View>
        <Text style={styles.password}>Mật Khẩu</Text>
        <View style={styles.registerView}>
          <Feather size={20} name="lock"></Feather>
          <TextInput
            onChangeText={val => handlePasswordChange(val)}
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.input}
            placeholder="Mật khẩu"
            autoCapitalize="none"></TextInput>
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather size={20} name="eye"></Feather>
            ) : (
              <Feather size={20} name="eye-off"></Feather>
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.confirmPassword}>Xác Nhận Mật Khẩu</Text>

        <View style={styles.registerView}>
          <Feather size={20} name="lock"></Feather>
          <TextInput
            onChangeText={val => handleConfirmPasswordChange(val)}
            secureTextEntry={data.confirmSecureTextEntry ? true : false}
            style={styles.input}
            placeholder="Nhập Lại Mật Khẩu"
            autoCapitalize="none"></TextInput>
          <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
            {data.confirmSecureTextEntry ? (
                <Feather size={20} name="eye-off"></Feather>
            ) : (
              <Feather size={20} name="eye"></Feather>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.buttonView}>
          <LinearGradient
            style={styles.signUpButton}
            colors={['#C576F6', '#C576F6', '#C576F6']}>
            <Text style={styles.signUpButtonText}>Tạo Tài Khoản</Text>
          </LinearGradient>
          <View style={styles.backAction}>
            <Feather  color='#ea2a2a' size={18} name="chevrons-left"></Feather>
            <TouchableOpacity onPress={backToLogin}>
              <Text style={styles.backButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
         
         
        </View>
      </Animatable.View>
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
    flex: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  logo: {
    color: '#fff',
    fontSize: 28,
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
  confirmPassword: {
    marginTop: 20,
    fontSize: 18,
    color: '#05375a',
    fontWeight: '900',
  },
  registerView: {
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
  signUpButton: {
    width: width / 1.11,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  backAction:{
    marginTop:25,
    flexDirection:"row",
    alignItems:"center"
  },

  backButtonText: {
    marginLeft:5,
    color: '#ea2a2a',
    fontSize: 18,
    fontWeight: '700',
  },


 
});
export default Register;
