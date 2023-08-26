import {View, StyleSheet, useColorScheme} from 'react-native';
import React from 'react';

import {color} from '../helpers/Constants';

const MyCard = ({children}) => {
  const isDark = useColorScheme() == 'dark';
  return (
    <View
      style={[
        styles.card,
        {backgroundColor: isDark ? color.black200 : color.white},
        {shadowColor: isDark ? color.black200 : color.black300},
      ]}>
      {children}
    </View>
  );
};

export default MyCard;

const styles = StyleSheet.create({
  card: {
    elevation: 5,
    borderRadius: 20,
    marginTop: 2,
    marginHorizontal: 1,
    marginBottom: 15,
  },
});
