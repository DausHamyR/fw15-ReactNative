import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import Home from './Home';
import EventDetail from './EventDetail';
import Login from './Login';
import SignUp from './SignUp';
import Payment from './Payment';
import Booking from './Booking';
import ManageEvent from './ManageEvent';
import MyWishlist from './MyWishlist';
import MyBooking from './MyBooking';
import ChangePassword from './ChangePassword';
import EditProfile from './EditProfile';
import Profile from './Profile';
import ForgotPassword from './ForgotPassword';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import ResetPassword from './ResetPassword';
import {logout} from '../redux/reducers/auth';
import Icon from 'react-native-vector-icons/Feather';

const Drawer = createDrawerNavigator();

const Main = () => {
  const drawerIcon = ({focused, size}, name) => {
    return (
      <Icon
        name={name}
        size={size}
        // color={focused ? Colors.active : Colors.inactive}
      />
    );
  };
  const dispatch = useDispatch();
  const AuthStack = createNativeStackNavigator();
  const Stack = createNativeStackNavigator();
  const token = useSelector(state => state.auth.token);
  const handleLogout = () => {
    dispatch(logout());
  };

  const DrawerNavigator = () => {
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
          component={handleLogout}
          options={{drawerIcon: options => drawerIcon(options, 'log-out')}}
        />
      </Drawer.Navigator>
    );
  };

  const StackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        <Stack.Screen name="EventDetail" component={EventDetail} />
        <Stack.Screen name="Booking" component={Booking} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="ManageEvent" component={ManageEvent} />
      </Stack.Navigator>
    );
  };

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
