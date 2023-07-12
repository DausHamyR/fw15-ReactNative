import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {RadioButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import http from '../helpers/http';
import {dataPayment} from '../redux/reducers/payment';
import {useNavigation} from '@react-navigation/native';

const Payment = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState('1');
  const getReservation = useSelector(state => state.sectionPrice.data);
  const token = useSelector(state => state.auth.token);
  const navigation = useNavigation();

  React.useEffect(() => {
    getReservation;
  }, [getReservation]);

  const postPayment = async () => {
    const form = new URLSearchParams({
      reservationId: getReservation.reservationId,
      paymentMethodId: checked,
    }).toString();
    const {data} = await http(token).post('/payment', form);
    if (data) {
      dispatch(dataPayment(data.results));
      navigation.navigate('MyBooking');
    }
  };

  return (
    <View>
      <View style={{marginHorizontal: 20, marginTop: 30}}>
        <Text style={{fontSize: 18, fontWeight: '800', marginBottom: 30}}>
          Payment Method
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <RadioButton
              value="1"
              status={checked === '1' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('1')}
            />
            <Image
              source={require('./assets/Group810.png')}
              // style={{width: '100%', height: '50%'}}
            />
            <Text style={{fontWeight: '700', fontSize: 17, marginLeft: 6}}>
              Card
            </Text>
          </View>
          <Image source={require('./assets/chevron-down.png')} />
        </View>
        <Image
          source={require('./assets/Group821.png')}
          style={{alignSelf: 'center', marginVertical: 40}}
        />
        <View style={{gap: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <RadioButton
                value="2"
                status={checked === '2' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('2')}
              />
              <Image source={require('./assets/Group811.png')} />
              <Text style={{fontWeight: '700', fontSize: 17, marginLeft: 6}}>
                Bank Transfer
              </Text>
            </View>
            <Image source={require('./assets/chevron-down.png')} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <RadioButton
                value="3"
                status={checked === '3' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('3')}
              />
              <Image source={require('./assets/Group826.png')} />
              <Text style={{fontWeight: '700', fontSize: 17, marginLeft: 6}}>
                Retail
              </Text>
            </View>
            <Image source={require('./assets/chevron-down.png')} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <RadioButton
                value="4"
                status={checked === '4' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('4')}
              />
              <Image source={require('./assets/Group830.png')} />
              <Text style={{fontWeight: '700', fontSize: 17, marginLeft: 6}}>
                E-Money
              </Text>
            </View>
            <Image source={require('./assets/chevron-down.png')} />
          </View>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 80,
          }}>
          <View>
            <Text style={{fontWeight: '800', fontSize: 17}}>Total Payment</Text>
            <Text style={{fontSize: 17, color: '#3366FF', fontWeight: '800'}}>
              {getReservation.totalPayment}
            </Text>
          </View>
          <View
            style={{
              width: 150,
              height: 50,
              backgroundColor: '#3366FF',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <TouchableOpacity onPress={() => postPayment()}>
              <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>
                Payment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Payment;
