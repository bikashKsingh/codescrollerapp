import {View, Image, StyleSheet, useColorScheme} from 'react-native';
import React from 'react';
import MyText from './MyText';
import {font, color} from '../helpers/Constants';

const DataNotFound = ({text}) => {
  const isDark = useColorScheme() === 'dark';
  return (
    <View style={styles.dataNotFound}>
      <Image
        style={styles.dataNotFoundImage}
        source={require('../assets/images/no-data-found.png')}
      />
      <MyText
        style={[
          styles.subHeading,
          {color: isDark ? color.white : color.black},
        ]}>
        {text}
      </MyText>
    </View>
  );
};

export default DataNotFound;
const styles = StyleSheet.create({
  heading: {
    fontFamily: font.semiBold,
    fontSize: 17,
    color: color.black800,
  },
  subHeading: {
    fontFamily: font.semiBold,
    fontSize: 15,
  },

  dataNotFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataNotFoundImage: {
    height: 140,
    width: 140,
  },
});
