import {
  View,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import MyText from '../components/MyText';
import {color, font} from '../helpers/Constants';
import Header from '../components/Header';
import ProfileCard from '../components/ProfileCard';
import {SERVER_URL} from '../../config/Config';
import Container from '../components/Container';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PrivacyPolicyScreen = ({navigation}) => {
  const isDark = useColorScheme() == 'dark';
  const [profileLoading, setProfileLoading] = useState(false);
  const [profile, setProfile] = useState({});

  const [wishlistLoading, setWishlistLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);

  const [ordersLoading, setOrdersLoading] = useState(true);
  const [myOrders, setMyOrders] = useState([]);

  const [shippingAddressLoading, setShippingAddressLoading] = useState(true);
  const [shippingAddress, setShippingAddress] = useState([]);

  // get profile details
  // useEffect(() => {
  //   const getProfile = async () => {
  //     try {
  //       const response = await fetch(`${SERVER_URL}/customer/profile`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${state.jwtToken}`,
  //         },
  //       });
  //       const result = await response.json();
  //       if (result.status == 200) {
  //         setProfile(result.body);
  //       } else {
  //         Alert.alert('Profile Error', result.message);
  //       }
  //       setProfileLoading(false);
  //     } catch (error) {
  //       Alert.alert('Profile Error', error.message);
  //       setProfileLoading(false);
  //     }
  //   };

  //   getProfile();
  // }, []);

  // Get wishlist items
  // useEffect(() => {
  //   const getWishlistItems = async () => {
  //     try {
  //       const response = await fetch(`${SERVER_URL}/wishlists/myWishlist`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${state.jwtToken}`,
  //         },
  //       });
  //       const result = await response.json();
  //       setWishlistLoading(false);
  //       if (result.status == 200) {
  //         setWishlistItems(result.body);
  //       } else {
  //         Alert.alert('Wishlist Error', result.message);
  //       }
  //     } catch (error) {
  //       setWishlistLoading(false);
  //       Alert.alert('Wishlist Error', error.message);
  //     }
  //   };

  //   getWishlistItems();
  // }, []);

  // Get Shipping Address
  // useEffect(() => {
  //   const getShippingAddress = async () => {
  //     try {
  //       const response = await fetch(`${SERVER_URL}/customer/profile`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${state.jwtToken}`,
  //         },
  //       });
  //       const result = await response.json();
  //       setShippingAddressLoading(false);
  //       if (result.status == 200) {
  //         setShippingAddress(result.body?.shippingAddresses || []);
  //       } else {
  //         Alert.alert('Wishlist Error', result.message);
  //       }
  //     } catch (error) {
  //       setShippingAddressLoading(false);
  //       Alert.alert('Wishlist Error', error.message);
  //     }
  //   };

  //   getShippingAddress();
  // }, []);

  return (
    <Container>
      <Header title={'Privacy Policy'} />
      <ScrollView style={styles.root}>
        <View style={styles.container}>
          <View style={styles.card}>
            <MyText
              style={[
                styles.heading,
                {color: isDark ? color.white : color.black},
              ]}>
              1. Types of Data We Collect
            </MyText>
            <MyText
              style={[
                styles.text,
                {color: isDark ? color.white800 : color.black800},
              ]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit consequuntur cum consequatur cupiditate porro neque
              exercitationem ducimus, commodi excepturi. Porro dolores minima
              enim officiis aut fugit expedita ut nam tempore.
            </MyText>
          </View>
          <View style={styles.card}>
            <MyText
              style={[
                styles.heading,
                {color: isDark ? color.white : color.black},
              ]}>
              1. Types of Data We Collect
            </MyText>
            <MyText
              style={[
                styles.text,
                {color: isDark ? color.white800 : color.black800},
              ]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit consequuntur cum consequatur cupiditate porro neque
              exercitationem ducimus, commodi excepturi. Porro dolores minima
              enim officiis aut fugit expedita ut nam tempore.
            </MyText>
          </View>
          <View style={styles.card}>
            <MyText
              style={[
                styles.heading,
                {color: isDark ? color.white : color.black},
              ]}>
              1. Types of Data We Collect
            </MyText>
            <MyText
              style={[
                styles.text,
                {color: isDark ? color.white800 : color.black800},
              ]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit consequuntur cum consequatur cupiditate porro neque
              exercitationem ducimus, commodi excepturi. Porro dolores minima
              enim officiis aut fugit expedita ut nam tempore.
            </MyText>
          </View>
          <View style={styles.card}>
            <MyText
              style={[
                styles.heading,
                {color: isDark ? color.white : color.black},
              ]}>
              1. Types of Data We Collect
            </MyText>
            <MyText
              style={[
                styles.text,
                {color: isDark ? color.white800 : color.black800},
              ]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit consequuntur cum consequatur cupiditate porro neque
              exercitationem ducimus, commodi excepturi. Porro dolores minima
              enim officiis aut fugit expedita ut nam tempore.
            </MyText>
          </View>
          <View style={styles.card}>
            <MyText
              style={[
                styles.heading,
                {color: isDark ? color.white : color.black},
              ]}>
              1. Types of Data We Collect
            </MyText>
            <MyText
              style={[
                styles.text,
                {color: isDark ? color.white800 : color.black800},
              ]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit consequuntur cum consequatur cupiditate porro neque
              exercitationem ducimus, commodi excepturi. Porro dolores minima
              enim officiis aut fugit expedita ut nam tempore.
            </MyText>
          </View>
          <View style={styles.card}>
            <MyText
              style={[
                styles.heading,
                {color: isDark ? color.white : color.black},
              ]}>
              1. Types of Data We Collect
            </MyText>
            <MyText
              style={[
                styles.text,
                {color: isDark ? color.white800 : color.black800},
              ]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit consequuntur cum consequatur cupiditate porro neque
              exercitationem ducimus, commodi excepturi. Porro dolores minima
              enim officiis aut fugit expedita ut nam tempore.
            </MyText>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  card: {
    marginBottom: 20,
  },
  heading: {
    fontFamily: font.semiBold,
    fontSize: 17,
  },
  text: {
    fontSize: 13,
    fontFamily: font.regular,
    marginTop: 10,
    lineHeight: 20,
  },
});
