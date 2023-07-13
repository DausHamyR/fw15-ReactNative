import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import http from '../helpers/http';
import {useSelector} from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';

const EventDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const token = useSelector(state => state.auth.token);
  const [event, setEvent] = React.useState({});
  const {id} = route.params;
  const [wishlist, setWishlist] = React.useState(false);

  async function postWishlist(id) {
    try {
      if (wishlist) {
        await http(token).delete(`/wishlists/${id}`);
        setWishlist(false);
      } else {
        const body = new URLSearchParams({
          eventId: id,
        }).toString();
        await http(token).post('/wishlists', body);
        setWishlist(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    async function getWishlist(id) {
      const {data} = await http(token).get(`/wishlists/${id}`);
      if (!data) {
        setWishlist(false);
      } else {
        setWishlist(true);
      }
    }
    getWishlist(id);
  }, [token, id]);

  React.useEffect(() => {
    const getEvent = async id => {
      try {
        const {data} = await http(token).get(`/events/${id}`);
        setEvent(data.results);
      } catch (err) {
        console.log(err);
      }
    };
    getEvent(id);
  }, [token, id]);

  return (
    <View style={styles.wrapper}>
      <Image
        source={{uri: event.picture}}
        style={{width: '100%', height: '50%'}}
      />
      <View
        style={{
          position: 'absolute',
          width: '90%',
          height: '60%',
          marginLeft: 20,
          marginTop: 40,
          flexDirection: 'column',
          justifyContent: 'start',
          gap: 35,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'start',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'white', fontSize: 35, fontWeight: 'bold'}}>
            {event.title}
          </Text>
          <TouchableOpacity onPress={() => postWishlist(event.id)}>
            <Icon name="heart" size={35} color={!wishlist ? 'white' : 'red'} />
          </TouchableOpacity>
        </View>
        <View style={{gap: 15}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Icon name="map-pin" size={25} color="blue" width="30" />
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
              {event.location}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Icon name="clock" size={25} color="blue" width="30" />
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
              {moment(event.date, 'YYYY-MM-DD').format('DD-MM-YYYY')}
            </Text>
          </View>
        </View>
        <View style={{gap: 5}}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
            Attendees
          </Text>
          <Image source={require('./assets/atten.png')} />
        </View>
      </View>
      <View
        style={{
          width: '100%',
          backgroundColor: '#192038',
          height: 190,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
      />
      <View
        style={{
          position: 'relative',
          top: -160,
          width: '90%',
          marginLeft: 20,
          gap: 15,
        }}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: '700'}}>
          Event Detail
        </Text>
        <Text style={{color: 'white', fontSize: 14}}>
          After his controversial art exhibition "Tear and Consume" back in
          November 2018, in which guests were invited to tear up…
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          backgroundColor: 'white',
          height: 300,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          position: 'absolute',
          top: 550,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 20,
          }}>
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: '#884DFF',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 7,
            }}>
            <Text style={{color: 'white', fontSize: 14}}>Ticket</Text>
            <Text style={{color: 'white', fontSize: 25, fontWeight: '700'}}>
              VIP
            </Text>
          </View>
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: '#FF3D71',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 7,
            }}>
            <Text style={{color: 'white', fontSize: 14}}>Quantity</Text>
            <Text style={{color: 'white', fontSize: 25, fontWeight: '700'}}>
              2
            </Text>
          </View>
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: '#FF8900',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 7,
            }}>
            <Text style={{color: 'white', fontSize: 14}}>Price</Text>
            <Text style={{color: 'white', fontSize: 25, fontWeight: '700'}}>
              $70
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#3366FF',
            height: 50,
            marginLeft: 40,
            marginTop: 20,
            width: '80%',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Booking')}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
              Buy Tickets
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'black',
  },
  textSights: {
    color: 'white',
    fontSize: 50,
  },
});

export default EventDetail;
