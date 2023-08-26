import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {color, font} from '../helpers/Constants';
import Header from '../components/Header';
import Container from '../components/Container';
import OngoingCourseCard from '../components/OngoingCourseCard';
import Hotels from '../../myData/Hotels';
import MyText from '../components/MyText';
import CompletedCourseCard from '../components/CompletedCourseCard';
import myStyles from '../helpers/Styles';
import {UserContext} from '../../context/UserContext';
import {useNavigation} from '@react-navigation/native';
import {getProtected} from '../utils/api';
import MyCourseCardSkeleton from '../components/skeltons/MyCourseCardSkeleton';
import {courseDataForSkelton} from '../helpers';
import DataNotFound from '../components/DataNotFound';
const MyCourseScreen = props => {
  const navigation = useNavigation();
  const {state, dispatch} = useContext(UserContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selected, setSelected] = useState('Ongoing');

  // State for course
  const [myPurchasedCourses, setMyPurchasedCourses] = useState([]);
  const [myPurchasedCourseLoading, setMyPurchasedCourseLoading] =
    useState(false);
  const [dataLoadOnRefresh, setDataLoadOnRefresh] = useState(false);

  const onRefresh = () => {
    setIsRefreshing(false);
    setDataLoadOnRefresh(!dataLoadOnRefresh);
  };

  // getMyPurchasedCourses
  useEffect(() => {
    const getMyPurchasedCourses = async () => {
      setMyPurchasedCourseLoading(true);
      try {
        const apiResponse = await getProtected(
          `/purchasedCourses/myCourses`,
          state?.jwtToken,
        );
        if (apiResponse.status == 200) {
          setMyPurchasedCourses(apiResponse.body);
        }
        setMyPurchasedCourseLoading(false);
      } catch (error) {
        setMyPurchasedCourseLoading(false);
      }
    };

    getMyPurchasedCourses();
  }, [dataLoadOnRefresh]);

  return (
    <Container>
      <Header title={'My Courses'} />

      <View style={styles.root}>
        <View style={styles.container}>
          <FlatList
            data={
              myPurchasedCourseLoading
                ? courseDataForSkelton
                : myPurchasedCourses
            }
            showsVerticalScrollIndicator={false}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            ListHeaderComponent={() => {
              return (
                <View style={styles.tabmodalBtnContainer}>
                  <TouchableOpacity
                    style={[
                      styles.tabBtn,
                      selected == 'Ongoing' ? styles.tabBtnFill : null,
                    ]}
                    onPress={() => {
                      setSelected('Ongoing');
                    }}>
                    <MyText
                      style={{
                        ...styles.tabBtnText,
                        color:
                          selected == 'Ongoing' ? color.white : color.primary,
                      }}>
                      Ongoing
                    </MyText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.tabBtn,
                      selected == 'Completed' ? styles.tabBtnFill : null,
                    ]}
                    onPress={() => {
                      setSelected('Completed');
                    }}>
                    <MyText
                      style={{
                        ...styles.tabBtnText,
                        color:
                          selected == 'Completed' ? color.white : color.primary,
                      }}>
                      Completed
                    </MyText>
                  </TouchableOpacity>
                </View>
              );
            }}
            renderItem={({item}) => {
              if (myPurchasedCourseLoading) {
                return <MyCourseCardSkeleton />;
              } else if (selected == 'Ongoing') {
                return (
                  <OngoingCourseCard
                    courseId={item?.course?._id}
                    name={item?.courseName}
                    duration={'2 hrs 30 mins'}
                    totalContents={100}
                    completedContent={30}
                    thumbnail={item.thumbnail}
                  />
                );
              } else if (selected == 'Completed') {
                return (
                  <CompletedCourseCard
                    courseId={item?.course?._id}
                    name={item?.courseName}
                    duration={'2 hrs 30 mins'}
                    totalContents={100}
                    completedContent={30}
                    thumbnail={item.thumbnail}
                  />
                );
              }
            }}
            keyExtractor={item => {
              return item._id;
            }}
            contentContainerStyle={
              myPurchasedCourses.length === 0 && styles.dataNotFoundContainer
            }
            ListEmptyComponent={
              <DataNotFound text={"You haven't purchased any course"} />
            }
          />
        </View>
      </View>
    </Container>
  );
};

export default MyCourseScreen;

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
  tabmodalBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },
  tabBtn: {
    borderWidth: 2,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    flex: 1,
    borderColor: color.primary,
  },
  tabBtnText: {
    color: color.primary,
    fontFamily: font.medium,
    textAlign: 'center',
  },

  tabBtnFill: {
    backgroundColor: color.primary,
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

    height: '40%',
    width: '100%',
    bottom: 0,
  },

  modalHeader: {
    padding: 20,
  },
  modalHeaderText: {
    fontSize: 18,
    fontFamily: font.semiBold,
    color: color.danger500,
    textAlign: 'center',
    paddingVertical: 10,
  },
  modalBody: {
    flex: 1,
    paddingHorizontal: 20,
  },
  modalBtnContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 15,
    flexDirection: 'row',
  },
  modalFillBtn: {
    backgroundColor: color.primary600,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalFillBtnText: {
    fontSize: 14,
    color: color.white,
    fontFamily: font.semiBold,
  },
  modalLightBtn: {
    backgroundColor: color.primary200,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBtnTextLight: {
    fontSize: 14,
    color: color.primary,
    fontFamily: font.semiBold,
  },
  dataNotFoundContainer: {
    justifyContent: 'center',
    flex: 1,
  },
});
