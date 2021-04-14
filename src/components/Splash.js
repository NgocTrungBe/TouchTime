import React, {Component} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';

const Splash = ({navigation}) => {
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoader(false);
      navigation.navigate('Routes');
    }, 800);
  });
  return (
    <View style={styles.wrapper}>
      {isLoader ? (
        <ActivityIndicator
          style={styles.indicator}
          size="large"
          color="white"></ActivityIndicator>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ad69d4',
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
