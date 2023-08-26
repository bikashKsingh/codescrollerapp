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
import MyCard from './MyCard';
import {Badge} from 'react-native-paper';

const CourseHorizontalCard = ({
  _id,
  name,
  thumbnail,
  sellingPrice,
  mrp,
  ratings,
  category,
  language,
  reviews,
}) => {
  const navigation = useNavigation();
  const isDark = useColorScheme() == 'dark';
  return (
    <MyCard>
      <TouchableOpacity
        style={[
          styles.cardBody,
          {backgroundColor: isDark ? color.black200 : color.white},
        ]}
        onPress={() => {
          navigation.navigate('CourseDetailStackScreen', {
            _id,
            name,
            sellingPrice,
            mrp,
            thumbnail,
            ratings,
            category,
            reviews,
          });
        }}>
        <Image source={{uri: thumbnail}} style={styles.image} />
        <View style={styles.nameNratingContainer}>
          {/* <Badge
            theme={{roundness: 3}}
            style={{
              backgroundColor: isDark ? color.black300 : color.white400,
              color: color.primary600,
              borderRadius: 5,
              fontSize: 12,
            }}>
            {` ${category} `}
          </Badge> */}
          <View
            style={{
              alignSelf: 'flex-start',
            }}>
            <Badge
              theme={{roundness: 1}}
              style={[
                styles.badge,
                {
                  backgroundColor: isDark ? color.black600 : color.white400,
                  color: color.primary600,
                },
              ]}>
              {` ${category} `}
            </Badge>
          </View>

          <MyText
            style={[
              styles.name,
              {color: isDark ? color.white : color.black700},
            ]}>
            {name}
          </MyText>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome name={'inr'} color={color.primary} size={20} />
              <MyText style={styles.price}>{sellingPrice}</MyText>
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
                {mrp}
              </MyText>
            </View>
          </View>
          <View style={styles.row}>
            {/* <Ionicons
              name={'star'}
              style={styles.star}
              color={color.star}
              size={18}
            /> */}
            <MyText
              style={[
                styles.ratings,
                {color: isDark ? color.white : color.black400},
              ]}>
              {language}
            </MyText>
            {/* <MyText
              style={[
                styles.reviews,
                {color: isDark ? color.white : color.black400},
              ]}>
              | {reviews} Students
            </MyText> */}
          </View>
        </View>

        <View style={[]}>
          <Ionicons
            style={styles.bookmarkIcon}
            name="bookmark"
            size={20}
            color={color.primary}
          />
        </View>
      </TouchableOpacity>
    </MyCard>
  );
};

export default CourseHorizontalCard;

const styles = StyleSheet.create({
  cardBody: {
    backgroundColor: color.white,
    borderRadius: 20,
    marginTop: 2,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginHorizontal: 1,
    flexDirection: 'row',
  },

  image: {
    height: 105,
    width: 110,
    borderRadius: 20,
  },
  nameNratingContainer: {
    flex: 3,
    paddingHorizontal: 10,
    gap: 0,
    justifyContent: 'space-between',
  },

  category: {
    fontSize: 12,
    fontFamily: font.regular,
    color: color.black700,
    padding: 10,
    marginBottom: 0,
    backgroundColor: color.white400,
  },
  name: {
    fontSize: 16,
    fontFamily: font.semiBold,
    color: color.black700,
    marginBottom: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'space-between',
    gap: 5,
  },

  star: {
    alignSelf: 'flex-start',
  },
  ratings: {
    fontFamily: font.medium,
  },
  reviews: {
    fontSize: 13,
    fontFamily: font.medium,
  },
  category: {
    color: color.black300,
    fontSize: 13,
    fontFamily: font.medium,
    marginTop: 5,
  },
  badge: {
    borderRadius: 4,
    fontSize: 12,
    height: 23,
    fontFamily: font.regular,
    paddingHorizontal: 5,
  },
  price: {
    color: color.primary,
    fontSize: 20,
    fontFamily: font.semiBold,
    paddingTop: 2,
  },
  mrp: {
    color: color.black400,
    fontSize: 15,
    fontFamily: font.medium,
    paddingTop: 2,
    textDecorationLine: 'line-through',
  },
  smallText: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: font.regular,
    color: color.black300,
    alignSelf: 'flex-end',
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
