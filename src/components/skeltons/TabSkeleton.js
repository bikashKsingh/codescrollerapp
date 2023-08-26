import {View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const TabSkelton = () => {
  return (
    <SkeletonPlaceholder borderRadius={20}>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        marginTop={10}>
        <SkeletonPlaceholder.Item
          width={'23%'}
          height={40}
          borderRadius={30}
          marginBottom={10}
          marginRight={'2%'}
        />
        <SkeletonPlaceholder.Item
          width={'23%'}
          height={40}
          borderRadius={30}
          marginBottom={10}
          marginRight={'2%'}
        />
        <SkeletonPlaceholder.Item
          width={'23%'}
          height={40}
          borderRadius={30}
          marginBottom={10}
          marginRight={'2%'}
        />
        <SkeletonPlaceholder.Item
          width={'25%'}
          height={40}
          borderRadius={30}
          marginBottom={10}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default TabSkelton;
