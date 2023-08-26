import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  useColorScheme,
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
import {useToast} from 'react-native-toast-notifications';
import {ActivityIndicator} from 'react-native-paper';
import {post} from '../utils/api';

const ForgotPasswordOTPScreen = ({route}) => {
  const {email} = route?.params;
  const toast = useToast();
  const navigation = useNavigation();
  const isDark = useColorScheme() === 'dark';
  const [counter, setCounter] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [resendOTPLoading, setResendOTPLoading] = useState(false);

  // counter
  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
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
          const apiResponse = await post('/users/verifyForgotPasswordOtp', {
            ...values,
            email,
          });

          if (apiResponse.status === 200) {
            toast.show(apiResponse.message, {
              type: 'success',
              title: 'Forgot Password',
            });

            helpers.resetForm();
            navigation.navigate('CreatePasswordStackScreen', {
              token: apiResponse?.body?.token,
            });
          } else {
            if (apiResponse.errors) {
              helpers.setErrors(apiResponse.errors);
              if (apiResponse?.errors?.error) {
                toast.show(apiResponse?.errors?.error, {
                  type: 'danger',
                  title: 'Error',
                });
              }
            } else {
              toast.show(apiResponse.message, {
                type: 'danger',
                title: 'Error',
              });
            }
          }
          setIsLoading(false);
        } catch (error) {
          toast.show(error.message, {
            type: 'danger',
            title: 'Error',
          });
          setIsLoading(false);
        }
      },

      validationSchema: otpSchema,
    });

  // handleResendOTP
  const handleResendOTP = async () => {
    try {
      setResendOTPLoading(true);
      const apiResponse = await post('/users/forgetPassword', {email});

      if (apiResponse.status === 200) {
        toast.show(apiResponse.message, {
          type: 'success',
          title: 'Forgot Password',
        });
        setCounter(30);
      } else {
        if (apiResponse.errors) {
          if (apiResponse?.errors?.error) {
            toast.show(apiResponse?.errors?.error, {
              type: 'danger',
              title: 'Error',
            });
          }
        } else {
          toast.show(apiResponse.message, {
            type: 'danger',
            title: 'Error',
          });
        }
      }
      setResendOTPLoading(false);
    } catch (error) {
      toast.show(error.message, {
        type: 'danger',
        title: 'Error',
      });
      setResendOTPLoading(false);
    }
  };

  return (
    <Container>
      <View style={{marginTop: 20}}>
        <Header title={'Enter OTP'} />
      </View>
      <ScrollView style={styles.container}>
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
          {/* OTP */}

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
                {resendOTPLoading ? (
                  <ActivityIndicator color={color.primary} />
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

export default ForgotPasswordOTPScreen;

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

  text: {
    marginVertical: 15,
    textAlign: 'center',
  },
});
