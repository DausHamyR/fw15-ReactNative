import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Booking = () => {
  const navigation = useNavigation();
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View
        style={{
          alignItems: 'center',
          marginTop: 50,
        }}>
        <Image
          source={require('./assets/stadion.png')}
          // style={{minWidth: 100, height: 350, borderRadius: 30}}
        />
      </View>
      <View style={{marginHorizontal: 30}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 40,
          }}>
          <Text style={{color: 'black', fontSize: 25, fontWeight: '700'}}>
            Tikets
          </Text>
          <View style={{flexDirection: 'row', gap: 20}}>
            <Text style={{color: 'red'}}>By Price</Text>
            <Image
              source={require('./assets/sort.png')}
              // style={{minWidth: 100, height: 350, borderRadius: 30}}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 30,
          }}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Image
              source={require('./assets/tiket-blue.png')}
              style={{minWidth: 35, height: 35}}
            />
            <View>
              <Text style={{fontWeight: '700', fontSize: 16}}>
                Section reg, Row 1
              </Text>
              <Text>12 Seats available</Text>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontWeight: '700', fontSize: 18}}>$15</Text>
            <Text>per person</Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'space-around',
            marginTop: 15,
            flexDirection: 'row',
          }}>
          <Text style={{flex: 1, marginLeft: 50}}>Quantity</Text>
          <Image source={require('./assets/quantity.png')} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 30,
          }}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Image
              source={require('./assets/tiket-merah.png')}
              style={{minWidth: 35, height: 35}}
            />
            <View>
              <Text style={{fontWeight: '700', fontSize: 16}}>
                Section vip, Row 2
              </Text>
              <Text>9 Seats available</Text>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontWeight: '700', fontSize: 18}}>$35</Text>
            <Text>per person</Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'space-around',
            marginTop: 15,
            flexDirection: 'row',
          }}>
          <Text style={{flex: 1, marginLeft: 50}}>Quantity</Text>
          <Image source={require('./assets/quantity.png')} />
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#3366FF',
          marginTop: 40,
          height: 40,
          width: 120,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          alignSelf: 'flex-end',
          marginRight: 30,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Payment')}>
          <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Booking;
