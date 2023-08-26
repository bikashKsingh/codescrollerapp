import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import MyCard from '../MyCard';
import {View} from 'react-native';

const CourseDetailsScreenSkelton = () => {
  return (
    <View>
      {/* Video Card */}
      <MyCard>
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={220}
              borderRadius={0}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </MyCard>

      <View style={{padding: 10}}>
        {/* Name */}
        <MyCard>
          <SkeletonPlaceholder borderRadius={4}>
            <SkeletonPlaceholder.Item height={30} borderRadius={0} />
          </SkeletonPlaceholder>
        </MyCard>

        {/* Category & Ratings */}
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            width={'100%'}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginBottom={10}>
            <SkeletonPlaceholder.Item width={'35%'} height={25} />
            <SkeletonPlaceholder.Item
              width={'8%'}
              height={30}
              borderRadius={40}
            />
            <SkeletonPlaceholder.Item width={'50%'} height={25} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>

        {/* Price */}
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item
            width={'100%'}
            flexDirection="row"
            alignItems="center"
            marginBottom={10}
            marginTop={10}
            gap={10}>
            <SkeletonPlaceholder.Item width={'25%'} height={25} />
            <SkeletonPlaceholder.Item width={'25%'} height={25} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>

        {/* Tab Details */}
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            width={'100%'}
            flexDirection="row"
            marginBottom={10}
            marginTop={10}
            justifyContent="space-between">
            <SkeletonPlaceholder.Item width={'30%'} flexDirection="row" gap={5}>
              <SkeletonPlaceholder.Item
                width={'24%'}
                height={25}
                borderRadius={40}
              />
              <SkeletonPlaceholder.Item
                width={'75%'}
                height={20}
                marginTop={3}
              />
            </SkeletonPlaceholder.Item>

            <SkeletonPlaceholder.Item width={'30%'} flexDirection="row" gap={5}>
              <SkeletonPlaceholder.Item
                width={'24%'}
                height={25}
                borderRadius={40}
              />
              <SkeletonPlaceholder.Item
                width={'75%'}
                height={20}
                marginTop={3}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item width={'30%'} flexDirection="row" gap={5}>
              <SkeletonPlaceholder.Item
                width={'24%'}
                height={25}
                borderRadius={40}
              />
              <SkeletonPlaceholder.Item
                width={'75%'}
                height={20}
                marginTop={3}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>

        {/* Tab Details */}
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            width={'100%'}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginBottom={10}
            marginTop={20}
            gap={10}>
            <SkeletonPlaceholder.Item width={'30%'} height={25} />
            <SkeletonPlaceholder.Item width={'30%'} height={25} />
            <SkeletonPlaceholder.Item width={'30%'} height={25} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>

        {/* Mentor */}
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            width={'30%'}
            marginBottom={10}
            marginTop={20}
            gap={10}>
            <SkeletonPlaceholder.Item width={'100%'} height={20} />
          </SkeletonPlaceholder.Item>

          <SkeletonPlaceholder.Item
            width={'100%'}
            flexDirection="row"
            alignItems="center"
            gap={10}>
            <SkeletonPlaceholder.Item
              flexDirection="row"
              alignItems="center"
              width={'25%'}
              gap={10}>
              {/* Image */}
              <SkeletonPlaceholder.Item
                width={'100%'}
                borderRadius={100}
                height={90}
              />
            </SkeletonPlaceholder.Item>

            <SkeletonPlaceholder.Item width={'75%'} gap={10}>
              {/* Image */}
              <SkeletonPlaceholder.Item width={'80%'} height={20} />
              <SkeletonPlaceholder.Item width={'100%'} height={20} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>

        {/* About */}
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            width={'100%'}
            marginBottom={10}
            marginTop={20}
            gap={10}>
            <SkeletonPlaceholder.Item width={'30%'} height={20} />
            <SkeletonPlaceholder.Item width={'100%'} height={15} />
            <SkeletonPlaceholder.Item width={'100%'} height={15} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>

        {/* Button */}
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item width={'100%'} gap={10}>
            <SkeletonPlaceholder.Item
              width={'100%'}
              height={50}
              borderRadius={20}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View>
    </View>
  );
};

export default CourseDetailsScreenSkelton;
