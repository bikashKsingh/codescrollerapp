import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import MyText from './MyText';
import {color, font} from '../helpers/Constants';
import {useNavigation} from '@react-navigation/native';

const LessonSection = ({title, duration, onPressHandler, children}) => {
  const navigation = useNavigation();
  const isDark = useColorScheme() == 'dark';

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <MyText
          style={[
            styles.title,
            {color: isDark ? color.white : color.black500},
          ]}>
          {title}
        </MyText>
        <MyText style={styles.duration}>{duration}</MyText>
      </View>
      {children}
    </View>
  );
};

export default LessonSection;

const styles = StyleSheet.create({
  root: {},
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },

  title: {
    fontSize: 14,
    fontFamily: font.semiBold,
  },

  duration: {
    color: color.primary,
    fontSize: 14,
    fontFamily: font.semiBold,
  },
});
