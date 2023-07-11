import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import http from '../helpers/http';
import {useSelector} from 'react-redux';

const Profile = () => {
  const getProfile = useSelector(state => state.profile.data);
  const token = useSelector(state => state.auth.token);
  const [profile, setProfile] = React.useState({});
  const navigation = useNavigation();
  React.useEffect(() => {
    const getProfile = async () => {
      const {data} = await http(token).get('/profile');
      setProfile(data.results);
    };
    getProfile();
  }, [token, profile.picture]);

  React.useEffect(() => {
    if (getProfile) {
      setProfile(getProfile);
    }
  }, [getProfile]);

  return (
    <View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginVertical: 30,
          gap: 20,
          justifyContent: 'center',
        }}>
        {profile.picture === null || profile.picture === undefined ? (
          <Image style={styles.picture} source={require('./assets/daw.jpg')} />
        ) : (
          <Image style={styles.picture} source={{uri: `${profile.picture}`}} />
        )}
        <View style={{gap: 7}}>
          <Text style={{textAlign: 'center', fontWeight: '800', fontSize: 20}}>
            {profile.fullName}
          </Text>
          <Text style={{textAlign: 'center'}}>{profile.profession}</Text>
        </View>
      </View>
      <View style={{marginHorizontal: 25}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: '700', fontSize: 20}}>Card</Text>
          <Image source={require('./assets/Group823.png')} />
        </View>
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Image source={require('./assets/Group821.png')} />
        </View>
        <View style={{marginVertical: 30, gap: 25}}>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
                <Image source={require('./assets/edit.png')} />
                <Text style={{fontWeight: '800', fontSize: 16}}>
                  Edit Profile
                </Text>
              </View>
              <View>
                <Image source={require('./assets/kiri.png')} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ChangePassword')}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 28}}>
                <Image source={require('./assets/gembok.png')} />
                <Text style={{fontWeight: '800', fontSize: 16}}>
                  Change Password
                </Text>
              </View>
              <View>
                <Image source={require('./assets/kiri.png')} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  picture: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
});

export default Profile;
