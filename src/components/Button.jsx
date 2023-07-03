import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import globalStyles from '../screens/assets/globalStyles';

const Button = ({children, disabled, ...rest}) => {
  return (
    <TouchableOpacity
      {...rest}
      style={[globalStyles.btn, disabled && globalStyles.btnDisabled]}>
      <Text
        style={[
          globalStyles.textBtn,
          disabled && globalStyles.btnDisabledText,
        ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
