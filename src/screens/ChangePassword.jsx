import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import http from '../helpers/http';
import {Formik} from 'formik';
import globalStyles from './assets/globalStyles';
import * as Yup from 'yup';
import Alert from '../components/Alert';
import {useSelector} from 'react-redux';

const validationSchema = Yup.object({
  oldPassword: Yup.string().required('Old Password cannot be empty'),
  newPassword: Yup.string()
    .required('New Password cannot be empty')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
      'Password must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol',
    ),
  confirmNewPassword: Yup.string()
    .required('Confirm New Password cannot be empty')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

const ChangePassword = () => {
  const token = useSelector(state => state.auth.token);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const doChangePassword = async values => {
    try {
      const body = new URLSearchParams({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      }).toString();
      const {data} = await http(token).patch('/changePassword', body);
      if (data.success === true) {
        setSuccessMessage('Password updated successfully');
        setErrorMessage('');
        return data.message;
      }
    } catch (err) {
      setErrorMessage('Old Password is wrong');
      setSuccessMessage('');
    }
  };
  return (
    <View style={styles.wrap}>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={doChangePassword}>
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.wrapInput}>
              <Text style={styles.text}>Old Password</Text>
              <Input
                onChangeText={handleChange('oldPassword')}
                onBlur={handleBlur('oldPassword')}
                value={values.oldPassword}
                secureTextEntry={true}
                placeholder="Input Old Password"
              />
              {errors.oldPassword && touched.oldPassword && (
                <Text style={globalStyles.textError}>{errors.oldPassword}</Text>
              )}
            </View>
            <View style={styles.wrapInput}>
              <Text style={styles.text}>New Password</Text>
              <Input
                onChangeText={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
                value={values.newPassword}
                secureTextEntry={true}
                placeholder="Input New Password"
              />
              {errors.newPassword && touched.newPassword && (
                <Text style={globalStyles.textError}>{errors.newPassword}</Text>
              )}
            </View>
            <View style={styles.wrapInput}>
              <Text style={styles.text}>Confirm New Password</Text>
              <Input
                onChangeText={handleChange('confirmNewPassword')}
                onBlur={handleBlur('confirmNewPassword')}
                value={values.confirmNewPassword}
                secureTextEntry={true}
                placeholder="Input Confirm New Password"
              />
              {errors.confirmNewPassword && touched.confirmNewPassword && (
                <Text style={globalStyles.textError}>
                  {errors.confirmNewPassword}
                </Text>
              )}
            </View>
            <Button
              disabled={
                !touched.oldPassword &&
                !touched.newPassword &&
                !touched.confirmNewPassword
              }
              onPress={handleSubmit}>
              Update
            </Button>
          </SafeAreaView>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
  text: {fontWeight: '800', fontSize: 15},
  wrapInput: {gap: 10, marginVertical: 5},
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 20,
  },
  safeAreaView: {
    width: '80%',
    marginTop: 35,
    gap: 20,
  },
});

export default ChangePassword;
