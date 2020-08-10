import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../themes/styles';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {Login} from '../server/users/server';
import Loading from '../components/Loading';
import AsyncStorage from '@react-native-community/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [flagLoading, setFlagLoading] = useState(false);
  const navigation = useNavigation();

  toggleLoading = () => {
    setFlagLoading(!flagLoading);
  };

  setData = async (data) => {
    try {
      await AsyncStorage.setItem('data', JSON.stringify(data));
    } catch (error) {
      // Error saving data
    }
  };
  loginDb = async (email, password) => {
    if (email != '' && password != '') {
      toggleLoading();
      const data = await Login(email, password);
      setData(data.user);
      if (data.code === 200) {
        navigation.replace('Dashboard');
      } else if (data.code === 201) {
        toggleLoading();
        ToastAndroid.show('Sai email hoặc password', ToastAndroid.SHORT);
      } else {
        toggleLoading();
        ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
      }
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
        <View style={styles.blur}>
          <Animatable.View animation={'pulse'} style={styles.view}>
            <View style={styles.inputContainer}>
              <Text style={styles.txt}>Đăng Nhập</Text>
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
                  returnKeyType="done"
                  onChangeText={(password) => setPassword(password)}
                  value={password}
                />
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => loginDb(email, password)}>
                  <Text style={styles.textBtn}>Đăng nhập</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    navigation.navigate('RegisterScreen');
                  }}>
                  <Text style={styles.textBtn}>Đăng kí</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animatable.View>
        </View>
      </ImageBackground>
    </View>
  );
}
