import React, {useState, useEffect, useContext} from 'react';
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
import MyText from '../components/MyText';
import {color, font} from '../helpers/Constants';
import Header from '../components/Header';
import ProfileCard from '../components/ProfileCard';
import {SERVER_URL} from '../../config/Config';
import Container from '../components/Container';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {UserContext} from '../../context/UserContext';
const ProfileScreen = ({navigation}) => {
  const {state, dispatch} = useContext(UserContext);

  const isDark = useColorScheme() == 'dark';
  const [profileLoading, setProfileLoading] = useState(false);
  const [profile, setProfile] = useState(state);

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

  const logoutHandler = async () => {
    try {
      // await AsyncStorage.removeItem('userInfo');
      dispatch({type: 'CLEAR', payload: null});
      navigation.navigate('LoginStackScreen');

      // Fetching payments details
      // fetch(Config.SERVER_URL + '/student/updateLoginStatus', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${state.jwt_token}`,
      //   },
      // })
      //   .then(async res => res.json())
      //   .then(
      //     async result => {
      //       // console.log(result);
      //       if (result.success) {
      //         await AsyncStorage.removeItem('student');
      //         console.log('Data removed');
      //         dispatch({type: 'CLEAR', payload: null});
      //       } else {
      //         dispatch({type: 'CLEAR', payload: null});
      //       }
      //     },
      //     error => {
      //       Alert.alert('Oops Error', 'Error occured');
      //     },
      //   );
    } catch (exception) {
      // dispatch({type: 'CLEAR', payload: null});
    }
  };

  return (
    <Container>
      <Header title={'My Profile'} />
      <View style={styles.root}>
        <View style={styles.container}>
          {/* Personal Inormation */}
          <View style={styles.photoContainer}>
            <View style={styles.profilePicBox}>
              <Image
                style={styles.profilePic}
                source={require('./../assets/images/user.jpg')}
              />
              <TouchableOpacity style={styles.pencilBtn}>
                <FontAwesome color={color.white} name="pencil" />
              </TouchableOpacity>
            </View>
            {/* personal information */}
            <View style={styles.personalInfo}>
              {profileLoading ? (
                <View style={{flexDirection: 'row'}}>
                  <ActivityIndicator />
                  <MyText
                    style={{
                      color: isDark ? color.white : color.black500,
                      marginLeft: 5,
                    }}>
                    Loading...
                  </MyText>
                </View>
              ) : (
                <MyText
                  style={{
                    color: isDark ? color.white : color.black,
                    fontSize: 18,
                    fontFamily: font.semiBold,
                  }}>
                  {state.name || 'Guest'}
                </MyText>
              )}

              {profileLoading ? (
                <View style={{flexDirection: 'row'}}>
                  <ActivityIndicator />
                  <MyText
                    style={{
                      color: isDark ? color.white : color.black500,
                      marginLeft: 5,
                    }}>
                    Loading...
                  </MyText>
                </View>
              ) : (
                <MyText
                  style={{color: isDark ? color.white600 : color.black400}}>
                  {state.email || 'guest@codescroller.com'}
                </MyText>
              )}
            </View>
          </View>

          {/* Card Container */}
          <View style={styles.cardContainer}>
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
              {/* Edit Profile Card */}
              <ProfileCard
                onPressOpenScreen={'EditProfileStackScreen'}
                title={'Edit Profile'}
                icon={'person-outline'}
                hasArrow={true}
              />

              {/* My Courses */}
              <ProfileCard
                onPressOpenScreen={'MyCourseStackScreen'}
                title={'My Courses'}
                icon={'book-outline'}
                hasArrow={true}
              />

              {/* Payment Card */}
              <ProfileCard
                onPressHandler={() =>
                  navigation.navigate('WishlistStackScreen')
                }
                isLoading={wishlistLoading}
                title={'Payment'}
                icon={'card-outline'}
                hasArrow={true}
              />

              {/* Notification Cart*/}
              <ProfileCard
                onPressOpenScreen={'NotificationStackScreen'}
                isLoading={shippingAddressLoading}
                title={'Notifications'}
                icon={'notifications-outline'}
                hasArrow={true}
              />

              {/* My Bookmark Cart*/}
              <ProfileCard
                onPressOpenScreen={'MyBookmarkStackScreen'}
                isLoading={shippingAddressLoading}
                title={'My Bookmarks'}
                icon={'bookmark-outline'}
                subTitle={`${shippingAddress.length} Address`}
                hasArrow={true}
              />

              {/* Security Card */}
              {/* <ProfileCard
                onPressHandler={() => {
                  navigation.navigate('ShippingAddressStackScreen');
                }}
                isLoading={shippingAddressLoading}
                title={'Security'}
                icon={'lock-closed-outline'}
                subTitle={`${shippingAddress.length} Address`}
              /> */}

              {/* Help Tab */}
              {/* <ProfileCard
                onPressHandler={() => {
                  navigation.navigate('ProfileSettingStackScreen');
                }}
                title={'Help'}
                icon={'help-circle-outline'}
                hasArrow={true}
              /> */}

              {/* Privacy Policy */}
              {/* <ProfileCard
                onPressOpenScreen={'PrivacyPolicyStackScreen'}
                title={'Privacy Policy'}
                icon={'lock-closed-outline'}
                hasArrow={true}
              /> */}

              {/* Logout Tab */}
              <ProfileCard
                handlePress={logoutHandler}
                title={'Logout'}
                icon={'log-out-outline'}
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
    marginTop: 100,
  },

  photoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: color.white600,
    marginBottom: 10,
  },
  profilePicBox: {
    width: 100,
    height: 100,
    backgroundColor: color.white700,
    marginTop: -80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    elevation: 1,
    position: 'relative',
  },
  profilePic: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
  pencilBtn: {
    position: 'absolute',
    bottom: 0,
    right: -5,
    backgroundColor: color.primary,
    padding: 7,
    borderRadius: 5,
  },

  personalInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  cardContainer: {
    paddingHorizontal: 0,
    paddingBottom: 10,
    flex: 1,
  },
  card: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: color.white700,
    borderRadius: 15,
    marginBottom: 12,
  },
});
