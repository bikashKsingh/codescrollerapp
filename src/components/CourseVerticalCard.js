import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import MyText from './MyText';
import {color, font} from '../helpers/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CourseVerticalCard = ({name, image, price, ratings, address}) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={image} style={styles.image} />
      <MyText style={styles.name}>{name}</MyText>
      <View style={styles.row}>
        <Ionicons name={'star'} color={color.star} size={18} />
        <MyText style={styles.ratings}>{ratings}</MyText>
        <MyText style={styles.address}>{address}</MyText>
      </View>
      <View style={[styles.row, styles.spaceBetween]}>
        <View style={[styles.row, {gap: 1}]}>
          <FontAwesome name={'inr'} color={color.primary} size={20} />
          <MyText style={styles.price}>{price}</MyText>
          <MyText style={styles.smallText}>{'/night'}</MyText>
        </View>
        <Ionicons
          style={styles.bookmarkIcon}
          name="bookmark"
          size={20}
          color={color.primary}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CourseVerticalCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.white,
    elevation: 5,
    shadowColor: color.black300,
    borderRadius: 20,
    marginTop: 2,
    paddingHorizontal: 11,
    paddingVertical: 15,
    width: '48%',
    marginHorizontal: 1,
    marginBottom: 10,
  },
  image: {
    height: 100,
    width: '100%',
    borderRadius: 20,
  },

  name: {
    fontSize: 16,
    fontFamily: font.semiBold,
    color: color.black700,
    marginTop: 10,
    marginBottom: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  ratings: {
    color: color.primary,
    fontSize: 18,
    fontFamily: font.semiBold,
    marginTop: 6,
  },
  address: {
    color: color.black300,
    fontSize: 13,
    fontFamily: font.medium,
    marginTop: 6,
    marginLeft: 5,
  },
  price: {
    color: color.primary,
    fontSize: 20,
    fontFamily: font.semiBold,
    marginTop: 4,
  },
  smallText: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: font.regular,
    color: color.black300,
  },
  bookmarkIcon: {},
});
