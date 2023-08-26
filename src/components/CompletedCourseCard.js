import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import MyText from './MyText';
import {color, font} from '../helpers/Constants';
import {useNavigation} from '@react-navigation/native';
import MyCard from './MyCard';
import {ProgressBar} from 'react-native-paper';

const CompletedCourseCard = ({
  courseId,
  name,
  thumbnail,
  duration,
  totalContents,
  completedContent,
}) => {
  const navigation = useNavigation();
  const isDark = useColorScheme() === 'dark';
  return (
    <MyCard>
      <TouchableOpacity
        style={styles.cardBody}
        onPress={() => {
          navigation.navigate('LearnCourseStackScreen', {
            courseId,
          });
        }}>
        <Image source={{uri: thumbnail}} style={styles.image} />
        <View style={styles.container}>
          <MyText
            style={[
              styles.name,
              {color: isDark ? color.white : color.black700},
            ]}>
            {name}
          </MyText>
          <MyText
            style={[
              styles.text,
              {color: isDark ? color.white700 : color.black300},
            ]}>
            {duration}
          </MyText>
          <View style={styles.row}>
            <View style={styles.progressSection}>
              <ProgressBar
                theme={{
                  colors: {
                    primary: color.primary,
                    secondary: color.black600,
                  },
                }}
                style={styles.progressBar}
                progress={0.8}
              />
            </View>
            <MyText
              style={[
                styles.text,
                {color: isDark ? color.white700 : color.black300},
              ]}>{`${completedContent}/${totalContents}`}</MyText>
          </View>
        </View>
      </TouchableOpacity>
    </MyCard>
  );
};

export default CompletedCourseCard;

const styles = StyleSheet.create({
  cardBody: {
    borderRadius: 20,
    marginTop: 2,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginHorizontal: 1,
    flexDirection: 'row',
  },

  image: {
    height: 100,
    width: 100,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    gap: 0,
    justifyContent: 'space-around',
  },

  name: {
    fontSize: 16,
    fontFamily: font.semiBold,
    marginBottom: 0,
  },

  text: {
    fontSize: 13,
    fontFamily: font.medium,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  progressSection: {
    width: '75%',
  },
  progressBar: {
    height: 10,
    borderRadius: 15,
  },
});
