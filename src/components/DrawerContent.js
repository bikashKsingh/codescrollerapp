import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Title, Drawer} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL} from '../../config/Config';
import {color, font} from '../helpers/Constants';
import MyText from './MyText';
import myStyles from '../helpers/Styles';
import {UserContext} from '../../context/UserContext';
import {useNavigation} from '@react-navigation/native';

export default function DrawerContent(props) {
  const {state, dispatch} = useContext(UserContext);
  const navigation = useNavigation();
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
    <View style={styles.root}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          {/* header */}
          <View style={styles.userInfoSection}>
            <TouchableOpacity
              onPress={() =>
                state.jwtToken
                  ? props.navigation.navigate(
                      state?.jwtToken ? 'ProfileStackScreen' : 'LoginDrawer',
                    )
                  : props.navigation.navigate('LoginStackScreen')
              }>
              <View style={myStyles.row}>
                {/* <EvilIcons name={'user'} color={color.white} size={70} /> */}
                <Image
                  style={styles.logo}
                  resizeMode={'contain'}
                  source={require('../assets/images/male.png')}
                />
                <View>
                  <MyText style={styles.title}>{`Welcome ${
                    state.name ? state?.name?.slice(0, 15) : 'Guest'
                  }`}</MyText>
                  {state.email ? (
                    <MyText style={styles.email}>{`${state?.email?.slice(
                      0,
                      25,
                    )}`}</MyText>
                  ) : null}
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Navigation */}

          <View>
            <Drawer.Section style={styles.drawerSection}>
              {/* Home */}
              <DrawerItem
                style={{marginBottom: 2}}
                icon={({size}) => (
                  <Ionicons name={'home'} color={color.white} size={size} />
                )}
                label="Home"
                onPress={() => {
                  props.navigation.closeDrawer();
                  props.navigation.navigate('HomeDrawer');
                }}
                labelStyle={styles.label}
              />

              {/* Profile */}
              <DrawerItem
                style={{marginBottom: 2}}
                icon={({size}) => (
                  <Ionicons name={'search'} color={color.white} size={size} />
                )}
                label="Search"
                onPress={() => {
                  props.navigation.closeDrawer();
                  props.navigation.navigate('SearchTabScreen');
                }}
                labelStyle={styles.label}
              />

              {/* Profile */}
              <DrawerItem
                style={{marginBottom: 2}}
                icon={({size}) => (
                  <Ionicons name={'person'} color={color.white} size={size} />
                )}
                label="Profile"
                onPress={() => {
                  props.navigation.closeDrawer();
                  props.navigation.navigate('ProfileTabScreen');
                }}
                labelStyle={styles.label}
              />

              {/* Bookmarks */}
              <DrawerItem
                style={{marginBottom: 2}}
                icon={({size}) => (
                  <Ionicons name={'bookmark'} color={color.white} size={size} />
                )}
                label="Bookmark"
                onPress={() => {
                  // props.navigation.closeDrawer();
                  props.navigation.navigate('MyBookmarkStackScreen');
                }}
                labelStyle={styles.label}
              />

              {/* Notification */}
              <DrawerItem
                style={{marginBottom: 2}}
                icon={({size}) => (
                  <Ionicons
                    name={'notifications'}
                    color={color.white}
                    size={size}
                  />
                )}
                label="Notification"
                onPress={() => {
                  // props.navigation.closeDrawer();
                  props.navigation.navigate('NotificationStackScreen');
                  // props.navigation.navigate('ThankYouStackScreen');
                }}
                labelStyle={styles.label}
              />
            </Drawer.Section>

            {/* Prefrences */}
            <Drawer.Section style={styles.drawerSection}>
              {/* Review Us */}
              {/* <DrawerItem
                style={{marginBottom: 2}}
                icon={({size}) => (
                  <Ionicons name={'settings'} color={color.white} size={size} />
                )}
                label="Settings"
                onPress={() => {
                  props.navigation.closeDrawer();
                  // props.navigation.navigate('ChatStackScreen');
                }}
                labelStyle={styles.label}
              /> */}
              {/* Contact Us */}
              <DrawerItem
                style={{marginBottom: 2}}
                icon={({size}) => (
                  <Ionicons name={'headset'} color={color.white} size={size} />
                )}
                label="Contact Us"
                onPress={() => {
                  // props.navigation.closeDrawer();
                  props.navigation.navigate('ContactStackScreen');
                }}
                labelStyle={styles.label}
              />
              {/* FAQs */}
              <DrawerItem
                style={{marginBottom: 2}}
                icon={({size}) => (
                  <Ionicons
                    name={'information-circle-outline'}
                    color={color.white}
                    size={size}
                  />
                )}
                label="FAQs"
                onPress={() => {
                  // props.navigation.closeDrawer();
                  props.navigation.navigate('FaqsStackScreen');
                }}
                labelStyle={styles.label}
              />
              {/* Privacy Policy */}
              <DrawerItem
                style={{marginBottom: 2}}
                icon={({size}) => (
                  <Ionicons
                    name={'lock-closed-outline'}
                    color={color.white}
                    size={size}
                  />
                )}
                label="Privacy Policy"
                onPress={() => {
                  // props.navigation.closeDrawer();
                  props.navigation.navigate('PrivacyPolicyStackScreen');
                }}
                labelStyle={styles.label}
              />
            </Drawer.Section>
          </View>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        {/* Login/Logout */}
        {state.jwtToken ? (
          <DrawerItem
            icon={({size}) => (
              <Ionicons name={'log-out'} color={color.white} size={size} />
            )}
            labelStyle={styles.label}
            label="Log Out"
            onPress={logoutHandler}
          />
        ) : (
          <DrawerItem
            icon={({size}) => (
              <Ionicons name={'log-in'} color={color.white} size={size} />
            )}
            label="Log In"
            onPress={() => props.navigation.navigate('LoginStackScreen')}
            labelStyle={styles.label}
          />
        )}
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.primary,
  },
  drawerContent: {
    flex: 1,
  },
  logo: {
    height: 45,
    width: 45,
  },
  userInfoSection: {
    paddingLeft: 15,
    paddingBottom: 40,
    paddingTop: 40,
    marginBottom: 1,
    marginTop: -5,
    borderBottomWidth: 0.4,
    borderColor: color.white400,
  },
  label: {
    marginLeft: -20,
    marginTop: 5,
    color: color.white,
    fontFamily: font.medium,
  },
  title: {
    fontSize: 15,
    fontFamily: font.semiBold,
    color: color.white,
  },
  email: {
    fontSize: 13,
    marginTop: 0,
    color: color.white,
    fontFamily: font.medium,
  },
  drawerSection: {
    marginBottom: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
  },
});
