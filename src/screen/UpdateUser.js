import React, {Component, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {View, StyleSheet, Dimensions, Image, TextInput} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Fire from '../Database/Fire';

const {width, height} = Dimensions.get('window');
const UpdateUserScreen = ({ navigation,UpdateUser}) => {
  const [imageUri, setImageUri] = useState();
  const [userName,setUserName] = useState();
  const [base64Code, setBase64Code] = useState();
  const [isDisable, setIsDisable] = useState(true);
  const [buttonColor, setButtonColor] = useState('grey');

  const chooseImageHandle = () => {
    launchImageLibrary(
      {
        maxWidth: width - 130,
        height: 120,
        mediaType: 'photo',
        includeBase64: true,
      },
      response => {
        if (response.didCancel != true) {
          setImageUri(response.uri);
          setBase64Code(response.base64);
       
          if((imageUri,userName,base64Code)!= ''){
            setButtonColor('#edeeeb');
            setIsDisable(false);
          }
        }
      },
    );
  };
  const handleUpdateUser = () => {
    if (userName != '' && base64Code != '') {
      UpdateUser(userName, base64Code);
      setTimeout(() => {
        navigation.navigate('Main');
      }, 3000);
    }
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <Text style={styles.suggestionsAddName}>
          Hãy nhập vào tên người dùng
        </Text>
        <TextInput
          placeholder="..."
          onChangeText={userName => setUserName(userName)}
          style={styles.userNameInput}></TextInput>
        <Text style={styles.contentTitle}>Ảnh đại diện của bạn</Text>
        <Text style={styles.suggestions}>
          Hãy chọn hình ảnh để làm ảnh đại diện
        </Text>
        <View style={styles.imagePickerView}>
          <Image source={{uri: imageUri}} style={styles.image}></Image>
          <Feather
            onPress={chooseImageHandle}
            name="plus"
            style={styles.addImageBtn}></Feather>
        </View>
      </View>
      <Animatable.View animation="fadeInUp">
      <TouchableOpacity
        disabled={isDisable}
        style={[styles.nextButton, {backgroundColor: buttonColor}]}
        onPress={handleUpdateUser}>
        <Text style={styles.buttonTitle}>Tiếp tục</Text>
      </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#C576F6',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    marginTop: height/7,
    width: width/1.3,
    elevation: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  appLogo: {
    marginTop: height - 710,
    fontSize: 15,
    fontWeight: 'bold',

    color: '#fff',
  },
  suggestionsAddName: {
    marginTop:30,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666666',
  },
  userNameInput: {
    marginTop: 10,
    fontSize: 18,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ad69d4',
    color: 'red',
  },

  contentTitle: {
    marginTop:30,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666666',
  },
  suggestions: {
    marginTop: 10,
    fontSize: 15,
    color: '#666666',
    fontWeight: '900',
  },
  nextButton: {
    marginTop: height/13,
    width: width/1.3,
    elevation: 20,
    padding: 15,
    borderRadius: 8,
    //backgroundColor:"#edeeeb",
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  imagePickerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: width - 130,
    height: 120,
    backgroundColor: '#edeeeb',
  },
  image: {
    width: '60%',
    height: 120,
    backgroundColor: 'pink',
  },
  addImageBtn: {
    marginLeft: 40,
    fontSize: 30,
    color: 'blue',
  },
});
export default UpdateUserScreen;
