import {View, StyleSheet} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import MyText from '../components/MyText';
import {color, font} from '../helpers/Constants';
import Header from '../components/Header';
import ProfileCard from '../components/ProfileCard';
import {SERVER_URL} from '../../config/Config';
import Container from '../components/Container';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NotificationCard = ({icon, iconColor, title, text}) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} color={iconColor} size={60} />
      </View>
      <View style={styles.contentBox}>
        <MyText style={styles.title}>{title}</MyText>
        <MyText style={styles.text}>{text}</MyText>
      </View>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.white,
    elevation: 5,
    shadowColor: color.white800,
    borderRadius: 15,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    flex: 1,
  },
  contentBox: {
    flex: 3,
  },
  title: {
    fontSize: 14,
    fontFamily: font.semiBold,
    color: color.black700,
  },
  text: {
    fontSize: 12,
    fontFamily: font.regular,
    color: color.black300,
  },
});
