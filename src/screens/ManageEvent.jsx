import {View, Text} from 'react-native';
import React from 'react';

const ManageEvent = () => {
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View
        style={{
          marginHorizontal: 30,
          marginVertical: 30,
          backgroundColor: '#EAF1FF',
          width: 100,
          height: 50,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#3366FF', fontWeight: '500'}}>Create</Text>
      </View>
    </View>
  );
};

export default ManageEvent;
