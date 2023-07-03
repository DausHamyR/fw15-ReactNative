import {
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';
import ButtonSave from '../components/Button';
import DatePicker from 'react-native-date-picker';
import React from 'react';
import {RadioButton} from 'react-native-paper';
import http from '../helpers/http';
import {useSelector} from 'react-redux';
import Input from '../components/Input';
import {Formik} from 'formik';
import moment from 'moment/moment';
import Alert from '../components/Alert';

const EditProfile = () => {
  const [profile, setProfile] = React.useState({});
  const [text, onChangeText] = React.useState('');
  const [checked, setChecked] = React.useState('male');
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const token = useSelector(state => state.auth.token);
  const [editUsername, setEditUsername] = React.useState(false);
  const [editEmail, setEditEmail] = React.useState(false);
  const [editPhoneNumber, setEditPhoneNumber] = React.useState(false);
  const [selectedPicture, setSelectedPicture] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  // const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getProfile = async () => {
      const {data} = await http(token).get('/profile');
      setProfile(data.results);
    };
    getProfile();
  }, [token]);

  const editProfile = async values => {
    // setLoading(true);
    console.log('1');
    const form = new FormData();
    Object.keys(values).forEach(key => {
      console.log('2');
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
    console.log('3');
    const {data} = await http(token).patch('/profile', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('4');
    setSuccessMessage('Profile updated successfully');
    setProfile(data.results);
    // setEditBirthday(false);
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
        // gender: profile?.gender ? 'male' : 'female',
        // profession: profile?.profession,
        // nationality: profile?.nationality,
        // birthDate:
        //   profile?.birthDate &&
        //   moment(profile.birthDate).format('YYYY/MM/DD'),
      }}
      onSubmit={editProfile}
      enableReinitialize>
      {({handleSubmit, handleChange, handleBlur, errors, touched, values}) => (
        <ScrollView>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          <View style={{alignSelf: 'center', marginVertical: 30}}>
            {profile.picture === null ? (
              <Image
                style={styles.picture}
                source={require('./assets/daw.jpg')}
              />
            ) : (
              <Image
                style={styles.picture}
                source={{uri: `${profile.picture}`}}
              />
            )}
          </View>
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
                      <>
                        <Text>{profile.username}</Text>
                        <Button
                          title="Edit"
                          onPress={() => setEditUsername(true)}
                        />
                      </>
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
                      <>
                        <Text>{profile.email}</Text>
                        <Button
                          title="Edit"
                          onPress={() => setEditEmail(true)}
                        />
                      </>
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
                      <>
                        <Text>{profile.phoneNumber}</Text>
                        <Button
                          title="Edit"
                          onPress={() => setEditPhoneNumber(true)}
                        />
                      </>
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
                {/* <View style={{gap: 7}}>
                  <Text style={{fontWeight: '700'}}>Gender</Text>
                  <View style={{flexDirection: 'row', gap: 30}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton
                        value="male"
                        status={checked === 'male' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('male')}
                      />
                      <Text>Male</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <RadioButton
                        value="female"
                        status={checked === 'female' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('female')}
                      />
                      <Text>Female</Text>
                    </View>
                  </View>
                </View>
                <View style={{gap: 7}}>
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
                </View>
                <View style={{gap: 7}}>
                  <Text style={{fontWeight: '700'}}>Birthday Date</Text>
                  <Button title="Open" onPress={() => setOpen(true)} />
                  <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={date => {
                      setOpen(false);
                      setDate(date);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
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
