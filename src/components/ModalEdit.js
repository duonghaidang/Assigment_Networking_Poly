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
import {UpdateProduct} from '../server/products/server';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function ModalAdd({item}) {
  const id = item.id;
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [description, setDescription] = useState(item.description);
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const updateProduct = async (id, name, price, description) => {
    const data = await UpdateProduct(id, name, price, description);
    if (name != '' && price != '' && description != '') {
      if (data.code === 200) {
        ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
        setModalVisible(false);
      } else if (data.code === 201) {
        ToastAndroid.show('Cập nhật không thành công', ToastAndroid.SHORT);
        setModalVisible(false);
      } else if (data.code === 202) {
        ToastAndroid.show('Không có id hoặc tên sản phẩm', ToastAndroid.SHORT);
        setModalVisible(false);
      }
    } else
      ToastAndroid.show('Vui lòng nhập đầy đủ thông tin', ToastAndroid.SHORT);
  };
  return (
    <View>
      <TouchableOpacity
        onPress={toggleModal}
        style={{
          marginRight: 20,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: '#2BB4DE',
          padding: 10,
        }}>
        <Icon name={'pen'} size={20} color={'#2BB4DE'} />
      </TouchableOpacity>
      <Modal
        isVisible={modalVisible}
        animationType="slide"
        onBackdropPress={toggleModal}>
        <KeyboardAvoidingView
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
            Cập nhật sản phẩm
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
              title="Cập nhật"
              onPress={() => updateProduct(id, name, price, description)}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});
