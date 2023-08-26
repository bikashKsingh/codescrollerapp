import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import MyText from './MyText';
import {color, font} from '../helpers/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const LessonCard = ({name, duration, isFree, index, onPressHandler}) => {
  const navigation = useNavigation();
  const isDark = useColorScheme() == 'dark';

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: isDark ? color.black200 : color.white,
        },
      ]}
      onPress={isFree ? onPressHandler : () => {}}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View
            style={[
              styles.image,
              {backgroundColor: isDark ? color.black800 : color.white400},
            ]}>
            <MyText style={styles.index}>{index}</MyText>
          </View>
          <View style={{marginLeft: 10}}>
            <MyText
              style={[
                styles.name,
                {color: isDark ? color.white : color.black600},
              ]}>
              {name}
            </MyText>
            <MyText
              style={[
                styles.duration,
                {color: isDark ? color.white600 : color.black300},
              ]}>
              {duration}
            </MyText>
          </View>
        </View>
        <Ionicons
          name={isFree ? 'play-circle-outline' : 'lock-closed-outline'}
          color={color.primary}
          size={30}
        />
      </View>
    </TouchableOpacity>
  );
};

export default LessonCard;

const styles = StyleSheet.create({
  card: {
    elevation: 1,
    shadowColor: color.black200,
    borderRadius: 20,
    marginTop: 2,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginHorizontal: 1,
    marginBottom: 10,
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  image: {
    height: 50,
    width: 50,
    borderRadius: 35,

    justifyContent: 'center',
    alignItems: 'center',
  },
  index: {
    fontSize: 18,
    fontFamily: font.semiBold,
    color: color.primary,
  },

  name: {
    fontSize: 14,
    fontFamily: font.semiBold,
  },
  duration: {
    fontSize: 12,
    fontFamily: font.medium,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
