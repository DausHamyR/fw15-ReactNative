import {View, Text, Image} from 'react-native';
import React from 'react';

const MyBooking = () => {
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View style={{marginVertical: 30, marginHorizontal: 30}}>
        <View style={{marginBottom: 50}}>
          <Image source={require('./assets/Group5895.png')} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            gap: 50,
            marginBottom: 50,
          }}>
          <View style={{alignItems: 'center', gap: 3}}>
            <Text style={{color: '#FF8900', fontWeight: '700', fontSize: 15}}>
              15
            </Text>
            <Text style={{color: '#C1C5D0', fontWeight: '700', fontSize: 15}}>
              Wed
            </Text>
          </View>
          <View style={{gap: 10}}>
            <Text style={{fontWeight: '800', fontSize: 27, lineHeight: 35}}>
              Sights & Sounds Exhibition
            </Text>
            <Text>Jakarta, Indonesia</Text>
            <Text>Wed, 15 Nov, 4:00 PM</Text>
            <Text style={{color: 'blue', fontWeight: '600'}}>Detail</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            gap: 50,
            marginBottom: 50,
          }}>
          <View style={{alignItems: 'center', gap: 3}}>
            <Text style={{color: '#FF8900', fontWeight: '700', fontSize: 15}}>
              15
            </Text>
            <Text style={{color: '#C1C5D0', fontWeight: '700', fontSize: 15}}>
              Wed
            </Text>
          </View>
          <View style={{gap: 10}}>
            <Text style={{fontWeight: '800', fontSize: 27, lineHeight: 35}}>
              Sights & Sounds Exhibition
            </Text>
            <Text>Jakarta, Indonesia</Text>
            <Text>Wed, 15 Nov, 4:00 PM</Text>
            <Text style={{color: 'blue', fontWeight: '600'}}>Detail</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyBooking;
