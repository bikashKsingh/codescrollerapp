import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyText from '../components/MyText';
import {color, font} from '../helpers/Constants';
import {Checkbox} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import Container from '../components/Container';
import Toast from 'react-native-toast-message';
import {signupSchema} from '../yupSchemas';
import {useFormik} from 'formik';
import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton';
import {post} from '../utils/api';
import {UserContext} from '../../context/UserContext';

const SignupScreen = () => {
  const navigation = useNavigation();
  const isDark = useColorScheme() == 'dark';
  const [isLoading, setIsLoading] = useState(false);
  const {state, dispatch} = useContext(UserContext);

  const initialValues = {
    name: '',
    mobile: '',
    email: '',
    password: '',
    cPassword: '',
  };

  const {values, errors, handleChange, handleBlur, handleSubmit, touched} =
    useFormik({
      initialValues,
      onSubmit: async (values, helpers) => {
        try {
          setIsLoading(true);
          const apiResponse = await post('/users/register', values);

          if (apiResponse.status === 200) {
            Toast.show({
              type: 'success',
              text1: apiResponse.message,
            });
            helpers.resetForm();
            navigation.navigate('SignupOTPStackScreen', {
              email: apiResponse?.body?.email,
              mobile: apiResponse?.body?.mobile,
            });
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
      validationSchema: signupSchema,
    });

  return (
    <Container>
      <Header />

      <ScrollView style={styles.container}>
        <MyText
          style={[styles.title, {color: isDark ? color.white : color.black}]}>
          Create an Account
        </MyText>

        {/* Form */}

        {/* Name */}
        <MyTextInput
          name={'name'}
          label={errors.name && touched.name ? errors.name : 'Entar your name'}
          placeholder={'Your name'}
          value={values.name}
          error={errors.name && touched.name ? true : false}
          onBlur={handleBlur('name')}
          changeTextHandler={handleChange('name')}
          blurTextHandler={handleBlur('name')}
          iconName={'user'}
          iconSize={14}
        />

        {/* Mobile */}
        <MyTextInput
          name={'mobile'}
          label={
            errors.mobile && touched.mobile
              ? errors.mobile
              : 'Entar your mobile'
          }
          placeholder={'Your mobile'}
          value={values.mobile}
          error={errors.mobile && touched.mobile ? true : false}
          onBlur={handleBlur('mobile')}
          changeTextHandler={handleChange('mobile')}
          blurTextHandler={handleBlur('mobile')}
          iconName={'phone'}
          iconSize={14}
          keyboardType={'number-pad'}
        />

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

        {/* Password */}
        <MyTextInput
          name={'password'}
          label={
            errors.password && touched.password
              ? errors.password
              : 'Entar your password'
          }
          placeholder={'******'}
          value={values.password}
          error={errors.password && touched.password ? true : false}
          onBlur={handleBlur('password')}
          changeTextHandler={handleChange('password')}
          blurTextHandler={handleBlur('password')}
          iconName={'lock'}
          iconSize={18}
          passwordField={true}
          secureTextEntry={true}
        />

        {/* Confirm Password */}
        <MyTextInput
          name={'cPassword'}
          label={
            errors.cPassword && touched.cPassword
              ? errors.cPassword
              : 'Entar Conrirm Password'
          }
          placeholder={'******'}
          value={values.cPassword}
          error={errors.cPassword && touched.cPassword ? true : false}
          onBlur={handleBlur('cPassword')}
          changeTextHandler={handleChange('cPassword')}
          blurTextHandler={handleBlur('cPassword')}
          iconName={'lock'}
          iconSize={18}
          passwordField={true}
          secureTextEntry={true}
        />

        <MyButton
          loading={isLoading}
          disabled={isLoading}
          title={'Sign up'}
          handlePress={handleSubmit}
        />

        <View style={styles.lineContainer}>
          <View style={styles.line}></View>
          <MyText
            style={[
              styles.text,
              {color: isDark ? color.white : color.black300},
            ]}>
            Or Continue with
          </MyText>
          <View style={styles.line}></View>
        </View>

        {/* Social Icon */}
        <View style={styles.socialIconContainer}>
          {/* Facebook */}
          <TouchableOpacity
            style={[
              styles.socialBtn,
              {backgroundColor: isDark ? color.black700 : color.white400},
              {borderColor: isDark ? color.black400 : color.white600},
            ]}>
            <MaterialIcons name="facebook" color={color.facebook} size={30} />
          </TouchableOpacity>

          {/* Google  */}
          <TouchableOpacity
            style={[
              styles.socialBtn,
              {backgroundColor: isDark ? color.black700 : color.white400},
              {borderColor: isDark ? color.black400 : color.white600},
            ]}>
            <FontAwesome name="google" color={color.google} size={30} />
          </TouchableOpacity>
        </View>

        <View style={styles.center}>
          <MyText
            style={[
              styles.text,
              {color: isDark ? color.white : color.black300},
            ]}>
            Already have an account?
          </MyText>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LoginStackScreen');
            }}>
            <MyText style={styles.signText}>Sign in</MyText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  root: {
    padding: 20,
    flex: 1,
    backgroundColor: color.white,
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    fontSize: 35,
    fontFamily: font.semiBold,
    color: color.black,
    marginBottom: 20,
  },

  rememberMeText: {
    color: color.black,
    marginTop: 2,
    marginLeft: 5,
  },

  lineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: color.white800,
  },
  text: {
    color: color.black300,
  },

  // Social Login
  socialIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginVertical: 10,
  },

  socialBtn: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderColor: color.white600,
    borderWidth: 1,
  },

  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 10,
  },
  signText: {
    color: color.primary,
  },
});
