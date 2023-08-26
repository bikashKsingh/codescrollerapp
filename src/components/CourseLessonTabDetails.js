import React from 'react';
import MyText from './MyText';
import {View, TouchableOpacity, StyleSheet, useColorScheme} from 'react-native';
import {color, font} from '../helpers/Constants';
import LessonCard from './LessonCard';
import LessonSection from './LessonSection';
import {useNavigation} from '@react-navigation/native';

const CourseLessonTabDetails = ({
  courseLessons = [],
  courseId,
  totalCourseLessons,
  handleContentChange,
}) => {
  const isDark = useColorScheme() == 'dark';
  const navigation = useNavigation();

  return (
    <View style={styles.section}>
      {/* <View style={[styles.headingContainer]}>
        <MyText
          style={[styles.heading, {color: isDark ? color.white : color.black}]}>
          {totalCourseLessons} Lessons
        </MyText>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('LessonStackScreen', {
              reviews: [],
            });
          }}>
          <MyText style={styles.btnText}>See All</MyText>
        </TouchableOpacity>
      </View> */}

      {courseLessons?.map(courseLesson => {
        return (
          <LessonSection
            key={courseLesson._id}
            title={courseLesson?.name || 'Not Available'}
            duration={'15 mins'}>
            {courseLesson?.contents?.map((content, index) => {
              return (
                <LessonCard
                  key={content._id}
                  name={content?.name || 'Not Available'}
                  duration={'10 mins'}
                  isFree={content?.isFree}
                  index={++index}
                  onPressHandler={() => {
                    handleContentChange({
                      contentType: content?.contentType,
                      contentSource: content?.contentSource,
                      contentUrl: content?.contentUrl,
                    });
                  }}
                  // onPressHandler={() => navigation.navigate('LessonStackScreen')}
                />
              );
            })}
          </LessonSection>
        );
      })}

      <TouchableOpacity
        style={styles.btnLight}
        onPress={() =>
          navigation.navigate('LessonStackScreen', {
            courseId,
          })
        }>
        <MyText style={styles.btnLightText}>More</MyText>
      </TouchableOpacity>
    </View>
  );
};

export default CourseLessonTabDetails;
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
