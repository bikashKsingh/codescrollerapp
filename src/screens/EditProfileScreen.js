import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MyText from '../components/MyText';
import {color, font} from '../helpers/Constants';
import {useNavigation} from '@react-navigation/native';
import Container from '../components/Container';
import Header from '../components/Header';
import {Dropdown} from 'react-native-element-dropdown';
import MyTextInput from '../components/MyTextInput';
import {updateProfile} from '../yupSchemas';
import {useFormik} from 'formik';
import MyButton from '../components/MyButton';
import {UserContext} from '../../context/UserContext';
import {getProtected} from '../utils/api';

import Toast from 'react-native-toast-message';
import LoadingScreen from '../components/LoadingScreen';
import {put} from '../utils/api';

const data = [
  {label: 'male', value: 'male'},
  {label: 'female', value: 'female'},
];

const EditProfileScreen = () => {
  const {state, dispatch} = useContext(UserContext);
  const navigation = useNavigation();
  const isDark = useColorScheme() == 'dark';

  const [userDataLoading, setUserDataLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [value, setValue] = useState(null);

  const initialValues = {
    name: '',
    mobile: '',
    dob: '',
    email: '',
    gender: '',
    state: '',
    city: '',
    address: '',
  };

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    setValues,
  } = useFormik({
    initialValues,
    onSubmit: async (values, helpers) => {
      try {
        setIsLoading(true);
        const apiResponse = await put('/users/update', values, state.jwtToken);

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
            jwtToken: state.jwtToken,
          };

          dispatch({
            type: 'USER',
            payload: payload,
          });
          navigation.goBack();
        } else {
          console.log(apiResponse);
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
    validationSchema: updateProfile,
  });

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <MyText style={styles.textItem}>{item.label}</MyText>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  // getUserDetails
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        setUserDataLoading(true);
        const apiResponse = await getProtected(
          '/users/myProfile',
          state.jwtToken,
        );
        if (apiResponse.status == 200) {
          setValues({
            name: apiResponse?.body?.name,
            mobile: apiResponse?.body?.mobile,
            dob: apiResponse?.body?.dob,
            email: apiResponse?.body?.email,
            gender: apiResponse?.body?.gender,
            address: apiResponse?.body?.address,
            state: apiResponse?.body?.state,
            city: apiResponse?.body?.city,
          });
        }
        setUserDataLoading(false);
      } catch (error) {
        setUserDataLoading(false);
      }
    };

    getUserDetails();
  }, []);
  return (
    <Container>
      <Header title={'Edit Profile'} />
      {userDataLoading ? (
        <LoadingScreen />
      ) : (
        <ScrollView style={styles.container}>
          {/* Name */}
          <MyTextInput
            name={'name'}
            label={
              errors.name && touched.name ? errors.name : 'Entar your name'
            }
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
            // disabled={true}
            placeholder={'Your mobile'}
            value={values.mobile}
            keyboardType={'number-pad'}
            error={errors.mobile && touched.mobile ? true : false}
            onBlur={handleBlur('mobile')}
            changeTextHandler={handleChange('mobile')}
            blurTextHandler={handleBlur('mobile')}
            iconName={'phone'}
            iconSize={14}
          />

          {/* dob */}
          <MyTextInput
            name={'dob'}
            label={errors.dob && touched.dob ? errors.dob : 'Entar your dob'}
            placeholder={'DD-MM-YYYY'}
            value={values.dob}
            error={errors.dob && touched.dob ? true : false}
            onBlur={handleBlur('dob')}
            changeTextHandler={handleChange('dob')}
            blurTextHandler={handleBlur('dob')}
            iconName={'calendar'}
            iconSize={14}
          />

          {/* Email */}
          <MyTextInput
            name={'email'}
            label={
              errors.email && touched.email ? errors.email : 'Entar your email'
            }
            placeholder={'Your email'}
            value={values.email}
            error={errors.email && touched.email ? true : false}
            onBlur={handleBlur('email')}
            changeTextHandler={handleChange('email')}
            blurTextHandler={handleBlur('email')}
            iconName={'envelope-o'}
            iconSize={14}
            // disabled={true}
          />

          {/* Gender */}
          <View style={styles.formGroup}>
            <Dropdown
              style={[
                styles.dropdown,
                {backgroundColor: isDark ? color.black200 : color.white500},
              ]}
              placeholderStyle={[
                styles.placeholderStyle,
                {color: isDark ? color.white400 : color.black500},
                {color: errors.gender && touched.gender ? color.danger : ''},
              ]}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Gender"
              // searchPlaceholder="Search..."
              value={values.gender}
              onChange={item => {
                setValues({...values, gender: item.value});
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color="black"
                  name="Safety"
                  size={17}
                />
              )}
              renderItem={renderItem}
            />
          </View>

          {/* State */}
          <MyTextInput
            name={'state'}
            label={errors.state && touched.state ? errors.state : 'Entar state'}
            placeholder={'Your state'}
            value={values.state}
            error={errors.state && touched.state ? true : false}
            onBlur={handleBlur('state')}
            changeTextHandler={handleChange('state')}
            blurTextHandler={handleBlur('state')}
            iconName={'building-o'}
            iconSize={14}
          />

          {/* City */}
          <MyTextInput
            name={'city'}
            label={errors.city && touched.city ? errors.city : 'Entar city'}
            placeholder={'Your city'}
            value={values.city}
            error={errors.city && touched.city ? true : false}
            onBlur={handleBlur('city')}
            changeTextHandler={handleChange('city')}
            blurTextHandler={handleBlur('city')}
            iconName={'location-arrow'}
            iconSize={14}
          />

          {/* Address */}
          <MyTextInput
            name={'address'}
            label={
              errors.address && touched.address
                ? errors.address
                : 'Entar address'
            }
            placeholder={'Your address'}
            value={values.address}
            error={errors.address && touched.address ? true : false}
            onBlur={handleBlur('address')}
            changeTextHandler={handleChange('address')}
            blurTextHandler={handleBlur('address')}
            iconName={'address-book-o'}
            iconSize={14}
          />

          <MyButton
            title={'Update'}
            loading={isLoading}
            disabled={isLoading}
            handlePress={handleSubmit}
          />
        </ScrollView>
      )}
    </Container>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
    flex: 1,
  },

  formGroup: {
    justifyContent: 'center',
    marginBottom: 20,
  },

  text: {
    color: color.black300,
  },

  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 10,
  },

  dropdown: {
    marginHorizontal: 2,
    backgroundColor: color.white,
    padding: 12,
    // shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginLeft: 7,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: font.regular,
  },
  textItem: {
    flex: 1,
    fontSize: 13,
    fontFamily: font.regular,
  },
  placeholderStyle: {
    fontSize: 13,
    fontFamily: font.regular,
    marginTop: 4,
    marginLeft: 8,
  },
  selectedTextStyle: {
    fontSize: 13,
    fontFamily: font.regular,
    color: color.black,
    marginTop: 4,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 13,
    fontFamily: font.regular,
    color: color.black,
  },
});
