import React, {useState, useContext} from 'react';
import {View, StyleSheet, useColorScheme} from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import MyText from '../components/MyText';
import {color, font} from '../helpers/Constants';
import MyButton from '../components/MyButton';
import {Rating} from 'react-native-ratings';
import {TextInput} from 'react-native-paper';
import {postProtected} from '../utils/api';
import Toast from 'react-native-toast-message';
import {UserContext} from '../../context/UserContext';
import {useNavigation} from '@react-navigation/native';

const MakeReviewScreen = ({route}) => {
  const {courseId} = route?.params;

  const navigation = useNavigation();
  const {state, dispatch} = useContext(UserContext);
  const isDark = useColorScheme() == 'dark';
  const ratingChangeHandler = selectedRating => {
    setRatings(selectedRating);
  };

  const [comment, setComment] = useState('');
  const [ratings, setRatings] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  // handleSubmit
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const apiResponse = await postProtected(
        '/reviews',
        {comment, ratings, course: courseId},
        state?.jwtToken,
      );

      if (apiResponse.status === 200) {
        Toast.show({
          type: 'success',
          text1: apiResponse.message,
        });

        navigation.goBack();
      } else {
        const errors = apiResponse.errors;
        const errorKeys = Object.keys(errors);
        errorKeys.forEach(errorKey => {
          Toast.show({
            type: 'danger',
            text1: errors[errorKey],
          });
        });

        if (apiResponse.errors) {
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
  };

  return (
    <Container>
      <Header title={'Feedback'} />

      <View style={styles.root}>
        <MyText
          style={[styles.heading, {color: isDark ? color.white : color.black}]}>
          Rate your Experience
        </MyText>
        <MyText
          style={[
            styles.text,
            {color: isDark ? color.white700 : color.black700},
          ]}>
          Are you satisfied with this course?
        </MyText>

        {/* Star Container */}
        <View style={styles.starContainer}>
          <Rating
            type="star"
            starContainerStyle={{justifyContent: 'space-between'}}
            ratingCount={5}
            imageSize={40}
            onFinishRating={ratingChangeHandler}
            startingValue={ratings}
          />
        </View>

        {/* Devider */}
        <View style={styles.devider}></View>

        {/* comment */}
        <View style={styles.section}>
          <MyText
            style={[
              styles.text,
              {color: isDark ? color.white700 : color.black700},
            ]}>
            Tell us what can we improve?
          </MyText>
        </View>

        {/* Input Box */}
        <View style={{}}>
          <TextInput
            mode="flat"
            keyboardType={'default'}
            // label={'label'}
            name={'name'}
            error={'error'}
            placeholderTextColor={isDark ? color.white500 : color.black400}
            placeholder={'Write your valuable comment'}
            style={[
              styles.formControl,
              {backgroundColor: isDark ? color.black200 : color.white500},
              {color: 'red', paddingVertical: 20, fontSize: 13},
            ]}
            onChangeText={text => setComment(text)}
            value={comment}
            multiline={true}
            activeUnderlineColor={isDark ? color.primary : color.primary}
            underlineColor={isDark ? color.black200 : color.white500}
            textColor={isDark ? color.white : color.black200}
            theme={{
              colors: {
                primary: isDark ? color.black500 : color.black500,
                background: isDark ? color.black200 : color.white,
                onSurfaceVariant: isDark ? color.white400 : color.black500,
              },
              fonts: {
                bodyLarge: {fontFamily: font.regular},
              },
            }}
          />
        </View>

        <MyButton
          title={'Submit Review'}
          handlePress={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
        />
      </View>
    </Container>
  );
};

export default MakeReviewScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 20,
  },
  heading: {
    fontFamily: font.semiBold,
    fontSize: 16,
    marginBottom: 10,
  },
  text: {
    marginBottom: 10,
  },
  starContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  devider: {
    borderBottomColor: color.black300,
    borderBottomWidth: 1,
    marginTop: 10,
  },
});
