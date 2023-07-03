import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    backgroundColor: '#3366FF',
    height: 45,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#3366FF',
    marginVertical: 10,
  },
  btnDisabled: {
    backgroundColor: '#AAA',
    borderColor: '#AAA',
  },
  btnDisabledText: {
    color: '#888',
  },
  textBtn: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
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
  eye: {
    position: 'relative',
    right: 40,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textError: {
    color: '#FF0000',
  },
});

export default globalStyles;
