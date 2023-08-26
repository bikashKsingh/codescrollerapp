import React, {useState, useEffect} from 'react';
import MyText from './MyText';
import {View, TouchableOpacity, StyleSheet, useColorScheme} from 'react-native';
import {color, font} from '../helpers/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReviewCard from './ReviewCard';
import {useNavigation} from '@react-navigation/native';
import {get} from '../utils/api';

const CourseReviewTabDetails = props => {
  const isDark = useColorScheme() == 'dark';
  const navigation = useNavigation();
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [avarageRatings, setAvarageRatings] = useState(0);

  // getCourseReviews
  useEffect(() => {
    const getCourseReviews = async () => {
      setReviewLoading(true);
      try {
        const apiResponse = await get(
          `/reviews?course=${props.courseId}&reviewStatus=approved`,
        );
        if (apiResponse.status == 200) {
          setReviews(apiResponse.body);
          setTotalRecords(apiResponse.totalRecords);
          setAvarageRatings(apiResponse?.averageRating);
        }
        setReviewLoading(false);
      } catch (error) {
        setReviewLoading(false);
      }
    };

    getCourseReviews();
  }, [props.courseId]);

  return (
    <View style={styles.section}>
      <View style={[styles.headingContainer]}>
        <View style={styles.row}>
          <Ionicons size={19} name={'star'} color={color.primary} />
          <MyText
            style={[
              styles.heading,
              {color: isDark ? color.white : color.black800},
            ]}>
            {avarageRatings} ({totalRecords} Reviews)
          </MyText>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('ReviewStackScreen', {
              courseId: props?.courseId,
              sellingPrice: props?.sellingPrice,
            });
          }}>
          <MyText style={styles.btnText}>See All</MyText>
        </TouchableOpacity>
      </View>
      {reviews.map(review => {
        return (
          <ReviewCard
            key={review._id}
            name={review?.user?.name}
            ratings={review.ratings}
            comment={review.comment}
            createdAt={review.createdAt}
            // onPressHandler={() => navigation.navigate('ReviewStackScreen')}
          />
        );
      })}

      <TouchableOpacity
        style={styles.btnLight}
        onPress={() =>
          navigation.navigate('MakeReviewStackScreen', {
            courseId: props?.courseId,
          })
        }>
        <MyText style={styles.btnLightText}>Make Review</MyText>
      </TouchableOpacity>
    </View>
  );
};

export default CourseReviewTabDetails;
const styles = StyleSheet.create({
  section: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 5,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },

  mentorCard: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  mentorImage: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  mentorName: {
    fontSize: 16,
    fontFamily: font.semiBold,
  },
  mentorDesignation: {
    fontSize: 15,
    fontFamily: font.regular,
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
    fontSize: 17,
  },
  btnText: {
    fontSize: 16,
    fontFamily: font.semiBold,
    color: color.primary,
  },

  detailCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailText: {
    fontFamily: font.medium,
    marginTop: 5,
    color: color.black500,
    fontSize: 14,
  },
  btnLight: {
    backgroundColor: color.primary200,
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginVertical: 10,
  },
  btnLightText: {
    color: color.primary,
    fontFamily: font.medium,
  },
});
