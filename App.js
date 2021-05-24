/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React  from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './src/redux/Reducers/index';
import Splash from './src/components/Splash';
import Routes from './src/navigation/routes';
import Start from './src/screen/Start';

const MainStack = createStackNavigator();
const store = createStore(rootReducer);
const App = () => {
  
  return (
     <Provider store={store}>
        <NavigationContainer>
      <MainStack.Navigator screenOptions={{
          headerShown:false
      }} initialRouteName={Splash}>
        <MainStack.Screen name="Splash" component={Splash}></MainStack.Screen>
        <MainStack.Screen name="Start" component={Start} ></MainStack.Screen>
        <MainStack.Screen name="Routes" component={Routes}></MainStack.Screen>
      </MainStack.Navigator>
    </NavigationContainer>
     </Provider>
  );
};

export default App;
