import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ToastAndroid,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {CreateProduct} from '../server/products/server';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';

export default function ModalAdd() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const createProduct = async (name, price, description) => {
    const data = await CreateProduct(name, price, description);
    if (name != '' && price != '' && description != '') {
      if (data.code === 200) {
        ToastAndroid.show('Thêm thành công', ToastAndroid.SHORT);
        setName('');
        setPrice('');
        setDescription('');
        setModalVisible(false);
      } else if (data.code === 201) {
        ToastAndroid.show('Thêm không thành công', ToastAndroid.SHORT);
        setName('');
        setPrice('');
        setDescription('');
        setModalVisible(false);
      } else {
        ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
        setName('');
        setPrice('');
        setDescription('');
        setModalVisible(false);
      }
    } else
      ToastAndroid.show('Vui lòng nhập đầy đủ thông tin', ToastAndroid.SHORT);
  };

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 40,
        right: 35,
      }}>
      <TouchableOpacity
        onPress={toggleModal}
        style={{
          alignItems: 'center',
        }}>
        <Icon
          style={{backgroundColor: 'white', borderRadius: 25}}
          name="pluscircle"
          size={50}
          color="#59B588"
        />
      </TouchableOpacity>
      <Modal
        isVisible={modalVisible}
        animationType="slide"
        onBackdropPress={toggleModal}>
        <KeyboardAvoidingView
          style={{
            // zIndex: 15,
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
            Thêm sản phẩm
          </Text>
          <View style={{marginTop: 20}}>
            <TextInput
              style={{
                borderBottomColor: '#5D5D5D',
                borderBottomWidth: 1,
              }}
              placeholder="Nhập tên sản phẩm"
              onChangeText={(name) => setName(name)}
              value={name}
              returnKeyType="next"
            />
          </View>
          <View style={{marginTop: 20}}>
            <TextInput
              style={{
                borderBottomColor: '#5D5D5D',
                borderBottomWidth: 1,
              }}
              placeholder="Nhập giá"
              onChangeText={(price) => setPrice(price)}
              value={price}
              keyboardType="numeric"
              returnKeyType="next"
            />
          </View>
          <View style={{marginTop: 20}}>
            <TextInput
              style={{
                borderBottomColor: '#5D5D5D',
                borderBottomWidth: 1,
              }}
              placeholder="Nhập mô tả"
              onChangeText={(description) => setDescription(description)}
              value={description}
              returnKeyType="done"
            />
          </View>
          <View
            style={{
              marginTop: 20,
            }}>
            <Button
              title="Thêm"
              onPress={() => {
                createProduct(name, price, description);
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});
