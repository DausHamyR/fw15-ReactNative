import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import http from '../helpers/http';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Header from '../components/Header';
import moment from 'moment';

const SearchEvent = ({navigation}) => {
  const route = useRoute();
  const search = route.params.search;
  const [searchResults, setSearchResults] = React.useState();
  const token = useSelector(state => state.auth.token);

  React.useEffect(() => {
    const getEventBySearch = async () => {
      try {
        const {data} = await http(token).get(`/events?${search}`);
        console.log(data.results);
        setSearchResults(data.results);
      } catch (err) {
        console.log(err);
      }
    };
    getEventBySearch();
  }, [route, token, search]);

  return (
    <View>
      <Header navigation={navigation} />
      <View
        style={{
          backgroundColor: 'white',
          marginTop: '-70',
          borderRadius: 20,
          paddingTop: 30,
          height: 650,
        }}>
        <FlatList
          data={searchResults}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EventDetail', {id: item.id})
                }>
                <Image
                  source={{uri: item.picture}}
                  style={{
                    minWidth: 350,
                    height: 350,
                    borderRadius: 20,
                    marginHorizontal: 10,
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  position: 'relative',
                  top: -220,
                  minWidth: 270,
                  gap: 20,
                }}>
                <Text
                  style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>
                  {moment(item.date, 'YYYY-MM-DD').format('DD-MM-YYYY')}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 25,
                    width: 200,
                    lineHeight: 30,
                  }}>
                  {item.title}
                </Text>
                <Image
                  source={require('./assets/Primary.png')}
                  style={{minWidth: 50, height: 50}}
                />
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default SearchEvent;
