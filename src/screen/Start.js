import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import Fire from '../Database/Fire';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Main from './Main';
const {width, height} = Dimensions.get('window');

const Start = ({navigation}) => {
  const navigateLogin = () => {
    navigation.navigate('Routes');
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#C576F6" barStyle="light-content"></StatusBar>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration= {1500}
          style={styles.logo}
          source={require('../Asset/Images/app_icon.png')}></Animatable.Image>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.title}>Giữ Kết Nối Với Mọi Người!</Text>
        <Text style={styles.suggestion}>Đăng nhập bằng tài khoản</Text>

        <TouchableOpacity onPress={navigateLogin}> 
          <LinearGradient
            style={styles.startButton}
            colors={['#C576F6', '#C576F6', '#C576F6']}>
            <Text style={styles.startButtonText}>Bắt Đầu</Text>
            <Feather
              style={{marginTop: 3, marginLeft: 3, color: '#fff', fontSize: 18}}
              name="chevron-right"></Feather>
          </LinearGradient>
        </TouchableOpacity>
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
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 60,
  },
  footer: {
    height: height / 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    elevation: 20,
  },
  logo: {
    width: 250,
    height: 250,
  },

  startButton: {
    marginLeft: width / 2.7,
    marginTop: 50,
    width: width / 2,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  title: {
    fontSize: 30,
    color: '#05375a',
    fontWeight: 'bold',
  },
  suggestion: {
    marginTop: 10,
    fontSize: 17,
    color: '#05375a',
    fontWeight: '500',
  },
});
export default Start;
