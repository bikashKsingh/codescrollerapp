import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {color} from '../helpers/Constants';
import Header from '../components/Header';
import Container from '../components/Container';
import CourseHorizontalCard from '../components/CourseHorizontalCard';
import Hotels from '../../myData/Hotels';

const MyBookmarkScreen = ({navigation}) => {
  const [hotels, setHotels] = useState(Hotels);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = () => {
    setIsRefreshing(false);
  };
  return (
    <Container>
      <Header title={'My Bookmark'} />
      <View style={styles.root}>
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <FlatList
              // columnWrapperStyle={{justifyContent: 'space-between', gap: 10}}
              data={hotels}
              // numColumns={2}
              showsVerticalScrollIndicator={false}
              onRefresh={onRefresh}
              refreshing={isRefreshing}
              renderItem={({item}) => {
                return (
                  <CourseHorizontalCard
                    name={item.name}
                    price={item.price}
                    address={item.address}
                    ratings={item.ratings}
                    image={item.image}
                  />
                );
              }}
              keyExtractor={item => {
                return item.id;
              }}
            />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default MyBookmarkScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
});
