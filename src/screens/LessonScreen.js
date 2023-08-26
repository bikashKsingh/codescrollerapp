import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, useColorScheme} from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import {color, font} from '../helpers/Constants';
import MyButton from '../components/MyButton';
import LessonSection from '../components/LessonSection';
import LessonCard from '../components/LessonCard';
import {useNavigation} from '@react-navigation/native';
import {get} from '../utils/api';

const LessonScreen = ({route}) => {
  const {courseId} = route?.params;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isDark = useColorScheme() == 'dark';
  const navigation = useNavigation();

  // State for course lessons
  const [courseLessonLoading, setCourseLessonLoading] = useState(false);
  const [courseLessons, setCourseLessons] = useState([]);
  const [totalCourseLessons, setTotalCourseLessions] = useState(0);

  const onRefresh = () => {
    setIsRefreshing(false);
  };

  // getCourseLessons
  useEffect(() => {
    const getCourseLessons = async () => {
      setCourseLessonLoading(true);
      try {
        const apiResponse = await get(`/lessons?course=${courseId}`);
        if (apiResponse.status == 200) {
          setCourseLessons(apiResponse.body);
          setTotalCourseLessions(apiResponse.totalRecords);
        }
        setCourseLessonLoading(false);
      } catch (error) {
        setCourseLessonLoading(false);
      }
    };

    getCourseLessons();
  }, [courseId]);

  return (
    <Container>
      <Header title={'Lessons'} />

      <View style={styles.root}>
        {/* Description Section */}
        {/* <View style={styles.section}>
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
              <MyText style={styles.rating}>4.8</MyText>
              <MyText
                style={[
                  styles.smallText,
                  {color: isDark ? color.white500 : color.black300},
                ]}>
                (4,567 Reviews)
              </MyText>
            </View>
          </View>
        </View> */}
        <FlatList
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <LessonSection title={item.name} duration={'15 mins'}>
                {item?.contents?.map((content, index) => {
                  return (
                    <LessonCard
                      key={content._id}
                      name={content?.name || 'Not Available'}
                      duration={'10 mins'}
                      isFree={content?.isFree}
                      iconName={'play-circle-outline'}
                      index={++index}
                      // onPressHandler={() =>
                      //   navigation.navigate('LessonStackScreen')
                      // }
                    />
                  );
                })}
              </LessonSection>
            );
          }}
          data={courseLessons}
          keyExtractor={(item, index) => `hotel-gallery-image-${index}`}
        />
      </View>
      <View style={styles.footer}>
        <MyButton title={`Enroll Course - ₹${500}`} />
      </View>
    </Container>
  );
};

export default LessonScreen;

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
});
