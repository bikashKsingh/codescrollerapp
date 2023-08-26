import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Modal,
  useColorScheme,
} from 'react-native';
import MyText from '../components/MyText';
import {color, font} from '../helpers/Constants';
import {useNavigation} from '@react-navigation/native';
import Container from '../components/Container';
import Header from '../components/Header';
import AlertModalBody from '../components/AlertModalBody';
import myStyles from '../helpers/Styles';
import MyTextInput from '../components/MyTextInput';
import {createNewPasswordSchema} from '../yupSchemas';
import {useFormik} from 'formik';
import MyButton from '../components/MyButton';
import {useToast} from 'react-native-toast-notifications';
import {postProtected} from '../utils/api';

const CreatePasswordScreen = ({route}) => {
  const {token: jwtToken} = route?.params;
  const toast = useToast();
  const navigation = useNavigation();
  const isDark = useColorScheme() == 'dark';
  const [isLoading, setIsLoading] = useState(false);
  const [alertModal, setAlertModal] = useState(false);

  const initialValues = {
    password: '',
    cPassword: '',
  };

  const {values, errors, handleChange, handleBlur, handleSubmit, touched} =
    useFormik({
      initialValues,
      onSubmit: async (values, helpers) => {
        try {
          setIsLoading(true);
          const apiResponse = await postProtected(
            '/users/createNewPassword',
            values,
            jwtToken,
          );

          if (apiResponse.status === 200) {
            toast.show(apiResponse.message, {
              type: 'success',
              title: 'Forgot Password',
            });
            helpers.resetForm();
            setAlertModal(true);
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

      validationSchema: createNewPasswordSchema,
    });

  return (
    <Container>
      <View style={{marginTop: 20}}>
        <Header title={'Create New Password'} />
      </View>
      <ScrollView style={styles.container}>
        {/* Email */}
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image
            style={styles.image}
            source={require('../assets/images/shield.png')}
          />
        </View>

        <View style={{flex: 1}}>
          <MyText
            style={[
              styles.text,
              {color: isDark ? color.white : color.black300},
            ]}>
            Create your new password
          </MyText>

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
            title={'Create Password'}
            handlePress={handleSubmit}
          />
        </View>
      </ScrollView>

      {/* Alert Modal */}
      <Modal
        visible={alertModal}
        transparent={true}
        onDismiss={() => setAlertModal(fasle)}
        animationType="slide"
        onRequestClose={() => setAlertModal(false)}>
        <TouchableWithoutFeedback
          onPress={() => {
            // setAlertModal(false);
          }}>
          <View style={myStyles.modalOverlay} />
        </TouchableWithoutFeedback>
        <AlertModalBody
          title={'Congratulations!'}
          text={'Your have successfully created new password'}
          handleClose={() => {
            setAlertModal(false);
            navigation.navigate('LoginStackScreen');
          }}
          btnText={'Login your account'}
          handlePress={() => {
            setAlertModal(false);
            navigation.navigate('LoginStackScreen');
          }}
        />
      </Modal>
    </Container>
  );
};

export default CreatePasswordScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },

  image: {
    resizeMode: 'stretch',
    marginVertical: 40,
    height: 220,
    width: 200,
  },

  text: {
    marginVertical: 15,
    textAlign: 'center',
  },
});
