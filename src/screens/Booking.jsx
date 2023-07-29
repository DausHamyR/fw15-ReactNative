import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import http from '../helpers/http';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {sectionPrice} from '../redux/reducers/sectionPrice';

const Booking = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);
  const [section, setSection] = React.useState([]);
  let [total, setTotal] = React.useState(0);
  let [quantity, setQuantity] = React.useState(0);
  let [sectionId, setSectionId] = React.useState(0);
  // const route = useRoute();
  const {eventId} = route.params;

  const dataSection = React.useCallback(async () => {
    try {
      const {data} = await http(token).get('/sections');
      setSection(data.results);
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  const handlePlus = (selectPrice, selectId) => {
    if (selectId) {
      const getQuantity = (sectionId = 1);
      let selectprice = parseInt(selectPrice, 10);
      setTotal(total + selectprice);
      setQuantity(quantity + getQuantity);
      setSectionId(selectId);
    }
  };
  const handleMinus = (selectPrice, selectId) => {
    let selectPriceInt = parseInt(selectPrice, 10);
    if (total < selectPriceInt) {
      setSectionId(0);
    } else {
      if (total >= selectPriceInt) {
        const getQuantity = (sectionId = 1);
        setTotal(total - selectPriceInt);
        setQuantity(quantity - getQuantity);
      }
    }
  };

  const postReservation = async () => {
    const form = new URLSearchParams({
      eventId,
      sectionId,
      quantity,
    }).toString();
    const {data} = await http(token).post('/reservations', form);
    if (data) {
      dispatch(sectionPrice(data.results));
      navigation.navigate('Payment');
    }
  };

  React.useEffect(() => {
    dataSection();
    if (total <= 1) {
      setSectionId(0);
    }
  }, [dataSection, sectionId, total]);

  // React.useEffect(() => {
  //   console.log(eventId, 'eventId');
  // }, [eventId]);

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View
        style={{
          alignItems: 'center',
          marginTop: 50,
        }}>
        <Image source={require('./assets/stadion.png')} />
      </View>
      <View style={{marginHorizontal: 30}}>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 40,
          }}>
          <Text style={{color: 'black', fontSize: 25, fontWeight: '700'}}>
            Tikets
          </Text>
          <View style={{flexDirection: 'row', gap: 20}}>
            <Text style={{color: 'red'}}>By Price</Text>
            <Image source={require('./assets/sort.png')} />
          </View>
        </View>
        <FlatList
          data={section}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 30,
                }}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <Image
                    source={
                      item.id === 1
                        ? require('./assets/tiket-blue.png')
                        : item.id === 2
                        ? require('./assets/tiket-merah.png')
                        : item.id === 3
                        ? require('./assets/tiket-yelow.png')
                        : null
                    }
                    style={{minWidth: 35, height: 35}}
                  />
                  <View>
                    <Text style={{fontWeight: '700', fontSize: 16}}>
                      {item.name}
                    </Text>
                    <Text>12 Seats available</Text>
                  </View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={{fontWeight: '700', fontSize: 18}}>
                    ${item.price}
                  </Text>
                  <Text>per person</Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'space-around',
                  marginTop: 5,
                  flexDirection: 'row',
                }}>
                <Text style={{flex: 1, marginLeft: 50}}>Quantity</Text>
                <View style={{flexDirection: 'row', gap: 30}}>
                  <TouchableOpacity
                    onPress={() => handleMinus(item.price, item.id)}>
                    <Icon name="minus-square" size={32} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handlePlus(item.price, item.id)}>
                    <Icon name="plus-square" size={32} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            position: 'relative',
            top: 30,
          }}>
          Total: ${total}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#3366FF',
          height: 40,
          width: 120,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          alignSelf: 'flex-end',
          marginRight: 30,
        }}>
        <TouchableOpacity onPress={() => postReservation()}>
          <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Booking;
