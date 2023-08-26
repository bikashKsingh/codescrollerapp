import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  TextInput,
  useColorScheme,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import {color, font} from '../helpers/Constants';
import MyText from './MyText';
import {useNavigation} from '@react-navigation/native';

const SearchBox = ({handleSearchQuery = () => {}}) => {
  const isDark = useColorScheme() == 'dark';
  return (
    <View
      style={[
        styles.root,
        {backgroundColor: isDark ? color.black : color.white},
      ]}>
      <TextInput
        placeholder="Search"
        placeholderTextColor={isDark ? color.white800 : color.black400}
        style={[
          styles.searchBox,
          {backgroundColor: isDark ? color.black200 : color.white400},
          {color: isDark ? color.white600 : color.black600},
          {shadowColor: isDark ? color.black200 : color.white},
        ]}
        onChangeText={text => handleSearchQuery(text)}
      />
      <Ionicons
        style={styles.searchIcon}
        name={'search-outline'}
        color={isDark ? color.white800 : color.black400}
        size={25}
      />
      <TouchableOpacity style={styles.filterIcon}>
        <Ionicons
          name={'ios-filter-outline'}
          color={isDark ? color.primary : color.primary}
          size={25}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
  },

  searchBox: {
    fontSize: 14,
    fontFamily: font.regular,
    padding: 12,
    borderRadius: 10,
    paddingHorizontal: 40,
    position: 'relative',
    elevation: 4,
  },
  searchIcon: {
    position: 'absolute',
    top: 12,
    left: 10,
    zIndex: 199,
  },
  filterIcon: {
    position: 'absolute',
    top: 12,
    right: 10,
    zIndex: 199,
  },
});
