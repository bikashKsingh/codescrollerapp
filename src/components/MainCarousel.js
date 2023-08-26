import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {color, font} from '../helpers/Constants';
import MyText from './MyText';
import HotelData from '../../myData/Hotels';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../utils/CommonUtils';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const MainCarousel = ({}) => {
  const [selected, setSelected] = useState('Recommended');
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                navigation.navigate('HotelDetailStackScreen', {
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  image: item.image,
                  images: item.images,
                  ratings: item.ratings,
                  address: item.address,
                  reviews: item.reviews,
                });
              }}>
              <Image
                style={styles.image}
                source={item.image}
                resizeMode={'contain'}
              />
              <View style={styles.ratingContainer}>
                <Ionicons name={'star'} color={color.white} size={13} />
                <MyText style={styles.rating}>{item.ratings}</MyText>
              </View>
              <View style={styles.content}>
                <MyText style={styles.name}>{item.name}</MyText>
                <MyText style={styles.address}>{item.address}</MyText>
                <View style={[styles.row, styles.spaceBetween]}>
                  <View style={[styles.row, {gap: 1}]}>
                    <FontAwesome name={'inr'} color={color.white} size={20} />
                    <MyText style={styles.price}>{item.price}</MyText>
                    <MyText style={styles.smallText}>{'/night'}</MyText>
                  </View>
                  <Ionicons
                    style={styles.bookmarkIcon}
                    name="bookmark"
                    size={20}
                    color={color.white}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        data={HotelData}
        keyExtractor={item => `hotel-slider-${item.id}`}
      />
    </View>
  );
};

export default MainCarousel;

const styles = StyleSheet.create({
  root: {
    marginVertical: 12,
  },
  card: {
    borderRadius: 30,
    marginRight: 10,
  },
  image: {
    height: WINDOW_HEIGHT - WINDOW_HEIGHT * 0.8,
    width: WINDOW_WIDTH - WINDOW_WIDTH * 0.1,
    borderRadius: 30,
    position: 'relative',
  },
  ratingContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: color.primary,
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  rating: {
    color: color.white,
    fontFamily: font.semiBold,
    marginTop: 4,
  },
  content: {
    padding: 15,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.3)',
    // borderBottomEndRadius: 30,
    // borderBottomStartRadius: 30,
  },
  name: {
    fontFamily: font.semiBold,
    color: color.white,
    fontSize: 22,
  },
  address: {
    fontFamily: font.regular,
    color: color.white,
    fontSize: 15,
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
  price: {
    color: color.white,
    fontSize: 20,
    fontFamily: font.semiBold,
    marginTop: 4,
  },
  smallText: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: font.regular,
    color: color.white,
  },
});
