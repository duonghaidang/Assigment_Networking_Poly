import React, {useState} from 'react';
import {View, Text, Button, TextInput, ToastAndroid} from 'react-native';
import Modal from 'react-native-modal';
import {ChangePassword} from '../server/users/server';

export default function ModalChangePass(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const email = props.email;
  const [password, setPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [cofirm, setCofirm] = useState('');

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  changePassword = async (email, password, newpassword, cofirm) => {
    if (email != '' && password != '' && newpassword != '') {
      if (newpassword == cofirm) {
        const data = await ChangePassword(email, password, newpassword);
        console.log(data);
        if (data.code === 200) {
          ToastAndroid.show('Đổi mật khẩu thành công', ToastAndroid.SHORT);
          setModalVisible(false);
        } else if (data.code === 201) {
          ToastAndroid.show('Đổi mật khẩu thất bại', ToastAndroid.SHORT);
        } else if (data.code === 202) {
          ToastAndroid.show('Không có thông tin', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
        }
      } else
        ToastAndroid.show(
          'Vui lòng nhập chính xác mật khẩu',
          ToastAndroid.SHORT,
        );
    } else
      ToastAndroid.show('Vui lòng nhập đầy đủ thông tin', ToastAndroid.SHORT);
  };

  return (
    <View style={{marginVertical: 10}}>
      <Button color="#59B588" title="Đổi mật khẩu" onPress={toggleModal} />
      <Modal
        isVisible={modalVisible}
        animationType="slide"
        onBackdropPress={toggleModal}>
        <View
          style={{
            // zIndex: 10,
            backgroundColor: '#fff',
            borderRadius: 8,
            padding: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: '#D9544A',
              fontWeight: 'bold',
            }}>
            Đổi mật khẩu
          </Text>
          <View style={{marginTop: 20}}>
            <TextInput
              secureTextEntry={true}
              style={{
                borderBottomColor: '#5D5D5D',
                borderBottomWidth: 1,
              }}
              placeholder="Nhập mật khẩu cũ"
              onChangeText={(password) => setPassword(password)}
              value={password}
              returnKeyType="next"
            />
          </View>
          <View style={{marginTop: 20}}>
            <TextInput
              secureTextEntry={true}
              style={{
                borderBottomColor: '#5D5D5D',
                borderBottomWidth: 1,
              }}
              placeholder="Nhập mật khẩu mới"
              onChangeText={(newpassword) => setNewPassword(newpassword)}
              value={newpassword}
              keyboardType="numeric"
              returnKeyType="next"
            />
          </View>
          <View style={{marginTop: 20}}>
            <TextInput
              secureTextEntry={true}
              style={{
                borderBottomColor: '#5D5D5D',
                borderBottomWidth: 1,
              }}
              placeholder="Nhập mật khẩu mới"
              onChangeText={(cofirm) => setCofirm(cofirm)}
              value={cofirm}
              keyboardType="numeric"
              returnKeyType="next"
            />
          </View>
          <View
            style={{
              marginTop: 20,
            }}>
            <Button
              title="Cập nhật"
              onPress={() => {
                changePassword(email, password, newpassword, cofirm);
                toggleModal;
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
