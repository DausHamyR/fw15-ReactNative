import {View, Text, TouchableOpacity, FlatList, Platform} from 'react-native';
import React, {useCallback} from 'react';
import http from '../helpers/http';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import moment from 'moment';
import Input from '../components/Input';
import {launchImageLibrary} from 'react-native-image-picker';
import {Formik} from 'formik';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Alert from '../components/Alert';

const ManageEvent = () => {
  const token = useSelector(state => state.auth.token);
  // const [manageEvent, setManageEvent] = React.useState({});
  const [getManageEvent, setGetManageEvent] = React.useState();
  const [isDatePickerVisible, setDatePickerVisible] = React.useState(false);
  const [getCity, setGetCity] = React.useState();
  const [getSections, setGetSections] = React.useState();
  const [getCategories, setGetCategories] = React.useState();
  const [detailManageEvent, setDetailManageEvent] = React.useState({});
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [modalCreateEvent, setModalCreateEvent] = React.useState(false);
  const [modalUpdateEvent, setmodalUpdateEvent] = React.useState(false);
  const [selectedPicture, setSelectedPicture] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const [idEvent, setIdEvent] = React.useState();

  async function removeEvent(id) {
    try {
      console.log(id);
      await http(token).delete(`/events/manage/${id}`);
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

  const updateEvent = async id => {
    setIdEvent(id);
    setmodalUpdateEvent(true);
  };

  const pickImage = async () => {
    let results;
    results = await launchImageLibrary();
    const data = results.assets[0];
    if (data.uri) {
      setSelectedPicture({
        name: data.fileName,
        type: data.type,
        uri:
          Platform.OS === 'android'
            ? data.uri
            : data.uri.replace('file://', ''),
      });
    }
  };

  React.useEffect(() => {
    const effectGetSections = async () => {
      try {
        const {data} = await http(token).get('/sections');
        const mapSections = data.results.map(
          dataSections => dataSections.price,
        );
        setGetSections(mapSections);
      } catch (err) {
        console.log(err);
      }
    };
    effectGetSections();
  }, [token, getSections]);

  React.useEffect(() => {
    const effectGetCity = async () => {
      try {
        const {data} = await http(token).get('/city');
        const mapCity = data.results.map(dataCity => dataCity.name);
        setGetCity(mapCity);
      } catch (err) {
        console.log(err);
      }
    };
    effectGetCity();
  }, [token, getCity]);

  React.useEffect(() => {
    const effectGetCategories = async () => {
      try {
        const {data} = await http(token).get('/categories');
        const mapCategories = data.results.map(dataCate => dataCate.name);
        setGetCategories(mapCategories);
      } catch (err) {
        console.log(err);
      }
    };
    effectGetCategories();
  }, [token, getCategories]);

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date, setFieldValue) => {
    setFieldValue('date', moment(date).format('DD-MM-YYYY'));
    hideDatePicker();
  };

  const btnCreateEvent = async values => {
    // setLoading(true);
    console.log(values);
    const form = new FormData();
    Object.keys(values).forEach(key => {
      if (values[key]) {
        if (key === 'price') {
          const priceId = (values.price = 3);
          form.append('price', priceId);
        } else if (key === 'location') {
          const cityId = (values.location = 5);
          form.append('location', cityId);
        } else if (key === 'category') {
          const categoryId = (values.category = 3);
          form.append('category', categoryId);
        } else {
          form.append(key, values[key]);
        }
      }
    });
    if (selectedPicture) {
      form.append('picture', selectedPicture);
    }
    console.log(form, 'form');
    const {data} = await http(token).post('/events/manage', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(data.results);
    setGetManageEvent(data.results);
    setModalCreateEvent(false);
    setSuccessMessage('Create Events successfully');
  };

  const btnUpdateEvent = async values => {
    // setLoading(true);
    const form = new FormData();
    Object.keys(values).forEach(key => {
      if (values[key]) {
        if (key === 'price') {
          const priceId = (values.price = 2);
          form.append('price', priceId);
        } else if (key === 'location') {
          const cityId = (values.location = 2);
          form.append('location', cityId);
        } else if (key === 'category') {
          const categoryId = (values.category = 2);
          form.append('category', categoryId);
        } else {
          form.append(key, values[key]);
        }
      }
    });
    if (selectedPicture) {
      form.append('picture', selectedPicture);
    }
    console.log(form, 'form');
    const {data} = await http(token).patch(`/events/manage/${idEvent}`, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(data.results);
    setGetManageEvent(data.results);
    setmodalUpdateEvent(false);
    setSuccessMessage('Update Events successfully');
  };

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <TouchableOpacity onPress={() => setModalCreateEvent(true)}>
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
          <Text style={{color: '#3366FF', fontWeight: '500'}}>Create</Text>
        </View>
      </TouchableOpacity>
      <View>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
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
                      <Text style={{color: 'green', fontWeight: '600'}}>
                        Detail
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => updateEvent(item.id)}>
                      <Text style={{color: 'blue', fontWeight: '600'}}>
                        update
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeEvent(item.id)}>
                      <Text style={{color: 'red', fontWeight: '600'}}>
                        Delete
                      </Text>
                    </TouchableOpacity>
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
        <Modal isVisible={modalCreateEvent}>
          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: 30,
              borderRadius: 15,
            }}>
            <View style={{marginHorizontal: 20, gap: 20}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                Create Manage Event
              </Text>
              <Formik
                initialValues={{
                  name: '',
                  location: '',
                  price: '',
                  category: '',
                  date: '',
                  detail: '',
                }}
                onSubmit={btnCreateEvent}
                enableReinitialize>
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  setFieldValue,
                }) => (
                  <>
                    <View style={{gap: 15}}>
                      <View style={{gap: 5}}>
                        <Text style={{fontWeight: '700', fontSize: 14}}>
                          Event Name :
                        </Text>
                        <Input
                          onChangeText={handleChange('name')}
                          onBlur={handleBlur('name')}
                          value={values.name}
                          placeholder="Event Name"
                        />
                      </View>
                      <View style={{gap: 5}}>
                        <Text style={{fontWeight: '700', fontSize: 14}}>
                          Event Location :
                        </Text>
                        <SelectDropdown
                          data={getCity}
                          onSelect={selectedItem => {
                            handleChange('location')(selectedItem);
                          }}
                          defaultValue={values.location}
                        />
                      </View>
                      <View style={{gap: 5}}>
                        <Text style={{fontWeight: '700', fontSize: 14}}>
                          Event Price :
                        </Text>
                        <SelectDropdown
                          data={getSections}
                          onSelect={selectedItem => {
                            handleChange('price')(selectedItem);
                          }}
                          defaultValue={values.price}
                        />
                      </View>
                      <View style={{gap: 5}}>
                        <Text style={{fontWeight: '700', fontSize: 14}}>
                          Event Category :
                        </Text>
                        <SelectDropdown
                          data={getCategories}
                          onSelect={selectedItem => {
                            handleChange('category')(selectedItem);
                          }}
                          defaultValue={values.category}
                        />
                      </View>
                      <View style={{gap: 5}}>
                        <Text style={{fontWeight: '700', fontSize: 14}}>
                          Event Date :
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontWeight: '700',
                              fontSize: 14,
                              width: 90,
                            }}>
                            {moment(detailManageEvent?.date).format(
                              'DD-MM-YYYY',
                            )}
                          </Text>
                          <Icon
                            onPress={() => setDatePickerVisible(true)}
                            name="calendar"
                            size={25}
                            color="black"
                          />
                        </View>
                        <DateTimePickerModal
                          isVisible={isDatePickerVisible}
                          mode="date"
                          onConfirm={date => handleConfirm(date, setFieldValue)}
                          onCancel={hideDatePicker}
                        />
                      </View>
                      <View style={{gap: 5}}>
                        <Text style={{fontWeight: '700', fontSize: 14}}>
                          Event Picture :
                        </Text>
                        <TouchableOpacity
                          onPress={() => pickImage()}
                          style={{
                            borderWidth: 1,
                            width: 150,
                            borderRadius: 7,
                          }}>
                          <Text style={{textAlign: 'center'}}>Gallery</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{gap: 5}}>
                        <Text style={{fontWeight: '700', fontSize: 14}}>
                          Event Descriptions :
                        </Text>
                        <Input
                          onChangeText={handleChange('detail')}
                          onBlur={handleBlur('detail')}
                          value={values.detail}
                          placeholder="Event Descriptions"
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                        gap: 20,
                      }}>
                      <View
                        style={{
                          borderWidth: 1,
                          alignSelf: 'flex-end',
                          borderRadius: 10,
                          backgroundColor: 'green',
                        }}>
                        <TouchableOpacity onPress={handleSubmit}>
                          <Text
                            style={{
                              textAlign: 'center',
                              paddingHorizontal: 10,
                              paddingVertical: 10,
                              color: 'white',
                              fontWeight: 'bold',
                            }}>
                            Create
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          borderWidth: 1,
                          alignSelf: 'flex-end',
                          borderRadius: 10,
                          backgroundColor: 'red',
                        }}>
                        <TouchableOpacity
                          onPress={() => setModalCreateEvent(false)}>
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
                  </>
                )}
              </Formik>
            </View>
          </View>
        </Modal>
        <Modal isVisible={modalUpdateEvent}>
          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: 30,
              borderRadius: 15,
            }}>
            <View style={{marginHorizontal: 20, gap: 20}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                Update Manage Event
              </Text>
              <Formik
                initialValues={{
                  name: '',
                  location: '',
                  price: '',
                  category: '',
                  date: '',
                  detail: '',
                }}
                onSubmit={btnUpdateEvent}
                enableReinitialize>
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  setFieldValue,
                }) => (
                  <>
                    <View style={{gap: 15}}>
                      <View style={{gap: 5}}>
                        <Text style={{fontWeight: '700', fontSize: 14}}>
                          Event Name :
                        </Text>
                        <Input
                          onChangeText={handleChange('name')}
                          onBlur={handleBlur('name')}
                          value={values.name}
                          placeholder="Event Name"
                        />
                      </View>
                      <View style={{gap: 5}}>
                        <Text style={{fontWeight: '700', fontSize: 14}}>
                          Event Location :
                        </Text>
                        <SelectDropdown
                          data={getCity}
                          onSelect={selectedItem => {
                            handleChange('location')(selectedItem);
                          }}
                          defaultValue={values.location}
                        />
                      </View>
                      <View style={{gap: 5}}>
                        <Text style={{fontWeight: '700', fontSize: 14}}>
                          Event Price :
                        </Text>
                        <SelectDropdown
                          data={getSections}
                          onSelect={selectedItem => {
                            handleChange('price')(selectedItem);
                          }}
                          defaultValue={values.price}
                        />
                      </View>
                      <View style={{gap: 5}}>
                        <Text style={{fontWeight: '700', fontSize: 14}}>
                          Event Category :
                        </Text>
                        <SelectDropdown
                          data={getCategories}
                          onSelect={selectedItem => {
                            handleChange('category')(selectedItem);
                          }}
                          defaultValue={values.category}
                        />
                      </View>
                      <View style={{gap: 5}}>
                        <Text style={{fontWeight: '700', fontSize: 14}}>
                          Event Date :
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontWeight: '700',
                              fontSize: 14,
                              width: 90,
                            }}>
                            {moment(detailManageEvent?.date).format(
                              'DD-MM-YYYY',
                            )}
                          </Text>
                          <Icon
                            onPress={() => setDatePickerVisible(true)}
                            name="calendar"
                            size={25}
                            color="black"
                          />
                        </View>
                        <DateTimePickerModal
                          isVisible={isDatePickerVisible}
                          mode="date"
                          onConfirm={date => handleConfirm(date, setFieldValue)}
                          onCancel={hideDatePicker}
                        />
                      </View>
                      <View style={{gap: 5}}>
                        <Text style={{fontWeight: '700', fontSize: 14}}>
                          Event Picture :
                        </Text>
                        <TouchableOpacity
                          onPress={() => pickImage()}
                          style={{
                            borderWidth: 1,
                            width: 150,
                            borderRadius: 7,
                          }}>
                          <Text style={{textAlign: 'center'}}>Gallery</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{gap: 5}}>
                        <Text style={{fontWeight: '700', fontSize: 14}}>
                          Event Descriptions :
                        </Text>
                        <Input
                          onChangeText={handleChange('detail')}
                          onBlur={handleBlur('detail')}
                          value={values.detail}
                          placeholder="Event Descriptions"
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                        gap: 20,
                      }}>
                      <View
                        style={{
                          borderWidth: 1,
                          alignSelf: 'flex-end',
                          borderRadius: 10,
                          backgroundColor: 'blue',
                        }}>
                        <TouchableOpacity onPress={handleSubmit}>
                          <Text
                            style={{
                              textAlign: 'center',
                              paddingHorizontal: 10,
                              paddingVertical: 10,
                              color: 'white',
                              fontWeight: 'bold',
                            }}>
                            Update
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          borderWidth: 1,
                          alignSelf: 'flex-end',
                          borderRadius: 10,
                          backgroundColor: 'red',
                        }}>
                        <TouchableOpacity
                          onPress={() => setmodalUpdateEvent(false)}>
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
                  </>
                )}
              </Formik>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default ManageEvent;
