import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, useColorScheme} from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import MyText from '../components/MyText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {color, font} from '../helpers/Constants';
import {useNavigation} from '@react-navigation/native';
import MyButton from '../components/MyButton';
import {get, postProtected} from '../utils/api';
import MyCard from '../components/MyCard';
import MyTextInput from '../components/MyTextInput';
import {UserContext} from '../../context/UserContext';
import {useToast} from 'react-native-toast-notifications';
const CourseCheckoutScreen = ({route}) => {
  const toast = useToast();
  const {state, dispatch} = useContext(UserContext);
  const {courseId} = route?.params;
  const navigation = useNavigation();
  const isDark = useColorScheme() == 'dark';
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [dataLoadOnRefresh, setDataLoadOnRefresh] = useState(false);
  const [course, setCourse] = useState({});
  const [courseLoading, setCourseLoading] = useState(true);
  const [appliedCoupon, setAppliedCoupon] = useState({
    couponCode: '',
    discountAmount: '',
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [subTotalAmount, setSubTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // getCourseData
  useEffect(() => {
    const getCourseData = async () => {
      setCourseLoading(true);
      try {
        const apiResponse = await get(`/courses/${courseId}`);
        if (apiResponse.status == 200) {
          setCourse(apiResponse.body);
          setTotalAmount(apiResponse?.body?.sellingPrice);
          setSubTotalAmount(apiResponse?.body?.sellingPrice);
        }
        setCourseLoading(false);
      } catch (error) {
        setCourseLoading(false);
      }
    };

    getCourseData();
  }, [courseId, dataLoadOnRefresh]);

  const onRefresh = () => {
    setIsRefreshing(false);
    setDataLoadOnRefresh(!dataLoadOnRefresh);
  };

  // handleSubmit
  const handleSubmit = async () => {
    try {
      const newCourse = {
        course: courseId,
        courseName: course?.name,
        courseMrp: course?.mrp,
        courseSellingPrice: course?.sellingPrice,
        totalAmount: totalAmount,
        subTotalAmount: subTotalAmount,
        isPaid: course?.isPaid || false,
        courseValidity: course?.validity,
        isReturnable: course?.isReturnable,
        returnDays: course?.returnDays,
        thumbnail: course?.thumbnail,
      };

      setIsLoading(true);
      const apiResponse = await postProtected(
        '/purchasedCourses',
        newCourse,
        state?.jwtToken,
      );

      if (apiResponse.status === 200) {
        toast.show(apiResponse.message, {
          type: 'success',
          title: 'Course',
        });
        navigation.goBack();
      } else {
        if (apiResponse.errors) {
          const errors = apiResponse.errors;
          const keys = Object.keys(errors);
          keys.forEach(function (key) {
            toast.show(errors[key], {
              type: 'danger',
              title: key,
            });
          });
        }
        if (apiResponse.message)
          toast.show(apiResponse.message, {
            type: 'danger',
            title: 'Error',
          });
      }
      setIsLoading(false);
    } catch (error) {
      toast.show(error.message, {
        type: 'danger',
        title: 'Error',
      });
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Header title={'Enroll Course'} />

      <View style={styles.root}>
        {/* Payment Method */}
        <View style={styles.section}>
          <MyText
            style={[
              styles.heading,
              {color: isDark ? color.white : color.black800},
            ]}>
            Payment Method
          </MyText>
          <MyText style={styles.smallText}>
            Please select the payment method
          </MyText>
        </View>

        {/* Payment Card */}
        <View style={styles.section}>
          <MyCard>
            <View style={[styles.cardBody, styles.row]}>
              <FontAwesome name={'credit-card'} />
              <MyText>UPI Payment</MyText>
            </View>
          </MyCard>
        </View>

        {/* Coupon Section */}
        <View style={styles.section}>
          <MyText
            style={[
              styles.heading,
              {color: isDark ? color.white : color.black800},
            ]}>
            Coupon Code
          </MyText>
          <MyText style={styles.smallText}>Do you have coupon code?</MyText>

          <View style={{paddingHorizontal: 6, marginTop: 10}}>
            <MyTextInput
              name={'email'}
              label={'Entar coupon code'}
              placeholder={'Enter coupon'}
              value={''}
              error={false}
              //   onBlur={handleBlur('email')}
              //   changeTextHandler={handleChange('email')}
              //   blurTextHandler={handleBlur('email')}
              iconName={'envelope'}
              iconSize={14}
            />
          </View>
        </View>

        {/* Course Summary */}
        <View style={styles.section}>
          <MyText
            style={[
              styles.heading,
              {color: isDark ? color.white : color.black800},
            ]}>
            Course Summary
          </MyText>

          <View style={styles.table}>
            <View style={styles.tr}>
              <MyText>Original Price</MyText>
              <MyText>₹{course?.sellingPrice}</MyText>
            </View>
            <View style={styles.tr}>
              <MyText>Discount</MyText>
              <MyText>₹{0}</MyText>
            </View>
            <View style={styles.tr}>
              <MyText>Subtotal</MyText>
              <MyText>₹{subTotalAmount}</MyText>
            </View>
            <View style={styles.devider}></View>
            <View style={styles.tr}>
              <MyText style={styles.subHeading}>Total</MyText>
              <MyText style={styles.subHeading}>₹{totalAmount}</MyText>
            </View>
          </View>
        </View>
      </View>

      {/* Button */}
      <View style={styles.footer}>
        <MyButton
          title={`Purchase Course`}
          loading={isLoading}
          disabled={isLoading}
          handlePress={handleSubmit}
        />
      </View>
    </Container>
  );
};

export default CourseCheckoutScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 0,
    marginBottom: 20,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  heading: {
    fontFamily: font.semiBold,
    fontSize: 16,
  },

  subHeading: {
    fontFamily: font.semiBold,
    fontSize: 14,
  },

  smallText: {
    fontSize: 13,
    fontFamily: font.medium,
    marginTop: 3,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  cardBody: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  table: {
    paddingVertical: 10,
  },
  tr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  devider: {
    borderBottomColor: color.primary,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  footer: {
    paddingHorizontal: 20,
    borderWidth: 0.5,
    borderColor: color.white700,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
});
