import React from 'react';
import {View, StyleSheet} from 'react-native';
import Spinner from 'react-native-spinkit';

import {Dimensions} from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function Loading(props) {
  return (
    <View style={props.flag == 1 ? styles.container : {display: 'none'}}>
      <View style={styles.overlay}></View>
      <Spinner isVisible={true} size={80} type={'9CubeGrid'} color={'white'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'black',
    opacity: 0.6,
  },
});
