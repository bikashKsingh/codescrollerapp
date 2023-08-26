import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {color, font} from '../helpers/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import MyCourseScreen from '../screens/MyCourseScreen';
import {useColorScheme} from 'react-native';
import {UserContext} from '../../context/UserContext';
import LoginScreen from '../screens/LoginScreen';
import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const {state, dispatch} = useContext(UserContext);
  const isDark = useColorScheme() === 'dark';
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName="HomeTabScreen"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarInactiveTintColor: isDark ? color.white800 : color.black300,
        tabBarActiveTintColor: color.primary,
        // tabBarActiveBackgroundColor: color.primary,
        tabBarStyle: {
          backgroundColor: isDark ? color.black200 : color.white,
          height: 55,
        },
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: {
          marginHorizontal: 20,
          marginVertical: 5,
          borderRadius: 10,
        },
        tabBarLabelStyle: {
          fontFamily: font.medium,
          marginTop: 3,
          // color: color.white800,
        },
      }}>
      {/* Home Tab */}
      <Tab.Screen
        name="HomeTabScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* Search Tab */}
      <Tab.Screen
        name="SearchTabScreen"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color, size, focused}) => (
            <AntDesign
              name={focused ? 'search1' : 'search1'}
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* My Course Tab */}
      <Tab.Screen
        name="CourseTabScreen"
        component={state.jwtToken ? MyCourseScreen : LoginScreen}
        options={{
          tabBarLabel: 'My Course',
          tabBarBadgeStyle: {
            backgroundColor: color.fourth500,
            color: color.white,
          },
          tabBarIcon: ({color, size, focused}) => (
            <AntDesign
              name={focused ? 'book' : 'book'}
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* Account Tab*/}
      <Tab.Screen
        name="ProfileTabScreen"
        component={state.jwtToken ? ProfileScreen : LoginScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size, focused}) => (
            <Feather
              name={focused ? 'user' : 'user'}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
