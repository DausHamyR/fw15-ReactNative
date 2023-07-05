import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {logout} from '../redux/reducers/auth';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import MyBooking from '../screens/MyBooking';
import MyWishlist from '../screens/MyWishlist';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const dispatch = useDispatch();
  const drawerIcon = ({focused, size}, name) => {
    return (
      <Icon
        name={name}
        size={size}
        // color={focused ? Colors.active : Colors.inactive}
      />
    );
  };

  const HandleLogout = () => {
    dispatch(logout());
  };

  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{drawerIcon: options => drawerIcon(options, 'home')}}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{drawerIcon: options => drawerIcon(options, 'user')}}
      />
      <Drawer.Screen
        name="MyBooking"
        component={MyBooking}
        options={{drawerIcon: options => drawerIcon(options, 'star')}}
      />
      <Drawer.Screen
        name="MyWishlist"
        component={MyWishlist}
        options={{drawerIcon: options => drawerIcon(options, 'heart')}}
      />
      <Drawer.Screen
        name="Logout"
        component={HandleLogout}
        options={{drawerIcon: options => drawerIcon(options, 'log-out')}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
