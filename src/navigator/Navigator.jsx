import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import EventDetail from '../screens/EventDetail';
import Booking from '../screens/Booking';
import Payment from '../screens/Payment';
import EditProfile from '../screens/EditProfile';
import ChangePassword from '../screens/ChangePassword';
import SearchEvent from '../screens/SearchEvent';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name="EventDetail" component={EventDetail} />
      <Stack.Screen name="Booking" component={Booking} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Search" component={SearchEvent} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
