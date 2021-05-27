import React, {Component, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Modal
} from 'react-native';
import Fire from '../Database/Fire';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {checkInvalidEmail} from '../Asset/Contants';
import {checkInvalidPassword} from '../Asset/Contants';
import LinearGradient from 'react-native-linear-gradient';
const {width, height} = Dimensions.get('window');

const Register = ({navigation,SignUp,signUpData}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword:'',
    check_textInputChange: false,
    secureTextEntry: true,
    confirmSecureTextEntry: true,
    invalidEmail: false,
    invalidPassword: false,
    isCorrectConfirmPassword:false

  });

  const [modalVisible, setModalVisible] = useState(false);
  const [signUpTitle,setSignUpTitle] = useState('');
  const [signUpMessage,setSignUpMessage] = useState('');
  const showModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 1200);
  };
  const handleRegister = () => {
    if (data.email != '' && data.password != '') {
      SignUp(data.email, data.password);
      if(signUpData != undefined){
        if(signUpData.isSignUpSuccess ==true ){
          setSignUpTitle("Ooops!");
          setSignUpTitle("Đăng ký thành công");
          showModal();
        }
        else{
          setSignUpTitle("Ooops!");
          if(signUpData.error.code == "auth/email-already-in-use"){
            setSignUpMessage("Email này đã được sử dụng!")
            
          }
          if(signUpData.error.code == "auth/invalid-email"){
            setSignUpMessage("Email này không đúng")
          }
        
          showModal();
        }
         
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
  }
  const handleConfirmPasswordChange = val => {
    if (val.length !== 0) {
      if(val == data.password){
        setData({
          ...data,
          confirmPassword: val,
          confirmSecureTextEntry: true,
          isCorrectConfirmPassword:false
        });
      }
      else{
        setData({
          ...data,
          confirmPassword: val,
          confirmSecureTextEntry: true,
          isCorrectConfirmPassword:true
        });
      }
    } else {
      setData({
        ...data,
        confirmPassword: val,
        confirmSecureTextEntry: false,

        isCorrectConfirmPassword:true
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
      <Animatable.View animation="fadeInDownBig" style={styles.header}>
        <Text style={styles.logo}>Đăng ký</Text>
        <Text style={styles.logo}>Tài khoản của bạn!</Text>
      </Animatable.View>

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
        {data.invalidEmail ? (
          <Animatable.View animation="fadeInLeft" duration={200}>
            <Text style={styles.errMessage}>Email không hợp lệ!</Text>
          </Animatable.View>
        ) : null}

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
                <Feather size={20} name="eye-off"></Feather>
            ) : (
              <Feather size={20} name="eye"></Feather>
            )}
          </TouchableOpacity>
        </View>
        {data.invalidPassword ? (
          <Animatable.View animation="fadeInLeft" duration={200}>
            <Text style={styles.errMessage}>Mật khẩu không hợp lệ!</Text>
          </Animatable.View>
        ) : null}
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
        {data.isCorrectConfirmPassword ? (
          <Animatable.View animation="fadeInLeft" duration={200}>
            <Text style={styles.errMessage}>Mật khẩu không hợp lệ!</Text>
          </Animatable.View>
        ) : null}

        <View style={styles.buttonView}>
          <TouchableOpacity onPress={handleRegister}>
          <LinearGradient
            style={styles.signUpButton}
            colors={['#C576F6', '#C576F6', '#C576F6']}>
            <Text style={styles.signUpButtonText}>Tạo Tài Khoản</Text>
          </LinearGradient>
          </TouchableOpacity>
          <View style={styles.backAction}>
            <Feather  color='#ea2a2a' size={18} name="chevrons-left"></Feather>
            <TouchableOpacity onPress={backToLogin}>
              <Text style={styles.backButtonText}>Hủy</Text>
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
            {signUpTitle}
          </Text>
          <Text style={styles.modalMessage}>
            {signUpMessage}
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
    height:height/1.4,
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
export default Register;
