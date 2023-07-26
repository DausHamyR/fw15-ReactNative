import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useCallback} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import http from '../helpers/http';
import SplashScreen from 'react-native-splash-screen';
import moment from 'moment';
import Input from '../components/Input';
import {Formik} from 'formik';

const Home = ({navigation}) => {
  const [event, setEvent] = React.useState();
  const deviceToken = useSelector(state => state.deviceToken.data);
  const token = useSelector(state => state.auth.token);
  const [paginition, setPaginition] = React.useState(1);
  const [sortBy, setSortBy] = React.useState('ASC');
  const [sortName, setSortName] = React.useState('id');
  const [sort, setSort] = React.useState(false);

  const saveToken = useCallback(async () => {
    const form = new URLSearchParams({token: deviceToken.token});
    await http(token).post('/device-token', form.toString());
  }, [deviceToken, token]);

  React.useEffect(() => {
    saveToken();
    SplashScreen.hide();
  }, [saveToken, paginition, sort]);

  const getEvent = useCallback(async () => {
    try {
      const {data} = await http(token).get(
        `/events?page=${paginition}&sortBy=${sortBy}&sort=${sortName}`,
      );
      setEvent(data.results);
    } catch (err) {
      console.log(err);
    }
  }, [token, paginition, sortBy, sortName]);

  React.useEffect(() => {
    getEvent();
  }, [getEvent, event]);

  const btnSearchEvent = values => {
    const search = new URLSearchParams(values).toString();
    navigation.navigate('Search', {search});
  };

  const pageNext = () => {
    setPaginition(paginition + 1);
  };

  const pagePrev = () => {
    setPaginition(paginition - 1);
  };

  const sorting = () => {
    setSort(prevSort => !prevSort);
  };

  const nearestEvent = () => {
    setSortName('date');
    setSortBy('ASC');
  };

  const latestEvent = () => {
    setSortName('id');
    setSortBy('DESC');
  };

  return (
    <View>
      <View style={styles.wrapper}>
        <Icon
          onPress={() => navigation.openDrawer()}
          name="menu"
          size={25}
          color="white"
        />
        <Icon name="message-square" size={25} color="white" />
      </View>
      <Formik
        initialValues={{
          search: '',
        }}
        onSubmit={btnSearchEvent}
        enableReinitialize>
        {({handleSubmit, handleChange, handleBlur, values}) => (
          <View style={{position: 'relative', top: -90}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Input
                onChangeText={handleChange('search')}
                onBlur={handleBlur('search')}
                placeholder="Search Event"
                value={values.search}
                styleContainer={{
                  backgroundColor: 'white',
                  width: '90%',
                  marginHorizontal: '5%',
                  borderColor: 'white',
                }}
              />
              <Icon
                name="search"
                size={25}
                color="black"
                style={{position: 'relative', right: 60}}
                onPress={handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
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
        <View style={styles.wrapperDate}>
          <Text style={styles.textDate}>16</Text>
          <Text style={styles.textDate}>Thu</Text>
        </View>
        <View style={styles.wrapperDate}>
          <Text style={styles.textDate}>17</Text>
          <Text style={styles.textDate}>Fri</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          height: 530,
          position: 'relative',
          top: -110,
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
          {sort && (
            <View style={{gap: 10}}>
              <TouchableOpacity onPress={() => latestEvent()}>
                <View
                  style={{
                    backgroundColor: '#A076F9',
                    borderRadius: 5,
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    Latest Event
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => nearestEvent()}>
                <View
                  style={{
                    backgroundColor: '#A8A196',
                    borderRadius: 5,
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    Nearest Event
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity onPress={() => sorting()}>
            <Image
              source={require('./assets/Group8.png')}
              style={{width: 70, height: 70}}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={event}
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
                    minWidth: 300,
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
          horizontal={true}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 20,
            marginBottom: 30,
          }}>
          <View
            style={{
              backgroundColor: '#0B666A',
              width: 60,
              height: 30,
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => pagePrev()}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Prev
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{paginition}</Text>
          </View>
          <View
            style={{
              backgroundColor: '#35A29F',
              width: 60,
              height: 30,
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => pageNext()}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#3366FF',
    height: 160,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 35,
    paddingHorizontal: 15,
  },
  wrapperDate: {alignItems: 'center', flexDirection: 'column'},
  wrapperDateYellow: {
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
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
    top: -75,
    height: 170,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default Home;
