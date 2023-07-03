import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {Link} from '@react-navigation/native';
import Button from '../components/Button';
import Input from '../components/Input';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import {asyncLogin} from '../redux/actions/auth';
import Alert from '../components/Alert';
import * as Yup from 'yup';
import globalStyles from './assets/globalStyles';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Password cannot be empty'),
});

const Login = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.auth.errorMessage);
  const doLogin = values => {
    dispatch(asyncLogin(values));
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.wrapperTextSignup}>
        <Text style={styles.textSignup}>Log in</Text>
        <View style={styles.wrapperAlreadyAccount}>
          <Text>Hi, Welcome back to Urticket! </Text>
        </View>
      </View>
      {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={doLogin}>
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
            <Input
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry={true}
              placeholder="Password"
              value={values.password}
            />
            {errors.password && touched.password && (
              <Text style={globalStyles.textError}>{errors.password}</Text>
            )}
            <Link to="/ForgotPassword" style={styles.textForgotPassword}>
              Forgot Password?
            </Link>
            <Button
              disabled={!touched.email && !touched.password}
              onPress={handleSubmit}>
              Login
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
  textForgotPassword: {
    alignSelf: 'flex-end',
    color: '#3366FF',
    fontWeight: '600',
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

export default Login;
