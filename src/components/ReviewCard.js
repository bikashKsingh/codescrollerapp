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
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const ReviewCard = ({
  id,
  name,
  image,
  ratings,
  comment,
  createdAt,
  onPressHandler = () => {},
}) => {
  const navigation = useNavigation();
  const isDark = useColorScheme() == 'dark';
  return (
    <TouchableOpacity
      style={[
        styles.card,
        // {
        //   backgroundColor: isDark ? color.black200 : color.white,
        // },
      ]}
      onPress={onPressHandler}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Image
            source={require('../assets/images/user.jpg')}
            style={styles.image}
          />
          <View style={{marginLeft: 10}}>
            <MyText
              style={[
                styles.name,
                {color: isDark ? color.white : color.black700},
              ]}>
              {name}
            </MyText>
            {/* <MyText style={styles.date}>{'02-04-2023'}</MyText> */}
          </View>
        </View>
        <View style={styles.badge}>
          <Ionicons
            name={'star'}
            style={styles.star}
            color={color.primary}
            size={17}
          />
          <MyText style={styles.ratings}>{ratings || 5}</MyText>
        </View>
      </View>
      <MyText
        style={[styles.text, {color: isDark ? color.white : color.black200}]}>
        {comment || 'No comment'}
      </MyText>
      <MyText
        style={[styles.ago, {color: isDark ? color.white600 : color.black500}]}>
        {moment(new Date(createdAt)).fromNow()}
      </MyText>
    </TouchableOpacity>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  card: {
    // elevation: 1,
    // shadowColor: color.black200,
    // borderRadius: 20,
    marginTop: 2,
    paddingHorizontal: 11,
    paddingVertical: 15,
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
  },

  name: {
    marginBottom: -3,
    fontSize: 15,
    fontFamily: font.semiBold,
  },
  date: {
    color: color.black300,
    fontSize: 12,
    fontFamily: font.medium,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  badge: {
    borderColor: color.primary,
    borderWidth: 2,
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    gap: 5,
  },
  ratings: {
    color: color.primary,
    fontFamily: font.medium,
  },
  text: {
    marginTop: 15,
    paddingHorizontal: 5,

    fontSize: 13,
    fontFamily: font.regular,
  },
  ago: {
    marginTop: 10,
    paddingHorizontal: 5,
    fontSize: 12,
    fontFamily: font.regular,
  },
});
