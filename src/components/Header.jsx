import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {Formik} from 'formik';
import Input from './Input';

const Header = ({navigation}) => {
  const btnSearchEvent = values => {
    const search = new URLSearchParams(values).toString();
    navigation.navigate('Search', {search});
  };

  return (
    <View>
      <View style={styles.wrapper}>
        <Icon name="menu" size={25} color="white" />
        <Icon name="message-square" size={25} color="white" />
      </View>
      <Formik
        initialValues={{
          search: '',
        }}
        onSubmit={btnSearchEvent}
        enableReinitialize>
        {({handleSubmit, handleChange, handleBlur, values}) => (
          <View style={{position: 'relative', top: -90}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Input
                onChangeText={handleChange('search')}
                onBlur={handleBlur('search')}
                placeholder="Search Event"
                value={values.search}
                styleContainer={{
                  backgroundColor: 'white',
                  width: '90%',
                  marginHorizontal: '5%',
                  borderColor: 'white',
                }}
              />
              <Icon
                name="search"
                size={25}
                color="black"
                style={{position: 'relative', right: 60}}
                onPress={handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#3366FF',
    height: 160,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 35,
    paddingHorizontal: 15,
  },
});

export default Header;
