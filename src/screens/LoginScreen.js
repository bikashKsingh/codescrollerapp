import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyText from '../components/MyText';
import {color, font} from '../helpers/Constants';
import {Checkbox} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Container from '../components/Container';
import Header from '../components/Header';
import MyTextInput from '../components/MyTextInput';
import {loginSchema} from '../yupSchemas';
import {useFormik} from 'formik';
import MyButton from '../components/MyButton';
import {UserContext} from '../../context/UserContext';
import {post} from '../utils/api';
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
  const isDark = useColorScheme() == 'dark';
  const {state, dispatch} = useContext(UserContext);
  const navigation = useNavigation();
  const [checked, setChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    email: '',
    password: '',
  };

  const {values, errors, handleChange, handleBlur, handleSubmit, touched} =
    useFormik({
      initialValues,
      onSubmit: async (values, helpers) => {
        try {
          setIsLoading(true);
          const apiResponse = await post('/users/login', values);

          if (apiResponse.status === 200) {
            Toast.show({
              type: 'success',
              text1: apiResponse.message,
            });
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

            helpers.resetForm();
            navigation.goBack();
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
      validationSchema: loginSchema,
    });

  return (
    <Container>
      <Header />
      <ScrollView style={styles.container}>
        <MyText
          style={[styles.title, {color: isDark ? color.white : color.black}]}>
          Login to Your Account
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

        {/* Remember me */}
        <View style={styles.remembeMeContainer}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
            color={color.primary}
            uncheckedColor={color.primary}
          />
          <MyText
            style={[
              styles.rememberMeText,
              {color: isDark ? color.white : color.black},
            ]}>
            Remember me
          </MyText>
        </View>

        <MyButton
          title={'Log in'}
          loading={isLoading}
          disabled={isLoading}
          handlePress={handleSubmit}
        />
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={{marginTop: 20}}
            onPress={() => {
              navigation.navigate('ForgotPasswordStackScreen');
            }}>
            <MyText style={{...styles.signText, fontFamily: font.semiBold}}>
              Forgot your Password?
            </MyText>
          </TouchableOpacity>
        </View>

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
            Don't have an account?
          </MyText>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignupStackScreen');
            }}>
            <MyText style={styles.signText}>Create Account</MyText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    fontSize: 35,
    marginVertical: 20,
    fontFamily: font.semiBold,
  },
  formGroup: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  formControl: {
    fontFamily: font.regular,
    backgroundColor: color.white500,
    color: color.black,
    paddingVertical: 13,
    paddingLeft: 42,
    borderRadius: 10,
    position: 'relative',
    fontSize: 13,
  },
  formIcon: {
    position: 'absolute',
    marginLeft: 15,
    top: 17,
  },
  togglePwdBtn: {
    position: 'absolute',
    marginLeft: 15,
    right: '15%',
    top: 0,
  },
  remembeMeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rememberMeText: {
    marginTop: 2,
    marginLeft: 5,
  },

  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
  text: {},

  // Social Login
  socialIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginVertical: 10,
  },

  socialBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
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
