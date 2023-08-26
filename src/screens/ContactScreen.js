import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Linking,
} from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import MyText from '../components/MyText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color, font} from '../helpers/Constants';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

const ContactScreen = ({route}) => {
  const isDark = useColorScheme() == 'dark';
  const [contactDetails, setContactDetails] = useState({
    customerService: '9117162463',
    whatsapp: '9117162463',
    website: 'https://codescroller.com',
    facebook: 'https://www.facebook.com/CodeScroller/',
    twitter: 'https://www.twitter.com/CodeScroller/',
    instagram: 'https://www.instagram.com/CodeScroller/',
  });
  const navigation = useNavigation();

  return (
    <Container>
      <Header title={'Contact Us'} />

      <ScrollView style={styles.root}>
        {/* Customer Service */}
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`tel:${contactDetails.customerService}`);
          }}
          style={[
            styles.card,
            {backgroundColor: isDark ? color.black200 : color.white400},
          ]}>
          <Ionicons name="home" style={styles.icon} color={color.primary} />
          <MyText
            style={[
              styles.heading,
              {color: isDark ? color.white : color.black},
            ]}>
            Customer Service
          </MyText>
        </TouchableOpacity>

        {/* WhatsApp */}
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              `whatsapp://send?phone=${
                contactDetails.whatsapp
              }&text=${'Hi, I am from your application'}`,
            );
          }}
          style={[
            styles.card,
            {backgroundColor: isDark ? color.black200 : color.white400},
          ]}>
          <Ionicons
            name="logo-whatsapp"
            style={styles.icon}
            color={color.primary}
          />
          <MyText
            style={[
              styles.heading,
              {color: isDark ? color.white : color.black},
            ]}>
            WhatsApp
          </MyText>
        </TouchableOpacity>

        {/* Website */}
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`${contactDetails.website}`);
          }}
          style={[
            styles.card,
            {backgroundColor: isDark ? color.black200 : color.white400},
          ]}>
          <Ionicons
            name="globe-outline"
            style={styles.icon}
            color={color.primary}
          />
          <MyText
            style={[
              styles.heading,
              {color: isDark ? color.white : color.black},
            ]}>
            Website
          </MyText>
        </TouchableOpacity>

        {/* Facebook */}
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`${contactDetails.facebook}`);
          }}
          style={[
            styles.card,
            {backgroundColor: isDark ? color.black200 : color.white400},
          ]}>
          <Ionicons
            name="logo-facebook"
            style={styles.icon}
            color={color.primary}
          />
          <MyText
            style={[
              styles.heading,
              {color: isDark ? color.white : color.black},
            ]}>
            Facebook
          </MyText>
        </TouchableOpacity>

        {/* Twitter */}
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`${contactDetails.twitter}`);
          }}
          style={[
            styles.card,
            {backgroundColor: isDark ? color.black200 : color.white400},
          ]}>
          <Ionicons
            name="logo-twitter"
            style={styles.icon}
            color={color.primary}
          />
          <MyText
            style={[
              styles.heading,
              {color: isDark ? color.white : color.black},
            ]}>
            Twitter
          </MyText>
        </TouchableOpacity>

        {/* Instagram */}
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`${contactDetails.instagram}`);
          }}
          style={[
            styles.card,
            {backgroundColor: isDark ? color.black200 : color.white400},
          ]}>
          <Ionicons
            name="logo-instagram"
            style={styles.icon}
            color={color.primary}
          />
          <MyText
            style={[
              styles.heading,
              {color: isDark ? color.white : color.black},
            ]}>
            Instagram
          </MyText>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 20,
  },
  icon: {
    fontSize: 16,
  },
  heading: {
    fontFamily: font.semiBold,
    fontSize: 16,
    marginTop: 3,
  },
  row: {
    flexDirection: 'row',
    gap: 5,
  },
});
