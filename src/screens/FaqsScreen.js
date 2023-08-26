import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Linking,
} from 'react-native';
import Container from '../components/Container';
import Header from '../components/Header';
import MyText from '../components/MyText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color, font} from '../helpers/Constants';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {List} from 'react-native-paper';

const FaqsScreen = ({route}) => {
  const isDark = useColorScheme() == 'dark';

  const navigation = useNavigation();

  return (
    <Container>
      <Header title={'FAQs'} />

      <ScrollView style={styles.root}>
        <List.AccordionGroup>
          <List.Accordion
            style={[
              styles.card,
              {backgroundColor: isDark ? color.black200 : color.white400},
            ]}
            title="What is CodeScroller?"
            titleStyle={[
              styles.title,
              {color: isDark ? color.white500 : color.black},
            ]}
            id="1"
            theme={{
              fonts: {
                primary: font.primary,
              },
              colors: {
                background: isDark ? color.black : color.white400,
              },
            }}>
            <MyText
              style={[
                styles.text,
                {color: isDark ? color.white500 : color.black},
              ]}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque
              nihil voluptatum et molestiae culpa, animi ea est adipisci
              distinctio? Fuga, quas? Labore obcaecati accusamus ducimus
              doloremque, dignissimos libero totam maiores.
            </MyText>
          </List.Accordion>

          <List.Accordion
            title="What is CodeScroller?"
            id="2"
            style={[
              styles.card,
              {backgroundColor: isDark ? color.black200 : color.white400},
            ]}
            titleStyle={styles.title}
            theme={{
              fonts: {
                primary: font.primary,
              },
              colors: {
                background: isDark ? color.black : color.white400,
              },
            }}>
            <MyText
              style={[
                styles.text,
                {color: isDark ? color.white500 : color.black},
              ]}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque
              nihil voluptatum et molestiae culpa, animi ea est adipisci
              distinctio? Fuga, quas? Labore obcaecati accusamus ducimus
              doloremque, dignissimos libero totam maiores.
            </MyText>
          </List.Accordion>
        </List.AccordionGroup>
      </ScrollView>
    </Container>
  );
};

export default FaqsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 15,
  },

  title: {
    fontFamily: font.semiBold,
    fontSize: 15,
    marginTop: 3,
  },
  text: {
    fontFamily: font.regular,
    fontSize: 13,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
});
