import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyText from '../components/MyText';
import {color, font} from '../helpers/Constants';
import Container from '../components/Container';
import Header from '../components/Header';
import HotelHorizontalCard from '../components/CourseHorizontalCard';
import MyCard from '../components/MyCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import myStyles from '../helpers/Styles';
const BookingPaymentScreen = () => {
  const navigation = useNavigation();
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const [hidePassword, sethidePassword] = useState(true);

  const [paymentSuccessModal, setPaymentSuccessModal] = useState(false);

  return (
    <Container>
      <Header title={'Payment'} />
      <View style={styles.root}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <HotelHorizontalCard
            name={'Welcome Hotel Delhi'}
            address={'Delhi, India'}
            price={3000}
            rating={4.5}
            reviews={200}
            image={require('../assets/images/hotels/1.jpg')}
          />

          {/* Card */}
          <MyCard>
            <View style={[styles.cardBody, styles.section]}>
              <View style={styles.tr}>
                <MyText style={styles.th}>Check in</MyText>
                <MyText style={styles.td}>December 16, 2023</MyText>
              </View>
              <View style={styles.tr}>
                <MyText style={styles.th}>Check out</MyText>
                <MyText style={styles.td}>December 20, 2023</MyText>
              </View>
              <View style={styles.tr}>
                <MyText style={styles.th}>Guest</MyText>
                <MyText style={styles.td}>3</MyText>
              </View>
            </View>
          </MyCard>

          {/* Card */}
          <MyCard>
            <View style={[styles.cardBody, styles.section]}>
              <View style={styles.tr}>
                <MyText style={styles.th}>5 Night</MyText>
                <MyText style={styles.td}>3000</MyText>
              </View>
              <View style={styles.tr}>
                <MyText style={styles.th}>Taxes & Fees (10%)</MyText>
                <MyText style={styles.td}>300</MyText>
              </View>
              <View style={[styles.tr, styles.total]}>
                <MyText style={styles.th}>Total</MyText>
                <MyText style={styles.td}>3300</MyText>
              </View>
            </View>
          </MyCard>
        </ScrollView>
        {/* Btn */}
        <View style={styles.btnContainer}>
          {!keyboardIsVisible && (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setPaymentSuccessModal(true);
              }}>
              <MyText style={styles.btnText}>Confirm Payment</MyText>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* Payment Success Modal */}
      <Modal
        visible={paymentSuccessModal}
        transparent={true}
        onDismiss={() => setPaymentSuccessModal(fasle)}
        animationType="slide"
        onRequestClose={() => setPaymentSuccessModal(false)}>
        <TouchableWithoutFeedback
          onPress={() => {
            setPaymentSuccessModal(false);
          }}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          {/* Modal Body */}
          <View style={styles.modalBody}>
            <View style={[myStyles.center, myStyles.my1]}>
              <Ionicons
                name={'checkmark-circle-outline'}
                size={100}
                color={color.primary}
              />
            </View>

            <View style={[myStyles.center, myStyles.my2]}>
              <MyText style={myStyles.heading}>Payment Successfull!</MyText>
              <MyText style={{...myStyles.text, ...myStyles.textCenter}}>
                Successfull made payment and hotel booking
              </MyText>
            </View>

            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  setPaymentSuccessModal(false);
                  navigation.navigate('BookingTicketStackScreen');
                }}>
                <MyText style={styles.btnText}>View Ticket</MyText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnLight}
                onPress={() => {
                  setPaymentSuccessModal(false);
                }}>
                <MyText style={styles.btnTextLight}>Cancel</MyText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default BookingPaymentScreen;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: color.white,
  },
  container: {
    paddingTop: 10,
    flex: 1,
  },

  section: {
    marginBottom: 10,
    flex: 1,
  },

  cardBody: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 10,
  },
  tr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  th: {
    fontFamily: font.medium,
    fontSize: 14,
    color: color.black300,
  },

  td: {
    fontFamily: font.semiBold,
    fontSize: 14,
    color: color.black600,
  },
  total: {
    borderTopWidth: 1,
    borderTopColor: color.white600,
    paddingTop: 10,
  },

  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  btn: {
    backgroundColor: color.primary600,
    paddingVertical: 12,
    paddingHorizontal: 70,
    borderRadius: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    color: color.white,
    fontFamily: font.semiBold,
  },
  btnLight: {
    backgroundColor: color.primary200,
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnTextLight: {
    fontSize: 14,
    color: color.primary,
    fontFamily: font.semiBold,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContainer: {
    backgroundColor: color.white,
    position: 'absolute',
    elevation: 5,
    shadowColor: color.white800,
    flex: 1,
    borderRadius: 20,
    top: '17%',
    height: '60%',
    width: '90%',
    left: '5%',
  },

  modalBody: {
    flex: 1,
    padding: 15,
  },
});
