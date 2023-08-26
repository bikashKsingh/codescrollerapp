import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {color, font} from '../helpers/Constants';
import MyText from './MyText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MyButton = props => {
  const {
    title,
    handlePress = () => {},
    disabled = false,
    loading = false,
  } = props;
  const isDark = useColorScheme() == 'dark';

  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        disabled={disabled}
        style={styles.btn}
        onPress={handlePress}>
        {loading ? (
          <ActivityIndicator color={color.white} style={{padding: 3}} />
        ) : (
          <MyText style={styles.btnText}>{title}</MyText>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  btn: {
    backgroundColor: color.primary600,
    paddingVertical: 10,
    paddingHorizontal: 70,
    borderRadius: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    color: color.white,
    fontFamily: font.semiBold,
  },
});
