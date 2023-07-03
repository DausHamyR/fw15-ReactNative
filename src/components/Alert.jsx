import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Alert = ({variant, children}) => {
  if (variant === 'error') {
    return (
      <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>{children}</Text>
      </View>
    );
  }
  if (variant === 'success') {
    return (
      <View style={styles.successWrapper}>
        <Text style={styles.successText}>{children}</Text>
      </View>
    );
  }
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorWrapper: {
    backgroundColor: '#f58282',
    borderColor: '#f21b1b',
    borderWidth: 1,
    padding: 8,
    marginTop: 15,
    borderRadius: 10,
  },
  errorText: {
    color: '#f21b1b',
    fontWeight: 'bold',
    fontSize: 16,
  },
  successWrapper: {
    backgroundColor: '#8dfcab',
    borderColor: '#13a83a',
    borderWidth: 1,
    padding: 8,
    marginTop: 15,
    borderRadius: 10,
  },
  successText: {
    color: '#13a83a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  wrapper: {
    backgroundColor: '#bfbfbf',
    borderColor: '#545454',
    borderWidth: 1,
    padding: 8,
    marginTop: 15,
    borderRadius: 10,
  },
  text: {
    color: '#545454',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Alert;
