import {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  useColorScheme,
  Appearance,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import {color, font} from '../helpers/Constants';
import MyText from './MyText';
import {useNavigation} from '@react-navigation/native';

const Header = ({
  title,
  icon,
  iconComp,
  onPressOpenScreen,
  hasArrow,
  handlePress,
}) => {
  const navigation = useNavigation();
  const isDark = useColorScheme() == 'dark';
  const onPressHandler = () => {
    if (handlePress) handlePress();
    if (onPressOpenScreen) navigation.navigate(onPressOpenScreen);
  };

  return (
    <TouchableOpacity style={styles.root} onPress={onPressHandler}>
      <View style={styles.container}>
        {iconComp ? (
          iconComp
        ) : (
          <Ionicons
            name={icon || 'person-outline'}
            color={isDark ? color.white : color.black}
            size={25}
          />
        )}
        <MyText
          style={[styles.text, {color: isDark ? color.white : color.black400}]}>
          {title}
        </MyText>
      </View>
      {hasArrow && (
        <FontAwesome
          name={'angle-right'}
          color={isDark ? color.white : color.black}
          size={25}
          style={{alignSelf: 'flex-start', justifyContent: 'center'}}
        />
      )}
    </TouchableOpacity>
  );
};

export default Header;
const styles = StyleSheet.create({
  root: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginVertical: 11,
    justifyContent: 'space-between',
  },
  container: {
    flexDirection: 'row',
    gap: 10,
  },
  text: {
    paddingTop: 5,
    fontFamily: font.medium,
  },
});
