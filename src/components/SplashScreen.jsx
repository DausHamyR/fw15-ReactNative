import {View, Image} from 'react-native';
import React from 'react';

const SplashScreen = () => {
  return (
    <View>
      <Image source={require('../screens/assets/Splash Screen.png')} />
    </View>
  );
};

export default SplashScreen;
