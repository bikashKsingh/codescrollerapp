import React, {useState, useEffect} from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import IntroOnboarding from '../components/onboarding/IntroOnboarding';
import MyText from '../components/MyText';
import {color, font} from '../helpers/Constants';

const WorkthroughScreen = () => {
  const [slides, setSides] = useState([
    {
      key: 'zero',
      title: 'Welcome to',
      brand: 'Grenzs',
      text: 'The best hotel booking in the century to accompany your vacation',
      image: require('../assets/images/intro/home.jpg'),
    },
    {
      key: 'one',
      title: 'Travel Safety, comfortable, & Easily',
      text: 'Lorem ipsum dolor sit amet consecte tuer adipsing elit sed diam monum my nibh eusimod eltor',
      image: require('../assets/images/intro/2.jpg'),
    },
    {
      key: 'two',
      title: 'Find the best Holels for you vacations',
      text: 'Lorem ipsum dolor sit amet consecte tuer adipsing elit sed diam monum my nibh eusimod eltor',
      image: require('../assets/images/intro/3.jpg'),
    },
    {
      key: 'three',
      title: "Let's discover the world with us",
      text: 'Lorem ipsum dolor sit amet consecte tuer adipsing elit sed diam monum my nibh eusimod eltor',
      image: require('../assets/images/intro/4.jpg'),
    },
  ]);

  const [showButton, setShowButton] = useState(false);
  const [showDots, setShowDots] = useState(false);

  const slideChangeHandler = index => {
    if (index != 0) {
      setShowButton(true);
      setShowDots(true);
    } else {
      setShowButton(false);
      setShowDots(false);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider
        renderItem={IntroOnboarding}
        data={slides}
        onSlideChange={slideChangeHandler}
        activeDotStyle={showDots ? styles.activeDots : styles.hideDots}
        dotStyle={showDots ? styles.dots : styles.hideDots}
        bottomButton={showButton}
        showSkipButton={showButton}
        showNextButton={showButton}
        renderNextButton={() => (
          <View style={styles.btnContainer}>
            <View style={styles.btn}>
              <MyText style={styles.btnText}>Next</MyText>
            </View>
          </View>
        )}
        renderSkipButton={() => (
          <View style={styles.btnContainer}>
            <View style={styles.skipBtn}>
              <MyText style={styles.skipBtnText}>Skip</MyText>
            </View>
          </View>
        )}
        renderDoneButton={() => (
          <View style={styles.btnContainer}>
            <View style={styles.doneBtn}>
              <MyText style={styles.btnText}>Done</MyText>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default WorkthroughScreen;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.white,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  btn: {
    backgroundColor: color.primary600,
    paddingVertical: 10,
    paddingHorizontal: 70,
    borderRadius: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    color: color.white,
    fontFamily: font.semiBold,
  },
  skipBtn: {
    backgroundColor: color.primary100,
    paddingVertical: 10,
    paddingHorizontal: 70,
    borderRadius: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },

  doneBtn: {
    backgroundColor: color.primary,
    paddingVertical: 10,
    paddingHorizontal: 70,
    borderRadius: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipBtnText: {
    fontSize: 14,
    color: color.primary,
    fontFamily: font.semiBold,
  },

  activeDots: {
    backgroundColor: color.primary,
    width: 30,
  },

  dots: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: color.black300,
  },
  hideDots: {
    display: 'none',
  },
});
