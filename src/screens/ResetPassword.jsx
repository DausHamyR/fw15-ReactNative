import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import {Formik} from 'formik';
import globalStyles from './assets/globalStyles';
import Alert from '../components/Alert';
import * as Yup from 'yup';
import http from '../helpers/http';
import {useNavigation} from '@react-navigation/native';

const validationSchema = Yup.object({
  code: Yup.number().required('Required Code'),
  email: Yup.string().email('Invalid email address').required('Required Email'),
  password: Yup.string()
    .required('Password cannot be empty')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
      'Password must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol',
    ),
  confirmPassword: Yup.string()
    .required('Confirm Password cannot be empty')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const ResetPassword = () => {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const navigation = useNavigation();
  const doResetPassword = async values => {
    try {
      const body = new URLSearchParams({
        code: values.code,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      }).toString();
      const {data} = await http().post('/auth/resetPassword', body);
      if (data.success === true) {
        setSuccessMessage('Success, password has been reset');
        setErrorMessage('');
        navigation.navigate('Login');
        return data.message;
      }
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };
  return (
    <View style={styles.wrap}>
      <View style={styles.wrapperTextSignup}>
        <Text style={styles.textSignup}>Reset Password</Text>
        <View style={styles.wrapperAlreadyAccount}>
          <Text>Enter the code that was sent</Text>
        </View>
      </View>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
      <Formik
        initialValues={{
          code: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={doResetPassword}>
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <SafeAreaView style={styles.safeAreaView}>
            <Input
              onChangeText={handleChange('code')}
              onBlur={handleBlur('code')}
              keyboardType="numeric"
              placeholder="Input Code"
              value={values.code}
            />
            {errors.code && touched.code && (
              <Text style={globalStyles.textError}>{errors.code}</Text>
            )}
            <Input
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              placeholder="Input Email"
              value={values.email}
            />
            {errors.email && touched.email && (
              <Text style={globalStyles.textError}>{errors.email}</Text>
            )}
            <Input
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry={true}
              placeholder="Input Password"
              value={values.password}
            />
            {errors.password && touched.password && (
              <Text style={globalStyles.textError}>{errors.password}</Text>
            )}
            <Input
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              secureTextEntry={true}
              placeholder="Input Confirm Password"
              value={values.confirmPassword}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={globalStyles.textError}>
                {errors.confirmPassword}
              </Text>
            )}
            <Button
              disabled={
                !touched.code &&
                !touched.email &&
                !touched.password &&
                !touched.confirmPassword
              }
              onPress={handleSubmit}>
              Reset Password
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
  wrapperTextSignup: {
    marginTop: 15,
    width: '80%',
    gap: 15,
  },
  textSignup: {
    color: 'black',
    fontSize: 25,
    fontWeight: '500',
  },
  wrapperAlreadyAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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

export default ResetPassword;
