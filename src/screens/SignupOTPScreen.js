import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import MyText from '../components/MyText';
import {color, font} from '../helpers/Constants';
import {useNavigation} from '@react-navigation/native';
import Container from '../components/Container';
import Header from '../components/Header';
import MyTextInput from '../components/MyTextInput';
import {otpSchema} from '../yupSchemas';
import {useFormik} from 'formik';
import MyButton from '../components/MyButton';
import Toast from 'react-native-toast-message';
import {post} from '../utils/api';
import {UserContext} from '../../context/UserContext';

const SignupOTPScreen = props => {
  const {email, mobile} = props?.route?.params;
  const {state, dispatch} = useContext(UserContext);
  const navigation = useNavigation();
  const isDark = useColorScheme() === 'dark';
  const [counter, setCounter] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpLoading, setOtpLoading] = useState(false);

  // for resend counter
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  const initialValues = {
    otp: '',
  };

  const {values, errors, handleChange, handleBlur, handleSubmit, touched} =
    useFormik({
      initialValues,
      onSubmit: async (values, helpers) => {
        try {
          setIsLoading(true);
          const apiResponse = await post('/users/verifyAccount', {
            ...values,
            email,
          });

          if (apiResponse.status === 200) {
            Toast.show({
              type: 'success',
              text1: apiResponse.message,
            });
            helpers.resetForm();

            const payload = {
              _id: apiResponse?.body?._id,
              name: apiResponse?.body?.name,
              email: apiResponse?.body?.email,
              mobile: apiResponse?.body?.mobile,
              address: apiResponse?.body?.address,
              city: apiResponse?.body?.city,
              landmark: apiResponse?.body?.landmark,
              pincode: apiResponse?.body?.pincode,
              jwtToken: apiResponse?.body?.token,
            };

            dispatch({
              type: 'USER',
              payload: payload,
            });
            navigation.navigate('HomeStackScreen');
          } else {
            if (apiResponse.errors) {
              helpers.setErrors(apiResponse.errors);
              if (apiResponse.errors.error) {
                Toast.show({
                  type: 'danger',
                  text1: apiResponse.errors.error,
                });
              }
            } else {
              Toast.show({
                type: 'danger',
                text1: apiResponse.message,
              });
            }
          }
          setIsLoading(false);
        } catch (error) {
          Toast.show({
            type: 'danger',
            text1: error.message,
          });
          setIsLoading(false);
        }
      },
      validationSchema: otpSchema,
    });

  // handleResendOTP
  const handleResendOTP = async () => {
    try {
      setOtpLoading(true);
      const apiResponse = await post('/users/findAccountAndSendOTP', {
        email,
      });

      if (apiResponse.status === 200) {
        Toast.show({
          type: 'success',
          text1: apiResponse.message,
        });
      } else {
        if (apiResponse?.errors) {
          if (apiResponse.errors.error) {
            Toast.show({
              type: 'danger',
              text1: apiResponse.errors.error,
            });
          }
        } else {
          Toast.show({
            type: 'danger',
            text1: apiResponse.message,
          });
        }
      }
      setOtpLoading(false);
      setCounter(30);
    } catch (error) {
      Toast.show({
        type: 'danger',
        text1: error.message,
      });
      setOtpLoading(false);
    }
  };

  return (
    <Container>
      <View style={{marginTop: 20}}>
        <Header title={'Enter OTP'} />
      </View>
      <ScrollView style={styles.container}>
        {/* Email */}
        <View style={{flex: 1}}>
          <Image
            style={styles.image}
            source={require('../assets/images/enter-otp.png')}
          />
        </View>

        <View style={{flex: 1}}>
          <MyText
            style={[
              styles.text,
              {color: isDark ? color.white : color.black300},
            ]}>
            OTP has send to your email address
          </MyText>

          <MyTextInput
            name={'otp'}
            label={errors.otp && touched.otp ? errors.otp : 'Entar your OTP'}
            placeholder={'1234'}
            value={values.otp}
            error={errors.otp && touched.otp ? true : false}
            onBlur={handleBlur('otp')}
            changeTextHandler={handleChange('otp')}
            blurTextHandler={handleBlur('otp')}
            iconName={'lock'}
            iconSize={16}
            keyboardType={'number-pad'}
          />

          <View style={styles.resendContainer}>
            {counter != 0 ? (
              <MyText
                style={[
                  styles.resendText,
                  {color: isDark ? color.white : color.black400},
                ]}>
                Resend Code in {counter} Sec
              </MyText>
            ) : (
              <TouchableOpacity onPress={handleResendOTP}>
                {isOtpLoading ? (
                  <ActivityIndicator
                    color={isDark ? color.white : color.primary}
                  />
                ) : (
                  <MyText
                    style={{
                      color: color.primary500,
                      fontFamily: font.semiBold,
                    }}>
                    Resend OTP
                  </MyText>
                )}
              </TouchableOpacity>
            )}
          </View>

          <MyButton
            loading={isLoading}
            disabled={isLoading}
            title={'Verify OTP'}
            handlePress={handleSubmit}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default SignupOTPScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },

  image: {
    resizeMode: 'contain',
    height: 300,
    width: '100%',
  },

  resendContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  resendText: {
    fontFamily: font.medium,
  },

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

  text: {
    marginVertical: 15,
    textAlign: 'center',
  },
});
