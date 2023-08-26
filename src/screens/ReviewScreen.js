import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import ReviewCard from '../components/ReviewCard';
import MyText from '../components/MyText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color, font} from '../helpers/Constants';
import {useNavigation} from '@react-navigation/native';
import RatingTabs from '../components/RatingTabs';
import MyButton from '../components/MyButton';
import {get} from '../utils/api';

const ReviewScreen = ({route}) => {
  const {courseId, sellingPrice} = route?.params;
  const navigation = useNavigation();
  const isDark = useColorScheme() == 'dark';
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dataLoadOnRefresh, setDataLoadOnRefresh] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [avarageRatings, setAvarageRatings] = useState(0);
  const [selectedRating, setSelectedRating] = useState(null);

  // getCourseReviews
  useEffect(() => {
    const getCourseReviews = async () => {
      setReviewLoading(true);
      try {
        let url = `/reviews?course=${courseId}&reviewStatus=approved`;
        if (selectedRating) url += `&ratings=${selectedRating}`;

        const apiResponse = await get(url);
        if (apiResponse.status == 200) {
          setReviews(apiResponse.body);
          setTotalRecords(apiResponse.totalRecords);
          setAvarageRatings(apiResponse.averageRating);
        }

        setReviewLoading(false);
      } catch (error) {
        setReviewLoading(false);
      }
    };

    getCourseReviews();
  }, [courseId, dataLoadOnRefresh, selectedRating]);

  const onRefresh = () => {
    setIsRefreshing(false);
    setDataLoadOnRefresh(!dataLoadOnRefresh);
  };

  // handleRatingChange
  const handleRatingChange = rating => {
    setSelectedRating(rating);
  };

  return (
    <Container>
      <Header title={'Reviews'} />

      <View style={styles.root}>
        <RatingTabs handleRatingChange={handleRatingChange} />
        {/* Description Section */}
        <View style={styles.section}>
          <View style={[styles.headingContainer]}>
            <MyText
              style={[
                styles.heading,
                {color: isDark ? color.white : color.black800},
              ]}>
              Ratings
            </MyText>
            <View style={styles.row}>
              <Ionicons
                name={'star'}
                style={styles.star}
                color={color.star}
                size={17}
              />
              <MyText style={styles.rating}>{avarageRatings}</MyText>
              <MyText
                style={[
                  styles.smallText,
                  {color: isDark ? color.white500 : color.black300},
                ]}>
                ({totalRecords} Reviews)
              </MyText>
            </View>
          </View>
        </View>

        {/* <TouchableOpacity
          style={styles.btnLight}
          onPress={() =>
            navigation.navigate('MakeReviewStackScreen', {
              courseId,
            })
          }>
          <MyText style={styles.btnLightText}>Make Review</MyText>
        </TouchableOpacity> */}

        <FlatList
          showsVerticalScrollIndicator={false}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          renderItem={({item}) => {
            return (
              <ReviewCard
                name={item?.user?.name}
                ratings={item?.ratings}
                comment={item?.comment}
                createdAt={item?.createdAt}
              />
            );
          }}
          data={reviews}
          keyExtractor={item => `review-${item._id}`}
        />
      </View>
      <View style={styles.footer}>
        <MyButton
          handlePress={() => {
            navigation.navigate('CourseCheckoutStackScreen', {
              courseId,
            });
          }}
          title={`Enroll Course - ₹${sellingPrice}`}
        />
      </View>
    </Container>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 0,
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
  rating: {
    fontSize: 15,
    fontFamily: font.semiBold,
    color: color.primary,
  },
  smallText: {
    fontSize: 13,
    fontFamily: font.medium,
    marginTop: 3,
  },
  row: {
    flexDirection: 'row',
    gap: 5,
  },
  footer: {
    paddingHorizontal: 20,
    borderWidth: 0.5,
    borderColor: color.white700,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
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
