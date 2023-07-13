import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import http from '../helpers/http';
import moment from 'moment';
import Modal from 'react-native-modal';

const MyBooking = () => {
  // const dispatch = useDispatch();
  const getPayment = useSelector(state => state.payment.data);
  const token = useSelector(state => state.auth.token);
  const [history, setHistory] = React.useState();
  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    console.log('tes');
    setModalVisible(!isModalVisible);
  };

  React.useEffect(() => {
    const getHistory = async () => {
      try {
        const {data} = await http(token).get('/history');
        // console.log(data.results);
        setHistory(data.results);
      } catch (err) {
        console.log(err);
      }
    };
    getHistory();
  }, [token, history]);

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View
        style={{
          marginTop: 30,
          marginHorizontal: 30,
        }}>
        <Image source={require('./assets/Group5895.png')} />
      </View>
      <View style={{}}>
        <FlatList
          data={history}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 40,
                marginVertical: 20,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  gap: 3,
                }}>
                <Text
                  style={{color: '#FF8900', fontWeight: '700', fontSize: 15}}>
                  {moment(item.date).format('DD')}
                </Text>
                <Text
                  style={{color: '#C1C5D0', fontWeight: '700', fontSize: 15}}>
                  {moment(item.date).format('dddd')}
                </Text>
              </View>
              <View style={{gap: 10}}>
                <Text
                  style={{fontWeight: 'bold', fontSize: 17, lineHeight: 35}}>
                  {item.title}
                </Text>
                <View>
                  <Text>{moment(item.date).format('DD-MM-YYYY')}</Text>
                  <TouchableOpacity onPress={toggleModal}>
                    <Text style={{color: 'blue', fontWeight: '600'}}>
                      Detail
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Modal isModalVisible={isModalVisible}>
                <View style={{flex: 1}}>
                  <Text>I am the modal content!</Text>
                  <TouchableOpacity onPress={toggleModal}>
                    <Text>Close</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyBooking;
