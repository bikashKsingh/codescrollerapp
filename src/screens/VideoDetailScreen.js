import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  BackHandler,
  Dimensions,
  useColorScheme,
} from 'react-native';
import Container from '../components/Container';
import MyText from '../components/MyText';
import {color, font} from '../helpers/Constants';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../components/Header';
import {useNavigation} from '@react-navigation/native';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';

const VideoDetailScreen = ({route}) => {
  const {id, name} = route?.params;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigation = useNavigation();
  const [fullscreen, setFullscreen] = useState(false);
  const videoRef = useRef(null);
  const isDark = useColorScheme() == 'dark';
  const [activeTab, setActiveTab] = useState('Descriptions');
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
    Orientation.lockToPortrait();
    setFullscreen(false);
    // Orientation.lockToLandscape();
    // setFullscreen(true);
  };

  const exitFullscreen = () => {
    // Orientation.lockToPortrait();
    // setFullscreen(false);
    Orientation.lockToLandscape();
    setFullscreen(true);
  };

  return (
    <Container statusBarStyle={'dark-content'} isStatusBarHidden={true}>
      {/* <Header title={'Back'} /> */}
      {/* Video */}
      <View
        style={
          fullscreen ? styles.videoContainerFullscreen : styles.videoContainer
        }>
        <VideoPlayer
          ref={videoRef}
          source={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
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
      </View>

      {!fullscreen && (
        <ScrollView
          style={styles.root}
          stickyHeaderIndices={[1]}
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
              {name}
            </MyText>
          </View>

          {/* Tabs */}
          <View>
            <View
              style={[
                styles.tabContainer,
                {backgroundColor: isDark ? color.black : color.white},
              ]}>
              {/* Descriptions */}
              <View style={[styles.tabBar]}>
                <TouchableOpacity onPress={() => setActiveTab('Descriptions')}>
                  <MyText
                    style={[
                      styles.tabText,
                      {
                        color:
                          activeTab == 'Descriptions'
                            ? color.primary
                            : isDark
                            ? color.white800
                            : color.black500,
                      },
                    ]}>
                    Descriptions
                  </MyText>
                </TouchableOpacity>
                {activeTab === 'Descriptions' && (
                  <View style={styles.tabBarActiveBorder}></View>
                )}
              </View>

              {/* Resourses */}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => setActiveTab('Resourses')}>
                  <MyText
                    style={[
                      styles.tabText,
                      {
                        color:
                          activeTab == 'Resourses'
                            ? color.primary
                            : isDark
                            ? color.white800
                            : color.black500,
                      },
                    ]}>
                    Resourses
                  </MyText>
                </TouchableOpacity>
                {activeTab === 'Resourses' && (
                  <View style={styles.tabBarActiveBorder}></View>
                )}
              </View>
            </View>
          </View>

          {activeTab == 'Descriptions' && (
            <View style={styles.section}>
              <MyText
                style={[
                  styles.descriptions,
                  {color: isDark ? color.white : color.black800},
                ]}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Delectus commodi beatae accusamus? Pariatur, veritatis sequi
                quibusdam dolores, sunt nam illum excepturi nemo mollitia
                recusandae accusamus laboriosam obcaecati modi atque!
                Voluptates.
              </MyText>
            </View>
          )}
        </ScrollView>
      )}
    </Container>
  );
};

export default VideoDetailScreen;

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
    fontSize: 17,
    marginVertical: 5,
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

  tabContainer: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: color.white700,
    borderBottomWidth: 1,
    borderTopColor: color.white600,
    borderTopWidth: 1,
    paddingBottom: 15,
    gap: 100,
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

  text: {
    fontSize: 14,
    color: color.black500,
  },
  descriptions: {
    fontSize: 14,
    color: color.black500,
    marginTop: 10,
  },
});
