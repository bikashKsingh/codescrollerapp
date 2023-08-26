import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Container from '../components/Container';
import Header from '../components/Header';
import MyText from '../components/MyText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {color, font} from '../helpers/Constants';
import {Calendar, CalendarList} from 'react-native-calendars';
import moment from 'moment';

const BookingDateScreen = ({route}) => {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guestQty, setGuestQty] = useState(1);

  const [markedDates, setMarkedDate] = useState({});

  function dateChangeHandler(day) {
    if (!startDate && !endDate) {
      setStartDate(day.dateString);
      setMarkedDate({
        [day.dateString]: {
          startingDay: true,
          color: color.primary,
          customTextStyle: {color: color.white},
        },
      });
    } else if (startDate && !endDate) {
      let diff = parseInt(
        (new Date(day.dateString) - new Date(startDate)) /
          (1000 * 60 * 60 * 24),
        10,
      );

      if (diff > 0) {
      }

      setEndDate(day.dateString);
      setMarkedDate({
        ...markedDates,
        [day.dateString]: {
          endingDay: true,
          color: color.primary,
          customTextStyle: {color: color.white},
        },
      });
    }
  }

  const increaseGestHandler = () => {
    setGuestQty(old => {
      return old + 1;
    });
  };
  const decreaseGestHandler = () => {
    if (guestQty > 1) {
      setGuestQty(old => {
        return old - 1;
      });
    }
  };

  return (
    <Container>
      <Header title={'Select Date'} />
      <ScrollView style={styles.root}>
        <View style={styles.calender}>
          <Calendar
            enableDateChange={true}
            pagingEnabled={true}
            // Initially visible month. Default = now

            initialDate={moment().format('YYYY-MM-DD')}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={moment().format('YYYY-MM-DD')}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={'2023-05-30'}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => {
              dateChangeHandler(day);
            }}
            onDayChange={day => {
              console.log('day changed');
            }}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={day => {
              console.log('selected day', day);
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'MMMM yyyy'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={month => {
              console.log('month changed', month);
            }}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            // renderArrow={direction => <Ionicons name={'home'} />}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={false}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={subtractMonth => subtractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            // Disable left arrow. Default = false
            disableArrowLeft={false}
            // Disable right arrow. Default = false
            disableArrowRight={false}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={false}
            // Replace default month and year title with custom one. the function receive a date as parameter
            // renderHeader={date => {
            //   <View>
            //     <MyText>{date}</MyText>
            //   </View>;
            // }}
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={true}
            style={{
              //   borderWidth: 1,
              //   borderColor: 'gray',
              //   height: 350,
              borderRadius: 10,
            }}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: color.primary200,
              textSectionTitleColor: '#b6c1cd',
              textSectionTitleDisabledColor: '#d9e1e8',
              selectedDayBackgroundColor: color.primary,
              selectedDayTextColor: '#ffffff',
              todayTextColor: color.primary,
              dayTextColor: color.black400,
              textDisabledColor: color.white800,
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: color.primary,
              disabledArrowColor: color.black300,
              monthTextColor: color.black,
              indicatorColor: 'blue',
              textDayFontFamily: font.medium,
              textMonthFontFamily: font.semiBold,
              textDayHeaderFontFamily: font.semiBold,
              textDayFontSize: 13,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 13,
              'stylesheet.calendar.header': {
                dayHeader: {
                  color: color.black,
                  fontFamily: font.medium,
                },
              },
            }}
            markingType={'period'}
            markedDates={markedDates}
          />
        </View>

        {/* Checking Form */}
        <View style={styles.section}>
          <View style={[styles.row, styles.spaceBetween]}>
            <View>
              <MyText style={styles.heading}>Check In</MyText>
              <View style={styles.formGroup}>
                <TextInput
                  editable={false}
                  value={moment(new Date(startDate)).format('DD-MMM')}
                  placeholder="15 Dec"
                  style={styles.formControl}
                  placeholderTextColor={color.black400}
                />
                <Ionicons
                  style={styles.formControlIcon}
                  name={'calendar-outline'}
                  color={color.black400}
                  size={20}
                />
              </View>
            </View>
            <View>
              <MyText style={styles.heading}>Check Out</MyText>
              <View style={styles.formGroup}>
                <TextInput
                  editable={false}
                  value={moment(new Date(endDate)).format('DD-MMM')}
                  placeholder="15 Dec"
                  style={styles.formControl}
                  placeholderTextColor={color.black400}
                />
                <Ionicons
                  style={styles.formControlIcon}
                  name={'calendar-outline'}
                  color={color.black400}
                  size={20}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Guest Form */}
        <View style={styles.section}>
          <MyText style={styles.heading}>Guest</MyText>
          <View style={styles.guest}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={decreaseGestHandler}>
              <MaterialCommunityIcons
                name={'minus'}
                color={color.primary}
                size={16}
              />
            </TouchableOpacity>
            <MyText style={styles.qtyText}>{guestQty}</MyText>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={increaseGestHandler}>
              <MaterialCommunityIcons
                name={'plus'}
                color={color.primary}
                size={16}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={[styles.section, styles.center, styles.footer]}>
          <MyText style={styles.heading}>Total: 3000</MyText>
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => {
              navigation.navigate('BookingCustomerStackScreen');
            }}>
            <MyText style={styles.continueBtnText}>Continue</MyText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
};

export default BookingDateScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 15,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 16,
    color: color.black800,
  },
  smallText: {
    fontSize: 13,
    fontFamily: font.medium,
    color: color.black300,
    marginTop: 3,
  },
  row: {
    flexDirection: 'row',
    gap: 5,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  formGroup: {
    position: 'relative',
    marginTop: 5,
  },
  formControl: {
    padding: 15,
    paddingEnd: 45,
    backgroundColor: color.white400,
    width: 140,
    borderRadius: 10,
    fontFamily: font.medium,
    fontSize: 15,
    color: color.black600,
    elevation: 2,
    shadowColor: color.black400,
  },
  formControlIcon: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  guest: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.white600,
    padding: 10,
    borderRadius: 10,
    gap: 30,
    marginTop: 10,
  },
  qtyBtn: {
    backgroundColor: color.primary200,
    padding: 15,
    borderRadius: 10,
  },
  qtyText: {
    fontFamily: font.semiBold,
    color: color.black500,
    fontSize: 18,
  },
  footer: {
    marginTop: 50,
  },
  continueBtn: {
    backgroundColor: color.primary,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 120,
  },
  continueBtnText: {
    color: color.white,
    fontFamily: font.medium,
    fontSize: 16,
  },
});
