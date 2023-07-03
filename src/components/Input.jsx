import {TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import globalStyles from '../screens/assets/globalStyles';
import Icon from 'react-native-vector-icons/Feather';

const Input = ({secureTextEntry, ...rest}) => {
  const [visible, setVisible] = React.useState(false);
  return (
    <View style={globalStyles.containerInput}>
      {!secureTextEntry && <TextInput {...rest} style={globalStyles.input} />}
      {secureTextEntry && (
        <TextInput
          {...rest}
          secureTextEntry={!visible}
          style={globalStyles.input}
        />
      )}
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          {visible && (
            <Icon name="eye-off" size={25} style={globalStyles.eye} />
          )}
          {!visible && <Icon name="eye" size={25} style={globalStyles.eye} />}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;
