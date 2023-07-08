import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/reducers/auth';
import Button from '../components/Button';
import http from '../helpers/http';
import SplashScreen from 'react-native-splash-screen';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const deviceToken = useSelector(state => state.deviceToken.data);
  const token = useSelector(state => state.auth.token);
  const saveToken = useCallback(async () => {
    const form = new URLSearchParams({token: deviceToken.token});
    await http(token).post('/device-token', form.toString());
  }, [deviceToken, token]);

  React.useEffect(() => {
    saveToken();
  }, [saveToken]);

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View>
      <View style={styles.wrapper}>
        <Icon
          onPress={() => navigation.openDrawer()}
          name="menu"
          size={25}
          color="white"
        />
        <View style={{flexDirection: 'row', gap: 30}}>
          <Icon name="search" size={25} color="white" />
          <Icon name="message-square" size={25} color="white" />
        </View>
      </View>
      <View />
      <View style={styles.containerDate}>
        <View style={styles.wrapperDate}>
          <Text style={styles.textDate}>13</Text>
          <Text style={styles.textDate}>Mon</Text>
        </View>
        <View style={styles.wrapperDate}>
          <Text style={styles.textDate}>14</Text>
          <Text style={styles.textDate}>Tue</Text>
        </View>
        <View style={styles.wrapperDateYellow}>
          <View style={styles.wrapperDate}>
            <Text style={styles.textDateYellow}>15</Text>
            <Text style={styles.textDateYellow}>Wed</Text>
            <View style={styles.titikDateYellow} />
          </View>
        </View>
        <TouchableOpacity onPress={() => dispatch(logout())}>
          <View style={styles.wrapperDate}>
            <Text style={styles.textDate}>16</Text>
            <Text style={styles.textDate}>Thu</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ManageEvent')}>
          <View style={styles.wrapperDate}>
            <Text style={styles.textDate}>17</Text>
            <Text style={styles.textDate}>Fri</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          height: 1000,
          position: 'relative',
          top: -60,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}>
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            height: 100,
          }}>
          <Text style={{fontWeight: '700', fontSize: 18}}>Events For You</Text>
          <Image
            source={require('./assets/Group8.png')}
            style={{width: 70, height: 70}}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('EventDetail')}>
            <Image
              source={require('./assets/Bitmap.png')}
              style={{minWidth: 100, height: 350, borderRadius: 30}}
            />
          </TouchableOpacity>
          <View
            style={{
              position: 'relative',
              top: -200,
              minWidth: 270,
              gap: 20,
            }}>
            <Text style={{color: 'white', fontWeight: '700'}}>
              Wed, 15 Nov, 4:00 PM
            </Text>
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                fontSize: 23,
                width: 200,
                lineHeight: 30,
              }}>
              Sights & Sounds Exhibition
            </Text>
            <Image
              source={require('./assets/Primary.png')}
              style={{minWidth: 50, height: 50}}
            />
          </View>
        </View>
      </View>
      <Button onPress={() => dispatch(logout())}>Logout</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#3366FF',
    height: 125,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 35,
    paddingHorizontal: 15,
  },
  wrapperDate: {alignItems: 'center', flexDirection: 'column'},
  wrapperDateYellow: {
    borderWidth: 1,
    paddingTop: 25,
    paddingBottom: 25,
    paddingHorizontal: 8,
    borderRadius: 20,
    borderColor: '#FF8900',
  },
  textDate: {color: 'white', fontWeight: '500'},
  textDateYellow: {color: '#FF8900', fontWeight: '500'},
  titikDateYellow: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FF8900',
    width: 10,
    height: 10,
    marginTop: 10,
  },
  containerDate: {
    backgroundColor: '#222B45',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'relative',
    top: -25,
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default Home;
