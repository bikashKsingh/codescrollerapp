import {useContext} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  useColorScheme,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import {color, font} from '../helpers/Constants';
import {useNavigation} from '@react-navigation/native';
import MyText from './MyText';
import {UserContext} from '../../context/UserContext';
import {greetings} from '../helpers/dateTimeHelper';

const HeaderHome = ({title}) => {
  const {state, dispatch} = useContext(UserContext);
  const navigation = useNavigation();
  const isDark = useColorScheme() == 'dark';

  return (
    <View
      style={[
        styles.root,
        {backgroundColor: isDark ? color.black : color.white},
      ]}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <FontAwesome5
            name={'hamburger'}
            size={35}
            color={isDark ? color.white : color.black300}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Image
            style={styles.logo}
            resizeMode={'contain'}
            source={require('../assets/images/male.png')}
          />
        </TouchableOpacity>

        <View>
          <MyText
            style={[
              styles.greet,
              {color: isDark ? color.primary : color.black800},
            ]}>
            {greetings()} 👋
          </MyText>
          <MyText
            style={[
              styles.name,
              {color: isDark ? color.white : color.black800},
            ]}>
            {state.name || 'Guest'}
          </MyText>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            navigation.navigate('NotificationStackScreen');
          }}>
          <Ionicons
            name={'notifications-outline'}
            size={25}
            color={isDark ? color.white : color.black500}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            navigation.navigate('MyBookmarkStackScreen');
          }}>
          <Ionicons
            name={'bookmark-outline'}
            size={25}
            color={isDark ? color.white : color.black500}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    backgroundColor: color.white,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    gap: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  logo: {
    height: 45,
    width: 45,
  },
  greet: {
    fontFamily: font.regular,
    color: color.black800,
    fontSize: 13,
  },
  name: {
    fontFamily: font.semiBold,
    color: color.black800,
    fontSize: 15,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  text: {
    fontSize: 18,
    color: color.black,
    paddingTop: 4,
    fontFamily: font.semiBold,
  },
});
