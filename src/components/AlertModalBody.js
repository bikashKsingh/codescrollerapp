import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyText from './MyText';
import {color, font} from '../helpers/Constants';
import myStyles from '../helpers/Styles';
const AlertModalBody = ({title, text, btnText, handlePress, handleClose}) => {
  const navigation = useNavigation();
  const isDark = useColorScheme() === 'dark';
  const [alertModal, setAlertModal] = useState(true);

  return (
    <View
      style={[
        styles.modalContainer,
        {backgroundColor: isDark ? color.black200 : color.white},
        {shadowColor: isDark ? color.black200 : color.white800},
      ]}>
      {/* Modal Body */}
      <View style={styles.modalBody}>
        <View style={[myStyles.center, myStyles.my1]}>
          <Ionicons
            name={'checkmark-circle-outline'}
            size={100}
            color={color.primary}
          />
        </View>

        <View style={[myStyles.center, myStyles.my2]}>
          <MyText
            style={[
              myStyles.heading,
              {color: isDark ? color.primary : color.primary},
            ]}>
            {title}
          </MyText>
          <MyText
            style={[
              myStyles.text,
              myStyles.textCenter,
              {color: isDark ? color.white : color.black500},
            ]}>
            {text}
          </MyText>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={handlePress}>
            <MyText style={styles.btnText}>{btnText}</MyText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.btnLight,
              {backgroundColor: isDark ? color.black500 : color.primary200},
            ]}
            onPress={handleClose}>
            <MyText style={styles.btnTextLight}>Cancel</MyText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AlertModalBody;

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  btn: {
    backgroundColor: color.primary600,
    paddingVertical: 15,
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
  btnLight: {
    backgroundColor: color.primary200,
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnTextLight: {
    fontSize: 14,
    color: color.primary,
    fontFamily: font.semiBold,
  },

  modalContainer: {
    position: 'absolute',
    elevation: 5,

    flex: 1,
    borderRadius: 20,
    top: '17%',
    height: '60%',
    width: '90%',
    left: '5%',
  },

  modalBody: {
    flex: 1,
    padding: 15,
  },
});
