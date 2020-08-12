import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

export default function Header(props) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: '#59B588',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Icon name={'menuunfold'} size={24} color={'#fff'} />
      </TouchableOpacity>
      <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
        {props.title}
      </Text>
      <View style={{width: 24, height: 24}} />
    </View>
  );
}

const styles = StyleSheet.create({});
