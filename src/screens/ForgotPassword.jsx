import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import {Formik} from 'formik';
import globalStyles from './assets/globalStyles';
import * as Yup from 'yup';
import Alert from '../components/Alert';
import http from '../helpers/http';
import {useNavigation} from '@react-navigation/native';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required Email'),
});

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = React.useState('');
  const doForgotPassword = async values => {
    try {
      const body = new URLSearchParams({email: values.email}).toString();
      const {data} = await http().post('/auth/forgotPassword', body);
      if (data.success === true) {
        navigation.navigate('ResetPassword');
        return data.message;
      }
    } catch (err) {
      setErrorMessage('wrong email');
    }
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.wrapperTextSignup}>
        <Text style={styles.textSignup}>Forgot Password</Text>
        <View style={styles.wrapperAlreadyAccount}>
          <Text>You’ll get mail soon on your email</Text>
        </View>
      </View>
      {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={doForgotPassword}>
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
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              placeholder="Email"
              value={values.email}
            />
            {errors.email && touched.email && (
              <Text style={globalStyles.textError}>{errors.email}</Text>
            )}
            <Button disabled={!touched.email} onPress={handleSubmit}>
              SEND
            </Button>
          </SafeAreaView>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: 'white',
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

export default ForgotPassword;
