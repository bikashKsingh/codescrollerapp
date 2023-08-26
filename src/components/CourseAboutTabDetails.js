import React from 'react';
import MyText from './MyText';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {color, font} from '../helpers/Constants';
import {useNavigation} from '@react-navigation/native';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
import {WINDOW_WIDTH} from '../utils/CommonUtils';

const CourseAboutTabDetails = props => {
  const navigation = useNavigation();
  const isDark = useColorScheme() === 'dark';

  return (
    <>
      {/* Mentor */}
      <View style={styles.section}>
        <View style={[styles.headingContainer]}>
          <MyText
            style={[
              styles.heading,
              {color: isDark ? color.white : color.black},
            ]}>
            Mentor
          </MyText>
        </View>
        <View style={styles.mentorCard}>
          <Image
            style={styles.mentorImage}
            source={
              props.instructorImage
                ? {uri: props.instructorImage}
                : require('../assets/images/user.jpg')
            }
          />
          <View>
            <MyText
              style={[
                styles.mentorName,
                {color: isDark ? color.white : color.black},
              ]}>
              {props?.instructorName}
            </MyText>
            <MyText
              style={[
                styles.mentorDesignation,
                {color: isDark ? color.white700 : color.black800},
              ]}>
              {props?.instructorDesignation || 'Not Available'}
            </MyText>
          </View>
        </View>
      </View>

      {/* Details Section */}
      {/* <View style={styles.section}>
            <View style={[styles.headingContainer]}>
              <MyText style={styles.heading}>Details</MyText>
            </View>

            <View style={[styles.row, styles.spaceBetween]}>
              <View style={styles.detailCard}>
                <Ionicons
                  style={styles.detailIcon}
                  color={color.primary}
                  size={25}
                  name={'business'}
                />
                <MyText style={styles.detailText}>Hotels</MyText>
              </View>
              <View style={styles.detailCard}>
                <Ionicons
                  style={styles.detailIcon}
                  color={color.primary}
                  size={25}
                  name={'bed'}
                />
                <MyText style={styles.detailText}>4 Bedrooms</MyText>
              </View>
              <View style={styles.detailCard}>
                <MaterialIcons
                  style={styles.detailIcon}
                  color={color.primary}
                  size={25}
                  name={'bathtub'}
                />
                <MyText style={styles.detailText}>2 Bathrooms</MyText>
              </View>
              <View style={styles.detailCard}>
                <Ionicons
                  style={styles.detailIcon}
                  color={color.primary}
                  size={25}
                  name={'cellular'}
                />
                <MyText style={styles.detailText}>4000 sqft</MyText>
              </View>
            </View>
          </View> */}

      {/* About Course Section */}
      <View style={styles.section}>
        <View style={[styles.headingContainer]}>
          <MyText
            style={[
              styles.heading,
              {color: isDark ? color.white : color.black},
            ]}>
            About Course
          </MyText>
        </View>
        <RenderHtml
          contentWidth={WINDOW_WIDTH}
          source={{html: props.description}}
          systemFonts={[...defaultSystemFonts, font.regular]}
          tagsStyles={{
            p: {...styles.p, color: isDark ? color.white : color.black800},
            ul: {...styles.ul, color: color.primary},
            li: {...styles.li, color: isDark ? color.white : color.black800},
          }}
        />
      </View>

      {/* Requirements Section */}
      <View style={styles.section}>
        <View style={[styles.headingContainer]}>
          <MyText
            style={[
              styles.heading,
              {color: isDark ? color.white : color.black},
            ]}>
            Requirements
          </MyText>
        </View>
        <RenderHtml
          contentWidth={WINDOW_WIDTH}
          source={{html: props.requirements}}
          systemFonts={[...defaultSystemFonts, font.regular]}
          tagsStyles={{
            p: {...styles.p, color: isDark ? color.white : color.black800},
            ul: {...styles.ul, color: color.primary},
            li: {...styles.li, color: isDark ? color.white : color.black800},
          }}
        />
      </View>

      {/* Heightlights Section */}
      <View style={styles.section}>
        <View style={[styles.headingContainer]}>
          <MyText
            style={[
              styles.heading,
              {color: isDark ? color.white : color.black},
            ]}>
            Heightlights
          </MyText>
        </View>
        <RenderHtml
          contentWidth={WINDOW_WIDTH}
          source={{html: props.highlights}}
          systemFonts={[...defaultSystemFonts, font.regular]}
          tagsStyles={{
            p: {...styles.p, color: isDark ? color.white : color.black800},
            ul: {...styles.ul, color: color.primary},
            li: {...styles.li, color: isDark ? color.white : color.black800},
          }}
        />
      </View>

      {/* Prerequisite Section */}
      <View style={styles.section}>
        <View style={[styles.headingContainer]}>
          <MyText
            style={[
              styles.heading,
              {color: isDark ? color.white : color.black},
            ]}>
            Prerequisite
          </MyText>
        </View>
        <RenderHtml
          contentWidth={WINDOW_WIDTH}
          source={{html: props.prerequisite}}
          systemFonts={[...defaultSystemFonts, font.regular]}
          tagsStyles={{
            p: {...styles.p, color: isDark ? color.white : color.black800},
            ul: {...styles.ul, color: color.primary},
            li: {...styles.li, color: isDark ? color.white : color.black800},
          }}
        />
      </View>
    </>
  );
};

export default CourseAboutTabDetails;
const styles = StyleSheet.create({
  section: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 5,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },

  mentorCard: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  mentorImage: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  mentorName: {
    fontSize: 16,
    fontFamily: font.semiBold,
  },
  mentorDesignation: {
    fontSize: 15,
    fontFamily: font.regular,
  },

  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  heading: {
    fontFamily: font.semiBold,
    fontSize: 17,
  },

  detailCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailText: {
    fontFamily: font.medium,
    marginTop: 5,
    color: color.black500,
    fontSize: 14,
  },
  text: {
    fontFamily: font.regular,
  },

  // html tags
  p: {
    fontFamily: font.regular,
    fontSize: 14,
    padding: 0,
    margin: 0,
    textAlign: 'justify',
    marginBottom: 10,
  },
  ul: {
    margin: 0,
    padding: 0,
    paddingLeft: 10,
    width: '100%',
  },
  li: {
    fontFamily: font.regular,
    fontSize: 14,
    padding: 0,
    marginLeft: 10,
    textAlign: 'justify',
  },
});
