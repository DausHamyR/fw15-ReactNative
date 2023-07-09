import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import ButtonSave from '../components/Button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import React from 'react';
import {RadioButton} from 'react-native-paper';
import http from '../helpers/http';
import {useSelector} from 'react-redux';
import Input from '../components/Input';
import {Formik} from 'formik';
import moment from 'moment/moment';
import Alert from '../components/Alert';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import SelectDropdown from 'react-native-select-dropdown';

const EditProfile = () => {
  const [profile, setProfile] = React.useState({});
  const token = useSelector(state => state.auth.token);
  const [editUsername, setEditUsername] = React.useState(false);
  const [editEmail, setEditEmail] = React.useState(false);
  const [editPhoneNumber, setEditPhoneNumber] = React.useState(false);
  const [selectedPicture, setSelectedPicture] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  // const [loading, setLoading] = React.useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState('');
  const [selectedProfession, setSelectedProfession] = React.useState();
  const profession = [
    'Web developer',
    'Backend Developer',
    'Frontend Developer',
    'Mobile Developer',
  ];
  const nationality = ['Indonesia', 'Brazil', 'Spanyol', 'Belgia'];

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date, setFieldValue) => {
    setFieldValue('birthDate', moment(date).format('DD-MM-YYYY'));
    hideDatePicker();
  };

  const ImagePicker = () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };
    launchImageLibrary(options, response => {
      setSelectedPicture(response?.assets[0].uri);
    });
  };

  React.useEffect(() => {
    const getProfile = async () => {
      const {data} = await http(token).get('/profile');
      setProfile(data.results);
      setSelectedDate(data.results.birthDate);
    };
    getProfile();
  }, [token, selectedDate]);

  const editProfile = async values => {
    // setLoading(true);
    const form = new FormData();
    Object.keys(values).forEach(key => {
      if (values[key]) {
        if (key === 'birthDate') {
          form.append(
            key,
            moment(values.birthDate, 'DD-MM-YYYY').format('MM-DD-YYYY'),
          );
        } else {
          form.append(key, values[key]);
        }
      }
    });
    if (selectedPicture) {
      form.append('picture', selectedPicture);
    }
    const {data} = await http(token).patch('/profile', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // setSelectedDate(data.results.birthDate);
    setSuccessMessage('Profile updated successfully');
    setProfile(data.results);
    setSelectedDate(data.results.birthDate);
    setEditUsername(false);
    setEditEmail(false);
    setEditPhoneNumber(false);
    // setLoading(false);
  };

  // React.useEffect(() => {
  //   console.log(moment(profile.birthDate).format('DD-MM-YYYY'), 'kentut');
  // }, [profile]);

  return (
    <Formik
      initialValues={{
        fullName: profile?.fullName,
        username: profile?.username,
        email: profile?.email,
        phoneNumber: profile?.phoneNumber,
        gender: profile.gender ? '1' : '0',
        profession: profile?.profession,
        nationality: profile?.nationality,
        // birthDate: profile.birthDate
        //   ? moment(profile.birthDate).format('DD-MM-YYYY')
        //   : '',
      }}
      onSubmit={editProfile}
      enableReinitialize>
      {({handleSubmit, handleChange, handleBlur, values, setFieldValue}) => (
        <ScrollView>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          <TouchableOpacity
            onPress={() => {
              ImagePicker();
            }}
            style={{alignSelf: 'center', marginVertical: 30}}>
            {profile.picture === null || profile.picture === undefined ? (
              <Image
                style={styles.picture}
                source={require('./assets/daw.jpg')}
              />
            ) : (
              <Image
                style={styles.picture}
                source={
                  selectedPicture
                    ? {uri: selectedPicture}
                    : {uri: profile.picture}
                }
              />
            )}
          </TouchableOpacity>
          <View style={{marginHorizontal: 30}}>
            <View>
              <SafeAreaView style={styles.safeAreaView}>
                <View style={{gap: 7}}>
                  <Text style={{fontWeight: '700'}}>Name</Text>
                  <Input
                    style={styles.input}
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    value={values.fullName}
                    placeholder="Full Name"
                  />
                </View>
                <View style={{gap: 7}}>
                  <Text style={{fontWeight: '700'}}>Username</Text>
                  <View style={{flexDirection: 'row', gap: 30}}>
                    {!editUsername && (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 30,
                        }}>
                        <Text>{profile.username}</Text>
                        <Button
                          title="Edit"
                          onPress={() => setEditUsername(true)}
                        />
                      </View>
                    )}
                    {editUsername && (
                      <Input
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                        placeholder="Input Username"
                      />
                    )}
                  </View>
                </View>
                <View style={{gap: 7}}>
                  <Text style={{fontWeight: '700'}}>Email</Text>
                  <View style={{flexDirection: 'row', gap: 30}}>
                    {!editEmail && (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 30,
                        }}>
                        <Text>{profile.email}</Text>
                        <Button
                          title="Edit"
                          onPress={() => setEditEmail(true)}
                        />
                      </View>
                    )}
                    {editEmail && (
                      <Input
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        placeholder="Input email"
                      />
                    )}
                  </View>
                </View>
                <View style={{gap: 7}}>
                  <Text style={{fontWeight: '700'}}>Phone</Text>
                  <View style={{flexDirection: 'row', gap: 30}}>
                    {!editPhoneNumber && (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 30,
                        }}>
                        <Text>{profile.phoneNumber}</Text>
                        <Button
                          title="Edit"
                          onPress={() => setEditPhoneNumber(true)}
                        />
                      </View>
                    )}
                    {editPhoneNumber && (
                      <Input
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={handleBlur('phoneNumber')}
                        value={values.phoneNumber}
                        placeholder="Input Phone Number"
                      />
                    )}
                  </View>
                </View>
                <View style={{gap: 7}}>
                  <Text style={{fontWeight: '700'}}>Gender</Text>
                  <RadioButton.Group
                    onValueChange={handleChange('gender')}
                    value={values.gender}>
                    <View style={{flexDirection: 'row'}}>
                      <RadioButton.Item label="Male" value="0" />
                      <RadioButton.Item label="Female" value="1" />
                    </View>
                  </RadioButton.Group>
                </View>
                <View style={{marginBottom: 7}}>
                  <Text style={{fontWeight: 'bold', fontSize: 15}}>
                    Profession
                  </Text>
                  <SelectDropdown
                    data={profession}
                    onSelect={selectedItem => {
                      handleChange('profession')(selectedItem);
                    }}
                    defaultValue={values.profession}
                    style={{
                      borderWidth: 1,
                      borderColor: 'gray',
                      borderRadius: 8,
                      padding: 10,
                      backgroundColor: 'white',
                      marginTop: 10,
                    }}
                    dropdownStyle={{
                      borderWidth: 1,
                      borderColor: 'gray',
                      borderRadius: 8,
                      marginTop: -1,
                      backgroundColor: 'white',
                    }}
                    buttonStyle={{
                      borderWidth: 1,
                      borderColor: 'gray',
                      borderRadius: 8,
                      padding: 10,
                      backgroundColor: 'white',
                      marginTop: 10,
                    }}
                    textStyle={{
                      fontSize: 16,
                      color: 'black',
                    }}
                  />
                </View>
                <View style={{marginBottom: 7}}>
                  <Text style={{fontWeight: 'bold', fontSize: 15}}>
                    Nationality
                  </Text>
                  <SelectDropdown
                    data={nationality}
                    onSelect={selectedItem => {
                      handleChange('nationality')(selectedItem);
                    }}
                    defaultValue={values.nationality}
                    style={{
                      borderWidth: 1,
                      borderColor: 'gray',
                      borderRadius: 8,
                      padding: 10,
                      backgroundColor: 'white',
                      marginTop: 10,
                    }}
                    dropdownStyle={{
                      borderWidth: 1,
                      borderColor: 'gray',
                      borderRadius: 8,
                      marginTop: -1,
                      backgroundColor: 'white',
                    }}
                    buttonStyle={{
                      borderWidth: 1,
                      borderColor: 'gray',
                      borderRadius: 8,
                      padding: 10,
                      backgroundColor: 'white',
                      marginTop: 10,
                    }}
                    textStyle={{
                      fontSize: 16,
                      color: 'black',
                    }}
                  />
                </View>
                <View style={{gap: 7}}>
                  <Text style={{fontWeight: '700'}}>Birthday Date</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '115',
                    }}>
                    <Text>{moment(selectedDate).format('DD-MM-YYYY')}</Text>
                    <Icon
                      onPress={() => setDatePickerVisible(true)}
                      name="calendar"
                      size={25}
                      color="black"
                    />
                  </View>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="birthDate"
                    onConfirm={birthDate =>
                      handleConfirm(birthDate, setFieldValue)
                    }
                    onCancel={hideDatePicker}
                  />
                </View>
                <ButtonSave onPress={handleSubmit}>SAVE</ButtonSave>
              </SafeAreaView>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    gap: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 20,
  },
  datePicker: {
    width: 200,
  },
  picture: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
});

export default EditProfile;
