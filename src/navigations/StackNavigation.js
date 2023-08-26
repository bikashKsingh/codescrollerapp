import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreeen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DrawerNavigation from './DrawerNavigation';
import NotificationScreen from '../screens/NotificationScreen';
import MyBookmarkScreen from '../screens/MyBookmarkScreen';
import MyCourseScreen from '../screens/MyCourseScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen';
import ReviewScreen from '../screens/ReviewScreen';
import BookingDateScreen from '../screens/BookingDateScreen';
import BookingCustomerScreen from '../screens/BookingCustomerScreen';
import BookingPaymentScreen from '../screens/BookingPaymentScreen';
import SignupOTPScreen from '../screens/SignupOTPScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ForgotPasswordOTPScreen from '../screens/ForgotPasswordOTPScreen';
import CreatePasswordScreen from '../screens/CreatePasswordScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import LessonScreen from '../screens/LessonScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import ContactScreen from '../screens/ContactScreen';
import FaqsScreen from '../screens/FaqsScreen';
import LearnCourseScreen from '../screens/LearnCourseScreen';
import VideoDetailScreen from '../screens/VideoDetailScreen';
import MakeReviewScreen from '../screens/MakeReviewScreen';
import CourseCheckoutScreen from '../screens/CourseCheckoutScreen';
import ProfileScreen from '../screens/ProfileScreen';
// import ChatScreen from '../screens/ChatScreen';
// import CartScreen from '../screens/CartScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import MyOrdersScreen from '../screens/MyOrdersScreen';
// import WishlistScreen from '../screens/WishlistScreen';
// import ShipppingAddressScreen from '../screens/ShipppingAddressScreen';
// import ProfileSettingScreen from '../screens/ProfileSettingScreen';
// import AboutScreen from '../screens/AboutScreen';
// import ContactScreen from '../screens/ContactScreen';
// import TermsAndPrivacyScreen from '../screens/TermsAndPrivacyScreen';
// import MakeReviewScreen from '../screens/MakeReviewScreen';
// import ListingScreen from '../screens/ListingScreen';
// import ProductDetailsScreen from '../screens/ProductDetailsScreen';
// import ProductReviewsScreen from '../screens/ProductReviewsScreen';
// import CheckoutScreen from '../screens/CheckoutScreen';
// import OrderDetailsScreen from '../screens/OrderDetailsScreen';
// import CancelOrderScreen from '../screens/CancelOrderScreen';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeStackScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeStackScreen" component={DrawerNavigation} />
      <Stack.Screen name="LoginStackScreen" component={LoginScreen} />
      <Stack.Screen name="SignupStackScreen" component={SignupScreen} />
      <Stack.Screen name="SignupOTPStackScreen" component={SignupOTPScreen} />
      <Stack.Screen
        name="ForgotPasswordStackScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name="ForgotPasswordOTPStackScreen"
        component={ForgotPasswordOTPScreen}
      />
      <Stack.Screen
        name="CreatePasswordStackScreen"
        component={CreatePasswordScreen}
      />
      <Stack.Screen
        name="NotificationStackScreen"
        component={NotificationScreen}
      />
      <Stack.Screen name="MyBookmarkStackScreen" component={MyBookmarkScreen} />
      <Stack.Screen name="MyCourseStackScreen" component={MyCourseScreen} />
      <Stack.Screen
        name="LearnCourseStackScreen"
        component={LearnCourseScreen}
      />
      <Stack.Screen
        name="VideoDetailStackScreen"
        component={VideoDetailScreen}
      />
      <Stack.Screen
        name="CourseDetailStackScreen"
        component={CourseDetailScreen}
      />
      <Stack.Screen
        name="CourseCheckoutStackScreen"
        component={CourseCheckoutScreen}
      />

      <Stack.Screen name="FaqsStackScreen" component={FaqsScreen} />
      <Stack.Screen name="ContactStackScreen" component={ContactScreen} />
      <Stack.Screen name="ReviewStackScreen" component={ReviewScreen} />
      <Stack.Screen name="MakeReviewStackScreen" component={MakeReviewScreen} />
      <Stack.Screen name="LessonStackScreen" component={LessonScreen} />
      <Stack.Screen
        name="PrivacyPolicyStackScreen"
        component={PrivacyPolicyScreen}
      />
      <Stack.Screen
        name="BookingDateStackScreen"
        component={BookingDateScreen}
      />
      <Stack.Screen
        name="BookingCustomerStackScreen"
        component={BookingCustomerScreen}
      />
      <Stack.Screen
        name="BookingPaymentStackScreen"
        component={BookingPaymentScreen}
      />

      <Stack.Screen
        name="EditProfileStackScreen"
        component={EditProfileScreen}
      />
      <Stack.Screen name="ProfileStackScreen" component={ProfileScreen} />
      {/* <Stack.Screen name="AboutStackScreen" component={AboutScreen} />
      <Stack.Screen name="ContactStackScreen" component={ContactScreen} />
      <Stack.Screen name="SignupStackScreen" component={SignupScreen} />
      <Stack.Screen name="ChatStackScreen" component={ChatScreen} />
      <Stack.Screen name="CartStackScreen" component={CartScreen} />
      <Stack.Screen name="ProfileStackScreen" component={ProfileScreen} />
      <Stack.Screen name="MyOrdersStackScreen" component={MyOrdersScreen} />
      <Stack.Screen
        name="CancelOrderStackScreen"
        component={CancelOrderScreen}
      /> */}
      {/* <Stack.Screen name="WishlistStackScreen" component={WishlistScreen} />
      <Stack.Screen
        name="ShippingAddressStackScreen"
        component={ShipppingAddressScreen}
      />
      <Stack.Screen
        name="ProfileSettingStackScreen"
        component={ProfileSettingScreen}
      />
      <Stack.Screen
        name="TermsAndPrivacyStackScreen"
        component={TermsAndPrivacyScreen}
      />
      <Stack.Screen name="MakeReviewStackScreen" component={MakeReviewScreen} />
      <Stack.Screen name="ListingStackScreen" component={ListingScreen} />
      <Stack.Screen
        name="ProductDetailsStackScreen"
        component={ProductDetailsScreen}
      />

      <Stack.Screen
        name="ProductReviewsStackScreen"
        component={ProductReviewsScreen}
      />

      <Stack.Screen name="CheckoutStackScreen" component={CheckoutScreen} />
      <Stack.Screen
        name="OrderDetailsStackScreen"
        component={OrderDetailsScreen}
      /> */}
    </Stack.Navigator>
  );
};

export default StackNavigation;
