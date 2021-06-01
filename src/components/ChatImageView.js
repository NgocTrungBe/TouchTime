import React, {Component} from 'react';
import {Text} from 'react-native';
import {View, Image, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const ChatImageView = ({imageUri, text}) => {
  return (
    <View
      style={{
        marginBottom:10,
        width: 130,
        height: 150,
        borderColor: '#060606',
        borderWidth:0.2,
        borderRadius: 20,
     
      }}>
      <Image
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'stretch',
        }}
        source={{uri: imageUri}}></Image>
    </View>
  );
};
export default ChatImageView;
