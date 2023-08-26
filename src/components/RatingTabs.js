import React, {useState} from 'react';
import {TouchableOpacity, View, StyleSheet, FlatList} from 'react-native';
import {color, font} from '../helpers/Constants';
import MyText from './MyText';
import {RatingData} from '../../myData/TabData';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RatingTabs = ({handleRatingChange = () => {}}) => {
  const [selected, setSelected] = useState(null);

  return (
    <View style={styles.root}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={[styles.btn, selected == item ? styles.btnFill : null]}
              onPress={() => {
                setSelected(item);
                handleRatingChange(item);
              }}>
              <Ionicons
                name={'star'}
                style={styles.star}
                color={selected == item ? color.white : color.primary}
                size={17}
              />
              <MyText
                style={{
                  ...styles.text,
                  color: selected == item ? color.white : color.primary,
                }}>
                {' '}
                {item}{' '}
              </MyText>
            </TouchableOpacity>
          );
        }}
        data={RatingData}
        keyExtractor={item => `tabs-${item}`}
      />
    </View>
  );
};

export default RatingTabs;

const styles = StyleSheet.create({
  root: {
    marginBottom: 12,
  },
  btn: {
    borderColor: color.primary,
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 100,
    marginRight: 10,
    flexDirection: 'row',
  },
  text: {
    fontFamily: font.medium,
    color: color.primary,
  },
  btnFill: {
    backgroundColor: color.primary,
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 100,
    marginRight: 10,
  },
});
