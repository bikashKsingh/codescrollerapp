import React, {useContext, useReducer, useEffect} from 'react';
import 'react-native-gesture-handler';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigations/StackNavigation';
import WorkthroughScreen from './src/screens/WorkthroughScreen';

import {renderType, toastConfig} from './src/helpers/ToastHelper';
import Toast from 'react-native-toast-message';
import {UserContext} from './context/UserContext';
import {initialState, userReducer} from './reducer/userReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastProvider} from 'react-native-toast-notifications';
import MyText from './src/components/MyText';
import {color, font} from './src/helpers/Constants';
function App() {
  const {state, dispatch} = useContext(UserContext);
  useEffect(() => {
    const getdataFromAsyncStorage = async () => {
      try {
        const userInfoStr = await AsyncStorage.getItem('userInfo');

        const userInfo = JSON.parse(userInfoStr);

        // if (userInfo?.jwtToken) dispatch({type: 'USER', payload: userInfo});
        if (userInfo) dispatch({type: 'UPDATE_STATE', payload: userInfo});
      } catch (error) {
        alert(error.message);
      }
    };

    getdataFromAsyncStorage();
  }, []);
  return (
    // <NavigationContainer>
    // {/* <WorkthroughScreen /> */}
    <StackNavigation />
    // {/* <LoginScreen /> */}
    // {/* <SignupScreen /> */}
    // <Toast config={toastConfig} />
    // </NavigationContainer>
  );
}

export default () => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{state, dispatch}}>
      <NavigationContainer>
        <ToastProvider
          textStyle={{fontSize: 20, fontFamily: font.regular}}
          placement={'top'}
          animationType="slide-in"
          swipeEnabled={true}
          offsetTop={40}
          renderType={renderType}>
          <App />
        </ToastProvider>
        <Toast config={toastConfig} onPress={() => {}} />
      </NavigationContainer>
    </UserContext.Provider>
  );
};
