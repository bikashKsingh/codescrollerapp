import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import MyCard from '../MyCard';

const LessonContentCardSkelton = () => {
  return (
    <MyCard>
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          padding={15}>
          {/* For Image */}
          <SkeletonPlaceholder.Item
            width={'16%'}
            height={50}
            borderRadius={25}
          />

          <SkeletonPlaceholder.Item marginLeft={'3%'} width={'70%'}>
            <SkeletonPlaceholder.Item
              width={'85%'}
              height={15}
              borderRadius={20}
            />
            <SkeletonPlaceholder.Item
              width={'20%'}
              height={15}
              borderRadius={20}
              marginTop={8}
            />
          </SkeletonPlaceholder.Item>

          <SkeletonPlaceholder.Item
            width={'10%'}
            height={30}
            borderRadius={20}
            marginTop={8}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </MyCard>
  );
};

export default LessonContentCardSkelton;
