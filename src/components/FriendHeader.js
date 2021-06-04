import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Fire from '../Database/Fire';
const {width, height} = Dimensions.get('window');

const FriendHeader = ({navigation}) => {
  return (


    <View>
      <View style={styles.Header}>
        <View style={styles.leftHeader}>
          <Feather
           
            style={styles.drawerButton}
            name="list"
            size={25}></Feather>
          <Text style={styles.appLogo}>TouchTime</Text>
        </View>
        <Feather
          style={styles.searchButton}
          name="user-plus"
          size={23}
          onPress={() => {
                navigation.navigate("SearchUserContainer") 
          }}></Feather>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection:'column',
    alignItems:"center"
    
  },
  Header: {
    width: width,
    height: height / 10,

    // width: width/1.1,
    // height: height / 8,
 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth:0.5,
    // borderStyle:"solid",
    borderColor:'#ad69d4',
    backgroundColor: '#F8F8FF',
   
    // borderBottomLeftRadius:20,
    // borderBottomRightRadius:20,
     
  },
  leftHeader: {
    marginLeft: 25,
    width: 160,
    height: height / 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appLogo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ad69d4',
  },
  drawerButton: {
    color: '#ad69d4',
  },
  searchButton: {
    marginRight: 20,
    color: '#ad69d4',
  },
});
export default FriendHeader;
