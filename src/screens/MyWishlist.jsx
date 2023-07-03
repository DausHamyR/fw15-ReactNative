import {View, Text, Image} from 'react-native';
import React from 'react';

const MyWishlist = () => {
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View style={{marginVertical: 30, marginHorizontal: 30}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            gap: 50,
            marginBottom: 50,
          }}>
          <View style={{alignItems: 'center', gap: 40}}>
            <View style={{alignItems: 'center', gap: 3}}>
              <Text style={{color: '#FF8900', fontWeight: '700', fontSize: 15}}>
                15
              </Text>
              <Text style={{color: '#C1C5D0', fontWeight: '700', fontSize: 15}}>
                Wed
              </Text>
            </View>
            <View>
              <Image source={require('./assets/heart.png')} />
            </View>
          </View>
          <View style={{gap: 10}}>
            <Text style={{fontWeight: '800', fontSize: 27, lineHeight: 35}}>
              Sights & Sounds Exhibition
            </Text>
            <Text>Jakarta, Indonesia</Text>
            <Text>Wed, 15 Nov, 4:00 PM</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            gap: 50,
            marginBottom: 50,
          }}>
          <View style={{alignItems: 'center', gap: 40}}>
            <View style={{alignItems: 'center', gap: 3}}>
              <Text style={{color: '#FF8900', fontWeight: '700', fontSize: 15}}>
                15
              </Text>
              <Text style={{color: '#C1C5D0', fontWeight: '700', fontSize: 15}}>
                Wed
              </Text>
            </View>
            <View>
              <Image source={require('./assets/heart.png')} />
            </View>
          </View>
          <View style={{gap: 10}}>
            <Text style={{fontWeight: '800', fontSize: 27, lineHeight: 35}}>
              Sights & Sounds Exhibition
            </Text>
            <Text>Jakarta, Indonesia</Text>
            <Text>Wed, 15 Nov, 4:00 PM</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyWishlist;
