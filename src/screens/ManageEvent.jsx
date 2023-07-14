import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useCallback} from 'react';
import http from '../helpers/http';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import moment from 'moment';

const ManageEvent = () => {
  const token = useSelector(state => state.auth.token);
  const [getManageEvent, setGetManageEvent] = React.useState();
  const [detailManageEvent, setDetailManageEvent] = React.useState();
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [deleteEvent, setDeleteEvent] = React.useState(false);

  async function postCreateEvent() {
    try {
      await http(token).post('/events/manage');
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(() => {
    const manageEvent = async () => {
      try {
        const {data} = await http(token).get('/events/manage');
        setGetManageEvent(data.results);
      } catch (err) {
        console.log(err);
      }
    };
    manageEvent();
  }, [token, getManageEvent]);

  React.useEffect(() => {
    getDetailManageEvent();
  }, [getDetailManageEvent]);

  const getDetailManageEvent = useCallback(
    async id => {
      try {
        const {data} = await http(token).get(`/events/manage/${id}`);
        setDetailManageEvent(data.results);
        setModalVisible(true);
      } catch (err) {
        console.log(err);
      }
    },
    [token],
  );

  async function removeEvent(id) {
    try {
      await http(token).delete(`/events/manage${id}`);
      setDeleteEvent(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View
        style={{
          marginHorizontal: 30,
          marginVertical: 30,
          backgroundColor: '#EAF1FF',
          width: 100,
          height: 50,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => postCreateEvent()}>
          <Text style={{color: '#3366FF', fontWeight: '500'}}>Create</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={getManageEvent}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 40,
                marginVertical: 20,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  gap: 3,
                  marginRight: 40,
                  width: 80,
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
                  style={{fontWeight: 'bold', fontSize: 20, lineHeight: 35}}>
                  {item.title}
                </Text>
                <View style={{gap: 5}}>
                  <Text>{moment(item.date).format('DD-MM-YYYY')}</Text>
                  <Text>{item.name}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 25,
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => getDetailManageEvent(item.id)}>
                      <Text style={{color: 'blue', fontWeight: '600'}}>
                        Detail
                      </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => getDetailHistory(item.id)}>
                      <Text style={{color: 'blue', fontWeight: '600'}}>
                        update
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeEvent(item.id)}>
                      <Text style={{color: 'blue', fontWeight: '600'}}>
                        Delete
                      </Text>
                    </TouchableOpacity> */}
                  </View>
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
                Detail Manage Event
              </Text>
              <View style={{gap: 5}}>
                <Text style={{fontWeight: '700', fontSize: 14}}>
                  Event Name : {detailManageEvent?.title}
                </Text>
                <Text style={{fontWeight: '700', fontSize: 14}}>
                  Event Date :
                  {moment(detailManageEvent?.date).format('DD-MM-YYYY')}
                </Text>
                <Text style={{fontWeight: '700', fontSize: 14}}>
                  Location Event : {detailManageEvent?.name}
                </Text>
                <Text style={{fontWeight: '700', fontSize: 14}}>
                  Descriptions Event : {detailManageEvent?.descriptions}
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

export default ManageEvent;
