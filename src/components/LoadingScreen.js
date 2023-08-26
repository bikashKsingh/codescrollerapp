import {
  View,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {color} from '../helpers/Constants';
import MyText from './MyText';

export default function LoadingScreen() {
  const isDark = useColorScheme() == 'dark';
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator
        color={isDark ? color.white : color.primary}
        size={30}
      />
      <MyText
        style={[styles.text, {color: isDark ? color.white : color.primary}]}>
        Loading
      </MyText>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 16,
  },
});
