import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ToastAndroid,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import Header from '../components/Header';
import ModalAdd from '../components/ModalAdd';
import Item from '../components/ItemFlatList';
import {GetAllProducts} from '../server/products/server';
import {ScrollView} from 'react-native-gesture-handler';

export default function HomeScreen() {
  const [listData, setListData] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const renderItem = ({item}) => (
    <Item
      name={item.name}
      price={item.price}
      description={item.description}
      id={item.id}
    />
  );

  getData = async () => {
    const data = await GetAllProducts();
    if (data.code === 200) {
      return setListData(data.sanpham), setIsLoading(false);
    } else if (data.code === 201) {
      ToastAndroid.show('Không có sản phẩm', ToastAndroid.SHORT);
    } else ToastAndroid.show('Lỗi', ToastAndroid.SHORT);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={{flex: 1}}>
      <Header title="Trang chủ" />
      {
        <FlatList
          style={{marginTop: 10}}
          data={listData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onRefresh={() => getData()}
          refreshing={isloading}
        />
      }
      <ScrollView></ScrollView>
      <ModalAdd />
    </View>
  );
}

const styles = StyleSheet.create({});
