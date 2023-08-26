import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyText from '../components/MyText';
import {color, font} from '../helpers/Constants';
import Container from '../components/Container';
import Header from '../components/Header';
import DatePicker from 'react-native-date-picker';

const BookingCustomerScreen = () => {
  const navigation = useNavigation();
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const [hidePassword, sethidePassword] = useState(true);
  const [title, setTitle] = useState('Mr.');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const togglePasswordHandler = () => {
    sethidePassword(!hidePassword);
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsVisible(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsVisible(false);
    });
  }, []);

  return (
    <Container>
      <DatePicker
        modal
        open={open}
        date={date}
        mode={'date'}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Header title={'Name of Reservation'} />
      <View style={styles.root}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <TouchableOpacity
              onPress={() => {
                setTitle('Mr.');
              }}
              style={[
                styles.titleBtn,
                {backgroundColor: title == 'Mr.' ? color.primary : null},
              ]}>
              <MyText
                style={{
                  ...styles.titleTxt,
                  color: title == 'Mr.' ? color.white : null,
                }}>
                Mr.
              </MyText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTitle('Mrs.');
              }}
              style={[
                styles.titleBtn,
                {backgroundColor: title == 'Mrs.' ? color.primary : null},
              ]}>
              <MyText
                style={{
                  ...styles.titleTxt,
                  color: title == 'Mrs.' ? color.white : null,
                }}>
                Mrs.
              </MyText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setTitle('Ms.');
              }}
              style={[
                styles.titleBtn,
                {backgroundColor: title == 'Ms.' ? color.primary : null},
              ]}>
              <MyText
                style={{
                  ...styles.titleTxt,
                  color: title == 'Ms.' ? color.white : null,
                }}>
                Ms.
              </MyText>
            </TouchableOpacity>
          </View>

          {/* Name */}
          <View style={styles.formGroup}>
            <TextInput
              placeholderTextColor={color.black400}
              placeholder="Name"
              style={styles.formControl}
            />
          </View>

          {/* Mobile */}
          <View style={styles.formGroup}>
            <TextInput
              placeholderTextColor={color.black400}
              placeholder="Mobile"
              style={styles.formControl}
            />
          </View>

          {/* Email */}
          <View style={styles.formGroup}>
            <TextInput
              placeholderTextColor={color.black400}
              placeholder="Email"
              style={styles.formControl}
            />
          </View>

          {/* Date */}
          <View style={styles.formGroup}>
            <TextInput
              onFocus={() => {
                setOpen(true);
              }}
              onTextInput={() => {
                setOpen(true);
              }}
              placeholderTextColor={color.black400}
              placeholder="Date"
              value={date.toDateString()}
              style={styles.formControl}
            />

            <TouchableOpacity
              style={styles.formIconBtn}
              onPress={togglePasswordHandler}>
              <Ionicons
                name={'calendar-outline'}
                color={color.black400}
                size={20}
                style={styles.formIcon}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* Btn */}
        <View style={styles.btnContainer}>
          {!keyboardIsVisible && (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                navigation.navigate('BookingPaymentStackScreen');
              }}>
              <MyText style={styles.btnText}>Continue</MyText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Container>
  );
};

export default BookingCustomerScreen;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: color.white,
  },
  container: {
    paddingTop: 10,
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  titleBtn: {
    borderWidth: 2,
    borderColor: color.primary,
    paddingVertical: 6,
    paddingHorizontal: 40,
    borderRadius: 100,
  },
  titleTxt: {color: color.primary, fontFamily: font.medium},
  formGroup: {
    justifyContent: 'center',
    marginVertical: 15,
  },
  formControl: {
    fontFamily: font.regular,
    backgroundColor: color.primary100,
    color: color.black,
    paddingVertical: 15,
    paddingLeft: 20,
    borderRadius: 20,
    position: 'relative',
    fontSize: 13,
  },
  formIcon: {
    position: 'absolute',
    marginLeft: 15,
    top: 17,
  },
  formIconBtn: {
    position: 'absolute',
    marginLeft: 15,
    right: '15%',
    top: 0,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  btn: {
    backgroundColor: color.primary600,
    paddingVertical: 12,
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
