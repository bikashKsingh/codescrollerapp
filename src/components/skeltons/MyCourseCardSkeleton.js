import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import MyCard from '../MyCard';

const MyCourseCardSkeleton = () => {
  return (
    <MyCard>
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          padding={15}>
          {/* For Image */}
          <SkeletonPlaceholder.Item
            width={'35%'}
            height={110}
            borderRadius={20}
          />

          <SkeletonPlaceholder.Item marginLeft={'3%'} width={'65%'}>
            <SkeletonPlaceholder.Item
              width={'97%'}
              height={20}
              borderRadius={20}
            />

            <SkeletonPlaceholder.Item
              width={'45%'}
              height={20}
              borderRadius={20}
              marginTop={10}
            />
            <SkeletonPlaceholder.Item
              width={'97%'}
              height={20}
              borderRadius={20}
              marginTop={10}
            />
            {/* <SkeletonPlaceholder.Item
              width={'40%'}
              height={20}
              borderRadius={20}
              marginTop={8}
            /> */}
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </MyCard>
  );
};

export default MyCourseCardSkeleton;
