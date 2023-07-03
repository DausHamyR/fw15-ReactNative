import React from 'react';
import Main from './src/screens/Main';

import {persistor, store} from './src/redux/store';
import {Provider} from 'react-redux/es/exports';
import {PersistGate} from 'redux-persist/es/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

export default App;
