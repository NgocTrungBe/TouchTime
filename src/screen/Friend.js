import React, {Component, useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet,TouchableOpacity,Animated} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import FriendHeader from '../components/FriendHeader';
import FriendListContainer from '../redux/Containers/AppContainer/FriendListContainer';
import WaitingFriendListContainer from '../redux/Containers/AppContainer/WaitingFriendListContainer';
import ChatList from '../components/ChatList';





const friendTab = createMaterialTopTabNavigator();
const Friend = props => {
 

  

    return (
    <>
      <FriendHeader {...props}></FriendHeader>
      <friendTab.Navigator
          tabBar={({ state, descriptors, navigation, position }) => {
              return (
                  <View style={styles.topTabContainer}>
                      {state.routes.map((route, index) => {
                          const { options } = descriptors[route.key];
                          const label =
                              options.tabBarLabel !== undefined
                                  ? options.tabBarLabel
                                  : options.title !== undefined
                                      ? options.title
                                      : route.name;

                          const isFocused = state.index === index;

                          const onPress = () => {
                         
                              const event = navigation.emit({
                                  type: 'tabPress',
                                  target: route.key,
                              });

                              if (!isFocused && !event.defaultPrevented) {
                                  navigation.navigate(route.name);
                              }
                          };

                          const onLongPress = () => {
                              navigation.emit({
                                  type: 'tabLongPress',
                                  target: route.key,
                              });
                          };


                          return (
                              <TouchableOpacity
                                  key={index}
                                  accessibilityRole="button"
                                  accessibilityState={isFocused ? { selected: true } : {}}
                                  accessibilityLabel={options.tabBarAccessibilityLabel}
                                  testID={options.tabBarTestID}
                                  onPress={onPress}
                                  onLongPress={onLongPress}
                                  style={{ ...styles.topTab, backgroundColor: isFocused ? '#C576F6' : 'white' }}
                              >
                                  <Animated.Text style={{ ...styles.topTabTitle, color: isFocused ? '#ffffff' : 'gray' }}>{label}</Animated.Text>
                              </TouchableOpacity>
                          );
                      })}
                  </View>)
          }}

      >
         <friendTab.Screen
           options={{
            title: 'Bạn bè',
           }}
           
          name="FriendListContainer"
          component={FriendListContainer}></friendTab.Screen>
         <friendTab.Screen
          options={{title: 'Chờ xác nhận'}}
          name="WaitingFriendListContainer"
          component={WaitingFriendListContainer}></friendTab.Screen> 
         
      </friendTab.Navigator>
      </>
  );
};

export default Friend;

const styles = StyleSheet.create({
  topTabContainer: {
      flexDirection: 'row',
      paddingVertical: 15,
      backgroundColor: '#F8F8FF',
  },
  topTab: {
      flex: 1,
      marginHorizontal: 10,
      borderRadius: 20,
      borderWidth:1,
      alignItems:'center',
      borderColor:'#ad69d4',
      alignItems: 'center',
      
  },
  topTabTitle: {
      padding : 5,
      fontSize:17
  }
})
