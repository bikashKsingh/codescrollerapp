import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  FlatList,
  Dimensions,
} from 'react-native';
import {color, font} from '../helpers/Constants';
import LessonCard from '../components/LessonCard';
import LessonSection from '../components/LessonSection';
import {useNavigation} from '@react-navigation/native';
import Container from '../components/Container';
import Header from '../components/Header';
import {get} from '../utils/api';
import {UserContext} from '../../context/UserContext';
import LessonContentCardSkelton from '../components/skeltons/LessonContentCardSkelton';
import {courseLessonDataForSkelton} from '../helpers';
import MyText from '../components/MyText';
import YoutubePlayer from 'react-native-youtube-iframe';

const LearnCourseScreen = ({route}) => {
  const {state, dispatch} = useContext(UserContext);
  const isDark = useColorScheme() == 'dark';
  const navigation = useNavigation();
  const {courseId} = route.params;

  // State for course lessons
  const [courseLessonLoading, setCourseLessonLoading] = useState(false);
  const [courseLessons, setCourseLessons] = useState([]);
  const [dataLoadOnRefresh, setDataLoadOnRefresh] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // State for course
  const [course, setCourse] = useState({});
  const [courseLoading, setCourseLoading] = useState(true);

  const [selectedContent, setSelectedContent] = useState({});
  const [playing, setPlaying] = useState(false);
  // getCourseDetails
  useEffect(() => {
    const getCourseDetails = async () => {
      setCourseLoading(true);
      try {
        const apiResponse = await get(`/courses/${courseId}`);
        if (apiResponse.status == 200) {
          setCourse(apiResponse.body);
          setSelectedContent({
            contentType: 'video',
            contentSource: apiResponse?.body?.defaultVideoSource,
            contentUrl: apiResponse?.body?.defaultVideo,
          });
        }
        setCourseLoading(false);
      } catch (error) {
        setCourseLoading(false);
      }
    };
    getCourseDetails();
  }, [courseId]);

  // getCourseLessons
  useEffect(() => {
    const getCourseLessons = async () => {
      setCourseLessonLoading(true);
      try {
        const apiResponse = await get(`/lessons?course=${courseId}`);

        if (apiResponse.status == 200) {
          setCourseLessons(apiResponse.body);
        }
        setCourseLessonLoading(false);
      } catch (error) {
        setCourseLessonLoading(false);
      }
    };

    getCourseLessons();
  }, [courseId, dataLoadOnRefresh]);

  const onRefresh = () => {
    setIsRefreshing(false);
    setDataLoadOnRefresh(!dataLoadOnRefresh);
  };

  // handleContentChange
  const handleContentChange = video => {
    setSelectedContent(video);
  };

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  return (
    <Container>
      <Header title={course?.name} />
      <View style={styles.root}>
        <FlatList
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          data={
            courseLessonLoading ? courseLessonDataForSkelton : courseLessons
          }
          stickyHeaderIndices={[0]}
          ListHeaderComponentStyle={{marginBottom: 10}}
          ListHeaderComponent={() => {
            if (
              selectedContent.contentType == 'video' &&
              selectedContent.contentSource == 'youtube'
            ) {
              return (
                <View style={styles.youtubeVideoContainer}>
                  <YoutubePlayer
                    height={'100%'}
                    play={playing}
                    videoId={selectedContent.contentUrl}
                    onChangeState={onStateChange}
                    webViewStyle={{opacity: 0.99}}
                  />
                </View>
              );
            }
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            if (courseLessonLoading) return <LessonContentCardSkelton />;
            else
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
                        onPressHandler={() => {
                          handleContentChange({
                            contentType: content?.contentType,
                            contentSource: content?.contentSource,
                            contentUrl: content?.contentUrl,
                          });
                        }}
                        // onPressHandler={() =>
                        //   navigation.navigate('LessonStackScreen')
                        // }
                      />
                    );
                  })}
                </LessonSection>
              );
          }}
          keyExtractor={(item, index) => `lesson-content-${index}`}
        />
      </View>
    </Container>
  );
};

export default LearnCourseScreen;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 5,
  },

  youtubeVideoContainer: {
    height: Dimensions.get('window').width - 195,
    backgroundColor: '#FFFFFF',
    resizeMode: 'cover',
  },
});
