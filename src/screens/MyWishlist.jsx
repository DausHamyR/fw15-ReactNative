import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import http from '../helpers/http';
import {useSelector} from 'react-redux';
import moment from 'moment';

const MyWishlist = () => {
  const token = useSelector(state => state.auth.token);
  const [wishlist, setWishlist] = React.useState();
  const [deleteWishlist, setDeleteWishlist] = React.useState(false);

  async function removeWishlist(id) {
    try {
      console.log(id);
      await http(token).delete(`/wishlists/${id}`);
      console.log('masuk');
      setDeleteWishlist(false);
    } catch (err) {
      console.log(err);
    }
  }

  // React.useEffect(() => {
  //   deleteWishlist;
  // }, [deleteWishlist]);

  React.useEffect(() => {
    const getWishlist = async () => {
      try {
        const {data} = await http(token).get('/wishlists');
        setWishlist(data.results);
      } catch (err) {
        console.log(err);
      }
    };
    getWishlist();
  }, [token, wishlist]);

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View style={{marginVertical: 30, marginHorizontal: 30}}>
        <FlatList
          data={wishlist}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                gap: 50,
                marginBottom: 50,
              }}>
              <View style={{alignItems: 'center', gap: 40}}>
                <View style={{alignItems: 'center', gap: 3}}>
                  <Text
                    style={{color: '#FF8900', fontWeight: '700', fontSize: 15}}>
                    {moment(item.date).format('DD')}
                  </Text>
                  <Text
                    style={{color: '#C1C5D0', fontWeight: '700', fontSize: 15}}>
                    {moment(item.date).format('dddd')}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => removeWishlist(item.id)}>
                  <Image source={require('./assets/heart.png')} />
                </TouchableOpacity>
              </View>
              <View style={{gap: 10}}>
                <Text
                  style={{
                    fontWeight: '800',
                    fontSize: 27,
                    lineHeight: 35,
                    width: 200,
                  }}>
                  {item.title}
                </Text>
                <Text>{item.name}</Text>
                <Text>{moment(item.date).format('DD-MM-YYYY')}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default MyWishlist;
