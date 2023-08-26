import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Orientation from 'react-native-orientation-locker';

export default VideoPlayer = () => {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [speed, setSpeed] = useState(1.0);
  const {width, height} = Dimensions.get('window');

  useEffect(() => {
    const handleOrientationChange = orientation => {
      if (
        orientation === 'LANDSCAPE-LEFT' ||
        orientation === 'LANDSCAPE-RIGHT'
      ) {
        setFullscreen(true);
        Orientation.unlockAllOrientations();
      } else {
        setFullscreen(false);
        Orientation.lockToPortrait();
      }
    };

    Orientation.addOrientationListener(handleOrientationChange);

    return () => {
      Orientation.removeOrientationListener(handleOrientationChange);
    };
  }, []);

  const togglePlayPause = () => {
    setPaused(!paused);
  };

  const toggleFullscreen = () => {
    if (fullscreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
  };

  //   const togglePlayPause = () => {
  //     setPaused(!paused);
  //   };

  //   const toggleFullscreen = () => {
  //     setFullscreen(!fullscreen);
  //   };

  const onSliderValueChange = value => {
    setVolume(value);
    videoRef.current?.setVolume(value);
  };

  const onSpeedChange = value => {
    setSpeed(value);
    // videoRef.current?.setSpeed(value);
  };

  const handleFullScreen = () => {
    toggleFullscreen();
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        }} // Replace with your video URL
        // style={fullscreen ? styles.fullscreenVideo : styles.video}
        style={[
          styles.fullscreenVideo,
          {
            width: fullscreen ? height : width - 32,
            height: fullscreen ? width : (width - 32) * 0.5625,
          },
        ]}
        resizeMode="contain"
        paused={paused}
        volume={volume}
        rate={speed}
        onEnd={() => setPaused(true)}
      />

      {/* Play/Pause button */}
      <TouchableOpacity style={styles.controlButton} onPress={togglePlayPause}>
        <Icon name={paused ? 'play-arrow' : 'pause'} size={30} color="#fff" />
      </TouchableOpacity>

      {/* Fullscreen button */}
      <TouchableOpacity
        style={styles.fullscreenButton}
        onPress={handleFullScreen}>
        <Icon
          name={fullscreen ? 'fullscreen-exit' : 'fullscreen'}
          size={30}
          color="#fff"
        />
      </TouchableOpacity>

      {/* Volume control */}
      <View style={styles.volumeContainer}>
        <Icon name="volume-down" size={20} color="#fff" />
        <Slider
          style={styles.volumeSlider}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={onSliderValueChange}
          thumbTintColor="#fff"
          minimumTrackTintColor="#fff"
          maximumTrackTintColor="rgba(255,255,255,0.5)"
        />
        <Icon name="volume-up" size={20} color="#fff" />
      </View>

      {/* Video speed control */}
      <View style={styles.speedContainer}>
        <Icon name="speed" size={20} color="#fff" />
        <Slider
          style={styles.speedSlider}
          minimumValue={0.5}
          maximumValue={2}
          step={0.1}
          value={speed}
          onValueChange={onSpeedChange}
          thumbTintColor="#fff"
          minimumTrackTintColor="#fff"
          maximumTrackTintColor="rgba(255,255,255,0.5)"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: Dimensions.get('window').width - 32,
    height: (Dimensions.get('window').width - 32) * 0.5625, // 16:9 aspect ratio
  },
  fullscreenVideo: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  controlButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  fullscreenButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    left: 16,
    zIndex: 1,
  },
  volumeSlider: {
    flex: 1,
    marginHorizontal: 8,
  },
  speedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    right: 16,
    zIndex: 1,
  },
  speedSlider: {
    flex: 1,
    marginHorizontal: 8,
  },
});
