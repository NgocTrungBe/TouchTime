/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Splash from './src/components/Splash';
import Routes from './src/navigation/routes';

const MainStack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{
          headerShown:false
      }} initialRouteName={Splash}>
        <MainStack.Screen name="Splash" component={Splash}></MainStack.Screen>
        <MainStack.Screen name="Routes" component={Routes}></MainStack.Screen>
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
