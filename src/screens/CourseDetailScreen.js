import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  StyleSheet,
  BackHandler,
  Dimensions,
  useColorScheme,
  Alert,
} from 'react-native';
import Container from '../components/Container';
import MyText from '../components/MyText';
import {color, font} from '../helpers/Constants';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';
import {Badge} from 'react-native-paper';
import CourseAboutTabDetails from '../components/CourseAboutTabDetails';
import CourseReviewTabDetails from '../components/CourseReviewTabDetails';
import CourseLessonTabDetails from '../components/CourseLessonTabDetails';
import MyButton from '../components/MyButton';
import {get} from '../utils/api';
import LoadingScreen from '../components/LoadingScreen';
import YoutubePlayer from 'react-native-youtube-iframe';
import CourseDetailsScreenSkelton from '../components/skeltons/CourseDetailsScreenSkeleton';

const CourseDetailScreen = ({route}) => {
  const {_id} = route?.params;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigation = useNavigation();
  const [fullscreen, setFullscreen] = useState(false);
  const videoRef = useRef(null);
  const isDark = useColorScheme() == 'dark';
  const [activeTab, setActiveTab] = useState('About');

  // State for course
  const [courseLoading, setCourseLoading] = useState(true);
  const [course, setCourse] = useState({});

  // State for course lessons
  const [courseLessonLoading, setCourseLessonLoading] = useState(false);
  const [courseLessons, setCourseLessons] = useState([]);
  const [totalCourseLessons, setTotalCourseLessions] = useState(0);

  //
  const [selectedContent, setSelectedContent] = useState({});
  const [playing, setPlaying] = useState(false);

  const onRefresh = () => {
    setIsRefreshing(false);
  };

  // Handle Back Button
  useEffect(() => {
    const backAction = () => {
      Orientation.lockToPortrait();
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const enterFullscreen = () => {
    Orientation.lockToLandscape();
    setFullscreen(true);
  };

  const exitFullscreen = () => {
    Orientation.lockToPortrait();
    setFullscreen(false);
  };

  // getCourseDetails
  useEffect(() => {
    const getCourseDetails = async () => {
      setCourseLoading(true);
      try {
        const apiResponse = await get(`/courses/${_id}`);
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
  }, [_id]);

  // getCourseLessons
  useEffect(() => {
    const getCourseLessons = async () => {
      setCourseLessonLoading(true);
      try {
        const apiResponse = await get(`/lessons?course=${_id}`);
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
  }, [_id]);

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

  // {"contentSource": "youtube", "contentType": "video", "contentUrl": "Q4p8vRQX8uY"}

  return (
    <Container statusBarStyle={'dark-content'} isStatusBarHidden={true}>
      {courseLoading ? (
        <CourseDetailsScreenSkelton />
      ) : (
        <>
          {/* <Header title={'Back'} /> */}

          {/* for Youtube Videos */}
          {selectedContent.contentType == 'video' &&
          selectedContent.contentSource == 'youtube' ? (
            <View style={styles.youtubeVideoContainer}>
              <YoutubePlayer
                height={'100%'}
                play={playing}
                videoId={selectedContent.contentUrl}
                onChangeState={onStateChange}
                webViewStyle={{opacity: 0.99}}
              />
            </View>
          ) : null}

          {/* For another video */}
          {/* <View
            style={
              fullscreen
                ? styles.videoContainerFullscreen
                : styles.videoContainer
            }>
            <VideoPlayer
              ref={videoRef}
              source={{
                uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
              }} // Replace with your video file path
              style={fullscreen ? styles.fullscreenVideo : styles.video}
              paused={!fullscreen} // Autoplay video in full-screen mode, pause in normal mode
              onEnterFullscreen={enterFullscreen}
              onExitFullscreen={exitFullscreen}
              disableBack={false} // Disable the back button for full-screen mode
              //   disableFullscreen={true} // Disable the fullscreen button in the video controls
              navigator={null} // Disable the fullscreen button from the controls
              onBack={() => {
                navigation.goBack();
              }}
              resizeMode={'cover'}
              tapAnywhereToPause={true}
            />
          </View> */}

          {!fullscreen && (
            <ScrollView
              style={styles.root}
              stickyHeaderIndices={[3]}
              // showsVerticalScrollIndicator={false}
            >
              {/* <View style={styles.container}> */}
              {/* Name and Ratinge */}
              <View style={styles.section}>
                {/* Name */}
                <MyText
                  style={[
                    styles.name,
                    {color: isDark ? color.white : color.black800},
                  ]}>
                  {course.name}
                </MyText>

                {/* ratings & Rating */}
                <View
                  style={[
                    styles.row,
                    {gap: 10, alignItems: 'center', marginTop: 7},
                  ]}>
                  <Badge
                    theme={{roundness: 1}}
                    style={[
                      styles.badge,
                      {
                        backgroundColor: isDark
                          ? color.black600
                          : color.white400,
                        color: color.primary600,
                      },
                    ]}>
                    {course?.category?.name}
                  </Badge>
                  <Ionicons size={19} name={'star'} color={color.primary} />
                  <MyText
                    style={[
                      styles.ratingText,
                      {color: isDark ? color.white : color.black500},
                    ]}>
                    4.5 (1200 reviews)
                  </MyText>
                </View>
              </View>

              {/* Price Section */}
              <View style={styles.priceContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome name={'inr'} color={color.primary} size={23} />
                  <MyText style={[styles.sellingPrice]}>
                    {course?.sellingPrice || 500}
                  </MyText>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome
                    name={'inr'}
                    color={isDark ? color.white : color.black400}
                    size={15}
                  />
                  <MyText
                    style={[
                      styles.mrp,
                      {color: isDark ? color.white : color.black400},
                    ]}>
                    {course?.mrp || 600}
                  </MyText>
                </View>
              </View>

              {/* Students, Hours & Certificate */}
              <View
                style={[
                  styles.row,
                  styles.spaceBetween,
                  {marginTop: 5, marginBottom: 15},
                ]}>
                {/* Students */}
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                  <FontAwesome name={'user'} color={color.primary} size={15} />
                  <MyText
                    style={[
                      styles.detailText,
                      {color: isDark ? color.white : color.black500},
                    ]}>
                    5000 Students
                  </MyText>
                </View>

                {/* Hours */}
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                  <MaterialIcons
                    name={'watch-later'}
                    color={color.primary}
                    size={15}
                  />
                  <MyText
                    style={[
                      styles.detailText,
                      {color: isDark ? color.white : color.black500},
                    ]}>
                    2.5 Hours
                  </MyText>
                </View>

                {/* Certificate */}
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                  <FontAwesome
                    name={'certificate'}
                    color={color.primary}
                    size={15}
                  />
                  <MyText
                    style={[
                      styles.detailText,
                      {color: isDark ? color.white : color.black500},
                    ]}>
                    Certificate
                  </MyText>
                </View>
              </View>

              {/* Tabs */}
              <View>
                <View
                  style={[
                    styles.tabContainer,
                    {backgroundColor: isDark ? color.black : color.white},
                  ]}>
                  {/* About */}
                  <View style={[styles.tabBar]}>
                    <TouchableOpacity onPress={() => setActiveTab('About')}>
                      <MyText
                        style={[
                          styles.tabText,
                          {
                            color:
                              activeTab == 'About'
                                ? color.primary
                                : isDark
                                ? color.white800
                                : color.black500,
                          },
                        ]}>
                        About
                      </MyText>
                    </TouchableOpacity>
                    {activeTab === 'About' && (
                      <View style={styles.tabBarActiveBorder}></View>
                    )}
                  </View>

                  {/* Lessons */}
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => setActiveTab('Lessons')}>
                      <MyText
                        style={[
                          styles.tabText,
                          {
                            color:
                              activeTab == 'Lessons'
                                ? color.primary
                                : isDark
                                ? color.white800
                                : color.black500,
                          },
                        ]}>
                        Lessons
                      </MyText>
                    </TouchableOpacity>
                    {activeTab === 'Lessons' && (
                      <View style={styles.tabBarActiveBorder}></View>
                    )}
                  </View>

                  {/* Reviews */}
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => setActiveTab('Reviews')}>
                      <MyText
                        style={[
                          styles.tabText,
                          {
                            color:
                              activeTab == 'Reviews'
                                ? color.primary
                                : isDark
                                ? color.white800
                                : color.black500,
                          },
                        ]}>
                        Reviews
                      </MyText>
                    </TouchableOpacity>
                    {activeTab === 'Reviews' && (
                      <View style={styles.tabBarActiveBorder}></View>
                    )}
                  </View>
                </View>
              </View>

              {activeTab == 'About' && (
                <CourseAboutTabDetails
                  // Instructor
                  instructorName={course?.instructorName}
                  instructorAbout={course?.instructorAbout}
                  instructorImage={course?.instructorImage}
                  instructorDesignation={course?.instructorDesignation}
                  // details
                  description={course?.description}
                  courseDetails={course?.courseDetails}
                  highlights={course?.highlights}
                  requirements={course?.requirements}
                  prerequisite={course?.prerequisite}
                />
              )}

              {activeTab == 'Lessons' && (
                <CourseLessonTabDetails
                  courseLessons={courseLessons}
                  totalCourseLessons={totalCourseLessons}
                  handleContentChange={handleContentChange}
                  courseId={course?._id}
                />
              )}

              {/* Reviews Section */}
              {activeTab == 'Reviews' && (
                <CourseReviewTabDetails
                  courseId={course?._id}
                  sellingPrice={course?.sellingPrice}
                />
              )}
            </ScrollView>
          )}

          {!fullscreen && (
            <View style={styles.footer}>
              <MyButton
                handlePress={() => {
                  navigation.navigate('CourseCheckoutStackScreen', {
                    courseId: course?._id,
                  });
                }}
                title={`Enroll Course - ₹${course?.sellingPrice || 400}`}
              />
            </View>
          )}
        </>
      )}
    </Container>
  );
};

export default CourseDetailScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
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
  spaceBetween: {
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: font.semiBold,
    fontSize: 23,
    marginVertical: 5,
  },
  ratingText: {
    fontFamily: font.medium,
    fontSize: 15,
    position: 'relative',
    top: 3,
  },
  youtubeVideoContainer: {
    height: Dimensions.get('window').width - 170,
    backgroundColor: '#FFFFFF',
    resizeMode: 'cover',
  },
  videoContainer: {
    height: Dimensions.get('window').width - 100,
    backgroundColor: '#FFFFFF',
    resizeMode: 'cover',
  },
  videoContainerFullscreen: {
    flex: 1,
    height: Dimensions.get('window').width,
  },
  video: {
    flex: 1,
  },
  fullscreenVideo: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  badge: {
    borderRadius: 4,
    fontSize: 14,
    height: 25,
    fontFamily: font.regular,
    paddingHorizontal: 10,
    paddingTop: 1,
    paddingBottom: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5,
  },
  sellingPrice: {
    color: color.primary,
    fontSize: 25,
    fontFamily: font.semiBold,
    paddingTop: 4,
  },
  mrp: {
    color: color.black400,
    fontSize: 16,
    fontFamily: font.medium,
    paddingTop: 2,
    textDecorationLine: 'line-through',
  },

  tabContainer: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: color.white700,
    borderBottomWidth: 1,
    borderTopColor: color.white600,
    borderTopWidth: 1,
    paddingBottom: 15,
  },
  tabText: {
    fontFamily: font.semiBold,
    marginTop: 5,
    color: color.black500,
    fontSize: 16,
    marginHorizontal: 10,
  },
  tabBar: {
    position: 'relative',
  },
  tabBarActiveBorder: {
    position: 'absolute',
    borderBottomColor: color.primary,
    borderBottomWidth: 5,
    width: '100%',
    bottom: -18,
    borderRadius: 10,
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
    color: color.black800,
  },

  detailCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailText: {
    fontFamily: font.medium,
    marginTop: 5,
    fontSize: 14,
  },
  text: {
    fontSize: 14,
    color: color.black500,
  },
  footer: {
    paddingHorizontal: 20,
    borderWidth: 0.5,
    borderColor: color.white700,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
});
