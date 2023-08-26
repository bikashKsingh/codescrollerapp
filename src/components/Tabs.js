import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  useColorScheme,
} from 'react-native';
import {color, font} from '../helpers/Constants';
import MyText from './MyText';

const Tabs = ({data, selected, handleSelect = () => {}}) => {
  const isDark = useColorScheme() == 'dark';
  return (
    <View style={styles.root}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={[styles.btn, selected == item._id ? styles.btnFill : null]}
              onPress={() => {
                handleSelect(item._id);
              }}>
              <MyText
                style={{
                  ...styles.text,
                  color: selected == item._id ? color.white : color.primary,
                }}>
                {item.name}
              </MyText>
            </TouchableOpacity>
          );
        }}
        data={data}
        keyExtractor={item => `tabs-${item._id}`}
      />
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  root: {
    marginVertical: 10,
  },
  btn: {
    borderColor: color.primary,
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    marginRight: 10,
  },
  text: {
    fontFamily: font.medium,
    color: color.primary,
  },
  btnFill: {
    backgroundColor: color.primary,
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    marginRight: 10,
  },
});
