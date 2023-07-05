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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const EditProfile = () => {
  const [profile, setProfile] = React.useState({});
  const [text, onChangeText] = React.useState('');
  const [checked, setChecked] = React.useState('0');
  const token = useSelector(state => state.auth.token);
  const [editUsername, setEditUsername] = React.useState(false);
  const [editEmail, setEditEmail] = React.useState(false);
  const [editPhoneNumber, setEditPhoneNumber] = React.useState(false);
  const [selectedPicture, setSelectedPicture] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  // const [loading, setLoading] = React.useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setSelectedDate(date.toISOString().slice(0, 10));
    hideDatePicker();
  };

  const ImagePicker = () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };
    launchImageLibrary(options, response => {
      setSelectedPicture(response.assets[0].uri);
    });
  };

  React.useEffect(() => {
    const getProfile = async () => {
      const {data} = await http(token).get('/profile');
      setProfile(data.results);
    };
    getProfile();
  }, [token]);

  const editProfile = async values => {
    // setLoading(true);
    const form = new FormData();
    Object.keys(values).forEach(key => {
      console.log(values);
      if (values[key]) {
        if (key === 'birthDate') {
          form.append(
            key,
            moment(values[key], 'DD-MM-YYYY').format('YYYY/MM/DD'),
          );
        } else {
          form.append(key, values[key]);
        }
      }
    });
    if (selectedPicture) {
      form.append('picture', selectedPicture);
    }
    // console.log(checked);
    // if (checked) {
    //   form.append('gender', checked);
    // }
    const {data} = await http(token).patch('/profile', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(data.results);
    setSuccessMessage('Profile updated successfully');
    setProfile(data.results);
    console.log(profile.gender);
    setEditUsername(false);
    setEditEmail(false);
    setEditPhoneNumber(false);
    // setLoading(false);
  };

  return (
    <Formik
      initialValues={{
        fullName: profile?.fullName,
        username: profile?.username,
        email: profile?.email,
        phoneNumber: profile?.phoneNumber,
        gender: profile?.gender,
        // profession: profile?.profession,
        // nationality: profile?.nationality,
        // birthDate:
        //   profile?.birthDate && moment(profile.birthDate).format('YYYY/MM/DD'),
      }}
      onSubmit={editProfile}
      enableReinitialize>
      {({handleSubmit, handleChange, handleBlur, errors, touched, values}) => (
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
                    <View style={{flexDirection: 'row', gap: 30}}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RadioButton.Item label="Male" value="false" />
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <RadioButton.Item label="Female" value="true" />
                      </View>
                    </View>
                  </RadioButton.Group>
                </View>
                {/*<View style={{gap: 7}}>
                  <Text style={{fontWeight: '700'}}>Profession</Text>
                  <TextInput
                    style={styles.input}
                    onChange={onChangeText}
                    value={text}
                    placeholder="Full Name"
                  />
                </View>
                <View style={{gap: 7}}>
                  <Text style={{fontWeight: '700'}}>Nationality</Text>
                  <TextInput
                    style={styles.input}
                    onChange={onChangeText}
                    value={text}
                    placeholder="Full Name"
                  />
                </View> */}
                {/* <View style={{gap: 7}}>
                  <Text style={{fontWeight: '700'}}>Birthday Date</Text>
                  <TouchableOpacity onPress={showDatePicker}>
                    <Input
                      style={styles.input}
                      onChangeText={handleChange('birthDate')}
                      onBlur={handleBlur('birthDate')}
                      value={values.birthDate}
                      placeholder="Select Date"
                      editable={false}
                    />
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />
                  </TouchableOpacity>
                </View> */}
                {/* <View
                  style={{
                    borderWidth: 1,
                    backgroundColor: '#3366FF',
                    height: 45,
                    borderRadius: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#3366FF',
                    marginVertical: 30,
                  }}> */}
                <ButtonSave onPress={handleSubmit}>SAVE</ButtonSave>
                {/* </View> */}
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
