import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  Image,
} from 'react-native';
import Container from '../components/Container';
import MyText from '../components/MyText';
import SearchBox from '../components/SearchBox';
import {color, font} from '../helpers/Constants';
import Tabs from '../components/Tabs';
import CourseHorizontalCard from '../components/CourseHorizontalCard';
import CourseCardSkeleton from '../components/skeltons/CourseCardSkeleton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import myStyles from '../helpers/Styles';
import {courseDataForSkelton} from '../helpers';
import {get} from '../utils/api';
import TabSkelton from '../components/skeltons/TabSkeleton';
import DataNotFound from '../components/DataNotFound';

const SearchScreen = () => {
  const isDark = useColorScheme() === 'dark';
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dataLoadOnRefresh, setDataLoadOnRefresh] = useState(false);

  // State for search box
  const [searchQuery, setSearchQuery] = useState('');

  // State for Courses
  const [courses, setCourses] = useState([]);
  const [courseLoading, setCourseLoading] = useState(true);

  // state for categories
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  // state for sub categories
  const [subCategories, setSubCategories] = useState([]);
  const [subcategoryLoading, setSubCategoryLoading] = useState(true);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  // state for Topics
  const [topics, setTopics] = useState([]);
  const [topicLoading, setTopicLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState('');

  // state for Languages
  const [languages, setLanguages] = useState([]);
  const [languageLoading, setLanguageLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const onRefresh = () => {
    setIsRefreshing(false);
    setDataLoadOnRefresh(!dataLoadOnRefresh);
  };

  const [filterModal, setFilterModal] = useState(false);

  // getCourseData
  useEffect(() => {
    const getCourseData = async () => {
      setCourseLoading(true);
      try {
        let url = '/courses';
        if (searchQuery) url += `?searchQuery=${searchQuery}`;
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
  }, [dataLoadOnRefresh, searchQuery]);

  // getCategoryData
  useEffect(() => {
    const getCategoryData = async () => {
      setCategoryLoading(true);
      try {
        const apiResponse = await get(`/categories`);
        if (apiResponse.status == 200) {
          setCategories(apiResponse.body);
        }
        setCategoryLoading(false);
      } catch (error) {
        setCategoryLoading(false);
      }
    };
    getCategoryData();
  }, []);

  // handleSelectCategory
  const handleSelectCategory = categoryId => {
    setSelectedCategory(categoryId);
  };

  // getSubCategoryData
  useEffect(() => {
    const getSubCategoryData = async () => {
      setSubCategoryLoading(true);
      try {
        let url = `/subcategories`;
        if (selectedCategory) {
          url += `?category=${selectedCategory}`;
        }
        const apiResponse = await get(url);
        if (apiResponse.status == 200) {
          setSubCategories(apiResponse.body);
        }
        setSubCategoryLoading(false);
      } catch (error) {
        setSubCategoryLoading(false);
      }
    };
    getSubCategoryData();
  }, [selectedCategory]);

  // handleSelectSubCategory
  const handleSelectSubCategory = categoryId => {
    setSelectedSubCategory(categoryId);
  };

  // getTopicData
  useEffect(() => {
    const getTopicData = async () => {
      setTopicLoading(true);
      try {
        let url = `/topics?`;
        if (selectedCategory) {
          url += `&category=${selectedCategory}`;
        }
        if (selectedSubCategory) {
          url += `&subCategory=${selectedSubCategory}`;
        }
        const apiResponse = await get(url);
        if (apiResponse.status == 200) {
          setTopics(apiResponse.body);
        }
        setTopicLoading(false);
      } catch (error) {
        setTopicLoading(false);
      }
    };
    getTopicData();
  }, [selectedCategory, selectedSubCategory]);

  // handleSelectTopic
  const handleSelectTopic = topicId => {
    setSelectedTopic(topicId);
  };

  // getLanguageData
  useEffect(() => {
    const getLanguageData = async () => {
      setLanguageLoading(true);
      try {
        let url = `/languages`;

        const apiResponse = await get(url);
        if (apiResponse.status == 200) {
          setLanguages(apiResponse.body);
        }
        setLanguageLoading(false);
      } catch (error) {
        setLanguageLoading(false);
      }
    };
    getLanguageData();
  }, []);

  // handleSelectLanguage
  const handleSelectLanguage = langId => {
    setSelectedLanguage(langId);
  };

  // handleSearchQuery
  const handleSearchQuery = query => {
    setSearchQuery(query);
  };

  // handleFilter
  const handleFilter = async () => {
    console.log('run');

    setFilterModal(false);
    setCourseLoading(true);
    try {
      let url = `/courses?`;
      if (selectedCategory) url += `&category=${selectedCategory}`;
      if (selectedSubCategory) url += `&subCategory=${selectedSubCategory}`;
      if (selectedTopic) url += `&topic=${selectedTopic}`;
      if (selectedLanguage) url += `&language=${selectedLanguage}`;

      const apiResponse = await get(url);

      if (apiResponse.status == 200) {
        setCourses(apiResponse.body);
      }
      setCourseLoading(false);
    } catch (error) {
      setCourseLoading(false);
    }
  };

  // handleClearFilter
  const handleClearFilter = () => {
    setSelectedCategory('');
    setSelectedSubCategory('');
    setSelectedTopic('');
    setSelectedLanguage('');
    setFilterModal(false);
    setDataLoadOnRefresh(!dataLoadOnRefresh);
  };

  return (
    <Container>
      <View style={styles.container}>
        <SearchBox handleSearchQuery={handleSearchQuery} />

        <FlatList
          ListHeaderComponent={() => {
            return (
              <>
                <View style={[styles.headingContainer]}>
                  <MyText style={styles.heading}>Filter Course</MyText>
                  <TouchableOpacity
                    style={styles.headingBtn}
                    onPress={() => {
                      setFilterModal(true);
                    }}>
                    <AntDesign
                      name="appstore-o"
                      color={color.primary}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </>
            );
          }}
          data={courseLoading ? courseDataForSkelton : courses}
          showsVerticalScrollIndicator={false}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
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
          contentContainerStyle={
            courses.length === 0 && styles.dataNotFoundContainer
          }
          ListEmptyComponent={<DataNotFound text={'Course Not Available'} />}
        />
      </View>

      {/* Filter Modal */}
      <Modal
        visible={filterModal}
        transparent={true}
        onDismiss={() => setFilterModal(fasle)}
        animationType="slide"
        onRequestClose={() => setFilterModal(false)}>
        <TouchableWithoutFeedback
          onPress={() => {
            setFilterModal(false);
          }}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          {/* Modal Body */}
          <View style={styles.modalBody}>
            {/* Header */}
            <View style={[myStyles.center, myStyles.my1]}>
              <MyText style={myStyles.header}>Filter Course</MyText>
              <View style={myStyles.devider}></View>
            </View>

            {/* Category */}
            <View style={styles.section}>
              <View style={[styles.headingContainer]}>
                <MyText style={styles.heading}>Category</MyText>
              </View>

              {categoryLoading ? (
                <TabSkelton />
              ) : (
                <Tabs
                  data={categories}
                  selected={selectedCategory}
                  handleSelect={handleSelectCategory}
                />
              )}
            </View>

            {/* Sub Categories */}
            <View style={styles.section}>
              <View style={[styles.headingContainer]}>
                <MyText style={styles.heading}>Sub Categories</MyText>
              </View>

              {subcategoryLoading ? (
                <TabSkelton />
              ) : (
                <Tabs
                  data={subCategories}
                  handleSelect={handleSelectSubCategory}
                  selected={selectedSubCategory}
                />
              )}
            </View>

            {/* Topics */}
            <View style={styles.section}>
              <View style={[styles.headingContainer]}>
                <MyText style={styles.heading}>Topics</MyText>
              </View>

              {topicLoading ? (
                <TabSkelton />
              ) : (
                <Tabs
                  data={topics}
                  handleSelect={handleSelectTopic}
                  selected={selectedTopic}
                />
              )}
            </View>

            {/* Languages */}
            <View style={styles.section}>
              <View style={[styles.headingContainer]}>
                <MyText style={styles.heading}>Languages</MyText>
              </View>

              {languageLoading ? (
                <TabSkelton />
              ) : (
                <Tabs
                  data={languages}
                  handleSelect={handleSelectLanguage}
                  selected={selectedLanguage}
                />
              )}
            </View>

            <View style={[styles.btnContainer]}>
              <View style={{flex: 1}}>
                <TouchableOpacity
                  style={styles.btnLight}
                  onPress={handleClearFilter}>
                  <MyText style={styles.btnTextLight}>Reset</MyText>
                </TouchableOpacity>
              </View>

              <View style={{flex: 1}}>
                <TouchableOpacity style={styles.btn} onPress={handleFilter}>
                  <MyText style={styles.btnText}>Apply Filter</MyText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 0,
  },
  name: {
    fontFamily: font.semiBold,
    color: color.black800,
    fontSize: 19,
    marginVertical: 10,
  },

  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 5,
  },
  heading: {
    fontFamily: font.semiBold,
    fontSize: 17,
    color: color.black800,
  },

  headingBtn: {
    padding: 5,
  },
  headingBtnText: {
    fontSize: 16,
    fontFamily: font.semiBold,
    color: color.primary,
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    top: '10%',
    height: '90%',
    width: '100%',
  },

  modalBody: {
    flex: 1,
    padding: 15,
  },
  btnContainer: {
    marginVertical: 15,
    gap: 10,
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: color.primary600,
    paddingVertical: 15,
    paddingHorizontal: 10,
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
    paddingHorizontal: 10,
    borderRadius: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextLight: {
    fontSize: 14,
    color: color.primary,
    fontFamily: font.semiBold,
  },
  dataNotFoundContainer: {
    justifyContent: 'center',
    height: '100%',
  },
});
