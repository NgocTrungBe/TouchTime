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
import {checkInvalidEmail} from '../Asset/Contants';
import {checkInvalidPassword} from '../Asset/Contants';
import Main from './Main';
const {width, height} = Dimensions.get('window');

const Login = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    invalidEmail: false,
    invalidPassword: false,

  });
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
    navigation.navigate('Register');
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#C576F6" barStyle="light-content"></StatusBar>
      <View style={styles.header}>
        <Text style={styles.logo}>Welcome!</Text>
      </View>

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

        <View style={styles.buttonView}>
          <TouchableOpacity onPress={() => checkInvalidEmail(data.email)}>
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
});
export default Login;
