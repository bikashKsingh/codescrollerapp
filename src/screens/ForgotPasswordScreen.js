import React, {useState} from 'react';
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
import {forgotPasswordSchema} from '../yupSchemas';
import {useFormik} from 'formik';
import MyButton from '../components/MyButton';
import {post} from '../utils/api';
import {useToast} from 'react-native-toast-notifications';
const ForgotPasswordScreen = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const isDark = useColorScheme() == 'dark';
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    email: '',
  };

  const {values, errors, handleChange, handleBlur, handleSubmit, touched} =
    useFormik({
      initialValues,
      onSubmit: async (values, helpers) => {
        try {
          setIsLoading(true);
          const apiResponse = await post('/users/forgetPassword', values);

          if (apiResponse.status === 200) {
            toast.show(apiResponse.message, {
              type: 'success',
              title: 'Forgot Password',
            });

            helpers.resetForm();
            navigation.navigate('ForgotPasswordOTPStackScreen', {
              email: values.email,
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
      validationSchema: forgotPasswordSchema,
    });

  return (
    <Container>
      <View style={{marginTop: 20}}>
        <Header title={'Forgot Password'} />
      </View>
      <ScrollView style={styles.container}>
        {/* Email */}
        <View style={{flex: 1}}>
          <Image
            style={styles.image}
            source={require('../assets/images/lock.png')}
          />
        </View>

        <View style={{flex: 1}}>
          <MyText
            style={[
              styles.text,
              {color: isDark ? color.white : color.black300},
            ]}>
            First you have to find your account, So enter your registered Email
            address
          </MyText>

          {/* Email */}
          <MyTextInput
            name={'email'}
            label={
              errors.email && touched.email ? errors.email : 'Entar your email'
            }
            placeholder={'bikash@auxous.com'}
            value={values.email}
            error={errors.email && touched.email ? true : false}
            onBlur={handleBlur('email')}
            changeTextHandler={handleChange('email')}
            blurTextHandler={handleBlur('email')}
            iconName={'envelope'}
            iconSize={14}
          />

          <MyButton
            loading={isLoading}
            disabled={isLoading}
            title={'Continue'}
            handlePress={handleSubmit}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },

  image: {
    resizeMode: 'contain',
    height: 350,
  },

  text: {
    textAlign: 'center',
    marginVertical: 15,
  },
});
