import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ToastAndroid,
  View,
  FlatList,
  TextInput,
  StatusBar,
} from 'react-native';
import Header from '../components/Header';
import ModalAdd from '../components/ModalAdd';
import Item from '../components/ItemFlatList';
import {
  GetAllProducts,
  SearchProduct,
  DeleteProduct,
  UpdateProduct,
} from '../server/products/server';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function HomeScreen() {
  const [listData, setListData] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const renderItem = ({item}) => (
    <Item item={item} onPressDelete={() => deleteProduct(item.id)} />
  );
  const deleteProduct = async (id) => {
    const data = await DeleteProduct(id);
    if (data.code === 200) {
      ToastAndroid.show('Xoá thành công', ToastAndroid.SHORT);
      const newList = listData.filter((item) => item.id !== id);
      return setListData(newList);
    } else if (data.code === 201) {
      ToastAndroid.show('Không có sản phẩm', ToastAndroid.SHORT);
    } else if (data.code === 202) {
      ToastAndroid.show('Không có id', ToastAndroid.SHORT);
    } else ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
  };

  const searchData = async () => {
    if (name != '') {
      const data = await SearchProduct(name);
      if (data.code === 200) {
        return setListData(data.sanpham), setIsLoading(false);
      } else if (data.code === 201) {
        return setListData([]);
      } else ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
    } else getData();
  };

  const getData = async () => {
    const data = await GetAllProducts();
    if (data.code === 200) {
      setIsLoading(false);
      await setListData(data.sanpham);
      return;
    } else if (data.code === 201) {
      setIsLoading(false);
      ToastAndroid.show('Không có sản phẩm', ToastAndroid.SHORT);
    } else ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
  };
  useEffect(() => {
    searchData(name);
  }, [name]);

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#59B588" />
      <Header title="Trang chủ" />
      <View style={{paddingBottom: 20, backgroundColor: '#59B588'}}>
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: '#59B588',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomColor: '#5D5D5D',
            borderBottomWidth: 1,
          }}>
          <Icon style={{padding: 8}} name="search" size={20} color="#FFF" />

          <TextInput
            style={{
              width: '100%',
              fontSize: 16,
            }}
            placeholder="Tìm kiếm"
            onChangeText={(name) => setName(name)}
            value={name}
            returnKeyType="done"
          />
        </View>
      </View>
      <FlatList
        style={{marginTop: 10}}
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onRefresh={() => getData()}
        refreshing={isloading}
        showsHorizontalScrollIndicator={false}
      />
      <ModalAdd />
    </View>
  );
}

const styles = StyleSheet.create({});
