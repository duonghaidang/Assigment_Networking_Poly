import React from 'react';
import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ModalEdit from './ModalEdit';

export default function ItemFlatList({item, onPressDelete}) {
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
        <Text>Tên sản phẩm: {item.name}</Text>
        <Text>Giá: {item.price}đ</Text>
        <Text>Mô tả: {item.description}</Text>
      </View>
      <View style={{justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <ModalEdit item={item} />
          <TouchableOpacity
            // onPress={() => deleteProduct(props.id)}
            onPress={onPressDelete}
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
