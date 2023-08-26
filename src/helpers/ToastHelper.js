import {View, StyleSheet} from 'react-native';
import MyText from '../components/MyText';
import {color, font} from './Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const toastConfig = {
  success: ({text1, props}) => (
    <View style={[styles.toastContainer, styles.success]}>
      <Ionicons
        name={'checkmark-circle-outline'}
        color={color.light}
        size={25}
      />
      <MyText style={styles.text1}>{text1}</MyText>
    </View>
  ),

  danger: ({text1, props}) => (
    <View style={[styles.toastContainer, styles.danger]}>
      <Ionicons name={'close-circle-outline'} color={color.light} size={25} />
      <MyText style={styles.text1}>{text1}</MyText>
    </View>
  ),
};

export {toastConfig};

export const renderType = {
  success: toast => (
    <View
      style={{
        width: '95%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
        marginVertical: 4,
        borderRadius: 8,
        borderLeftColor: '#00C851',
        borderLeftWidth: 6,
        justifyContent: 'center',
        paddingLeft: 16,
      }}>
      <MyText
        style={{
          fontSize: 14,
          color: '#333',
          fontFamily: font.regular,
        }}>
        {toast.title}
      </MyText>
      <MyText
        style={{
          color: '#a3a3a3',
          marginTop: 2,
          fontFamily: font.regular,
        }}>
        {toast.message}
      </MyText>
    </View>
  ),
  danger: toast => (
    <View
      style={{
        width: '95%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
        marginVertical: 4,
        borderRadius: 8,
        borderLeftColor: color.danger,
        borderLeftWidth: 6,
        justifyContent: 'center',
        paddingLeft: 16,
      }}>
      <MyText
        style={{
          fontSize: 14,
          color: '#333',
          fontFamily: font.regular,
        }}>
        {toast.title}
      </MyText>
      <MyText
        style={{
          color: '#a3a3a3',
          marginTop: 2,
          fontFamily: font.regular,
        }}>
        {toast.message}
      </MyText>
    </View>
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    height: 50,
    width: '90%',
    borderRadius: 5,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  success: {
    backgroundColor: color.success,
  },
  danger: {
    backgroundColor: color.danger,
  },
  text1: {
    color: color.light,
  },
  text2: {
    fontSize: 12,
    color: color.light,
  },
});
