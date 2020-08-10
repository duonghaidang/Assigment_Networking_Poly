import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, Button, StatusBar} from 'react-native';
import Header from '../components/Header';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import ModalChangePass from '../components/ModalChangePass';

export default function ProfileScreen() {
  const [dataUser, setDataUser] = useState([]);
  const navigation = useNavigation();
  getData = async () => {
    try {
      const data = await AsyncStorage.getItem('data');
      setDataUser(JSON.parse(data));
    } catch (error) {
      // Error retrieving data
    }
  };
  clearData = async () => {
    try {
      const asyncStorageKeys = await AsyncStorage.getAllKeys();
      if (asyncStorageKeys.length > 0) {
        AsyncStorage.clear();
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <View>
      <StatusBar backgroundColor="#59B588" />
      <Header title="Thông tin" />
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            height: 120,
            width: 120,
            backgroundColor: '#859ca1',
            borderRadius: 60,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Image
            source={require('../images/user.png')}
            style={{
              height: 100,
              width: 100,
            }}
          />
        </View>
        <View style={{width: '95%', marginTop: 15}}>
          <Text style={{fontSize: 18, marginTop: 10, color: '#59B588'}}>
            Thông tin tài khoản
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomColor: '#b7bcbd',
              borderBottomWidth: 1,
              paddingVertical: 10,
            }}>
            <Text style={{fontSize: 16}}>Email:</Text>
            <Text style={{fontSize: 16, color: '#808080'}}>
              {dataUser.email}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomColor: '#b7bcbd',
              borderBottomWidth: 1,
              paddingVertical: 10,
            }}>
            <Text style={{fontSize: 16}}>Tên tài khoản:</Text>
            <Text style={{fontSize: 16, color: '#808080'}}>
              {dataUser.username}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomColor: '#b7bcbd',
              borderBottomWidth: 1,
              paddingVertical: 10,
            }}>
            <Text style={{fontSize: 16}}>Ngày tạo:</Text>
            <Text style={{fontSize: 16, color: '#808080'}}>
              {dataUser.create_date}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomColor: '#b7bcbd',
              borderBottomWidth: 1,
              paddingVertical: 10,
            }}>
            <Text style={{fontSize: 16}}>Ngày cập nhật:</Text>
            <Text style={{fontSize: 16, color: '#808080'}}>
              {' '}
              {dataUser.update_date}
            </Text>
          </View>
          <ModalChangePass email={dataUser.email} />
          <Button
            title="Đăng xuất"
            color="red"
            onPress={() => {
              navigation.replace('LoginScreen');
              clearData();
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
