import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import reducer from './reducers';
import {persistStore} from 'redux-persist';

const middleware = [thunk];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middleware.push(createDebugger());
}

export const store = configureStore({
  reducer,
  middleware,
});

export const persistor = persistStore(store);
