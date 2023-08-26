import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, BackHandler} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';
import {Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const CustomVideoPlayer = () => {
  const videoRef = useRef(null);
  const [fullscreen, setFullscreen] = useState(false);
  const navigation = useNavigation();

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

  //   useEffect(() => {
  //     const handleOrientationChange = orientation => {
  //       if (fullscreen && orientation !== 'LANDSCAPE') {
  //         setFullscreen(false);
  //         Orientation.lockToPortrait();
  //       }
  //     };

  //     Orientation.addOrientationListener(handleOrientationChange);

  //     return () => {
  //       Orientation.removeOrientationListener(handleOrientationChange);
  //     };
  //   }, [fullscreen]);

  const enterFullscreen = () => {
    Orientation.lockToLandscape();
    setFullscreen(true);
    // if (fullscreen) {
    //   Orientation.lockToPortrait();
    //   setFullscreen(!fullscreen);
    // } else {
    //   Orientation.lockToLandscape();
    //   setFullscreen(!fullscreen);
    // }
  };

  const exitFullscreen = () => {
    Orientation.lockToPortrait();
    setFullscreen(false);
  };

  return (
    <View style={styles.container}>
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
          disableBack={true} // Disable the back button for full-screen mode
          //   disableFullscreen={true} // Disable the fullscreen button in the video controls
        />
      </View>

      {/* Half screen content */}
      {!fullscreen && (
        <View style={styles.contentContainer}>
          <Text>Welcome</Text>
          <Text>Welcome</Text>
          <Text>Welcome</Text>
          <Text>Welcome</Text>
          <Text>Welcome</Text>
          <Text>Welcome</Text>
          <Text>Welcome</Text>
          <Text>Welcome</Text>
          <Text>Welcome</Text>
        </View>
      )}

      {/* Fullscreen button */}
      {/* <TouchableOpacity
        style={styles.fullscreenButton}
        onPress={enterFullscreen}>
        <Icon
          name={fullscreen ? 'fullscreen-exit' : 'fullscreen'}
          size={30}
          color="#fff"
        />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 10,
  },
  videoContainer: {
    flex: 1,
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
    // Add your custom styling for the content side here
  },
  fullscreenButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
});

export default CustomVideoPlayer;
