import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import MyText from '../components/MyText';
import {color, font} from '../helpers/Constants';
import Header from '../components/Header';
import ProfileCard from '../components/ProfileCard';
import {SERVER_URL} from '../../config/Config';
import Container from '../components/Container';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NotificationCard from '../components/NotificationCard';

const NotificationScreen = ({navigation}) => {
  const [profileLoading, setProfileLoading] = useState(false);
  const [profile, setProfile] = useState({});

  const [wishlistLoading, setWishlistLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);

  const [ordersLoading, setOrdersLoading] = useState(true);
  const [myOrders, setMyOrders] = useState([]);

  const [shippingAddressLoading, setShippingAddressLoading] = useState(true);
  const [shippingAddress, setShippingAddress] = useState([]);

  return (
    <Container>
      <Header title={'Notification'} />
      <ScrollView style={styles.root}>
        <View style={styles.container}>
          {/* Today */}
          <View style={styles.cardContainer}>
            <MyText style={styles.cardContainerLabel}>Today</MyText>
            <NotificationCard
              icon={'checkmark-done-circle'}
              iconColor={color.primary800}
              title={'Payment Successful !'}
              text={'Lorem ipsum dolor amet adipisicing elit !'}
            />

            <NotificationCard
              icon={'ios-wallet-outline'}
              iconColor={color.danger}
              title={'E-Wallet Created !'}
              text={'Lorem ipsum dolor amet adipisicing elit !'}
            />
          </View>

          {/* Yesterday */}
          <View style={styles.cardContainer}>
            <MyText style={styles.cardContainerLabel}>Yesterday</MyText>
            <NotificationCard
              icon={'close-circle'}
              iconColor={color.info}
              title={'Account Pending !'}
              text={'Lorem ipsum dolor amet adipisicing elit !'}
            />
            <NotificationCard
              icon={'lock-closed-sharp'}
              iconColor={color.warning}
              title={'Payment Successful !'}
              text={'Lorem ipsum dolor amet adipisicing elit !'}
            />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
  cardContainerLabel: {
    fontSize: 16,
    color: color.black,
    fontFamily: font.semiBold,
  },
  card: {},
});
