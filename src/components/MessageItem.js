import React, {Component} from 'react';
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');

const MessageItem = ({item, userID}) => {
  const isMyMessage = () => {
    if (item.user._id === userID) {
      return true;
    } else {
      return false;
    }
  };


  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.receiverBox,
          {
            backgroundColor: isMyMessage() ? '#C576F6' : '#FFF',
            alignSelf: isMyMessage() ? 'flex-end' : 'flex-start',
          },
        ]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text
         style={[
           styles.time,
           {
             alignSelf: isMyMessage() ?'flex-end' : "flex-start",
           },
         ]}>
         {
           item.createdAt.getHours().toString() +
           ':' + (item.createdAt.getMinutes() < 10 ? "0"+
           item.createdAt.getMinutes().toString():  item.createdAt.getMinutes().toString())}
       </Text>
           
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginBottom: 15,
  },
  receiverBox: {
    position: 'relative',
    maxWidth: '80%',
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 20,
    elevation: 5,
  },

  messageText: {
    color: '#060606',
    paddingTop: 12,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 16,
    fontFamily: 'FontAwesome5_Regular',
  },
  time: {
    marginTop:8,
    marginLeft:15,
    marginRight:13,
    marginBottom:10,
    fontSize: 14,
    fontFamily: 'FontAwesome5_Regular',
    color: '#060060',
  },
});
export default MessageItem;
