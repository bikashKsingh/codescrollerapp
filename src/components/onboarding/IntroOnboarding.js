import React from 'react';
import {View, Image, ImageBackground, StyleSheet} from 'react-native';
import {color, font} from '../../helpers/Constants';
import {WINDOW_WIDTH} from '../../utils/CommonUtils';
import MyText from '../MyText';

const IntroOnboarding = ({item}) => {
  return item.brand ? (
    <ImageBackground
      style={myStyles.root}
      source={require('../../assets/images/intro/home.jpg')}>
      <View style={{flex: 3}}></View>
      <View style={{flex: 1}}>
        <MyText style={myStyles.title}>Welcome to</MyText>
        <MyText style={myStyles.brandText}>Grenzs</MyText>
        <MyText style={myStyles.text}>
          The best hotel booking in the century to accompany your vacation
        </MyText>
      </View>
    </ImageBackground>
  ) : (
    <View style={{flex: 1, backgroundColor: color.white}}>
      <ImageBackground
        source={item.image}
        style={{height: '100%', width: WINDOW_WIDTH}}>
        <View style={{flex: 0.6}}></View>
        <View style={{flex: 1}}>
          <MyText style={styles.title}>{item.title}</MyText>
          <MyText style={styles.text}>{item.text}</MyText>
        </View>
      </ImageBackground>
    </View>
  );
};

export default IntroOnboarding;

const styles = StyleSheet.create({
  image: {
    resizeMode: 'center',
    flex: 1,
  },
  title: {
    paddingTop: 30,
    paddingBottom: 10,
    fontSize: 30,
    letterSpacing: 1,
    width: 230,
    paddingHorizontal: 20,
    fontFamily: font.semiBold,
    color: color.black,
  },
  text: {
    fontSize: 14,
    paddingHorizontal: 20,
    fontFamily: font.regular,
    color: color.black400,
  },
});

const myStyles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
  },
  image: {
    resizeMode: 'cover',
    height: '50%',
    width: '100%',
    backgroundColor: color.white,
  },
  title: {
    fontSize: 30,
    letterSpacing: 1,
    fontFamily: font.semiBold,
    color: color.white,
    marginBottom: -20,
  },
  brandText: {
    fontSize: 60,
    letterSpacing: 1,
    fontFamily: font.semiBold,
    color: color.primary,
  },
  text: {
    fontSize: 14,
    fontFamily: font.regular,
    color: color.white,
    marginBottom: -10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
