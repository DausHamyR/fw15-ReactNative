import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import http from '../helpers/http';
import moment from 'moment';
import Modal from 'react-native-modal';

const MyBooking = () => {
  const getPayment = useSelector(state => state.payment.data);
  const token = useSelector(state => state.auth.token);
  const [history, setHistory] = React.useState();
  const [detailHistory, setDetailHistory] = React.useState();
  const [isModalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    const getHistory = async () => {
      try {
        const {data} = await http(token).get('/history');
        setHistory(data.results);
      } catch (err) {
        console.log(err);
      }
    };
    getHistory();
  }, [token, history, detailHistory]);

  React.useEffect(() => {
    detailHistory;
  }, [detailHistory]);

  const getDetailHistory = async id => {
    const {data} = await http(token).get(`/history/${id}`);
    setDetailHistory(data.results);
    setModalVisible(true);
  };

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
                  <TouchableOpacity onPress={() => getDetailHistory(item.id)}>
                    <Text style={{color: 'blue', fontWeight: '600'}}>
                      Detail
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
        <Modal isVisible={isModalVisible}>
          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: 30,
              borderRadius: 15,
            }}>
            <View style={{marginHorizontal: 20, gap: 20}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                History Payment
              </Text>
              <View style={{gap: 5}}>
                <Text style={{fontWeight: '700', fontSize: 14}}>
                  Event Name : {detailHistory.title}
                </Text>
                <Text style={{fontWeight: '700', fontSize: 14}}>
                  Event Date : {moment(detailHistory.date).format('DD-MM-YYYY')}
                </Text>
                <Text style={{fontWeight: '700', fontSize: 14}}>
                  Payment Status : {detailHistory.name}
                </Text>
                <Text style={{fontWeight: '700', fontSize: 14}}>
                  Payment Method : {detailHistory.namePayment}
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  alignSelf: 'flex-end',
                  borderRadius: 10,
                  backgroundColor: 'red',
                }}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text
                    style={{
                      textAlign: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
