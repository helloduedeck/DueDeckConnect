import React from 'react';
import {View} from 'react-native';
import Icon from '../../atoms/Icon/IconComponent';

import {bottomRightIconPropsType} from '../../../types/components';

const BottomRighticon = (props: bottomRightIconPropsType) => {
  const {iconname} = props; // Assuming 'icon' is the prop name for the icon

  return (
    <View>
      <View style={{top: 10, right: 10, position: 'absolute'}}>
        <Icon name={iconname} size={undefined} />
      </View>
    </View>
  );
};

export default BottomRighticon;
