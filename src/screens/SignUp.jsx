import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import {Link} from '@react-navigation/native';
import Input from '../components/Input';
import Button from '../components/Button';
import {asyncSignUp} from '../redux/actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Alert from '../components/Alert';
import globalStyles from './assets/globalStyles';
import SplashScreen from 'react-native-splash-screen';

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required('Required Full Name')
    .min(4, 'FullName must be at least 4 characters long'),
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

const SignUp = () => {
  const dispatch = useDispatch();
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);
  const errorMessage = useSelector(state => state.auth.errorMessage);
  const successMessage = useSelector(state => state.auth.successMessage);
  const doSignUp = values => {
    dispatch(asyncSignUp(values));
  };

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.wrapperTextSignup}>
        <Text style={styles.textSignup}>Sign Up</Text>
        <View style={styles.wrapperAlreadyAccount}>
          <Text>Already have an account?</Text>
          <Link to="/Login" style={styles.textLogin}>
            Log In
          </Link>
        </View>
      </View>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={doSignUp}>
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
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              placeholder="Full Name"
              value={values.fullName}
            />
            {errors.fullName && touched.fullName && (
              <Text style={globalStyles.textError}>{errors.fullName}</Text>
            )}
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
            <Input
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              secureTextEntry={true}
              placeholder="Confirm Password"
              value={values.confirmPassword}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={globalStyles.textError}>
                {errors.confirmPassword}
              </Text>
            )}
            <View style={styles.wrapperAlreadyAccount}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
              />
              <Text>Accept terms and condition</Text>
            </View>
            <Button
              disabled={
                !touched.fullName &&
                !touched.email &&
                !touched.password &&
                !touched.confirmPassword
              }
              onPress={handleSubmit}>
              Sign Up
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
  textLogin: {
    color: '#3366FF',
    fontSize: 15,
    fontWeight: '500',
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

export default SignUp;
