import {View, Text, Image} from 'react-native';
import React from 'react';
import {RadioButton} from 'react-native-paper';

const Payment = () => {
  const [checked, setChecked] = React.useState('first');

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
              value="first"
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('first')}
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
                value="bank-transfer"
                status={checked === 'bank-transfer' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('bank-transfer')}
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
                value="retail"
                status={checked === 'retail' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('retail')}
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
                value="e-money"
                status={checked === 'e-money' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('e-money')}
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
              $70
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
            <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>
              Payment
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Payment;
