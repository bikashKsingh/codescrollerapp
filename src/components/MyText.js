import {Text, StyleSheet} from 'react-native';
import React from 'react';
import {font} from '../helpers/Constants';

const MyText = ({children, style}) => {
  return <Text style={[{...styles.text}, style]}>{children}</Text>;
};

export default MyText;

const styles = StyleSheet.create({
  text: {
    fontFamily: font.regular,
  },
});
