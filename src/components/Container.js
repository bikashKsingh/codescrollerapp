import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {color} from '../helpers/Constants';
const Container = ({
  children,
  statusBarStyle,
  statusBarBgColor,
  isStatusBarHidden,
}) => {
  const isDark = useColorScheme() == 'dark';
  return (
    <SafeAreaView
      style={[
        styles.root,
        {backgroundColor: isDark ? color.black : color.white},
      ]}>
      <StatusBar
        barStyle={statusBarStyle || 'dark-content'}
        translucent
        backgroundColor="transparent"
        hidden={isStatusBarHidden || false}
      />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.white,
  },
});

export default Container;
