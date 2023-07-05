import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import ResetPassword from './ResetPassword';
import StackNavigator from '../navigator/Navigator';

const Main = () => {
  const AuthStack = createNativeStackNavigator();
  const token = useSelector(state => state.auth.token);

  return (
    <>
      <NavigationContainer>
        {!token && (
          <AuthStack.Navigator
            screenOptions={{headerShadowVisible: false, headerTitle: ''}}>
            <AuthStack.Screen name="SignUp" component={SignUp} />
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
            />
            <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
          </AuthStack.Navigator>
        )}
        {token && <StackNavigator />}
      </NavigationContainer>
    </>
  );
};

export default Main;
