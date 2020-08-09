import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

export default function SplashScreen() {
  const [isChecked, setIsChecked] = useState();
  const navigation = useNavigation();

  check = async () => {
    try {
      const asyncStorageKeys = await AsyncStorage.getAllKeys();
      if (asyncStorageKeys.length > 0) {
        return setIsChecked(true);
      } else return setIsChecked(false);
    } catch (error) {
      // Error retrieving data
    }
  };

  setTimeout(() => {
    if (isChecked) {
      navigation.navigate('Dashboard');
    } else {
      navigation.navigate('LoginScreen');
    }
  }, 3000);
  useEffect(() => {
    check();
  }, []);
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../images/background.jpg')}
        style={{
          flex: 1,
          height: null,
          width: null,
          resizeMode: 'cover',
          alignItems: 'center',
          justifyContent: 'center',
        }}></ImageBackground>
    </View>
  );
}
