import React, {useContext, useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, useColorScheme, RefreshControl} from 'react-native';
import Container from '../components/Container';
import HeaderHome from '../components/HeaderHome';
import MyText from '../components/MyText';
import SearchBox from '../components/SearchBox';
import {color, font} from '../helpers/Constants';
import Tabs from '../components/Tabs';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import CourseHorizontalCard from '../components/CourseHorizontalCard';
import BannerCarousel from '../components/BannerCarousel';
import {UserContext} from '../../context/UserContext';
import {get} from '../utils/api';
import MainSliderSkeleton from '../components/skeltons/MainSliderSkeleton';
import TabSkeleton from '../components/skeltons/TabSkeleton';
import CourseCardSkeleton from '../components/skeltons/CourseCardSkeleton';
import {courseDataForSkelton} from '../helpers';

const HomeScreen = () => {
  // State for Courses
  const [courses, setCourses] = useState([]);
  const [courseLoading, setCourseLoading] = useState(true);

  // State for Sliders
  const [mainSliders, setMainSliders] = useState([]);
  const [mainSliderLoading, setMainSliderLoading] = useState(true);

  // State for Categories
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {state, dispatch} = useContext(UserContext);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  const isDark = useColorScheme() == 'dark';

  // getCourseData
  useEffect(() => {
    const getCourseData = async () => {
      setCourseLoading(true);
      try {
        let url = '/courses';
        if (selectedCategory) url += '?category=' + selectedCategory;
        const apiResponse = await get(url);
        if (apiResponse.status == 200) {
          setCourses(apiResponse.body);
        }
        setCourseLoading(false);
      } catch (error) {
        setCourseLoading(false);
      }
    };

    getCourseData();
  }, [selectedCategory, refreshing]);

  // getCategoryData
  useEffect(() => {
    const getCategoryData = async () => {
      setCategoryLoading(true);
      try {
        const apiResponse = await get('/categories');
        if (apiResponse.status == 200) {
          setCategories(apiResponse.body);
        }
        setCategoryLoading(false);
      } catch (error) {
        setCategoryLoading(false);
      }
    };

    getCategoryData();
  }, [refreshing]);

  // getMainSliders
  useEffect(() => {
    const getMainSliderData = async () => {
      setMainSliderLoading(true);
      try {
        const apiResponse = await get('/mainsliders');
        if (apiResponse.status == 200) {
          setMainSliders(apiResponse.body);
        }
        setMainSliderLoading(false);
      } catch (error) {
        setMainSliderLoading(false);
      }
    };

    getMainSliderData();
  }, [refreshing]);

  // handleSelect
  const handleSelect = catId => {
    setSelectedCategory(catId);
  };

  return (
    <Container>
      <HeaderHome />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <SearchBox />

        {/* Sider */}
        {mainSliderLoading ? (
          <MainSliderSkeleton />
        ) : (
          <BannerCarousel sliderImages={mainSliders} />
        )}

        {/* Section Haading */}
        <View style={[styles.headingContainer]}>
          <MyText
            style={[
              styles.heading,
              {color: isDark ? color.white : color.black800},
            ]}>
            Popular Categories
          </MyText>

          <TouchableOpacity style={styles.btn}>
            <MyText style={styles.btnText}>See All</MyText>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        {categoryLoading ? (
          <TabSkeleton />
        ) : (
          <Tabs
            data={categories}
            handleSelect={handleSelect}
            selected={selectedCategory}
          />
        )}

        {/* Courses */}
        <FlatList
          data={courseLoading ? courseDataForSkelton : courses}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return courseLoading ? (
              <CourseCardSkeleton />
            ) : (
              <CourseHorizontalCard
                _id={item._id}
                name={item.name}
                sellingPrice={item.sellingPrice}
                mrp={item.mrp}
                category={item?.category?.name}
                language={item?.language?.name}
                ratings={4}
                reviews={4}
                thumbnail={item.thumbnail}
              />
            );
          }}
          keyExtractor={item => {
            return item._id;
          }}
        />
      </ScrollView>
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  name: {
    fontFamily: font.semiBold,
    color: color.black800,
    fontSize: 17,
    marginTop: 5,
    marginBottom: 10,
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
    color: color.black800,
  },
  btnText: {
    fontSize: 16,
    fontFamily: font.semiBold,
    color: color.primary,
  },
});
