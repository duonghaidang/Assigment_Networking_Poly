import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
  TextInput,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../themes/styles';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {Register} from '../server/users/server';
import Loading from '../components/Loading';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cofirm, setCofirm] = useState('');
  const [flagLoading, setFlagLoading] = useState(false);
  const navigation = useNavigation();
  toggleLoading = () => {
    setFlagLoading(!flagLoading);
  };
  registerDB = async (email, username, password, cofirm) => {
    if (email != '' && password != '') {
      if (password == cofirm) {
        toggleLoading();
        const data = await Register(email, username, password);
        if (data.code === 200) {
          ToastAndroid.show('Đăng kí thành công', ToastAndroid.SHORT);
          navigation.goBack();
        } else if (data.code === 201) {
          ToastAndroid.show('Đăng kí thất bại', ToastAndroid.SHORT);
        } else if (data.code === 202) {
          ToastAndroid.show('Đã tồn tại email', ToastAndroid.SHORT);
        } else ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
      } else
        ToastAndroid.show(
          'Vui lòng nhập chính xác mật khẩu',
          ToastAndroid.SHORT,
        );
    } else
      ToastAndroid.show('Vui lòng nhập đầy đủ thông tin', ToastAndroid.SHORT);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <Loading flag={flagLoading} />
      <ImageBackground
        source={require('../images/background.jpg')}
        style={styles.imgBackground}>
        <View style={styles.inputContainer}>
          <View style={styles.blur}>
            <Animatable.View animation={'pulse'} style={styles.view}>
              <Text style={styles.txt}>Đăng Kí</Text>
              <View style={styles.textContainer}>
                <Icon
                  name={'ios-mail'}
                  size={28}
                  color={'white'}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder={'Email'}
                  placeholderTextColor={'#b4afaf'}
                  underlineColorAndroid="transparent"
                  keyboardType="email-address"
                  onChangeText={(email) => setEmail(email)}
                  value={email}
                  returnKeyType="next"
                />
              </View>

              <View style={styles.textContainer}>
                <Icon
                  name={'md-person'}
                  size={28}
                  color={'white'}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder={'Tài khoản'}
                  placeholderTextColor={'#b4afaf'}
                  underlineColorAndroid="transparent"
                  returnKeyType="next"
                  onChangeText={(username) => setUsername(username)}
                  value={username}
                />
              </View>
              <View style={styles.textContainer}>
                <Icon
                  name={'md-key'}
                  size={28}
                  color={'white'}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder={'Mật khẩu'}
                  placeholderTextColor={'#b4afaf'}
                  underlineColorAndroid="transparent"
                  secureTextEntry={true}
                  returnKeyType="next"
                  onChangeText={(password) => setPassword(password)}
                  value={password}
                />
              </View>
              <View style={styles.textContainer}>
                <Icon
                  name={'md-key'}
                  size={28}
                  color={'white'}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder={'Nhập lại mật khẩu'}
                  placeholderTextColor={'#b4afaf'}
                  underlineColorAndroid="transparent"
                  secureTextEntry={true}
                  returnKeyType="done"
                  onChangeText={(cofirm) => setCofirm(cofirm)}
                  value={cofirm}
                />
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => registerDB(email, username, password, cofirm)}>
                  <Text style={styles.textBtn}>Đăng kí</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => navigation.goBack()}>
                  <Text style={styles.textBtn}>Đăng nhập </Text>
                </TouchableOpacity>
              </View>
            </Animatable.View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
