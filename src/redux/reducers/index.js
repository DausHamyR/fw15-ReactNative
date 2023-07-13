import {combineReducers} from '@reduxjs/toolkit';
import auth from './auth';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import deviceToken from './deviceToken';
import profile from './profile';
import sectionPrice from './sectionPrice';
import payment from './payment';

const authConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, auth),
  deviceToken: deviceToken,
  profile: profile,
  sectionPrice: sectionPrice,
  payment: payment,
});

export default reducer;
