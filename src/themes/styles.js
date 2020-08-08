import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff8000',
  },
  textInput: {
    color: '#fff',
    width: '100%',
    height: 50,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    fontSize: 16,
    paddingLeft: 50,
    backgroundColor: 'rgba(255, 228, 225, 0.2)',
    marginTop: 15,
    marginBottom: 15,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    width: '50%',
    height: 45,
    borderRadius: 20,
    justifyContent: 'center',
    marginRight: 5,
    backgroundColor: 'rgba(255, 228, 225, 1)',
  },
  btnContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
  },
  textBtn: {
    color: '#3B5998',
    fontSize: 16,
    textAlign: 'center',
  },
  imgBackground: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontFamily: 'Roboto',
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: '',
    color: 'rgba(255, 228, 225, 1)',
  },
  view: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: '90%',
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    top: 26,
    left: 20,
    zIndex: 2,
  },
});
