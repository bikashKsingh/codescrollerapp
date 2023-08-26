import {TouchableOpacity, View, StyleSheet, useColorScheme} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {color, font} from '../helpers/Constants';
import MyText from './MyText';
import {useNavigation} from '@react-navigation/native';

const Header = ({title}) => {
  const navigation = useNavigation();
  const isDark = useColorScheme() == 'dark';
  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  return (
    <View
      style={[
        styles.root,
        {backgroundColor: isDark ? color.black : color.white},
      ]}>
      <TouchableOpacity onPress={goBack} style={styles.container}>
        <Ionicons
          name="arrow-back-outline"
          color={isDark ? color.white : color.black}
          size={22}
        />
        {title ? (
          <MyText
            style={[styles.text, {color: isDark ? color.white : color.black}]}>
            {title}
          </MyText>
        ) : (
          ''
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginTop: 25,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  text: {
    fontSize: 18,
    paddingTop: 4,
    fontFamily: font.semiBold,
  },
});
