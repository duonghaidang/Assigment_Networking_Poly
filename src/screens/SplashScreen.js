import React, {useEffect, useState} from 'react';
import {View, ImageBackground, StatusBar, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';

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
      navigation.replace('Dashboard');
    } else {
      navigation.replace('LoginScreen');
    }
  }, 3000);
  useEffect(() => {
    check();
  }, []);
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#000" />
      <ImageBackground
        source={require('../images/background.jpg')}
        style={{
          flex: 1,
          height: null,
          width: null,
          resizeMode: 'cover',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animatable.View animation={'fadeInUp'}>
          <Image
            source={require('../images/logo.png')}
            style={{height: 300, width: 300}}
          />
        </Animatable.View>
      </ImageBackground>
    </View>
  );
}
