import React, {useState} from 'react';
import {Image, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
// import Carousel from 'react-native-reanimated-carousel';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {WINDOW_WIDTH, WINDOW_HEIGHT} from '../utils/CommonUtils';
import {color} from '../helpers/Constants';

const BannerCarousel = ({sliderImages}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <View>
      <Carousel
        //   ref={(c) => { this._carousel = c; }}
        data={sliderImages}
        renderItem={({item, index}) => {
          return (
            <View style={styles.container} key={`banner-carousel-${index}`}>
              <TouchableOpacity style={styles.btn}>
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 20,
                  }}
                  source={{uri: item.image}}
                  resizeMode="stretch"
                />
              </TouchableOpacity>
            </View>
          );
        }}
        sliderWidth={WINDOW_WIDTH}
        itemWidth={WINDOW_WIDTH}
        dotsLength={sliderImages.length}
        loop={true}
        enableSnap={true}
        enableMomentum={false}
        lockScrollWhileSnapping={true}
        loopClonesPerSide={sliderImages.length}
        useScrollView={true}
        autoplay={true}
        onSnapToItem={index => setActiveSlide(index)}
      />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Pagination
          dotsLength={sliderImages.length}
          activeDotIndex={activeSlide}
          containerStyle={{
            position: 'absolute',
            bottom: 0,
          }}
          dotStyle={{
            width: 30,
            backgroundColor: color.primary,
          }}
          inactiveDotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: -10,
            backgroundColor: color.white,
          }}
          inactiveDotOpacity={0.8}
          inactiveDotScale={0.6}
        />
      </View>
    </View>
  );
};

export default BannerCarousel;

const styles = StyleSheet.create({
  container: {
    height: WINDOW_HEIGHT - WINDOW_HEIGHT * 0.78,
    width: WINDOW_WIDTH - WINDOW_WIDTH * 0.1,
    borderWidth: 0,
    justifyContent: 'center',
    padding: 2,
  },
  btn: {
    overflow: 'hidden',
    elevation: 0.5,
  },
});
