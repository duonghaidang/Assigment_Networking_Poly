import React, {useState} from 'react';
import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ModalEdit from './ModalEdit';
import {DeleteProduct} from '../server/products/server';

export default function ItemFlatList(props) {
  deleteProduct = async (id) => {
    const data = await DeleteProduct(id);
    if (data.code === 200) {
      ToastAndroid.show('Xoá thành công', ToastAndroid.SHORT);
    } else if (data.code === 201) {
      ToastAndroid.show('Không có sản phẩm', ToastAndroid.SHORT);
    } else if (data.code === 202) {
      ToastAndroid.show('Không có id', ToastAndroid.SHORT);
    } else ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
  };

  return (
    <View
      style={{
        borderRadius: 10,
        borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View>
        <Text>Tên sản phẩm: {props.name}</Text>
        <Text>Giá: {props.price}</Text>
        <Text>Mô tả: {props.description}</Text>
      </View>
      <View style={{justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <ModalEdit
            id={props.id}
            name={props.name}
            price={props.price}
            description={props.description}
          />
          <TouchableOpacity
            onPress={() => deleteProduct(props.id)}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: '#DE532A',
              padding: 7.5,
            }}>
            <Icon name={'times'} size={25} color={'#DE532A'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
